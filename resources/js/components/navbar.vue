<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const ballClassIndex = ref(0);
const ballClasses = ['right-[88%]', 'right-[66%]', 'right-[41%]', 'right-6'];
const route = useRoute();

const updateBallClass = () => {
    switch (route.path) {
        case '/work':
            ballClassIndex.value = 1;
            break;
        case '/about':
            ballClassIndex.value = 2;
            break;
        case '/photos':
            ballClassIndex.value = 3;
            break;
        default:
            ballClassIndex.value = 0;
    }
};

watch(route, updateBallClass, { immediate: true });
</script>

<template>
    <nav class="justify-between flex pt-10 animate-fade animate-once animate-ease-in animate-duration-400">
        <h1>Igor M.</h1>
        <nav class="flex flex-row gap-2 relative">
            <router-link to="/">Home</router-link>
            <router-link to="/work">Work</router-link>
            <router-link to="/about">About</router-link>
            <router-link to="/photos">Photos</router-link>
            <div :class="['bg-accent', 'rounded-full', 'w-2', 'h-2', 'absolute', '-bottom-4', 'transition-all', 'duration-300', 'shadow-2xl', ballClasses[ballClassIndex]]"></div>
        </nav>
    </nav>
</template>

<style scoped>

</style>
