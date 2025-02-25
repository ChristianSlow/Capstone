<script setup>
import { ref, onMounted } from "vue";
import OverlayPanel from "primevue/overlaypanel";
import Button from "primevue/button";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "vue-router";

// Firebase Auth & Firestore
const auth = getAuth();
const db = getFirestore();
const router = useRouter();

// Refs for UI state
const menuOpen = ref(false); // Sidebar toggle
const op = ref(null); // PrimeVue OverlayPanel reference
const userData = ref({ name: "Loading...", email: "", role: "" });

// Fetch user details from Firestore
const fetchUserData = async (user) => {
  if (user) {
    const q = query(collection(db, "users"), where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0].data();
      userData.value = {
        name: userDoc.name,
        email: userDoc.email,
        role: userDoc.role,
      };
    }
  }
};

// Listen for Firebase Authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    fetchUserData(user);
  } else {
    router.push("/"); // Redirect to login page if not authenticated
  }
});

// Logout function
const logout = () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out successfully.");
      router.push("/");
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
};

// Sidebar toggle
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
</script>

<template>
  <div class="antialiased bg-white dark:bg-white">
    <!-- Navbar -->
    <nav class="bg-white border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
      <div class="max-w-screen-xl flex items-center justify-between mx-auto">
        <a href="#" class="flex items-center space-x-3">
          <img src="../assets/tlogo.png" class="h-10 w-10" alt="Logo" />
          <span class="self-center text-xl md:text-3xl font-bold">TAÑON COLLEGE</span>
        </a>

        <div class="md:hidden flex items-center">
          <button @click="toggleMenu" class="text-gray-800 text-2xl">
            <i class="pi pi-bars"></i>
          </button>
        </div>

        <div class="hidden md:flex items-center relative">
          <!-- User Icon -->
          <div class="cursor-pointer border-4 border-white hover:border-4 rounded-full p-1" @click="op.toggle($event)">
            <i class="pi pi-user text-gray-800 text-2xl rounded-full bg-gray-300 p-2"></i>
          </div>

          <!-- PrimeVue Overlay Panel for Logout -->
          <OverlayPanel ref="op" class="w-56 p-4 shadow-lg">
            <div class="flex items-center gap-3 border-b pb-3">
              <i class="pi pi-user text-gray-800 text-3xl rounded-full bg-gray-300 p-2"></i>
              <div>
                <span class="font-semibold block text-gray-800">{{ userData.name }}</span>
                <span class="text-sm text-gray-500">{{ userData.role }}</span>
              </div>
            </div>
            <div class="mt-3">
              <Button label="Logout" icon="pi pi-sign-out" class="w-full bg-red-500 hover:bg-red-600 text-white" @click="logout" />
            </div>
          </OverlayPanel>
        </div>
      </div>
    </nav>

    <!-- Sidebar -->
    <aside
      :class="{ '-translate-x-full': !menuOpen, 'translate-x-0': menuOpen }"
      class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r transition-transform duration-300 ease-in-out md:translate-x-0"
    >
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

    <!-- Main Content -->
    <div class="p-4 pt-1">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
/* Ensure popover doesn't break UI */
.p-overlaypanel {
  z-index: 999 !important;
}
</style>
