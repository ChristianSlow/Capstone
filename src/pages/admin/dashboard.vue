<script setup>
import { ref, onMounted, nextTick } from "vue";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ChartBarIcon, UserGroupIcon, AcademicCapIcon, XCircleIcon } from '@heroicons/vue/outline';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const courses = ref([]);
const students = ref(0);
const deniedStudents = ref(0);
const totalStudents = ref(0);
const acceptanceRate = ref(0);
const denialRate = ref(0);
let chartInstance = null;

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
    totalStudents.value = acceptedCount + deniedCount;

    acceptanceRate.value = totalStudents.value > 0 ? ((acceptedCount / totalStudents.value) * 100).toFixed(2) : 0;
    denialRate.value = totalStudents.value > 0 ? ((deniedCount / totalStudents.value) * 100).toFixed(2) : 0;

    await nextTick();
    renderChart();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const renderChart = () => {
  const ctx = document.getElementById("enrollmentChart");

  if (chartInstance) {
    chartInstance.destroy();
  }

  if (ctx) {
    chartInstance = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Accepted", "Denied"],
        datasets: [
          {
            data: [students.value, deniedStudents.value],
            backgroundColor: ["#10B981", "#EF4444"],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              font: {
                size: 14,
              },
              color: "#374151",
            },
          },
          title: {
            display: true,
            text: "Enrollment Statistics",
            font: {
              size: 18,
              weight: "bold",
            },
            color: "#1F2937",
            padding: 20,
          },
        },
      },
    });
  }
};

onMounted(fetchData);
</script>

<template>
  <main class="p-6 md:ml-64 min-h-screen pt-20 bg-gray-50">
    <h1 class="text-4xl font-bold text-gray-800 mb-6">Dashboard</h1>

    <!-- Grid Section for Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <div class="bg-white shadow-md rounded-xl p-6 flex items-center space-x-4 border-t-4 border-blue-500 transition-all hover:shadow-lg hover:-translate-y-1">
        <AcademicCapIcon class="h-14 w-14 text-blue-500" />
        <div>
          <h3 class="text-xl font-semibold text-gray-700">Total Courses</h3>
          <p class="text-gray-500 text-2xl font-medium">{{ courses.length }}</p>
        </div>
      </div>

      <div class="bg-white shadow-md rounded-xl p-6 flex items-center space-x-4 border-t-4 border-green-500 transition-all hover:shadow-lg hover:-translate-y-1">
        <UserGroupIcon class="h-14 w-14 text-green-500" />
        <div>
          <h3 class="text-xl font-semibold text-gray-700">Registered Students</h3>
          <p class="text-gray-500 text-2xl font-medium">{{ students }}</p>
        </div>
      </div>

      <div class="bg-white shadow-md rounded-xl p-6 flex items-center space-x-4 border-t-4 border-red-500 transition-all hover:shadow-lg hover:-translate-y-1">
        <XCircleIcon class="h-14 w-14 text-red-500" />
        <div>
          <h3 class="text-xl font-semibold text-gray-700">Denied Students</h3>
          <p class="text-gray-500 text-2xl font-medium">{{ deniedStudents }}</p>
        </div>
      </div>

      <div class="bg-white shadow-md rounded-xl p-6 flex items-center space-x-4 border-t-4 border-cyan-500 transition-all hover:shadow-lg hover:-translate-y-1">
        <UserGroupIcon class="h-14 w-14 text-cyan-500" />
        <div>
          <h3 class="text-xl font-semibold text-gray-700">Total Students</h3>
          <p class="text-gray-500 text-2xl font-medium">{{ totalStudents }}</p>
        </div>
      </div>
    </div>

    <!-- Insights Section -->
    <div class="bg-white shadow-lg rounded-xl p-8 border-t-4 border-indigo-500">
      <h2 class="text-3xl font-semibold text-center text-gray-700 mb-6">Detailed Insights</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white shadow-md rounded-xl p-6 border-t-4 border-green-500">
          <h3 class="text-2xl font-semibold text-gray-700">Student Statistics</h3>
          <p class="text-gray-500 mt-3 text-lg">Total Students: <span class="font-semibold text-gray-900">{{ totalStudents }}</span></p>
          <p class="text-gray-500 text-lg">Acceptance Rate: <span class="font-semibold text-green-600">{{ acceptanceRate }}%</span></p>
          <p class="text-gray-500 text-lg">Denial Rate: <span class="font-semibold text-red-600">{{ denialRate }}%</span></p>
        </div>

        <div class="bg-white shadow-md rounded-xl p-6 border-t-4 border-green-500">
          <h3 class="text-2xl font-semibold text-gray-700 mb-3">Enrollment Trends</h3>
          <div class="relative w-full h-72">
            <canvas id="enrollmentChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
