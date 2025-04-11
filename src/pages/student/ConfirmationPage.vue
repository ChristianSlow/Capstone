<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// Get course and major from URL parameters
const selectedCourse = route.query.course;
const selectedMajor = route.query.major;

const goToSubjects = () => {
  router.push({
    path: '/designatedsub',
    query: { course: selectedCourse, major: selectedMajor },
  });
};
</script>

<template>
  <main class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-lg text-center">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">
        Thank You for Registering!
      </h1>
      <p class="text-gray-600 mb-6">
        Just wait for a while, we will send you an update through email. If you cannot see the message in the inbox, it might be in the spam. <br />
        You can also view your possible subjects by clicking the button below.
      </p>
      <div class="flex justify-center gap-4">
        <button @click="goToSubjects" class="bg-blue-500 text-white px-4 py-2 rounded-lg">
          View Subjects
        </button>
      </div>
    </div>
  </main>
</template>
