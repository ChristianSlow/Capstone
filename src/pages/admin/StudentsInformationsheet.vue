<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore"; 
import { db } from '../../firebase';


</script>
<template>
    <main class="p-6 md:ml-64 h-auto pt-20 bg-gray-100">
      <!-- Title Section -->
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <h1 class="text-center text-4xl font-bold bg-gray-200 text-gray-800 p-5 border-b border-gray-300">
          Student's Information Sheet
        </h1>
  
        <!-- Form Section -->
        <div class="p-6 space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              placeholder="ID Number"
              class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              type="text"
            />
            <input
              placeholder="Date"
              class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              type="date"
            />
          </div>
  
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <input
              placeholder="Last Name"
              class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              type="text"
            />
            <input
              placeholder="First Name"
              class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              type="text"
            />
            <input
              placeholder="Middle Name"
              class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              type="text"
            />
          </div>
  
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <select
              class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option selected>Term</option>
              <option value="first">First</option>
              <option value="second">Second</option>
            </select>
            <select
              class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option selected>S.Y.</option>
              <option value="2024-2025">2024-2025</option>
            </select>
            <select
              class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option selected>Course</option>
              <option value="BSBA FM">BSBA FM</option>
              <option value="BSBA MM">BSBA MM</option>
              <option value="BSED FILIPINO">BSED FILIPINO</option>
              <option value="BSED MATH">BSED MATH</option>
              <option value="BSED ENGLISH">BSED ENGLISH</option>
            </select>
            <select
              class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option selected>Year Level</option>
              <option value="First Year">First Year</option>
            </select>
          </div>
  
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              placeholder="Mobile Number"
              class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              type="text"
            />
            <input
              placeholder="Student Status"
              class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              type="text"
            />
          </div>
        </div>
      </div>
  
      <!-- Table Section -->
      <div class="mt-6 bg-white shadow-md rounded-lg p-6">
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-700 border border-gray-300">
            <thead class="bg-gray-100 text-gray-800 uppercase text-xs font-bold border-b">
              <tr>
                <th class="px-4 py-3">Subject Code</th>
                <th class="px-4 py-3">Descriptive Title</th>
                <th class="px-4 py-3">Units</th>
                <th class="px-4 py-3">Schedule</th>
                <th class="px-4 py-3">Instructor</th>
                <th class="px-4 py-3">Average</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b hover:bg-gray-50">
                <td class="px-4 py-3">ABC123</td>
                <td class="px-4 py-3">Mathematics</td>
                <td class="px-4 py-3">3</td>
                <td class="px-4 py-3">MWF 9:00-10:00 AM</td>
                <td class="px-4 py-3">Dr. Smith</td>
                <td class="px-4 py-3">89</td>
              </tr>
              <tr class="border-b hover:bg-gray-50">
                <td class="px-4 py-3">DEF456</td>
                <td class="px-4 py-3">Science</td>
                <td class="px-4 py-3">3</td>
                <td class="px-4 py-3">TTh 11:00-12:30 PM</td>
                <td class="px-4 py-3">Ms. Doe</td>
                <td class="px-4 py-3">92</td>
              </tr>
              <!-- Repeat rows as necessary -->
            </tbody>
          </table>
        </div>
  
        <div class="mt-4 flex justify-end">
          <input
            placeholder="Total Units"
            class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            type="text"
          />
        </div>
      </div>
    </main>
  </template>
  