<template>
    <div>
        <h1>Test page modal</h1>
        {{ name }}

        <span v-for="name in names" class="bg-blue-100"> 
            <span v-if="name !== 'hansam'">{{ name }}</span>
            
        </span>

    </div>
</template>
<script setup>
import { ref } from 'vue';

const names = ref(["cristian", "hansam", "christian"])

</script>