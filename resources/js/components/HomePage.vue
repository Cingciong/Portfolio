<script setup>
import { ref, onMounted } from 'vue';
import { createLayout } from '../utils/layout.js';
import { initializeCardElements } from '../utils/cursor.js';

const layout = createLayout();
const cards = ref([]);

onMounted(async () => {
    layout.getContainerSize();
    layout.getCards();
    layout.arrangeCards();
    initializeCardElements(cards, layout);
});

// Animations
const ballClassIndex = ref(0);
const ballClasses = ['right-[87%]', 'right-[63%]', 'right-[37%]', 'right-5'];

const switchBallClass = () => {
    ballClassIndex.value = (ballClassIndex.value + 1) % ballClasses.length;
};
</script>

<template>
    <div class="bg-primary  font-main h-fit flex flex-col gap-20 w-full text-text">
        <div class="h-fit flex flex-col gap-20 w-[1500px] mx-auto">
            <div class="justify-between flex pt-10">
                <h1>Igor M.</h1>
                <nav class="flex flex-row gap-2 relative">
                    <button @click="switchBallClass()">Home</button>
                    <a href="">Work</a>
                    <a href="">About</a>
                    <a href="">Photos</a>
                    <div :class="['bg-red-400', 'rounded-full', 'w-2', 'h-2', 'absolute', '-bottom-4', 'transition-all', 'duration-300 shadow-2xl', ballClasses[ballClassIndex]]"></div>
                </nav>
            </div>
            <section class=" flex justify-evenly">
                <div class="flex flex-col gap-2  justify-center">
                    <h2 class="text-6xl">Igor Maciejak</h2>
                    <p class="text-lg text-left">
                        Based in Gdynia, Poland
                        <br>
                        <div class="flex  items-center">
                            <span class="relative flex h-2 w-2">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                            </span>
                            <h5 class="ml-1.5">open for job offers</h5>
                        </div>
                    </p>
                </div>
                <img class="h-[35vw] w-[35vw] rounded-full" src="https://picsum.photos/2000/2000">
                <div class="flex flex-col gap-2 justify-center w-fit px-auto">
                    <h2 class="text-6xl">Igor Maciejak</h2>
                    <p class="text-lg text-left">
                        Based in Gdynia, Poland
                        <br>
                        <div class="flex items-center">
            <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
                            <h5 class="ml-1.5">open for job offers</h5>
                        </div>
                    </p>
                </div>

            </section>
            <div class="flex justify-between"></div>
            <div class="bg-secondary p-5 w-[1250px] bg-opacity-50 mx-auto rounded-3xl">
                <section class="container mx-auto w-[1200px] min-h-screen relative">
                    <div id="ghostCard" class="rounded-2xl bg-accent cursor-pointer absolute duration-500 transition-all opacity-0"></div>
                    <div v-for="index in 3" :id="layout.getNextKey()" size="7x3" class="card rounded-2xl border border-gray-300 border-opacity-15 cursor-pointer absolute flex items-center justify-center text-white text-2xl text-bold bg-neutral">{{index}}</div>
                    <div v-for="index in 3" :id="layout.getNextKey()" size="3x2" class="card rounded-2xl border border-gray-300 border-opacity-15 cursor-pointer absolute flex items-center justify-center text-white text-2xl text-bold bg-neutral">{{index}}</div>
                    <div v-for="index in 3" :id="layout.getNextKey()" size="1x2" class="card rounded-2xl border border-gray-300 border-opacity-15 cursor-pointer absolute flex items-center justify-center text-white text-2xl text-bold bg-neutral">{{index}}</div>
                </section>
            </div>
        </div>
    </div>
</template>
