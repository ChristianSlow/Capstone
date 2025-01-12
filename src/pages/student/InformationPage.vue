<script setup>
import { computed, ref } from 'vue';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../firebase';

const info = ref({
    fname: 'roland',
    mname: 'yess',
    lname: 'njoo',
    gender: '',
    dateofbirth: '',
    password: '',
    gender: '',
    mobileno:'',
    pofbirth: '',
    email: '',
    cellno:'',
    address: '',
    parents:'',
    selectedCourse: ''
})

const submit = () => {
    addDoc(collection(db, "StudentInformation"), info.value)
}

const dropdownItems = ref([
    { name: 'Male', code: 'Male' },
    { name: 'Female', code: 'Female' },
]);
const dropdownItemss = ref([
    { name: 'Single', code: 'Single' },
    { name: 'Married', code: 'Married' },
    { name: 'Divorced', code: 'Divorced' },
    { name: 'Widowed', code: 'Widowed' },
    { name: 'Separated', code: 'Separated' },
    { name: 'Civil Partnership', code: 'Civil Partnership' },
]);
const courses = ref([
    { 
        name: 'College of Teacher Education', 
        major: [
            { name: 'Batchelor of Elementary Education' },
            { name: 'Batchelor of Secondary Education' },
            { name: 'Major in English' },
            { name: 'Major in Filipino' },
            { name: 'Major in Mathematics' },
        ]
    },
    { 
        name: 'College of Business Administation', 
        major: [
            { name: 'Financial Management' },
            { name: 'Marketing Management' },
        ]
    },

]);

const filteredMajor = computed(() => {
    const selectedCourse = info.value.selectedCourse;
    const course = courses.value.find(course => course.name === selectedCourse);
    return course.major
})


</script>

<template>
    <Fluid class="flex justify-center bg-gray-200 p-2">
        <!-- <div class="flex flex-col md:flex-row gap-8">
            <div class="md:w-1/2">
                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Vertical</div>
                    <div class="flex flex-col gap-2">
                        <label for="name1">Name</label>
                        <InputText id="name1" type="text" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="email1">Email</label>
                        <InputText id="email1" type="text" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="age1">Age</label>
                        <InputText id="age1" type="text" />
                    </div>
                </div>

                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Vertical Grid</div>
                    <div class="flex flex-wrap gap-4">
                        <div class="flex flex-col grow basis-0 gap-2">
                            <label for="name2">Name</label>
                            <InputText id="name2" type="text" />
                        </div>
                        <div class="flex flex-col grow basis-0 gap-2">
                            <label for="email2">Email</label>
                            <InputText id="email2" type="text" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="md:w-1/2">
                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Horizontal</div>
                    <div class="grid grid-cols-12 gap-2">
                        <label for="name3" class="flex items-center col-span-12 mb-2 md:col-span-2 md:mb-0">Name</label>
                        <div class="col-span-12 md:col-span-10">
                            <InputText id="name3" type="text" />
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-2">
                        <label for="email3" class="flex items-center col-span-12 mb-2 md:col-span-2 md:mb-0">Email</label>
                        <div class="col-span-12 md:col-span-10">
                            <InputText id="email3" type="text" />
                        </div>
                    </div>
                </div>

                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Inline</div>
                    <div class="flex flex-wrap items-start gap-4">
                        <div class="field">
                            <label for="firstname1" class="sr-only">Firstname</label>
                            <InputText id="firstname1" type="text" placeholder="Firstname" />
                        </div>
                        <div class="field">
                            <label for="lastname1" class="sr-only">Lastname</label>
                            <InputText id="lastname1" type="text" placeholder="Lastname" />
                        </div>
                        <Button label="Submit" :fluid="false"></Button>
                    </div>
                </div>
                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Help Text</div>
                    <div class="flex flex-wrap gap-2">
                        <label for="username">Username</label>
                        <InputText id="username" type="text" />
                        <small>Enter your username to reset your password.</small>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="flex mt-8">
            <div class="card flex flex-col gap-4 w-full">
                <div class="justify-center flex items-center">
                    <img src="/tlogo.png" width="100px" height="150px" alt="tlogo">
                </div>
                    <div clas="flex justify-center items-center">
                    <h1 class="text-2xl text-center font-semibold text-red-800">TAÑON COLLEGE</h1>
                    </div>
                <!-- <div class="justify-center items-center w-48 h-48">
                    <img src="/tlogo.png" alt="tlogo">
                </div>
                <div class="font-semibold text-4xl text-center">TAÑON COLLEGE</div> -->
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="firstname2">First Name</label>
                        <InputText v-model="info.fname" id="firstname2" type="text" />
                    </div>
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="lastname2">Middle Name</label>
                        <InputText v-model="info.mname" id="lastname2" type="text" />
                    </div>
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="lastname2">Last Name</label>
                        <InputText v-model="info.lname" id="lastname2" type="text" />
                    </div>
                </div>
                <!-- <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex flex-wrap gap-2 w-full">
                       <label for="lastname2">Email</label>
                       <InputText id="lastname2" type="text" />
                    </div>
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="firstname2">Username</label>
                        <InputText id="firstname2" type="text" />
                    </div>
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="lastname2">Password</label>
                        <InputText id="lastname2" type="text" />
                    </div>
                </div> -->
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="date">Date of Birth</label>
                        <InputText v-model="info.dateofbirth" id="date" type="date" />
                    </div>
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="lastname2">Sex</label>
                        <Select id="ses" v-model="info.gender" :options="dropdownItems" optionLabel="name" placeholder="Select Sex" class="w-full"></Select>
                    </div>
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="lastname2">Civil Status</label>
                        <Select id="civilstatus" v-model="dropdownItem" :options="dropdownItemss" optionLabel="name" placeholder="Select Status" class="w-full"></Select>
                    </div>
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="lastname2">Mobile No.</label>
                        <InputText id="mobileno" v-model="info.mobileno" type="number" />
                    </div>
                </div>
                <div class="flex flex-wrap">
                    <label for="address">Place of Birth</label>
                    <Textarea id="placeofbirth" v-model="info.pofbirth" rows="1" />
                </div>
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="firstname2">Parents/Guardian Name</label>
                        <InputText id="parents" v-model="info.parents" type="text" />
                    </div>
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="lastname2">Tel / Cell No.</label>
                        <InputText id="cellno" v-model="info.cellno" type="number" />
                    </div>
                </div>
                <div class="flex flex-wrap">
                    <label for="address">Home Address</label>
                    <Textarea id="home address" v-model="info.address" rows="1" />
                </div>
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="state">Course</label>
                        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="info.selectedCourse">
                            <option v-for="course in courses" :value="course.name">{{ course.name }}</option>
                        </select>
                    </div>
                    <div class="flex flex-wrap gap-2 w-full" v-if="info.selectedCourse">
                        <label for="state">Major</label>
                        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="v">
                            <option v-for="major in filteredMajor" :value="major.name">{{ major.name }}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <Button @click="submit" label="Submit" severity="danger" raised />
                </div>
            </div>
        </div>
    </Fluid>
</template>
