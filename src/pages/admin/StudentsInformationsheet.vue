<script setup>
import TreeTable from 'primevue/treetable';
import Column from 'primevue/column';
</script>
<template>
    <main class="p-4 md:ml-64 h-auto pt-20 bg-red-800">
        <!-- <h1 class="text-center text-lg font-bold">STUDENTS INFORMATION SHEET</h1> -->
        <div class="flex flex-col bg-white">
                            <h1 class="text-center text-4xl font-bold border-b bg-gray-200 border-gray-200 p-5"> Student's Information Sheet</h1>
                                <div class="flex flex-col">
                                    <div class="flex justify-between">
                                        <input
                                            placeholder="ID Number:"
                                            class="w- p-2 border-b-2 border-red-800 bg-transparent outline-none focus:border-b-2 focus:border-red-600"
                                            type="text"
                                        />
                                        <input 
                                            placeholder="Date:"
                                            class="w- p-2 border-b-2 border-red-800 bg-transparent outline-none focus:border-b-2 focus:border-red-600"
                                            type="date"
                                        />
                                    </div>
                                    <div class="flex justify-between">
                                        <input
                                            placeholder="Last Name:"
                                            class="w- p-2 border-b-2 border-red-800 bg-transparent outline-none focus:border-b-2 focus:border-red-600"
                                            type="text"
                                        />
                                        <input 
                                            placeholder="First Name:"
                                            class="w-[300px] p-2 border-b-2 border-red-800 bg-transparent outline-none focus:border-b-2 focus:border-red-600"
                                            type="text"
                                        />
                                        <input
                                            placeholder="Middle Name:"
                                            class="w- p-2 border-b-2 border-red-800 bg-transparent outline-none focus:border-b-2 focus:border-red-600"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <div class="flex justify-between">
                                            <select id="underline_select" class="block py-2.5 px-0 w-[198px] text-sm border-0 border-b-2 appearance-none dark:text-gray-400 border-red-800 bg-transparent outline-none focus:border-b-2 focus:border-red-600 peer">
                                            <option selected>Term:</option>
                                            <option value="first">First</option>
                                            <option value="second">Second</option>
                                        </select>
                                        <select id="underline_select" class="block py-2.5 px-0 w-[200px] text-sm border-0 border-b-2 appearance-none dark:text-gray-400 border-red-800 bg-transparent outline-none focus:border-b-2 focus:border-red-600 peer">
                                            <option selected>S.Y:</option>
                                            <option value="US">2024-2025</option>
                                        </select>
                                        <select id="underline_select" class="block py-2.5 px-0 w-[200px] text-sm border-0 border-b-2 appearance-none dark:text-gray-400 border-red-800 bg-transparent outline-none focus:border-b-2 focus:border-red-600 peer">
                                            <option selected>Course:</option>
                                            <option value="US">BSBA FM</option>
                                            <option value="BA">BSBA MM</option>
                                            <option value="CA">BSED FILIPINO</option>
                                            <option value="FR">BSED MATH</option>
                                            <option value="DE">BSED ENGLISH</option> 
                                        </select>
                                        <select id="underline_select" class="block py-2.5 px-0 w-[197px] text-sm border-0 border-b-2 appearance-none dark:text-gray-400 border-red-800 bg-transparent outline-none focus:border-b-2 focus:border-red-600 peer">
                                            <option selected>Year Level:</option>
                                            <option value="US">First Year</option>
                                        </select>
                                    </div>
                                    </div>
                                        <div>
                                            <div class="flex justify-evenly">
                                            <input
                                                placeholder="Mobile Number:"
                                                class="w- p-2 border-b-2 border-red-800 bg-transparent outline-none focus:border-b-2 focus:border-red-600"
                                                type="text"
                                            />
                                            <input
                                                placeholder="Student Status:"
                                                class="w- p-2 border-b-2 border-red-800 bg-transparent outline-none focus:border-b-2 focus:border-red-600"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                </div>
        <div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-3">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Subject Code
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <div class="flex items-center">
                                    Descriptive Title
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <div class="flex items-center">
                                    Units
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <div class="flex items-center">
                                    Schedule
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <div class="flex items-center">
                                    Instructor
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <div class="flex items-center">
                                    Average
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                asd
                            </th>
                            <td class="px-6 py-4">
                                asd
                            </td>
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                asd
                            </td>
                            <td class="px-6 py-4">
                                asd
                            </td>
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                asd
                            </td>
                            <td class="px-6 py-4">
                                asd
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                asd
                            </th>
                            <td class="px-6 py-4">
                                asd
                            </td>
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                antialiased
                            </td>
                            <td class="px-6 py-4">
                                asd
                            </td>
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                asd
                            </td>
                            <td class="px-6 py-4">
                                asd
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                asd
                            </th>
                            <td class="px-6 py-4">
                               antialiasedasd
                            </td>
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                asd
                            </td>
                            <td class="px-6 py-4">
                                asd
                            </td>
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                asd
                            </td>
                            <td class="px-6 py-4">
                                asd
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                das
                            </th>
                            <td class="px-6 py-4">
                               asd
                            </td>
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                asd
                            </td>
                            <td class="px-6 py-4">
                                ads
                            </td>
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                asd
                            </td>
                            <td class="px-6 py-4">
                                asd
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                asd
                            </th>
                            <td class="px-6 py-4">
                                das
                            </td>
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                asd
                            </td>
                            <td class="px-6 py-4">
                                apps-dropdownasd
                            </td>
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                sad
                            </td>
                            <td class="px-6 py-4">
                                asd
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
                <div>
                    <div class="flex justify-evenly">
                    <input
                        placeholder="Total Units:"
                        class="w- p-2 border-b-2 border-red-800 bg-transparent outline-none focus:border-b-2 focus:border-red-600"
                        type="text"
                    />
                    </div>
                </div>
        </div>
                            </div>
    </main>
</template>