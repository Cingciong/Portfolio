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



</script>

<template>


            <section class=" grid grid-cols-4">
                <div class="flex flex-col gap-2  justify-center">
                    <h2 class="text-6xl animate-fade-left">Igor Maciejak</h2>
                    <p class="text-lg text-left animate-fade-right">
                        Based in Gdynia, Poland
                        <br>
                        <div class="flex  items-center animate-fade-left">
                            <span class="relative flex h-2 w-2">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                            </span>
                            <h5 class="ml-1.5">open for job offers</h5>
                        </div>
                    </p>
                </div>
                <img class="h-[700px] w-[700px] col-span-2  rounded-full mx-auto
                shadow-xl shadow-accent
                border border-accent border-opacity-50 p-4 bg-secondary
animate-fade animate-once animate-ease-in" src="https://picsum.photos/1000/1000">
                <div class="flex flex-col gap-2 justify-center w-fit pl-auto">

                    <h1 class="text-5xl w-fit  flex flex-col">
                        <span class="text-accent animate-fade-down">
                            Web Developer
                        </span>
                        <span class="text-[#D8A25E] animate-fade-up">
                            & Freelance Photographer
                        </span>
                    </h1>

                </div>

            </section>

            <div class="bg-secondary p-5 w-[1250px] bg-opacity-50 mx-auto rounded-3xl mt-20">
                <section class="container mx-auto w-[1200px] min-h-screen relative">
                    <div id="ghostCard" class="rounded-2xl bg-accent cursor-pointer absolute duration-500 transition-all opacity-0"></div>
                    <div v-for="index in 10" :id="layout.getNextKey()" size="5x3" class=" select-none animate-fade-up animate-once animate-ease-out  card rounded-2xl border border-gray-300 border-opacity-15 cursor-pointer absolute flex items-center justify-center text-white text-2xl text-bold bg-neutral">{{index}}</div>
                    <div v-for="index in 9" :id="layout.getNextKey()" size="3x2" class="select-none animate-fade-up animate-once animate-ease-out card rounded-2xl border border-gray-300 border-opacity-15 cursor-pointer absolute flex items-center justify-center text-white text-2xl text-bold bg-neutral">{{index}}</div>
                    <div v-for="index in 9" :id="layout.getNextKey()" size="1x2" class=" select-none animate-fade-up animate-once animate-ease-out card rounded-2xl border border-gray-300 border-opacity-15 cursor-pointer absolute flex items-center justify-center text-white text-2xl text-bold bg-neutral">{{index}}</div>
                </section>
            </div>

</template>

