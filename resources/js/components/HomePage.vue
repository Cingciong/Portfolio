<script setup>
import { ref, onMounted } from 'vue';
import { createLayout } from '../utils/layout.js';
import { dragMove } from '../utils/cursor.js';

const layout = createLayout();
const cards = ref([]);
const keyCounter = ref(0);

const getNextKey = () => {
    return keyCounter.value++;
};


onMounted(async () => {
    layout.getContainerSize();
    layout.getCardSizes();
    console.log(layout.containerSize, layout.cardSizes);
    layout.arrangeCards();
    console.log(layout.cardPositions);
    layout.applyCardPositions();

    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach((cardElement, index) => {
        cardElement.style.transitionDuration = '300ms';
        cardElement.addEventListener('mousedown', (e) => dragMove(e, index, cards.value, layout));
        cards.value.push({ id: index, element: cardElement });
    });
});
</script>

<template>
    <div class="bg-[#212228] bg-[linear-gradient(#292a30_0.1em,_transparent_0.1em),_linear-gradient(90deg,_#292a30_0.1em,_transparent_0.1em)] bg-[size:4em_4em] h-fit w-full">
        <nav class="mx-auto py-20 text-white w-1/2 text-center">
            navigation
        </nav>
        <section class="container mx-auto w-[1200px] bg-black bg-opacity-15 min-h-screen relative">
            <div :key="getNextKey()" size="4x3" class="card rounded-2xl border border-gray-300 border-opacity-15 cursor-pointer absolute"></div>
            <div :key="getNextKey()" size="7x1" class="card rounded-2xl border border-gray-300 border-opacity-15 cursor-pointer absolute"></div>
            <div :key="getNextKey()" size="3x2" class="card rounded-2xl border border-gray-300 border-opacity-15 cursor-pointer absolute "></div>
<!--            <div v-for="index in 1" :key="getNextKey()" size="1x1" class="card bg-[#AFDA9F] rounded cursor-pointer absolute"></div>-->
        </section>
    </div>
</template>
