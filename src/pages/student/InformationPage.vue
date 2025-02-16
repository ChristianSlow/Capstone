<script setup>
import { computed, onMounted, ref } from 'vue';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../firebase';
import { useRouter } from 'vue-router';

const info = ref({
    fname: '',
    mname: '',
    lname: '',
    gender: '',
    dateofbirth: '',
    civilstatus: '',
    password: '',
    mobileno: '',
    pofbirth: '',
    email: '',
    cellno: '',
    address: '',
    parents: '',
    selectedCourse: '',
    major: '',
});

const router = useRouter();
const courses = ref([]);
const userId = ref(null);
const isLoading = ref(false);

/** ✅ Fetch Courses from Firestore */
const getData = async () => {
    courses.value = [];
    isLoading.value = true;

    try {
        const querySnapshot = await getDocs(collection(db, 'Courses'));
        querySnapshot.forEach((doc) => {
            courses.value.push({ id: doc.id, ...doc.data() });
        });

        console.log("✅ Courses loaded:", courses.value);
    } catch (error) {
        console.error("❌ Error fetching courses:", error);
    }

    isLoading.value = false;
};

/** ✅ Ensure userId is set before fetching courses */
onMounted(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            userId.value = user.uid;
            console.log("✅ Authenticated User ID:", userId.value);
            getData();
        } else {
            console.warn("❌ No user logged in");
        }
    });
});

/** ✅ Submit Student Information */
const submit = async () => {
    if (!userId.value) {
        console.error('❌ User not logged in. Cannot save data.');
        return;
    }

    try {
        await setDoc(doc(db, 'StudentInformation', userId.value), info.value);
        console.log('✅ Document successfully written!');
        router.push('/confirmationpage');
    } catch (error) {
        console.error('❌ Error adding document: ', error);
    }
};

/** ✅ Gender Dropdown */
const dropdownItems = ref([
    { name: 'Male', code: 'Male' },
    { name: 'Female', code: 'Female' },
]);

/** ✅ Civil Status Dropdown */
const dropdownItemss = ref([
    { name: 'Single', code: 'Single' },
    { name: 'Married', code: 'Married' },
    { name: 'Divorced', code: 'Divorced' },
    { name: 'Widowed', code: 'Widowed' },
    { name: 'Separated', code: 'Separated' },
    { name: 'Civil Partnership', code: 'Civil Partnership' },
]);

/** ✅ Filter Majors Based on Selected Course */
const filteredMajor = computed(() => {
    const selectedCourse = info.value.selectedCourse;
    const course = courses.value.find((course) => course.course === selectedCourse);
    return course ? course.majors : [];
});
</script>

<template>
	<Fluid class="flex justify-center bg-gray-200 p-2">
		<div class="flex mt-8">
			<div class="card flex flex-col gap-4 w-full">
				<div class="justify-center flex items-center">
					<img src="/tlogo.png" width="100px" height="150px" alt="tlogo" />
				</div>
				<div class="flex justify-center items-center">
					<h1 class="text-2xl text-center font-semibold text-red-800">
						TAÑON COLLEGE
					</h1>
				</div>

				<!-- Student Information -->
				<div class="flex flex-col md:flex-row gap-4">
					<div class="flex flex-wrap gap-2 w-full">
						<label for="firstname">First Name</label>
						<InputText v-model="info.fname" id="firstname" type="text" />
					</div>
					<div class="flex flex-wrap gap-2 w-full">
						<label for="middlename">Middle Name</label>
						<InputText v-model="info.mname" id="middlename" type="text" />
					</div>
					<div class="flex flex-wrap gap-2 w-full">
						<label for="lastname">Last Name</label>
						<InputText v-model="info.lname" id="lastname" type="text" />
					</div>
				</div>

				<div class="flex flex-col md:flex-row gap-4">
					<div class="flex flex-wrap gap-2 w-full">
						<label for="date">Date of Birth</label>
						<InputText v-model="info.dateofbirth" id="date" type="date" />
					</div>
					<div class="flex flex-wrap gap-2 w-full">
						<label for="sex">Sex</label>
						<Dropdown
							id="sex"
							v-model="info.gender"
							:options="dropdownItems"
							optionLabel="name"
							placeholder="Select Sex"
							class="w-full"
						/>
					</div>
					<div class="flex flex-wrap gap-2 w-full">
						<label for="civilstatus">Civil Status</label>
						<Dropdown
							id="civilstatus"
							v-model="info.civilstatus"
							:options="dropdownItemss"
							optionLabel="name"
							placeholder="Select Status"
							class="w-full"
						/>
					</div>
				</div>

				<div class="flex flex-wrap">
					<label for="placeofbirth">Place of Birth</label>
					<Textarea id="placeofbirth" v-model="info.pofbirth" rows="1" />
				</div>

				<!-- Contact Information -->
				<div class="flex flex-col md:flex-row gap-4">
					<div class="flex flex-wrap gap-2 w-full">
						<label for="mobileno">Mobile No.</label>
						<InputText id="mobileno" v-model="info.mobileno" type="number" />
					</div>
					<div class="flex flex-wrap gap-2 w-full">
						<label for="parents">Parents/Guardian Name</label>
						<InputText id="parents" v-model="info.parents" type="text" />
					</div>
					<div class="flex flex-wrap gap-2 w-full">
						<label for="cellno">Tel / Cell No.</label>
						<InputText id="cellno" v-model="info.cellno" type="number" />
					</div>
				</div>

				<div class="flex flex-wrap">
					<label for="address">Home Address</label>
					<Textarea id="address" v-model="info.address" rows="1" />
				</div>

				<!-- Course and Major Selection -->
				<div class="flex flex-col md:flex-row gap-4">
					<div class="flex flex-wrap gap-2 w-full">
						<label for="course">Course</label>
						<select v-model="info.selectedCourse" class="w-full p-2 border rounded">
							<option v-for="course in courses" :key="course.id" :value="course.course">
								{{ course.course }}
							</option>
						</select>
					</div>
					<div class="flex flex-wrap gap-2 w-full" v-if="info.selectedCourse">
						<label for="major">Major</label>
						<select v-model="info.major" class="w-full p-2 border rounded">
							<option v-for="major in filteredMajor" :key="major" :value="major">
								{{ major }}
							</option>
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
