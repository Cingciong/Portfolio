<template>
    <article class="flex flex-col items-center mb-10 w-1/2">
        <div class="flex flex-col gap-10 justify-center text-center">
            <h2 class="text-4xl font-semibold text-balance" style="animation-delay: 0s;">
                <a :href="link" class="text-balance hover:underline">{{ title }}</a>
            </h2>
            <button @click="toggleContent" :class="['text-3xl p-5 rounded-full border border-gray-500/50 bg-gray-900/20 text-text hover:opacity-50 duration-300 h-14 w-14 text-center flex justify-center items-center mx-auto', isCollapsed ? 'rotate-180' : 'rotate-0']">
                ▼
            </button>
            <ul :class="['text-xl leading-10 w-fit list-disc text-left transition-height duration-500', isCollapsed ? 'h-0 overflow-hidden' : 'h-auto']">
                <slot></slot>
            </ul>
        </div>
    </article>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    title: String,
    link: String
});

const isCollapsed = ref(true);

const toggleContent = () => {
    isCollapsed.value = !isCollapsed.value;
};
</script>

<style scoped>
.transition-height {
    transition: height 2s ease;
}
</style>
