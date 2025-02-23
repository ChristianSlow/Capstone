<script setup>
import { ref, computed, onMounted } from 'vue';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const students = ref([]);
const isLoading = ref(false);
const searchQuery = ref('');

// Fetch the list of students
const getData = async () => {
  students.value = [];
  isLoading.value = true;
  try {
    const querySnapshot = await getDocs(collection(db, 'StudentInformation'));
    querySnapshot.forEach((doc) => {
      students.value.push({ id: doc.id, ...doc.data() });
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    alert('Failed to fetch students. Please try again.');
  }
  isLoading.value = false;
};

// Computed property for filtered students
const filteredStudents = computed(() => {
  const query = searchQuery.value.toLowerCase();
  if (!query) return students.value;
  return students.value.filter(student =>
    (student.fname + ' ' + student.mname + ' ' + student.lname).toLowerCase().includes(query) ||
    (student.selectedCourse || '').toLowerCase().includes(query) ||
    (student.major || '').toLowerCase().includes(query)
  );
});

// Accept a student
const acceptStudent = async (id) => {
  try {
    await updateDoc(doc(db, 'StudentInformation', id), { status: 'Accepted' });
    alert('Student accepted successfully! Email will be sent.');
    getData();
  } catch (error) {
    console.error('Error accepting student:', error);
  }
};


// Deny a student
const denyStudent = async (id) => {
  try {
    await updateDoc(doc(db, 'StudentInformation', id), { status: 'Denied' });
    alert('Student denied successfully!');
    getData();
  } catch (error) {
    console.error('Error denying student:', error);
    alert('Failed to deny student.');
  }
};

// Delete a student
const deleteStudent = async (id) => {
  try {
    await deleteDoc(doc(db, 'StudentInformation', id));
    alert('Student deleted successfully!');
    getData();
  } catch (error) {
    console.error('Error deleting student:', error);
    alert('Failed to delete student.');
  }
};

onMounted(() => {
  getData();
});
</script>

<template>
  <main class="p-6 md:ml-64 h-auto pt-20 bg-gray-100">
    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
      <h1 class="text-center text-3xl font-bold bg-gray-200 text-gray-800 p-5 border-b border-gray-300">
        Students List
      </h1>

      <div class="p-6">
        <!-- Search Section -->
        <div class="mb-4 flex justify-between items-center">
          <div class="relative w-full">
            <i class="pi pi-search text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"></i>
            <input
              v-model="searchQuery"
              class="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Search by name, course, or major"
            />
          </div>
        </div>


        <!-- Loading Indicator -->
        <div v-if="isLoading" class="text-center text-gray-600 py-5">
          <i class="pi pi-spin pi-spinner text-3xl"></i>
          <p>Loading students...</p>
        </div>

        <!-- Students Table -->
        <div v-if="!isLoading" class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-700 border border-gray-300">
            <thead class="bg-gray-100 text-gray-800 uppercase text-xs font-bold border-b">
              <tr>
                <th class="px-4 py-3">Student Name</th>
                <th class="px-4 py-3">Course</th>
                <th class="px-4 py-3">Major</th>
                <th class="px-4 py-3">Status</th>
                <th class="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="student in filteredStudents"
                :key="student.id"
                class="border-b hover:bg-gray-50"
              >
                <td class="px-4 py-3">{{ student.fname }} {{ student.mname }} {{ student.lname }}</td>
                <td class="px-4 py-3">{{ student.selectedCourse }}</td>
                <td class="px-4 py-3">{{ student.major || '-' }}</td>
                <td class="px-4 py-3">
                  <span
                    class="px-2 py-1 rounded text-xs font-bold"
                    :class="{
                      'bg-green-200 text-green-800': student.status === 'Accepted',
                      'bg-red-200 text-red-800': student.status === 'Denied',
                      'bg-yellow-200 text-yellow-800': !student.status || student.status === 'Pending'
                    }"
                  >
                    {{ student.status || 'Pending' }}
                  </span>
                </td>
                <td class="px-4 py-3">
                  <div class="flex gap-2">
                    <button
                    class="p-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none"
                    @click="acceptStudent(student.id)"
                    >
                    <i class="pi pi-check mr-1"></i> Accept
                  </button>
                  <button
                  class="p-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 focus:outline-none"
                  @click="denyStudent(student.id)"
                  >
                  <i class="pi pi-times mr-1"></i> Deny
                  </button>
                  <button
                    class="p-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none"
                    @click="$router.push({ name: 'studentsinfo', params: { id: student.id } })"
                  >
                    <i class="pi pi-eye"></i>
                  </button>
                  <button
                    class="p-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600 focus:outline-none"
                    @click="deleteStudent(student.id)"
                  >
                    <i class="pi pi-trash"></i>
                  </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredStudents.length === 0">
                <td colspan="5" class="text-center py-4">No matching students found.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Total Students Count -->
        <div class="mt-4 flex justify-end">
          <p class="text-gray-600">Total Students: {{ filteredStudents.length }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Custom button hover effects */
button {
  transition: all 0.2s ease-in-out;
}
button:hover {
  transform: scale(1.05);
}
</style>
