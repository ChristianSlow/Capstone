<template>
  <main class="p-6 md:ml-64 h-auto pt-20 bg-gray-100">
    <!-- Grid Section for Main Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <!-- Card 1 -->
      <div
        class="bg-white border border-gray-300 shadow-md rounded-lg h-32 md:h-64 flex items-center justify-center hover:shadow-lg transition duration-300"
      >
        <div class="text-center">
          <h3 class="text-xl md:text-3xl font-bold text-gray-800">List of Courses</h3>
          <p class="text-sm text-gray-500 mt-2">View all the available courses</p>
        </div>
      </div>
      <!-- Card 2 -->
      <div
        class="bg-white border border-gray-300 shadow-md rounded-lg h-32 md:h-64 flex items-center justify-center hover:shadow-lg transition duration-300"
      >
        <div class="text-center">
          <h3 class="text-xl md:text-3xl font-bold text-gray-800">Available Courses</h3>
          <p class="text-sm text-gray-500 mt-2">Browse courses for enrollment</p>
        </div>
      </div>
      <!-- Card 3 -->
      <div
        class="bg-white border border-gray-300 shadow-md rounded-lg h-32 md:h-64 flex items-center justify-center hover:shadow-lg transition duration-300"
      >
        <div class="text-center">
          <h3 class="text-xl md:text-3xl font-bold text-gray-800">Students Enrolled</h3>
          <p class="text-sm text-gray-500 mt-2">See the total number of students</p>
        </div>
      </div>
      <!-- Card 4 -->
      <div
        class="bg-white border border-gray-300 shadow-md rounded-lg h-32 md:h-64 flex items-center justify-center hover:shadow-lg transition duration-300"
      >
        <div class="text-center">
          <h3 class="text-xl md:text-3xl font-bold text-gray-800">Students Pending</h3>
          <p class="text-sm text-gray-500 mt-2">Follow up on pending enrollments</p>
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
