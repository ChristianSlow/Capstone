<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const route = useRoute();
const subjects = ref([]);
const isLoading = ref(true);

// Ensure query parameters are reactive
const selectedCourse = computed(() => route.query.course || 'No Course Selected');
const selectedMajor = computed(() => route.query.majors || 'No Major Selected');

// Fetch subjects based on the selected course and major
const fetchSubjects = async () => {
  if (!route.query.course || !route.query.majors) {
    console.warn('No course or major selected');
    return;
  }

  isLoading.value = true;
  try {
    const q = query(
      collection(db, 'subjects'), // Ensure 'subjects' is the correct Firestore collection
      where('course', '==', route.query.course),
      where('majors', 'array-contains', route.query.majors) // Use array-contains for majors stored as an array
    );

    const querySnapshot = await getDocs(q);
    subjects.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    if (subjects.value.length === 0) {
      console.warn('No subjects found for this major.');
    }
  } catch (error) {
    console.error('Error fetching subjects:', error);
  }
  isLoading.value = false;
};

onMounted(fetchSubjects);
</script>

<template>
  <main class="p-6 bg-gray-50 min-h-screen">
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">
        Subjects for {{ selectedMajor }} ({{ selectedCourse }})
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
            <td class="border p-3">{{ subject.subjectCode }}</td>
            <td class="border p-3">{{ subject.descriptiveTitle }}</td>
            <td class="border p-3">{{ subject.units }}</td>
          </tr>
        </tbody>
      </table>

      <p v-else class="text-gray-500 text-center">No subjects found for this major.</p>
    </div>
  </main>
</template>
