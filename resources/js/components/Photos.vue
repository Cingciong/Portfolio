<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue';
import Album from '../utils/album.js';
import { createLayout } from '../utils/layout.js';
import VanillaTilt from 'vanilla-tilt';

const layout = createLayout();
const cards = ref([]);
const selectedImage = ref(null);

onMounted(async () => {
    await Album.loadPhotos(); // Load the first batch of photos
    cards.value = Album.cards.value; // Assign loaded cards to the ref
    layout.gridColumns = 6;
    await nextTick();
    layout.gap = 10;
    layout.getContainerSize();
    layout.getCards();
    layout.arrangeCards();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5,
    });

    // Add keydown event listener for Esc key
    window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    // Remove scroll event listener when component is unmounted
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('keydown', handleKeydown);
});

const loadNextBatch = async () => {
    await Album.loadNextBatch();
    cards.value = Album.cards.value; // Update cards after loading the next batch
    await nextTick();
    layout.getCards();
    layout.arrangeCards();
    VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5,
    });
};
const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        loadNextBatch();
    }
};

const openModal = (image) => {
    const hdImage = image.replace('/assets/photos/', '/assets/HD_photos/');
    selectedImage.value = hdImage;
};

const closeModal = () => {
    selectedImage.value = null;
};

const handleKeydown = (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
};
</script>

<template>
    <h1 class="text-center text-3xl ">My photo portfolio</h1>
    <div class="bg-secondary pt-6 p-5 w-[1250px] bg-opacity-50 mx-auto rounded-3xl mt-7 mb-24">
        <section class="container mx-auto w-[1200px] min-h-screen relative">
            <div id="ghostCard" class="rounded-2xl bg-accent cursor-pointer absolute duration-500 transition-all opacity-0"></div>
            <div :id="layout.getNextKey()"
                 v-for="card in cards" :key="card.id"
                 :size="Album.getProportion(card)"
                 class="card animate-fade-up animate-once animate-ease-out rounded-2xl shadow-accent shadow-md hover:shadow-none duration-200 cursor-pointer absolute ">
                <img :src="card.url" alt="Photo" class="w-full h-full rounded-2xl   tilt-card" @click="openModal(card.url)">
            </div>
        </section>
    </div>

    <div v-if="selectedImage" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" @click.self="closeModal">
        <img :src="selectedImage" alt="HD photo" class="max-w-full max-h-full">
        <button @click="closeModal" class="absolute top-4 right-4 text-white text-2xl">&times;</button>
    </div>
</template>
