<template>
    <section class="relative p-8 h-fit bg-accent w-full mx-auto rounded-3xl mt-20 mb-20 shadow-accent shadow-2xl overflow-hidden flex flex-col gap-12">
        <canvas id="backgroundCanvas" class="absolute inset-0 w-full h-full opacity-5"></canvas>
        <Article canvasId="backgroundCanvas1" flexDirection="flex-row"></Article>
        <Article canvasId="backgroundCanvas2" flexDirection="flex-row-reverse"></Article>
    </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { setNoiseBackground } from '../utils/noise.js'; // Import the function
import Article from "@/components/UI/Article.vue";

onMounted(() => {
    let pointSize = 6;
    const color1 = [160, 160, 160]; // First color (black)
    const color2 = [255, 255, 255]; // Second color (white)
    setNoiseBackground('backgroundCanvas', 800, 600, pointSize, color1, color2);
});
</script>
