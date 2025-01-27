<template>
    <main class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div class="bg-white rounded-lg shadow-lg p-8 max-w-lg text-center">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">
          Thank You for Registering!
        </h1>
        <p class="text-gray-600 mb-6">
          You can now proceed to the treasurer's office. <br />
          You can also view your subjects by clicking the button below.
        </p>
        <div class="flex justify-center gap-4">
          <Button
            label="View Subjects"
            icon="pi pi-book"
            class="p-button-primary"
            @click="goToSubjects"
          />
        </div>
      </div>
    </main>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const goToSubjects = () => {
    router.push('/select/course'); // Update with the actual route
  };
  </script>
  
  <style scoped>
  main {
    font-family: 'Inter', sans-serif;
  }
  </style>
  
