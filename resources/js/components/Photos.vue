<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue';
import Album from '../utils/album.js';
import VanillaTilt from 'vanilla-tilt';
import VLazyImage from "v-lazy-image";

const isLoadingNextBatch = ref(false);
const photos = ref([]);
const enableTilting = ref(true);
const selectedImage = ref(null);

async function loadNextBatch() {
    if (isLoadingNextBatch.value) return;
    isLoadingNextBatch.value = true;
    const newPhotos = await Album.loadPhotos();
    photos.value = [...photos.value, ...newPhotos]; // Add new photos to the existing array
    isLoadingNextBatch.value = false;

    nextTick(() => {
        if (enableTilting.value) {
            const images = document.querySelectorAll('.tilt');
            VanillaTilt.init(images, {
                max: 25,
                speed: 400
            });
        }
    });
}

function openModal(imageUrl) {
    const hdImage = 'assets/HD_photos/' + imageUrl;
    selectedImage.value = hdImage;
}

function closeModal() {
    selectedImage.value = null;
}

function handleKeydown(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
}

onMounted(async () => {
    await Album.countFilesInDirectory();

    Album.currentBatch.value = 0; // Reset the current batch
    const initialPhotos = await Album.loadPhotos();
    photos.value = initialPhotos; // Overwrite the photos array

    const observer = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting) {
            await loadNextBatch();
        }
    });

    nextTick(() => {
        const sentinel = document.querySelector('#sentinel');
        if (sentinel) {
            observer.observe(sentinel);
        }

        if (enableTilting.value) {
            const images = document.querySelectorAll('.tilt');
            VanillaTilt.init(images, {
                max: 25,
                speed: 400
            });
        }
    });

    document.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeydown);
    photos.value = []; // Reset the photos array
    Album.currentBatch.value = 0; // Reset the current batch
});
</script>

<template>
    <h1 class="text-center text-3xl   mt-16 ">My photo portfolio</h1>

    <section class="bg-secondary pt-6 p-5 w-full bg-opacity-50 mx-auto rounded-3xl mt-7 mb-24 min-h-screen max-w-[1200px] relative grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        <v-lazy-image v-for="photo in photos" :key="photo.id"
                      :srcset="`${photo.photo_sm} 340w, ${photo.photo_md} 560w, ${photo.photo_lg} 900w, ${photo.photo_xl} 1500w`"
                      sizes="(max-width: 375px) 200px, (max-width: 768px) 250px, (max-width: 1024px) 450px,(max-width: 3024px) 1500px"
                      :src="photo.photo_xl"
                      :alt="photo.alt"
                      class="w-full object-cover aspect-square rounded-xl tilt cursor-pointer"
                      @click="openModal(photo.url)"/>
        <div id="sentinel" class="h-1"></div>
    </section>

    <div v-if="selectedImage" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center " @click="closeModal">
        <img :src="selectedImage" alt="HD photo" class="max-w-full max-h-full -z-10">
    </div>
</template>

<style scoped>
.v-lazy-image {
    filter: blur(10px);
    transition: filter 0.7s;
}
.v-lazy-image-loaded {
    filter: blur(0);
}
</style>
