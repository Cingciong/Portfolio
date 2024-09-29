<script setup>
import { onMounted } from 'vue';
import Navbar from "@/components/navbar.vue";
import { generateNoiseCanvas, setNoiseBackground } from '../utils/noise.js'; // Import the functions

onMounted(() => {
    const pointSize = 3; // Adjust this value to control the size of noise points
    const color1 = [160, 160, 160]; // First color (black)
    const color2 = [255, 255, 255]; // Second color (white)
    setNoiseBackground('background', 800, 600, pointSize, color1, color2);
});
</script>

<template>
    <div id="background" class="relative bg-primary font-main h-fit flex flex-col gap-20 w-full text-text animate-duration-600">
        <div class="absolute inset-0 bg-primary opacity-50"></div>
        <div class="h-fit flex flex-col gap-20 w-[1500px] mx-auto relative">
            <Navbar/>
            <router-view/>
        </div>
    </div>
</template>

<style scoped>
#background {
    position: relative;
    opacity: 1;
}
#background > .bg-primary {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.95;
}
</style>
