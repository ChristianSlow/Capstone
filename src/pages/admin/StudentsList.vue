<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';

const students = ref([]);
const isLoading = ref(false);

const getData = async () => {
  students.value = [];
  isLoading.value = true;
  const querySnapshot = await getDocs(collection(db, 'StudentInformation'));
  querySnapshot.forEach((doc) => {
    students.value.push({ id: doc.id, ...doc.data() });
  });
  isLoading.value = false;
};

const acceptStudent = async (id) => {
  try {
    const studentRef = doc(db, 'StudentInformation', id);
    await updateDoc(studentRef, { status: 'Accepted' });
    alert('Student accepted successfully!');
    getData(); // Refresh the list
  } catch (error) {
    console.error('Error accepting student:', error);
  }
};

const denyStudent = async (id) => {
  try {
    const studentRef = doc(db, 'StudentInformation', id);
    await updateDoc(studentRef, { status: 'Denied' });
    alert('Student denied successfully!');
    getData(); // Refresh the list
  } catch (error) {
    console.error('Error denying student:', error);
  }
};

onMounted(() => {
  getData();
});

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  fname: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  selectedCourse: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
});
</script>

<template>
  <main class="p-6 md:ml-64 h-auto pt-20 bg-gray-100">
    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
      <h1 class="text-center text-3xl font-bold bg-gray-200 text-gray-800 p-5 border-b border-gray-300">
        Students List
      </h1>

      <div class="p-6">
        <!-- Search and Add Student -->
        <div class="mb-4 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <i class="pi pi-search text-gray-600"></i>
            <input
              v-model="filters['global'].value"
              class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Search name here"
            />
          </div>
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Student
          </button>
        </div>

        <!-- Students Table -->
        <div class="overflow-x-auto">
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
              <!-- Student Rows -->
              <tr
                v-for="student in students"
                :key="student.id"
                class="border-b hover:bg-gray-50"
              >
                <td class="px-4 py-3">{{ student.fname }} {{ student.mname }} {{ student.lname }}</td>
                <td class="px-4 py-3">{{ student.selectedCourse }}</td>
                <td class="px-4 py-3">{{ student.major || '-' }}</td>
                <td class="px-4 py-3">{{ student.status || 'Pending' }}</td>
                <td class="px-4 py-3">
                  <div class="flex gap-2">
                    <!-- Accept Button -->
                    <button
                      class="p-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none"
                      @click="acceptStudent(student.id)"
                    >
                      Accept
                    </button>
                    <!-- Deny Button -->
                    <button
                      class="p-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 focus:outline-none"
                      @click="denyStudent(student.id)"
                    >
                      Deny
                    </button>
                  </div>
                </td>
              </tr>
              <!-- Empty State -->
              <tr v-if="students.length === 0">
                <td colspan="5" class="text-center py-4">No students found.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Total Students -->
        <div class="mt-4 flex justify-end">
          <p class="text-gray-600">Total Students: {{ students.length }}</p>
        </div>
      </div>
    </div>
  </main>
</template>


<style scoped>
/* Add any custom styles here */
</style>
