<template>
    <article ref="articleRef" :class="['relative w-full h-[100vh] rounded-3xl overflow-hidden bg-accent flex', flexDirection, { 'animate-fade-up animate-ease-in-out': inView }]">
        <canvas :id="canvasId" class="absolute inset-0 w-full h-full opacity-20"></canvas>
        <div class="w-full z-10 bg-cover flex flex-col justify-end items-start p-20 gap-4" :style="{ backgroundImage: `url(${backgroundImage})` }">
            <span class="uppercase backdrop-blur-md px-4 py-2">{{ spanText }}</span>
            <h1 class="text-4xl w-72">{{ headingText }}</h1>
            <router-link :to="routerLink" class="uppercase border px-4 py-2 hover:bg-text duration-300 hover:text-secondary">view work</router-link>
        </div>
        <div class="w-7/12 z-10 flex flex-col justify-end gap-3 p-20">
            <h1 class="text-secondary text-3xl w-72">{{ subheadingText }}</h1>
            <router-link :to="routerLink" class="w-fit uppercase border border-secondary text-secondary px-4 py-2 hover:bg-secondary duration-300 hover:text-text">view work</router-link>
        </div>
    </article>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { setNoiseBackground } from '../../utils/noise.js'; // Import the function
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
    backgroundImage: {
        type: String,
        default: '/assets/photos/untitled-1.jpg'
    },
    spanText: {
        type: String,
        default: 'photofraphy'
    },
    headingText: {
        type: String,
        default: 'Lorem Ipsum e lore se doler'
    },
    subheadingText: {
        type: String,
        default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed'
    },
    routerLink: {
        type: String,
        default: '/photos'
    },
    flexDirection: {
        type: String,
        default: 'flex-row',
        validator: value => ['flex-row', 'flex-row-reverse'].includes(value)
    },
    canvasId: {
        type: String,
        required: true
    }
});

const articleRef = ref(null);
const inView = ref(false);

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                inView.value = true;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    if (articleRef.value) {
        observer.observe(articleRef.value);
    }

    let pointSize = 4;
    const color1 = [160, 160, 160]; // First color (black)
    const color2 = [255, 255, 255]; // Second color (white)
    setNoiseBackground(props.canvasId, 800, 600, pointSize, color1, color2);
});
</script>
