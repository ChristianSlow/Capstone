<script setup>
import { ref, onMounted } from 'vue';
import Popover from 'primevue/popover';
import Button from 'primevue/button';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from 'vue-router';

const router = useRouter();
const auth = getAuth();
const db = getFirestore();
const op = ref();

const userData = ref({ name: "Loading...", email: "", role: "" });

const toggle = (event) => {
    op.value.toggle(event);
};

// Fetch user details
const fetchUserData = async (user) => {
    if (user) {
        const q = query(collection(db, "users"), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0].data();
            userData.value = {
                name: userDoc.name,
                email: userDoc.email,
                role: userDoc.role
            };
        }
    }
};

// Listen for authentication changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        fetchUserData(user);
    } else {
        router.push('/'); // Redirect to login page if not logged in
    }
});

// Logout function
const logout = () => {
    signOut(auth)
        .then(() => {
            console.log("User signed out successfully.");
            router.push('/');
        })
        .catch((error) => {
            console.error("Error signing out:", error);
        });
};
</script>


<template>
   <div class="antialiased bg-white dark:bg-white">
      <nav class="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-white fixed left-0 right-0 top-0 z-50">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
      <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="../assets/tlogo.png" class="h-10 w-10" alt="Logo" />
        <span class="self-center text-3xl font-bold whitespace-nowrap dark:text-white">TAÑON COLLEGE</span>
      </a>

      <div>
        <div @click="toggle" class="cursor-pointer border-4 border-white hover:border-4 rounded-full p-1">
          <!-- Circle the user icon -->
          <i class="pi pi-user text-gray-800 text-2xl rounded-full bg-gray-300 p-2"></i> <!-- Circular User Icon -->
        </div>

        <Popover ref="op">
          <div class="bg-white shadow-lg rounded-lg p-4 w-56">
            <!-- User Details -->
            <div class="flex items-center gap-3 border-b pb-3">
              <i class="pi pi-user text-gray-800 text-3xl rounded-full bg-gray-300 p-2"></i> <!-- Larger Circular User Icon -->
              <div>
                <span class="font-semibold block text-gray-800">{{ userData.name }}</span>
                <span class="text-sm text-gray-500">{{ userData.role }}</span>
              </div>
            </div>

            <!-- Logout Button -->
            <div class="mt-3">
              <button
                class="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded transition"
                @click="logout"
              >
                <i class="pi pi-sign-out"></i> Logout
              </button>
            </div>
          </div>
        </Popover>
      </div>
    </div>
  </nav>

      <aside class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200 dark:bg-gray-800">
         <div class="h-full px-3 py-4 overflow-y-auto">
            <ul class="space-y-2 font-medium">
               <li>
                        <RouterLink to="/admin" class="flex items-center p-3 rounded-lg hover:bg-gray-200">
                            <i class="pi pi-home mr-2"></i>
                            <span>Dashboard</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/admin/courses" class="flex items-center p-3 rounded-lg hover:bg-gray-200">
                            <i class="pi pi-book mr-2"></i>
                            <span>Courses</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/admin/subjects" class="flex items-center p-3 rounded-lg hover:bg-gray-200">
                            <i class="pi pi-bookmark mr-2"></i>
                            <span>Subjects</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/admin/students" class="flex items-center p-3 rounded-lg hover:bg-gray-200">
                            <i class="pi pi-users mr-2"></i>
                            <span>Students List</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/admin/studentsinfo" class="flex items-center p-3 rounded-lg hover:bg-gray-200">
                            <i class="pi pi-id-card mr-2"></i>
                            <span>Students Info</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/admin/users" class="flex items-center p-3 rounded-lg hover:bg-gray-200">
                            <i class="pi pi-user mr-2"></i>
                            <span>Users Account</span>
                        </RouterLink>
                    </li>
            </ul>
         </div>
      </aside>

      <RouterView />
   </div>
</template>
