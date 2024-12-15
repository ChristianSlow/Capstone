<script setup>
import { ref } from 'vue';



const info = ref({
    fname: '',
    mname: '',
    lname: '',
    gender: '',
    dateofbirth: '',
    password: ''
})


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
const course = ref([
    { name: 'College of Teacher Education', code: 'Education' },
    { name: 'College of Business Administation', code: 'Business' },

]);
const major = ref([
    { name: 'Financial Management', code: 'FM' },
    { name: 'Marketing Management', code: 'MM' },
    { name: 'Batchelor of Elementary Education', code: 'BEED' },
    { name: 'Batchelor of Secondary Education', code: 'BSED' },
    { name: 'Major in English', code: 'English' },
    { name: 'Major in Filipino', code: 'Filipino' },
    { name: 'Major in Mathematics', code: 'Matemathics' },
]);
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
                        <InputText id="mobileno" type="number" />
                    </div>
                </div>
                <div class="flex flex-wrap">
                    <label for="address">Place of Birth</label>
                    <Textarea id="placeofbirth" rows="1" />
                </div>
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="firstname2">Parents/Guardian Name</label>
                        <InputText id="parents" type="text" />
                    </div>
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="lastname2">Tel / Cell No.</label>
                        <InputText id="cellno   " type="number" />
                    </div>
                </div>
                <div class="flex flex-wrap">
                    <label for="address">Home Address</label>
                    <Textarea id="placeofbirth" rows="1" />
                </div>
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="state">Course</label>
                        <Select id="state" v-model="dropdownItem" :options="course" optionLabel="name" placeholder="Select Course" class="w-full"></Select>
                    </div>
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="state">Major</label>
                        <Select id="state" v-model="dropdownItem" :options="major" optionLabel="name" placeholder="Select Major" class="w-full"></Select>
                    </div>
                </div>
                <div>
                    <Button label="Submit" severity="danger" raised />
                </div>
            </div>
        </div>
    </Fluid>
</template>
