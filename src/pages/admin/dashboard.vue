<script setup>
import { ref, onMounted } from "vue";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ChartBarIcon, UserGroupIcon, AcademicCapIcon, XCircleIcon } from '@heroicons/vue/outline'; 

const courses = ref([]);
const students = ref([]);
const deniedStudents = ref([]);

const fetchData = async () => {
  try {
    const coursesSnapshot = await getDocs(collection(db, "Courses"));
    courses.value = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const studentsSnapshot = await getDocs(collection(db, "StudentInformation"));
    let acceptedCount = 0;
    let deniedCount = 0;

    studentsSnapshot.docs.forEach(doc => {
      const studentData = doc.data();
      if (studentData.status === "Accepted") {
        acceptedCount++;
      } else if (studentData.status === "Denied") {
        deniedCount++;
      }
    });

    students.value = acceptedCount;
    deniedStudents.value = deniedCount;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <main class="p-6 md:ml-64 h-auto pt-20 bg-gray-50">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

    <!-- Grid Section for Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Card 1: Total Courses -->
      <div class="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 border-t-4 border-blue-500">
        <AcademicCapIcon class="h-12 w-12 text-blue-500" />
        <div>
          <h3 class="text-xl font-semibold text-gray-700">Total Courses</h3>
          <p class="text-gray-500 text-lg">{{ courses.length }} courses</p>
        </div>
      </div>
      
      <!-- Card 2: Available Courses -->
      <div class="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 border-t-4 border-purple-500">
        <ChartBarIcon class="h-12 w-12 text-purple-500" />
        <div>
          <h3 class="text-xl font-semibold text-gray-700">Available Courses</h3>
          <ul class="text-gray-500 text-sm mt-1">
            <li v-for="course in courses" :key="course.id">{{ course.course }}</li>
          </ul>
        </div>
      </div>

      <!-- Card 3: Registered Students -->
      <div class="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 border-t-4 border-green-500">
        <UserGroupIcon class="h-12 w-12 text-green-500" />
        <div>
          <h3 class="text-xl font-semibold text-gray-700">Registered Students</h3>
          <p class="text-gray-500 text-lg">{{ students }} students</p>
        </div>
      </div>

      <!-- Card 4: Denied Students -->
      <div class="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 border-t-4 border-red-500">
        <XCircleIcon class="h-12 w-12 text-red-500" />
        <div>
          <h3 class="text-xl font-semibold text-gray-700">Denied Students</h3>
          <p class="text-gray-500 text-lg">{{ deniedStudents }} students</p>
        </div>
      </div>
    </div>

    <!-- Insights Section -->
    <div class="bg-white shadow-lg rounded-lg p-8 border-t-4 border-indigo-500">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Detailed Insights</h2>
      <p class="text-gray-500">Analyze student data, enrollment trends, and more.</p>
    </div>

    <!-- Additional Grid Section -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      <div class="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center border-t-4 border-teal-500">
        <h3 class="text-lg font-semibold text-gray-700">Analytics</h3>
        <p class="text-gray-500 text-sm text-center mt-2">Monitor real-time student data</p>
      </div>
      <div class="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center border-t-4 border-yellow-500">
        <h3 class="text-lg font-semibold text-gray-700">Reports</h3>
        <p class="text-gray-500 text-sm text-center mt-2">Generate enrollment and student reports</p>
      </div>
      <div class="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center border-t-4 border-cyan-500">
        <h3 class="text-lg font-semibold text-gray-700">Notifications</h3>
        <p class="text-gray-500 text-sm text-center mt-2">Stay updated with alerts</p>
      </div>
      <div class="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center border-t-4 border-pink-500">
        <h3 class="text-lg font-semibold text-gray-700">Messages</h3>
        <p class="text-gray-500 text-sm text-center mt-2">Communicate with students</p>
      </div>
    </div>
  </main>
</template>
