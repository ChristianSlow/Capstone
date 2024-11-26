<script setup>

import { ref } from 'vue';
</script>
<template>
    <main class="p-5">
        <!-- <div>
            <div class="flex justify-between">
                <input
                    placeholder="Last Name:"
                    class="w- p-2 border-b-2 border-yellow-400 bg-transparent outline-none focus:border-b-2 focus:border-yellow-600"
                    type="text"
                />
                <input 
                    placeholder="First Name:"
                    class="w-96 p-2 border-b-2 border-yellow-400 bg-transparent outline-none focus:border-b-2 focus:border-yellow-600"
                    type="text"
                />
                <input
                    placeholder="Middle Name:"
                    class="w- p-2 border-b-2 border-yellow-400 bg-transparent outline-none focus:border-b-2 focus:border-yellow-600"
                    type="text"
                />
            </div>
            <div>
                <div class="flex justify-between">
                <input
                    placeholder="Term:"
                    class="w- p-2 border-b-2 border-yellow-400 bg-transparent outline-none focus:border-b-2 focus:border-yellow-600"
                    type="text"
                />
                <input
                    placeholder="S.Y.:"
                    
                    class="w- p-2 border-b-2 border-yellow-400 bg-transparent outline-none focus:border-b-2 focus:border-yellow-600"
                    type="text"
                />
                <select id="underline_select" class="block py-2.5 px-0 w-[195px] text-sm border-0 border-b-2 appearance-none dark:text-gray-400 border-yellow-400 bg-transparent outline-none focus:border-b-2 focus:border-yellow-600 peer">
                    <option selected>Course:</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option> 
                </select>
                <select id="underline_select" class="block py-2.5 px-0 w-[195px] text-sm border-0 border-b-2 appearance-none dark:text-gray-400 border-yellow-400 bg-transparent outline-none focus:border-b-2 focus:border-yellow-600 peer">
                    <option selected>Year Level:</option>
                    <option value="US">First Year</option>
                </select>
            </div>
            </div>
                <div>
                    <div class="flex justify-evenly">
                    <input
                        placeholder="Mobile Number:"
                        class="w- p-2 border-b-2 border-yellow-400 bg-transparent outline-none focus:border-b-2 focus:border-yellow-600"
                        type="text"
                    />
                    <input
                        placeholder="Student Status:"
                        class="w- p-2 border-b-2 border-yellow-400 bg-transparent outline-none focus:border-b-2 focus:border-yellow-600"
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
                        class="w-[100px] p-2 border-b-2 border-yellow-400 bg-transparent outline-none focus:border-b-2 focus:border-yellow-600"
                        type="text"
                    />
                    </div>
                </div>
        </div> -->
        <div class="card flex justify-center">
            <Stepper value="1" linear class="basis-[100rem]">
                <StepList>
                    <Step value="1">Registrar's Copy</Step>
                    <Step value="2">Student's Information Sheet</Step>
                    <Step value="3">Treasurer's Copy</Step>
                    <Step value="4">Student's Copy</Step>
                </StepList>
                <StepPanels>
                    <StepPanel v-slot="{ activateCallback }" value="1">
                        <div class="flex flex-col">
                            <div class=" border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto items-center font-medium">
                                <h1 class="text-center text-2xl font-bold p-5"> Student's Information Sheet</h1>
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
                                            type="text"
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
                                        <input
                                            placeholder="Term:"
                                            class="w- p-2 border-b-2 border-red-800 bg-transparent outline-none focus:border-b-2 focus:border-red-600"
                                            type="text"
                                        />
                                        <input
                                            placeholder="S.Y.:"
                                            
                                            class="w- p-2 border-b-2 border-red-800 bg-transparent outline-none focus:border-b-2 focus:border-red-600"
                                            type="text"
                                        />
                                        <select id="underline_select" class="block py-2.5 px-0 w-[210px] text-sm border-0 border-b-2 appearance-none dark:text-gray-400 border-red-800 bg-transparent outline-none focus:border-b-2 focus:border-red-600 peer">
                                            <option selected>Course:</option>
                                            <option value="US">BSBA</option>
                                            <option value="CA">BSED</option>
                                            <option value="FR">BSIT</option>
                                            <option value="DE">BSSC</option> 
                                        </select>
                                        <select id="underline_select" class="block py-2.5 px-0 w-[210px] text-sm border-0 border-b-2 appearance-none dark:text-gray-400 border-red-800 bg-transparent outline-none focus:border-b-2 focus:border-red-600 peer">
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
                            
                        </div>
                        <div class="flex pt-6 justify-end items-end">
                            <Button label="Next" icon="pi pi-arrow-right" @click="activateCallback('2')" />
                        </div>
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="2">
                        <div class="flex flex-col">
                            <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto   items-center">
                                <h1 class="text-center text-2xl font-bold p-5"> Student's Information Sheet</h1>
                                <div class="card flex flex-wrap justify-evenly  gap-4">      
                                    <form>
                                        <div class="grid gap-10 mb-6 md:grid-cols-3"> 
                                            <div>
                                                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name:</label>
                                                <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                            </div>
                                            <div>
                                                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name:</label>
                                                <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                            </div>
                                            <div>
                                                <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Middle Name:</label>
                                                <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="card flex flex-wrap p-1 justify-left  gap-4">      
                                    <form>
                                        <div class="grid gap-10 mb-6 md:grid-cols-4"> 
                                            <div>
                                                <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of
                                                Birth:</label>
                                                <input type="text" id="date_of_birth" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[290px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                            </div>  
                                            <div>
                                                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sex:</label>
                                                <input type="text" id="sex" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[290px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                            </div>
                                            <div>
                                                <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Civil Status:</label>
                                                <input type="url" id="website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[290px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                            </div>
                                            <div>
                                                <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile No.:</label>
                                                <input type="tel" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[290px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="card flex flex-wrap p-1 justify-left  gap-1">      
                                    <form>
                                        <div class="grid gap-10 mb-6 md:grid-cols-1"> 
                                            <div>
                                                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Place of Birth:</label>
                                                <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[1280px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                            </div>
                                        </div>
                                    </form>
                                </div> 
                                <div class="card flex flex-wrap p-1 justify-left  gap-4">      
                                    <form>
                                        <div class="grid gap-10 mb-6 md:grid-cols-2"> 
                                            <div>
                                                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Parent's Name / Guardian's Name:</label>
                                                <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                            </div>
                                            <div>
                                                <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tel / Cell No.:</label>
                                                <input type="tel" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[290px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                                            </div>
                                        </div>
                                    </form>
                                </div>    
                                <div class="card flex flex-wrap justify-left p-1  gap-4">      
                                    <form>
                                        <div class="grid gap-10 mb-6 md:grid-cols-1"> 
                                            <div>
                                                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Home Address:</label>
                                                <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[1280px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                                            </div>
                                        </div>
                                    </form>
                                </div>                            
                            </div>
                        </div>
                        <div class="flex pt-6 justify-between">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('1')" />
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('3')" />
                        </div>
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="3">
                        <div class="flex flex-col">
                            <div class=" border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto items-center font-medium">
                                <h1 class="text-center text-2xl font-bold p-5"> Treasurer's Copy</h1>
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
                                            type="text"
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
                                        <input
                                            placeholder="Term:"
                                            class="w- p-2 border-b-2 border-red-800 bg-transparent outline-none focus:border-b-2 focus:border-red-600"
                                            type="text"
                                        />
                                        <input
                                            placeholder="S.Y.:"
                                            
                                            class="w- p-2 border-b-2 border-red-800 bg-transparent outline-none focus:border-b-2 focus:border-red-600"
                                            type="text"
                                        />
                                        <select id="underline_select" class="block py-2.5 px-0 w-[210px] text-sm border-0 border-b-2 appearance-none dark:text-gray-400 border-red-800 bg-transparent outline-none focus:border-b-2 focus:border-red-600 peer">
                                            <option selected>Course:</option>
                                            <option value="US">BSBA</option>
                                            <option value="CA">BSED</option>
                                            <option value="FR">BSIT</option>
                                            <option value="DE">BSSC</option> 
                                        </select>
                                        <select id="underline_select" class="block py-2.5 px-0 w-[210px] text-sm border-0 border-b-2 appearance-none dark:text-gray-400 border-red-800 bg-transparent outline-none focus:border-b-2 focus:border-red-600 peer">
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
                                    Lec
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <div class="flex items-center">
                                    Lab
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <div class="flex items-center">
                                    Total
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
                            
                        </div>
                        <div class="flex pt-6 justify-between">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('2')" />
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('4')" />
                        </div>
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="4">
                        <div class="flex flex-col">
                            <div class=" border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto items-center font-medium">
                                <h1 class="text-center text-2xl font-bold p-5"> Student's Copy</h1>
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
                                            type="text"
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
                                        <input
                                            placeholder="Term:"
                                            class="w- p-2 border-b-2 border-red-800 bg-transparent outline-none focus:border-b-2 focus:border-red-600"
                                            type="text"
                                        />
                                        <input
                                            placeholder="S.Y.:"
                                            
                                            class="w- p-2 border-b-2 border-red-800 bg-transparent outline-none focus:border-b-2 focus:border-red-600"
                                            type="text"
                                        />
                                        <select id="underline_select" class="block py-2.5 px-0 w-[210px] text-sm border-0 border-b-2 appearance-none dark:text-gray-400 border-red-800 bg-transparent outline-none focus:border-b-2 focus:border-red-600 peer">
                                            <option selected>Course:</option>
                                            <option value="US">BSBA</option>
                                            <option value="CA">BSED</option>
                                            <option value="FR">BSIT</option>
                                            <option value="DE">BSSC</option> 
                                        </select>
                                        <select id="underline_select" class="block py-2.5 px-0 w-[210px] text-sm border-0 border-b-2 appearance-none dark:text-gray-400 border-red-800 bg-transparent outline-none focus:border-b-2 focus:border-red-600 peer">
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
                                    Room Number
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
                            
                        </div>
                        <div class="flex pt-6 justify-between">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('3')" />
                            <Button label="Submit" icon="pi pi-arrow-right" iconPos="right" @click="console.log('successfully registered')"/>
                        </div>
                    </StepPanel>
                </StepPanels>
            </Stepper>
        </div>

    </main>
</template>
