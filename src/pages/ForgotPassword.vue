<script setup>
import { ref } from 'vue';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

const auth = getAuth();
const router = useRouter();
const toast = useToast();

const email = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const resetPassword = async () => {
    if (!email.value) {
        errorMessage.value = 'Please enter your email.';
        return;
    }

    isLoading.value = true;
    errorMessage.value = '';

    try {
        await sendPasswordResetEmail(auth, email.value);
        toast.add({ severity: 'success', summary: 'Check your email', detail: 'A reset link has been sent.', life: 3000 });
        router.push('/login'); // Redirect to login after successful email
    } catch (error) {
        errorMessage.value = error.code === 'auth/user-not-found' ? 'No account found with this email.' : 'Failed to send reset email.';
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="w-full flex flex-col md:flex-row items-center min-h-screen bg-gray-100 mt-10">

        <!-- Left Section: Image -->
        <div class="w-full md:w-1/2 min-h-[400px] md:min-h-screen flex items-center justify-center">
            <img src="/courses.png" class="w-full h-full object-cover rounded-xl shadow-lg">
        </div>

        <!-- Right Section: Forgot Password Form -->
        <div class="w-full md:w-1/2 flex justify-center items-center py-12 px-6">
            <div class="w-full max-w-md bg-white shadow-2xl rounded-2xl p-6 md:p-8 transition transform hover:scale-105">
                <div class="text-center">
                    <img src="/tlogo.png" class="mx-auto w-20 h-20 md:w-24 md:h-24 drop-shadow-md" alt="Tañon College Logo">
                    <h1 class="text-xl md:text-2xl font-bold text-red-800">Forgot Password</h1>
                </div>

                <!-- Forgot Password Form -->
                <form @submit.prevent="resetPassword" class="mt-6 space-y-4">
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
                        <input type="email" v-model="email" id="email"
                            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition" 
                            required />
                    </div>

                    <!-- Error Message -->
                    <p v-if="errorMessage" class="text-red-500 text-sm mt-2 text-center">
                        {{ errorMessage }}
                    </p>

                    <button type="submit"
                        class="w-full bg-red-800 text-white py-3 rounded-lg hover:bg-red-900 transition-transform transform hover:scale-105 shadow-md"
                        :disabled="isLoading">
                        {{ isLoading ? 'Sending...' : 'Send Reset Link' }}
                    </button>
                </form>

                <!-- Back to Login -->
                <div class="mt-6 text-center">
                    <RouterLink to="/login"
                        class="w-full inline-block bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md">
                        Back to Login
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>
