<script setup>
import { ref, onMounted } from 'vue';
import { createLayout } from '../utils/layout.js';
import { initializeCardElements } from '../utils/cursor.js';


const amountOfPhotos = 87;
const layout = createLayout();
const cards = ref([]);


onMounted(async () => {
    layout.gridColumns = 6;
    layout.getContainerSize();
    layout.getCards();
    layout.arrangeCards();
    initializeCardElements(cards, layout);



});
</script>

<template>
    <h1 class="text-center text-3xl">My photo portfolio</h1>
    <div class="bg-secondary p-5 w-[1250px] bg-opacity-50 mx-auto rounded-3xl mt-7">
        <section class="container mx-auto w-[1200px] min-h-screen relative">
            <div id="ghostCard" class="rounded-2xl bg-accent cursor-pointer absolute duration-500 transition-all opacity-0"></div>
                <div   v-for="index in 41" :id="layout.getNextKey()"
                       size="2x3"
                       class=" select-none animate-fade-up animate-once animate-ease-out  card rounded-2xl border border-gray-300 border-opacity-15 cursor-pointer absolute flex items-center justify-center text-white text-2xl text-bold bg-cover bg-center bg-no-repeat"
                       :style="{ backgroundImage: `url('/assets/photos/untitled-${index}.jpg')` }"
                ></div>



        </section>
    </div>
</template>
