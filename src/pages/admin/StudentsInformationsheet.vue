<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const route = useRoute();
const router = useRouter();

const info = ref({
    fname: '',
    mname: '',
    lname: '',
    gender: '',
    dateofbirth: '',
    civilstatus: '',
    mobileno: '',
    pofbirth: '',
    email: '',
    cellno: '',
    address: '',
    parents: '',
    selectedCourse: '',
    major: '',
    sem: '',
    year: '',
});

const isLoading = ref(true);

// Fetch student details
const getStudentDetails = async () => {
    isLoading.value = true;
    try {
        const docRef = doc(db, 'StudentInformation', route.params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            info.value = { id: docSnap.id, ...docSnap.data() };
        } else {
            console.error('No student found');
        }
    } catch (error) {
        console.error('Error fetching student details:', error);
    }
    isLoading.value = false;
};

onMounted(() => {
    getStudentDetails();
});
</script>

<template>
  <main class="p-4 md:ml-64 h-auto pt-20 bg-gray-100 flex justify-center">
    <div class="bg-white shadow-lg rounded-xl overflow-hidden p-10 max-w-5xl w-full">
      <h1 class="text-center text-4xl font-bold text-gray-800 mb-8">
        Student Profile
      </h1>

      <!-- Loading Indicator -->
      <div v-if="isLoading" class="text-center py-8">
        <i class="pi pi-spin pi-spinner text-5xl text-gray-600"></i>
        <p class="text-gray-600 mt-3 text-lg">Fetching student details...</p>
      </div>

      <!-- Student Details -->
      <div v-if="info && !isLoading" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="info-card">
            <p class="label">Full Name</p>
            <p class="value">{{ info.fname }} {{ info.mname }} {{ info.lname }}</p>
          </div>

          <div class="info-card">
            <p class="label">Gender</p>
            <p class="value">{{ info.gender.name }}</p>
          </div>

          <div class="info-card">
            <p class="label">Year</p>
            <p class="value">{{ info.year.name }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="info-card">
            <p class="label">Date of Birth</p>
            <p class="value">{{ info.dateofbirth }}</p>
          </div>

          <div class="info-card">
            <p class="label">Place of Birth</p>
            <p class="value">{{ info.pofbirth }}</p>
          </div>

          <div class="info-card">
            <p class="label">Civil Status</p>
            <p class="value">{{ info.civilstatus.name }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="info-card">
            <p class="label">Mobile No.</p>
            <p class="value">{{ info.mobileno }}</p>
          </div>
          
          <div class="info-card">
            <p class="label">Email</p>
            <p class="value">{{ info.email }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="info-card">
            <p class="label">Course</p>
            <p class="value">{{ info.selectedCourse }}</p>
          </div>
          
          <div class="info-card">
            <p class="label">Major</p>
            <p class="value">{{ info.major }}</p>
          </div>
          
          <div class="info-card">
            <p class="label">Semester</p>
            <p class="value">{{ info.sem.name }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="info-card">
            <p class="label">Address</p>
            <p class="value">{{ info.address }}</p>
          </div>
          
          <div class="info-card">
            <p class="label">Parents</p>
            <p class="value">{{ info.parents }}</p>
          </div>

          <div class="info-card">
            <p class="label">Contact Number</p>
            <p class="value">{{ info.cellno }}</p>
          </div>
        </div>
      </div>

      <!-- Back Button -->
      <div class="mt-8 flex justify-center">
        <button
          @click="router.push('/admin/students')"
          class="back-btn"
        >
          <i class="pi pi-arrow-left mr-2"></i> Back to List
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* === General Styling === */
.info-card {
  background: white;
  padding: 16px;
  border-radius: 12px;
  transition: all 0.3s ease-in-out;
  border: 1px solid #e5e7eb;
  text-align: center;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.06);
}

.info-card:hover {
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
}

.label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.value {
  font-size: 1.3rem;
  font-weight: 700;
  color: #111827;
  margin-top: 5px;
}

/* === Back Button === */
.back-btn {
  background-color: #374151;
  color: white;
  padding: 14px 28px;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  transition: all 0.3s ease-in-out;
}

.back-btn:hover {
  background-color: #1f2937;
  transform: scale(1.07);
}

</style>
