<script setup>
import Navbar from "@/components/navbar.vue";
</script>

<template>
    <div class="bg-primary  font-main h-fit flex flex-col gap-20 w-full text-text animate-duration-600">
        <div class="h-fit flex flex-col gap-20 w-[1500px] mx-auto ">
        <Navbar/>
        <router-view/>
        </div>
    </div>
</template>

<style scoped>

</style>
