<script setup>

import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase';
import { useRouter } from 'vue-router';
import { doc, getDoc } from "firebase/firestore";

const router = useRouter()

const credentials = ref({
    email: '',
    password: ''
})

const signIn = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, credentials.value.email, credentials.value.password)
    .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const userData = docSnap.data()
            if (userData.role === 'admin') {
                router.push('/admin')
            }
            if (userData.role === 'student') {
                router.push('/select/course')
            }

            } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }

    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
    });
}

</script>
<template>
    <div class="flex flex-col md:flex-row lg:flex-row">
        <div class="flex-1 h-screen bg-gray-200 flex flex-col items-center text-center text-6xl font-bold text-red-800">
            <img src="/courses.png" alt="tlogo">
        </div>
        <div class="flex-1 flex flex-col items-center bg-gray-300">
            <div clas="flex justify-center items-center p-3">
                <div class="flex justify-center">
                    <img src="/tlogo.png" width="150px" height="150px" alt="tlogo">
                </div>
                <h1 class="text-3xl text-center font-bold text-red-800">Tañon College</h1>
            </div>
            <div class="flex justify-center flex-1 flex-col">
                <form @submit="signIn" class="max-w-sm mx-auto w-72">
                    <div class="mb-5">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
                        <input type="email" v-model="credentials.email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required />
                    </div>
                    <div class="mb-5">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
                        <input type="password" v-model="credentials.password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div class="flex items-center mb-5">
                        <div class="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                        </div>
                        <label for="remember" class="ms-2 text-sm items-center  font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                    </div>
                    <div class="flex items-center justify-center p-1">
                        <button type="submit" class="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-12 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                    </div>
                    <h4 class="flex justify-center items-center">Forgot Password?</h4>
                    <div class="flex items-center justify-center p-4">
                        <RouterLink to="/createaccount"
                         class="text-white bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-24 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Createaccout</RouterLink>
                    </div>
                </form> 
            </div>
            <div class="text-center justify-evenly">
                <RouterLink to="/admin" class="px-5 py-2 bg-blue-600  text-white rounded-md">admin</RouterLink>
                <RouterLink to="/select/course" class="px-5 py-2 bg-blue-600  text-white rounded-md">select courses</RouterLink>
                <RouterLink to="/infopage" class="px-5 py-2 bg-blue-600 text-white rounded-md">Information Page</RouterLink>
            </div>
        </div>
    </div>

</template>