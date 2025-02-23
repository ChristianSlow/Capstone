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
	sem:'',
	year:'',
});

const router = useRouter();
const courses = ref([]);
const userId = ref(null);
const isLoading = ref(false);
const isDarkMode = computed(() => window.matchMedia('(prefers-color-scheme: dark)').matches)

const mobileError = ref(false);

const validateMobileNumber = () => {
	const regex = /^09\d{9}$/; // Ensures it starts with '09' and has 11 digits
	mobileError.value = !regex.test(info.value.mobileno);
};
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

const dropdownItemsss = ref([
    { name: 'First', code: 'First' },
    { name: 'Second', code: 'Second' },
]);

const dropdownItemssss = ref([
    { name: 'First Year', code: 'First Year' },
    { name: 'Second Year', code: 'Second Year' },
	{ name: 'Third Year', code: 'Third Year' },
    { name: 'Fourth Year', code: 'Fourth Year' },
]);


/** ✅ Filter Majors Based on Selected Course */
const filteredMajor = computed(() => {
    const selectedCourse = info.value.selectedCourse;
    const course = courses.value.find((course) => course.course === selectedCourse);
    return course ? course.majors : [];
});
</script>

<template>
	<Fluid :class="{'dark': isDarkMode, 'light': !isDarkMode}" class="flex justify-center p-2">
		<div class="flex mt-3">
			<div class="card flex flex-col gap-4 w-full p-4 rounded-lg shadow-md" :class="{'bg-white text-gray-800': !isDarkMode, 'bg-gray-800 text-white': isDarkMode}">
				<div class="text-center mb-6">
					<img class="mx-auto" width="80" height="80" src="/tlogo.png" alt="Tañon College Logo" />
					<h1 class="text-red-800 text-xl font-bold">TAÑON COLLEGE</h1>
					<h2 class="text-gray-700 text-md">OFFICE OF THE REGISTRAR AND ADMISSIONS</h2>
					<p class="text-gray-600 text-sm">San Carlos City, Negros Occidental</p>
				</div>
				<!-- Student Information -->
				<div class="flex flex-col md:flex-row gap-4">
					<div class="flex flex-wrap gap-2 w-full">
						<label for="firstname">First Name</label>
						<InputText v-model="info.fname" id="firstname" type="text" class="p-2 border rounded w-full" :class="{'bg-gray-100 text-gray-900': !isDarkMode, 'bg-gray-700 text-white border-gray-600': isDarkMode}" />
					</div>
					<div class="flex flex-wrap gap-2 w-full">
						<label for="middlename">Middle Name</label>
						<InputText v-model="info.mname" id="middlename" type="text" class="p-2 border rounded w-full" :class="{'bg-gray-100 text-gray-900': !isDarkMode, 'bg-gray-700 text-white border-gray-600': isDarkMode}" />
					</div>
					<div class="flex flex-wrap gap-2 w-full">
						<label for="lastname">Last Name</label>
						<InputText v-model="info.lname" id="lastname" type="text" class="p-2 border rounded w-full" :class="{'bg-gray-100 text-gray-900': !isDarkMode, 'bg-gray-700 text-white border-gray-600': isDarkMode}" />
					</div>
				</div>

				<div class="flex flex-col md:flex-row gap-4">
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
					<div class="flex flex-wrap gap-2 w-full">
						<label for="mobileno">Mobile No.</label>
						<InputText 
							id="mobileno" 
							v-model="info.mobileno" 
							type="text" 
							@input="formatMobileNumber" 
							class="p-2 border rounded w-full" 
							:class="{'border-red-500': mobileError}"
							placeholder="09XXXXXXXXX"
							maxlength="11"
						/>
						<span v-if="mobileError" class="text-red-600 text-sm">Invalid mobile number (must be 11 digits)</span>
					</div>
				</div>
				<div class="flex flex-col md:flex-row gap-4">
					<div class="flex flex-wrap gap-2 w-full text-black">
						<label for="date">Date of Birth</label>
						<InputText v-model="info.dateofbirth" id="date" type="date" />
					</div>
					<div class="flex flex-wrap gap-2 w-full">
						<label for="civilstatus">Semester</label>
						<Dropdown
							id="civilstatus"
							v-model="info.sem"
							:options="dropdownItemsss"
							optionLabel="name"
							placeholder="Select Semester"
							class="w-full"
						/>
					</div>
					<div class="flex flex-wrap gap-2 w-full">
						<label for="civilstatus">Year</label>
						<Dropdown
							id="civilstatus"
							v-model="info.year"
							:options="dropdownItemssss"
							optionLabel="name"
							placeholder="Select Year"
							class="w-full"
						/>
					</div>
				</div>

				<div class="flex flex-wrap">
					<label for="placeofbirth">Place of Birth</label>
					<Textarea id="placeofbirth" v-model="info.pofbirth" placeholder="Street / Barangay / City / Province" rows="1" />
				</div>

				<!-- Contact Information -->
				<div class="flex flex-col md:flex-row gap-4">
					<div class="flex flex-wrap gap-2 w-full">
						<label for="parents">Parents/Guardian Name</label>
						<InputText id="parents" v-model="info.parents" type="text" />
					</div>
					<div class="flex flex-wrap gap-2 w-full">
						<label for="mobileno">Mobile No.</label>
						<InputText 
							id="mobileno" 
							v-model="info.cellno" 
							type="text" 
							@input="formatMobileNumber" 
							class="p-2 border rounded w-full" 
							:class="{'border-red-500': mobileError}"
							placeholder="09XXXXXXXXX"
							maxlength="11"
						/>
						<span v-if="mobileError" class="text-red-600 text-sm">Invalid mobile number (must be 11 digits)</span>
					</div>
				</div>

				<div class="flex flex-wrap">
					<label for="address">Home Address</label>
					<Textarea id="address" v-model="info.address" placeholder="Street / Barangay / City / Province"
					rows="1" />
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
					<Button @click="submit" label="Submit" severity="danger" raised class="w-full py-2 rounded-lg" :class="{'bg-red-600 text-white hover:bg-red-700': !isDarkMode, 'bg-red-500 text-white hover:bg-red-600': isDarkMode}" />
				</div>
			</div>
		</div>
	</Fluid>
</template>

<style>
:root {
	--bg-light: #f9fafb;
	--bg-dark: #1e293b;
	--text-light: #1f2937;
  --text-dark: #f9fafb;
  --input-bg-light: #ffffff;
  --input-bg-dark: #334155;
  --border-light: #d1d5db;
  --border-dark: #475569;
}

.dark {
  background-color: var(--bg-dark);
  color: var(--text-dark);
}

.light {
  background-color: var(--bg-light);
  color: var(--text-light);
}

/* Apply to inputs */
.dark input,
.dark select,
.dark textarea {
  background-color: var(--input-bg-dark);
  color: var(--text-dark);
  border: 1px solid var(--border-dark);
}
</style>