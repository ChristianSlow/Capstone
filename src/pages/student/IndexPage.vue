<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { db } from '../../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';

const route = useRouter();
const subjects = ref([]);
const isLoading = ref(true);
const userId = ref(null);
const selectedCourse = ref(null);
const selectedMajor = ref(null);

const fetchSubjects = async () => {
  console.log("Fetching subjects for user:", userId.value);

  if (!userId.value) {
    console.warn('No user ID found. Is the user logged in?');
    isLoading.value = false;
    return;
  }

  const studentDocRef = doc(db, "StudentInformation", userId.value);
  const studentDocSnap = await getDoc(studentDocRef);

  if (!studentDocSnap.exists()) {
    console.warn(`StudentInformation document not found for user: ${userId.value}`);
    route.push('/infopage');
    isLoading.value = false;
    return;
  }

  selectedCourse.value = studentDocSnap.data().selectedCourse;
  selectedMajor.value = studentDocSnap.data().major;

  if (!selectedCourse.value || !selectedMajor.value) {
    console.warn("Missing course or major selection.");
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

const totalUnits = computed(() => {
  return subjects.value.reduce((sum, subject) => sum + subject.units, 0);
});

onMounted(() => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userId.value = user.uid;
      fetchSubjects();
    } else {
      console.warn('User not logged in');
    }
  });
});
</script>

<template>
  <main class="p-5 bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
      <div class="bg-white shadow-sm">
  <div class="text-center">
    <!-- Logo -->
    <img class="mx-auto" width="100" height="100" src="/tlogo.png" alt="Tañon College Logo" />

    <!-- Title and Subtext -->
    <h1 class="text-red-800 text-2xl font-bold">TAÑON COLLEGE</h1>
    <h2 class="text-gray-700 text-lg">OFFICE OF THE REGISTRAR AND ADMISSIONS</h2>

    <!-- Location -->
    <p class="text-gray-600 text-base">San Carlos City, Negros Occidental</p>
  </div>
</div>

      <div class="text-center mb-4">
      </div>
      <h2 class="text-2xl font-bold text-gray-800 mb-1 text-center">{{ selectedCourse || 'Loading...' }}</h2>
      <h2 class="text-xl font-semibold text-gray-700 mb-2 text-center">{{ selectedMajor || 'Loading...' }}</h2>
      
      <p v-if="isLoading" class="text-gray-500 text-center">Loading subjects...</p>
      
      <div v-else>
        <table class="w-full border-collapse border border-gray-300 rounded-lg shadow-sm text-sm">
          <thead>
            <tr class="bg-blue-600 text-white">
              <th class="border p-3 text-left">Subject Code</th>
              <th class="border p-3 text-left">Descriptive Title</th>
              <th class="border p-3 text-center">Units</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(subject, index) in subjects" :key="index" class="hover:bg-gray-100 text-gray-700">
              <td class="border p-3">{{ subject.code }}</td>
              <td class="border p-3">{{ subject.title }}</td>
              <td class="border p-3 text-center">{{ subject.units }}</td>
            </tr>
          </tbody>
        </table>
        
        <div class="text-right font-semibold text-lg mt-6 p-4 bg-gray-200 rounded-lg">
          Total Units: <span class="text-blue-600">{{ totalUnits }}</span>
        </div>
      </div>
    </div>
  </main>
</template>
