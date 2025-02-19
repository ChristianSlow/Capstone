<script setup>
import { ref, onMounted } from 'vue';
import { collection, onSnapshot, query, where } from "firebase/firestore"; 
import { db } from '../../firebase';
// import { InputText } from 'primevue/inputtext';
// import { Dropdown } from 'primevue/dropdown';
// import { Card } from 'primevue/card';

const students = ref([]);
const searchQuery = ref("");
const filteredStudents = ref([]);
const courses = ref([]);
const selectedCourse = ref(null);
const selectedMajor = ref(null);
const majors = ref([]);
const subjects = ref([]);

// Fetch students with real-time updates
const fetchStudents = () => {
    const studentQuery = collection(db, "StudentInformation");
    onSnapshot(studentQuery, (snapshot) => {
        students.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        filteredStudents.value = students.value;
    });
};

// Fetch courses and majors
const fetchCourses = () => {
    onSnapshot(collection(db, "Courses"), (snapshot) => {
        courses.value = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    });
};

// Fetch subjects based on course and major
const fetchSubjects = () => {
    if (!selectedCourse.value || !selectedMajor.value) return;
    const subjectQuery = query(
        collection(db, "subjects"),
        where("course", "==", selectedCourse.value),
        where("major", "==", selectedMajor.value)
    );
    onSnapshot(subjectQuery, (snapshot) => {
        subjects.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
};

// Update major options when course is selected
const updateMajors = () => {
    const courseData = courses.value.find(c => c.course === selectedCourse.value);
    majors.value = courseData ? courseData.majors : [];
    selectedMajor.value = null;
    subjects.value = [];
};

// Search function
const searchStudent = () => {
    const query = searchQuery.value.toLowerCase().trim();
    if (!query) {
        filteredStudents.value = students.value;
    } else {
        filteredStudents.value = students.value.filter(student =>
            (`${student.fname} ${student.lname}`.toLowerCase().includes(query) || 
            student.fname.toLowerCase().includes(query) || 
            student.lname.toLowerCase().includes(query))
        );
    }
};

onMounted(() => {
    fetchStudents();
    fetchCourses();
});
</script>

<template>
    <main class="p-6 md:ml-64 h-auto pt-20 bg-gray-100">
        <!-- Search & Filter Section -->
        <div class="bg-white shadow-md rounded-lg p-6 mb-6">
            <h1 class="text-2xl font-bold mb-4">Search Student</h1>
            <div class="flex flex-col md:flex-row md:items-center gap-4">
                <InputText v-model="searchQuery" @input="searchStudent" placeholder="Enter student name..." class="p-3 border rounded-md w-full" />
            </div>
        </div>

        <!-- Student Information Cards -->
        <div v-if="filteredStudents.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card v-for="student in filteredStudents" :key="student.id" class="shadow-md">
                <template #content>
                    <h2 class="text-lg font-bold">{{ student.fname }} {{ student.lname }}</h2>
                    <p>Email: {{ student.email }}</p>
                    <p>Mobile: {{ student.mobileno }}</p>
                    <p>Course: {{ student.selectedCourse }}</p>
                    <p>Major: {{ student.major }}</p>
                </template>
            </Card>
        </div>
        <div v-else class="text-center text-gray-500">No students found.</div>

        <!-- Subjects Section -->
        <div v-if="subjects.length" class="mt-6 bg-white shadow-md rounded-lg p-6">
            <h2 class="text-xl font-bold mb-4">Subjects for {{ selectedMajor }}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card v-for="subject in subjects" :key="subject.id" class="shadow-md">
                    <template #content>
                        <h3 class="text-lg font-bold">{{ subject.name }}</h3>
                        <p>Code: {{ subject.code }}</p>
                        <p>Units: {{ subject.units }}</p>
                    </template>
                </Card>
            </div>
        </div>
    </main>
</template>
