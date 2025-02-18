<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { db } from '../../firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import html2canvas from 'html2canvas';

const route = useRouter();
const subjects = ref([]);
const isLoading = ref(true);
const userId = ref(null);
const selectedCourse = ref(null);
const selectedMajor = ref(null);
const auth = getAuth();

const fetchSubjects = async () => {
  if (!userId.value) {
    isLoading.value = false;
    return;
  }

  const studentDocRef = doc(db, "StudentInformation", userId.value);
  const studentDocSnap = await getDoc(studentDocRef);

  if (!studentDocSnap.exists()) {
    route.push('/infopage');
    isLoading.value = false;
    return;
  }

  selectedCourse.value = studentDocSnap.data().selectedCourse;
  selectedMajor.value = studentDocSnap.data().major;

  if (!selectedCourse.value || !selectedMajor.value) {
    isLoading.value = false;
    return;
  }

  const subjectQuery = query(
    collection(db, "subjects"),
    where("course", "==", selectedCourse.value),
    where("major", "==", selectedMajor.value)
  );

  try {
    const subjectSnapshot = await getDocs(subjectQuery);
    subjects.value = subjectSnapshot.docs.map((doc) => ({
      id: doc.id,
      code: doc.data().code || "",
      title: doc.data().descriptiveTitle || doc.data().name || "",
      units: doc.data().units || 0,
    }));
  } catch (error) {
    console.error("Error fetching subjects:", error);
  }

  isLoading.value = false;
};

const totalUnits = computed(() => subjects.value.reduce((sum, subject) => sum + subject.units, 0));

const downloadAsImage = async () => {
  const element = document.getElementById('captureArea');
  if (!element) return;

  try {
    const canvas = await html2canvas(element);
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'subject_list.png';
    link.click();
  } catch (error) {
    console.error("Error capturing image:", error);
  }
};

// Logout Function
const logout = async () => {
  try {
    await signOut(auth);
    route.push('/');
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userId.value = user.uid;
      fetchSubjects();
    } else {
      route.push('/');
    }
  });
});
</script>

<template>
  <main class="p-8 bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">

      <!-- Header with Download Button -->
      <div class="flex justify-end items-center mb-4">
        <!-- <h2 class="text-lg font-semibold text-gray-800">Subject List</h2> -->
        <Button 
          label="Download" 
          icon="pi pi-download" 
          class="p-button-sm custom-download-button transition-transform hover:scale-105"
          @click="downloadAsImage"
        />
      </div>

      <!-- Content to Capture -->
      <div id="captureArea" class="border border-gray-300 p-6 rounded-lg shadow-sm bg-white">
        <div class="text-center mb-6">
          <img class="mx-auto" width="80" height="80" src="/tlogo.png" alt="Tañon College Logo" />
          <h1 class="text-red-800 text-xl font-bold">TAÑON COLLEGE</h1>
          <h2 class="text-gray-700 text-md">OFFICE OF THE REGISTRAR AND ADMISSIONS</h2>
          <p class="text-gray-600 text-sm">San Carlos City, Negros Occidental</p>
        </div>

        <h2 class="text-xl font-bold text-gray-800 text-center mb-1">{{ selectedCourse || 'Loading...' }}</h2>
        <h2 class="text-lg font-semibold text-gray-700 text-center mb-4">{{ selectedMajor || 'Loading...' }}</h2>

        <p v-if="isLoading" class="text-gray-500 text-center">Loading subjects...</p>

        <div v-else>
          <table class="w-full border-collapse border border-gray-300 rounded-lg shadow-sm text-sm">
            <thead>
              <tr class="bg-gray-900 text-white">
                <th class="border p-2 text-left">Subject Code</th>
                <th class="border p-2 text-left">Descriptive Title</th>
                <th class="border p-2 text-center">Units</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(subject, index) in subjects" :key="index" class="even:bg-gray-100 hover:bg-gray-200 text-gray-700">
                <td class="border p-2">{{ subject.code }}</td>
                <td class="border p-2">{{ subject.title }}</td>
                <td class="border p-2 text-center">{{ subject.units }}</td>
              </tr>
            </tbody>
          </table>

          <div class="text-right font-semibold text-md mt-6 p-4 bg-gray-200 rounded-lg">
            Total Units: <span class="text-blue-600">{{ totalUnits }}</span>
          </div>
        </div>
      </div>

      <!-- Logout Button (Now Below the Content) -->
      <div class="flex justify-center mt-6">
        <Button 
          label="Logout" 
          icon="pi pi-sign-out" 
          class="p-button-sm p-button-danger transition-transform hover:scale-105"
          @click="logout"
        />
      </div>

    </div>
  </main>
</template>

<style scoped>
/* Improved Download Button (Smaller, Sleek, Professional) */
.custom-download-button {
  background-color: #000 !important;
  color: white !important;
  border: none !important;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.4rem 1rem;
  border-radius: 6px;
}

.custom-download-button:hover {
  background-color: #333 !important;
  transform: scale(1.05);
}

/* Logout Button */
.p-button-danger {
  background-color: #d9534f !important;
  border-color: #d43f3a !important;
}

.p-button-danger:hover {
  background-color: #c9302c !important;
  border-color: #ac2925 !important;
}
</style>
