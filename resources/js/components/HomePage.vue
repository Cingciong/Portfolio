<script setup>
import { ref, onMounted } from 'vue';
import { createLayout } from '../layout.js';


const layout = createLayout();
const cards = ref([]);

const dragMove = (e, id) => {
    const card = cards.value.find(c => c.id === id);
    if (!card) return;

    const section = document.querySelector('section');
    const sectionRect = section.getBoundingClientRect();
    const offsetX = e.offsetX;
    const offsetY = e.offsetY;

    const onMouseMove = (e) => {
        if (!card) return;

        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;

        // Constrain within section boundaries
        newLeft = Math.max(sectionRect.left, Math.min(newLeft, sectionRect.right - card.element.offsetWidth));
        newTop = Math.max(sectionRect.top, Math.min(newTop, sectionRect.bottom - card.element.offsetHeight));

        card.element.style.left = `${newLeft - sectionRect.left}px`;
        card.element.style.top = `${newTop - sectionRect.top}px`;
    };

    const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
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
        cardElement.addEventListener('mousedown', (e) => dragMove(e, index));
        cards.value.push({ id: index, element: cardElement });
    });
});
</script>

<template>
    <div class="bg-[#212228] bg-[linear-gradient(#292a30_0.1em,_transparent_0.1em),_linear-gradient(90deg,_#292a30_0.1em,_transparent_0.1em)] bg-[size:4em_4em] h-fit w-full">
        <section class="container mx-auto w-[1200px] bg-black bg-opacity-15 min-h-screen relative">
            <div :key="11" size="4x1" class="card rounded-2xl border border-gray-300 border-opacity-15 cursor-pointer absolute"></div>
            <div v-for="index in 10" :key="index" size="1x1" class="card bg-[#AFDA9F] rounded cursor-pointer absolute"></div>
        </section>
    </div>
</template>
