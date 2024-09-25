<script setup>
import { ref, onMounted } from 'vue';
import { createLayout } from '../utils/layout.js';
import { dragMove } from '../utils/cursor.js';

const layout = createLayout();
const cards = ref([]);
const keyCounter = ref(0);

const getNextKey = () => {
    return 'card_' + keyCounter.value++;
};


onMounted(async () => {
    layout.getContainerSize();
    layout.getCards();
    layout.arrangeCards();


    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach((cardElement) => {
        const id = cardElement.getAttribute('id');
        cardElement.style.transitionDuration = '300ms';
        cardElement.addEventListener('mousedown', (e) => dragMove(e, id, cards.value, layout));
        cards.value.push({ id, element: cardElement });
    });
});
</script>

<template>
    <div class="bg-[#212228] bg-[linear-gradient(#292a30_0.1em,_transparent_0.1em),_linear-gradient(90deg,_#292a30_0.1em,_transparent_0.1em)] bg-[size:4em_4em] h-fit w-full">
        <nav class="mx-auto py-20 text-white w-1/2 text-center">
            navigation
        </nav>
        <section class="container mx-auto w-[1200px] bg-black bg-opacity-15 min-h-screen relative">
            <div id="ghostCard" class="rounded-2xl border border-gray-300 bg-green-500 border-opacity-15 cursor-pointer absolute duration-500 transition-all opacity-0"></div>
            <div v-for="index in 3" :id="getNextKey()" size="7x3" class="card rounded-2xl border border-gray-300 border-opacity-15 cursor-pointer absolute flex items-center justify-center text-white text-2xl text-bold">{{index}}</div>
            <div v-for="index in 3" :id="getNextKey()" size="3x2" class="card rounded-2xl border border-gray-300 border-opacity-15 cursor-pointer absolute flex items-center justify-center text-white text-2xl text-bold">{{index}}</div>
            <div v-for="index in 3" :id="getNextKey()" size="1x2" class="card rounded-2xl border border-gray-300 border-opacity-15 cursor-pointer absolute flex items-center justify-center text-white text-2xl text-bold">{{index}}</div>
        </section>
    </div>
</template>
