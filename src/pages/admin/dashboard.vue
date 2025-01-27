<script setup>
import { ref, onMounted } from "vue";
import { db } from "../../firebase"; // Ensure your Firebase config is imported correctly
import { collection, getDocs } from "firebase/firestore";

// Reactive variables
const courses = ref([]);
const students = ref([]);
const pendingStudents = ref([]);

// Fetch Data from Firestore
const fetchData = async () => {
  try {
    // Fetch courses
    const coursesSnapshot = await getDocs(collection(db, "Courses"));
    courses.value = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Fetch registered students
    const studentsSnapshot = await getDocs(collection(db, "StudentInformation"));
    students.value = studentsSnapshot.docs.filter(doc => doc.data().status === "registered").length;

    // Fetch pending students
    const pendingSnapshot = await getDocs(collection(db, "StudentInformation"));
    pendingStudents.value = pendingSnapshot.docs.filter(doc => doc.data().status === "pending").length;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Fetch data when the component is mounted
onMounted(() => {
  fetchData();
});
</script>

<template>
  <main class="p-6 md:ml-64 h-auto pt-20 bg-gray-100">
    <!-- Grid Section for Main Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <!-- Card 1: List of Courses -->
      <div
        class="bg-white border border-gray-300 shadow-md rounded-lg h-32 md:h-64 flex items-center justify-center hover:shadow-lg transition duration-300"
      >
        <div class="text-center">
          <h3 class="text-xl md:text-3xl font-bold text-gray-800">List of Courses</h3>
          <p class="text-sm text-gray-500 mt-2">{{ courses.length }} courses available</p>
        </div>
      </div>
      <!-- Card 2: Available Courses -->
      <div
        class="bg-white border border-gray-300 shadow-md rounded-lg h-32 md:h-64 flex items-center justify-center hover:shadow-lg transition duration-300"
      >
        <div class="text-center">
          <h3 class="text-xl md:text-3xl font-bold text-gray-800">Available Courses</h3>
          <ul class="text-sm text-gray-500 mt-2">
            <li v-for="course in courses" :key="course.id">{{ course.name }}</li>
          </ul>
        </div>
      </div>
      <!-- Card 3: Students Registered -->
      <div
        class="bg-white border border-gray-300 shadow-md rounded-lg h-32 md:h-64 flex items-center justify-center hover:shadow-lg transition duration-300"
      >
        <div class="text-center">
          <h3 class="text-xl md:text-3xl font-bold text-gray-800">Students Registered</h3>
          <p class="text-sm text-gray-500 mt-2">{{ students }} students registered</p>
        </div>
      </div>
      <!-- Card 4: Students Pending -->
      <div
        class="bg-white border border-gray-300 shadow-md rounded-lg h-32 md:h-64 flex items-center justify-center hover:shadow-lg transition duration-300"
      >
        <div class="text-center">
          <h3 class="text-xl md:text-3xl font-bold text-gray-800">Students Pending</h3>
          <p class="text-sm text-gray-500 mt-2">{{ pendingStudents }} students pending</p>
        </div>
      </div>
    </div>

    <!-- Large Section -->
    <div
      class="bg-white border border-gray-300 shadow-md rounded-lg h-96 mb-6 flex items-center justify-center hover:shadow-lg transition duration-300"
    >
      <h3 class="text-xl md:text-2xl font-bold text-gray-800">Detailed Insights</h3>
    </div>

    <!-- Secondary Grid Section -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        class="bg-white border border-gray-300 shadow-md rounded-lg h-48 md:h-72 hover:shadow-lg transition duration-300 flex items-center justify-center"
      >
        <h3 class="text-lg md:text-xl font-bold text-gray-800">Analytics</h3>
      </div>
      <div
        class="bg-white border border-gray-300 shadow-md rounded-lg h-48 md:h-72 hover:shadow-lg transition duration-300 flex items-center justify-center"
      >
        <h3 class="text-lg md:text-xl font-bold text-gray-800">Reports</h3>
      </div>
      <div
        class="bg-white border border-gray-300 shadow-md rounded-lg h-48 md:h-72 hover:shadow-lg transition duration-300 flex items-center justify-center"
      >
        <h3 class="text-lg md:text-xl font-bold text-gray-800">Notifications</h3>
      </div>
      <div
        class="bg-white border border-gray-300 shadow-md rounded-lg h-48 md:h-72 hover:shadow-lg transition duration-300 flex items-center justify-center"
      >
        <h3 class="text-lg md:text-xl font-bold text-gray-800">Messages</h3>
      </div>
    </div>
  </main>
</template>
