<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase';
import { useRouter } from 'vue-router';
import { doc, getDoc } from "firebase/firestore";
import Carousel from 'primevue/carousel';

const router = useRouter();
const showPassword = ref(false);
const loginError = ref(""); // Error message for wrong credentials

const credentials = ref({
    email: '',
    password: ''
});

const signIn = async (e) => {
    e.preventDefault();
    loginError.value = ""; // Reset error message before login attempt

    try {
        const userCredential = await signInWithEmailAndPassword(auth, credentials.value.email, credentials.value.password);
        const user = userCredential.user;
        console.log(user);

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData.role === 'admin') {
                alert("Login successful!");
                router.push('/admin');
                return;
            }
            if (userData.role === 'student') {
                alert("Login successful!");
                router.push(userData.isDone ? '/infopage' : '/designatedsub');
                return;
            }
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Login error:", error.message);

        // Handle specific authentication errors
        if (error.code === 'auth/wrong-password') {
            loginError.value = "Incorrect password. Please try again.";
        } else if (error.code === 'auth/user-not-found') {
            loginError.value = "No account found with this email.";
        } else {
            loginError.value = "Login failed. Please check your credentials.";
        }
    }
};

// Data for the carousel
const infoSections = ref([
    { title: "Philosopy", description: "A private non-sectarian school that promotes the holistic development of the learners in response to the changing society." },
    { title: "Vision", description: "Provide the poor an access to quality education that would improve their lives and make them realize that poverty is not a hindrance to success." },
    { title: "Mission", description: "Provides relevant quality Christian education that will equip the learners with 21st-century skills for global competitiveness." },
    { title: "Goals", description: "The school aims to provide every student with lifelong skills that will make them: 1. Preserve and enrich their cultural heritage, 2. Inculcate moral and Christian values, 3. Attain a strong sense of Patriotism, and 4. Participate in political, social, and economic progress of their respective communities." },
    { title: "Objectives", description: "The school aims to provide every student with lifelong skills that will make them preserve and enrich their cultural heritage, inculcate moral and Christian values, attain a strong sense of Patriotism, and participate in political, social, and economic progress of their respective communities." },
    { title: "Core Values", description: "Service, Integrity, Honesty, Pro Nature, Pro Environment, and God-centered." },
]);
</script>

<template>
    <div class="flex flex-col min-h-screen relative">

        <!-- Hero Section (Will Not Scroll) -->
        <div class="relative w-full flex justify-center items-center h-screen bg-cover bg-center px-4" 
            style="background-image: url('/bg.jpg');">
            
            <!-- Dark Overlay for Readability -->
            <div class="absolute inset-0 bg-black bg-opacity-50"></div>

            <!-- Centered Content -->
            <div class="relative z-10 flex flex-col justify-center items-center text-white text-center animate-fade-in">
                <img src="/tlogow.png" alt="Tañon College Logo" class="w-32 h-32 md:w-40 md:h-40 mb-4 drop-shadow-lg">
                <h1 class="text-3xl md:text-5xl font-extrabold tracking-wide drop-shadow-md">
                    Welcome to Tañon College
                </h1>
            </div>
        </div>

        <!-- About Section -->
        <div class="w-full max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6 text-center mt-10">
            <img src="/tlogo.png" class="mx-auto w-20 h-20 md:w-24 md:h-24 drop-shadow-md" alt="Tañon College Logo">
            <h1 class="text-xl md:text-3xl font-bold text-red-800">Tañon College</h1>
            <h4 class="text-xl md:text-xl pt-4 font-bold text-black" >About Our Institution</h4>

            <Carousel :value="infoSections" :numVisible="1" :numScroll="1" :circular="true" :autoplayInterval="3000">
                <template #item="slotProps">
                    <div class="p-4">
                        <h3 class="text-lg md:text-xl font-semibold text-gray-800">{{ slotProps.data.title }}</h3>
                        <p class="text-gray-600 mt-2 text-sm md:text-base">{{ slotProps.data.description }}</p>
                    </div>
                </template>
            </Carousel>
        </div>

        <!-- Main Content Section -->
        <div class="w-full flex flex-col md:flex-row items-center min-h-screen bg-gray-100 mt-10">

            <!-- Left Section: Course Image (Fully Responsive) -->
            <div class="w-full md:w-1/2 min-h-[400px] md:min-h-screen flex items-center justify-center">
                <img src="/courses.png" class="w-full h-full object-cover rounded-xl shadow-lg">
            </div>

            <!-- Right Section: Login Form -->
            <div class="w-full md:w-1/2 flex justify-center items-center py-12 px-6">
                <div class="w-full max-w-md bg-white shadow-2xl rounded-2xl p-6 md:p-8 transition transform hover:scale-105">
                    <div class="text-center">
                        <img src="/tlogo.png" class="mx-auto w-20 h-20 md:w-24 md:h-24 drop-shadow-md" alt="Tañon College Logo">
                        <h1 class="text-xl md:text-2xl font-bold text-red-800">Tañon College</h1>
                    </div>

                    <!-- Login Form -->
                    <form @submit="signIn" class="mt-6 space-y-4">
                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
                            <input type="email" v-model="credentials.email" id="email"
                                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition" 
                                required />
                        </div>

                        <div class="relative">
                            <label for="password" class="block text-sm font-medium text-gray-700">Password:</label>
                            <div class="relative">
                                <input :type="showPassword ? 'text' : 'password'" v-model="credentials.password" id="password" 
                                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition pr-10" 
                                    required />
                                <button type="button" @click="showPassword = !showPassword" 
                                    class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700">
                                    <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Error Message -->
                        <p v-if="loginError" class="text-red-500 text-sm mt-2 text-center">
                            {{ loginError }}
                        </p>

                        <div class="flex justify-between items-center">
                            <RouterLink to="/forgot-password" class="text-sm text-blue-600 hover:underline">
                            Forgot Password?
                        </RouterLink>
                        </div>

                        <button type="submit"
                            class="w-full bg-red-800 text-white py-3 rounded-lg hover:bg-red-900 transition-transform transform hover:scale-105 shadow-md">
                            Login
                        </button>
                    </form>

                    <!-- Create Account -->
                    <div class="mt-6 text-center">
                        <RouterLink to="/createaccount"
                            class="w-full inline-block bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-transform transform hover:scale-105 shadow-md">
                            Create Account
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
/* Fade-in animation */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
.animate-fade-in {
    animation: fadeIn 1.2s ease-out;
}
</style>



