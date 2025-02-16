<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { db } from '../../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';

const route = useRoute();
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

  // ✅ Step 1: Get Student Information
  const studentDocRef = doc(db, "StudentInformation", userId.value);
  const studentDocSnap = await getDoc(studentDocRef);

  if (!studentDocSnap.exists()) {
    console.warn(`StudentInformation document not found for user: ${userId.value}`);
    isLoading.value = false;
    return;
  }

  selectedCourse.value = studentDocSnap.data().selectedCourse;
  selectedMajor.value = studentDocSnap.data().major;

  console.log("Selected Course:", selectedCourse.value);
  console.log("Selected Major:", selectedMajor.value);

  if (!selectedCourse.value || !selectedMajor.value) {
    console.warn("Missing course or major selection.");
    isLoading.value = false;
    return;
  }

  // ✅ Step 2: Query Subjects Collection by Course & Major
  const subjectQuery = query(
    collection(db, "Subjects"),
    where("course", "==", selectedCourse.value),
    where("major", "==", selectedMajor.value)
  );

  try {
    const subjectSnapshot = await getDocs(subjectQuery);

    if (subjectSnapshot.empty) {
      console.warn("No matching subjects found in Firestore.");
    } else {
      console.log("Documents found:", subjectSnapshot.docs.map(doc => doc.data())); // Debug Firestore output
    }

    subjects.value = subjectSnapshot.docs.map((doc) => ({
      id: doc.id,
      code: doc.data().code || "", // Ensure Firestore has `code`
      title: doc.data().descriptiveTitle || doc.data().name || "", // Ensure Firestore has `name` or `descriptiveTitle`
      units: doc.data().units || 0, // Ensure Firestore has `units`
    }));

    console.log("Fetched subjects:", subjects.value);
  } catch (error) {
    console.error("Error fetching subjects:", error);
  }

  isLoading.value = false;
};

// ✅ Step 3: Run Fetch on Authentication
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
  <main class="p-6 bg-gray-50 min-h-screen">
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">
        Subjects for {{ selectedMajor || 'Loading...' }} ({{ selectedCourse || 'Loading...' }})
      </h2>

      <p v-if="isLoading" class="text-gray-500 text-center">Loading subjects...</p>

      <table v-else-if="subjects.length > 0" class="w-full border-collapse border border-gray-200">
        <thead>
          <tr class="bg-gray-100">
            <th class="border p-3 text-left">Subject Code</th>
            <th class="border p-3 text-left">Descriptive Title</th>
            <th class="border p-3 text-left">Units</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(subject, index) in subjects" :key="index">
            <td class="border p-3">{{ subject.code }}</td>
            <td class="border p-3">{{ subject.title }}</td>
            <td class="border p-3">{{ subject.units }}</td>
          </tr>
        </tbody>
      </table>

      <p v-else class="text-gray-500 text-center">No subjects found for this major.</p>
    </div>
  </main>
</template>
