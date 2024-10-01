<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue';
import Album from '../utils/album.js';
import { createLayout } from '../utils/layout.js';
import VanillaTilt from 'vanilla-tilt';

const layout = createLayout();
const cards = ref([]);
const selectedImage = ref(null);
const loading = ref(true);
const isLoadingNextBatch = ref(false);

const loadPhotos = async () => {
    loading.value = true;
    await Album.loadPhotos();
    cards.value = Album.cards.value;
    layout.gridColumns = 6;
    await nextTick();
    layout.gap = 10;
    layout.getContainerSize();
    layout.getCards();
    layout.arrangeCards();
    loading.value = false;
};

onMounted(async () => {
    await loadPhotos();
    window.addEventListener('scroll', handleScroll);
    VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5,
    });
    window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('keydown', handleKeydown);
});

const loadNextBatch = async () => {
    if (isLoadingNextBatch.value) return;
    isLoadingNextBatch.value = true;
    loading.value = true;
    await Album.loadNextBatch();
    cards.value = Album.cards.value;
    await nextTick();
    layout.getCards();
    layout.arrangeCards();
    VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5,
    });
    isLoadingNextBatch.value = false;
    loading.value = false;
};

const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 200)) {
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
    <h1 class="text-center text-3xl">My photo portfolio</h1>
    <div class="bg-secondary pt-6 p-5 w-[1250px] bg-opacity-50 mx-auto rounded-3xl mt-7 mb-24">
        <section class="container mx-auto w-[1200px] min-h-screen relative">
            <div v-if="loading" role="status" class="absolute bottom-64 left-1/2 transform rounded-3xl -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-5 z-50 bg-gray-500 bg-opacity-50">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
            <div id="ghostCard" class="rounded-2xl bg-accent cursor-pointer duration-500 transition-all opacity-0"></div>
            <div :id="layout.getNextKey()"
                 v-for="card in cards" :key="card.id"
                 :size="Album.getProportion(card)"
                 class="card animate-fade-up animate-once animate-ease-out rounded-2xl shadow-accent shadow-md hover:shadow-none duration-200 cursor-pointer absolute">
                <img :src="card.url" alt="Photo" class="w-full h-full rounded-2xl tilt-card" @click="openModal(card.url)">
            </div>
        </section>
    </div>

    <div v-if="selectedImage" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" @click.self="closeModal">
        <img :src="selectedImage" alt="HD photo" class="max-w-full max-h-full">
        <button @click="closeModal" class="absolute top-4 right-4 text-white text-2xl">&times;</button>
    </div>
</template>
