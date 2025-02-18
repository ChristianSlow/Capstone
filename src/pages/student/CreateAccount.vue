<script setup>
import { ref } from 'vue';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../firebase';
import { collection, setDoc, doc } from "firebase/firestore";
import { useRouter } from 'vue-router';

const router = useRouter();

const credentials = ref({
    name: '',
    email: '',
    password: ''
});

const passwordError = ref('');
const showPassword = ref(false);

const validatePassword = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
};

const signUp = async () => {
    if (!validatePassword(credentials.value.password)) {
        passwordError.value = "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.";
        return;
    }
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, credentials.value.email, credentials.value.password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            name: credentials.value.name,
            email: credentials.value.email,
            role: 'student'
        });

        credentials.value.password = ''; // Clear password from memory
        router.push('/');
    } catch (error) {
        console.error("Error during sign-up:", error.message);
    }
};
</script>

<template>
    <div class="w-full flex flex-col md:flex-row items-center min-h-screen bg-gray-100">
        <div class="w-full md:w-1/2 min-h-[400px] md:min-h-screen flex items-center justify-center">
            <img src="/courses.png" class="w-full h-full object-cover rounded-xl shadow-lg">
        </div>

        <div class="w-full md:w-1/2 flex justify-center items-center py-12 px-6">
            <div class="w-full max-w-md bg-white shadow-2xl rounded-2xl p-6 md:p-8 transition transform hover:scale-105">
                <div class="text-center">
                    <img src="/tlogo.png" class="mx-auto w-20 h-20 md:w-24 md:h-24 drop-shadow-md" alt="Tañon College Logo">
                    <h1 class="text-xl md:text-2xl font-bold text-red-800">Tañon College</h1>
                </div>

                <form @submit.prevent="signUp" class="mt-7 space-y-4">
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">Full Name:</label>
                        <input type="text" v-model="credentials.name" id="name" 
                            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition" 
                            required />
                    </div>

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
                        <p v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</p>
                    </div>

                    <button type="submit" 
                        class="w-full bg-red-800 text-white py-3 rounded-lg hover:bg-red-900 transition-transform transform hover:scale-105 shadow-md">
                        Sign Up
                    </button>
                </form>

                <div class="mt-6 text-center">
                    <RouterLink to="/" 
                        class="w-full inline-block bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-transform transform hover:scale-105 shadow-md">
                        Already have an account? Login
                    </RouterLink>
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