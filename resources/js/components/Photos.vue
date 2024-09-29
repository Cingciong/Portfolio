<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue';
import Album from '../utils/album.js';
import { createLayout } from '../utils/layout.js';
import { initializeCardElements } from '../utils/cursor.js';

const layout = createLayout();
const cards = ref([]);

onMounted(async () => {
    await Album.loadPhotos(); // Load the first batch of photos
    cards.value = Album.cards.value; // Assign loaded cards to the ref
    layout.gridColumns = 6;
    await nextTick();
    layout.getContainerSize();
    layout.getCards();
    layout.arrangeCards();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    // Remove scroll event listener when component is unmounted
    window.removeEventListener('scroll', handleScroll);
});

function getProportion(card) {
    const width = card.width;
    const height = card.height;
    const ratio = width / height;

    const ratio3x2 = 3 / 2;
    const ratio2x3 = 2 / 3;

    const diff3x2 = Math.abs(ratio - ratio3x2);
    const diff2x3 = Math.abs(ratio - ratio2x3);

    if (diff3x2 < diff2x3) {
        return '3x2';
    } else {
        return '2x3';
    }
}

const loadNextBatch = async () => {
    await Album.loadNextBatch();
    cards.value = Album.cards.value; // Update cards after loading the next batch
    await nextTick();
    layout.getCards();
    layout.arrangeCards();
};

const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        loadNextBatch();
    }
};
</script>

<template>
    <h1 class="text-center text-3xl">My photo portfolio</h1>
    <div class="bg-secondary pt-6 p-5 w-[1250px] bg-opacity-50 mx-auto rounded-3xl mt-7 mb-24">
        <section class="container mx-auto w-[1200px] min-h-screen relative">
            <div id="ghostCard" class="rounded-2xl bg-accent cursor-pointer absolute duration-500 transition-all opacity-0"></div>
            <div :id="layout.getNextKey()"
                 v-for="card in cards" :key="card.id"
                 :size="getProportion(card)"
                 :style="{ background: 'url(' + card.url + ') no-repeat center center / cover' }"
                 class="card flex flex-col text-secondary justify-between overflow-hidden select-none animate-fade-up animate-once animate-ease-out card rounded-2xl border border-gray-300 p-8 border-opacity-15 cursor-pointer absolute text-2xl text-bold bg-neutral">
            </div>
        </section>
    </div>
</template>
