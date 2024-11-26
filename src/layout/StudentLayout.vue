<script setup>
import {RouterView} from 'vue-router'
</script>
<template>
    <div>
        <div class="flex p-0 bg-gray-100 ">
            <div>
                
            </div>
            <div class="text-center flex-1 flex justify-center">
                <img class="mr-10" width="80" height="80" src="../assets/tlogo.png"/>
                <div>
                    <h1 class="text-red-800">TANON COLLEGE</h1>
                    <p>San Carlos City, Negros Occidental</p>
                    <h2 class="pb-1">OFFICE OF THE REGISTRAR AND ADMISSIONS</h2>
                </div>
            </div>
        </div>
        <RouterView/>
    </div>
</template>
