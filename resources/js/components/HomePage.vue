<script setup>
import { ref, onMounted } from 'vue';
import { createLayout } from '../utils/layout.js';
import { initializeCardElements } from '../utils/cursor.js';

const layout = createLayout();
const cards = ref([]);



onMounted(() => {
    layout.getContainerSize();
    layout.getCards();
    layout.arrangeCards();
    initializeCardElements(cards, layout);

});



const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/assets/CV/Igor_Maciejak_CV.pdf';
    link.download = 'Igor_Maciejak_CV.pdf';
    link.click();
};

const viewCV = () => {
    window.open('/assets/CV/Igor_Maciejak_CV.pdf', '_blank');
};
</script>

<template>
    <section class="grid  xl:grid-cols-4 grid-cols-1 xl:gap-0 gap-10   lg:min-h-[500px] ">
        <div class="flex flex-col gap-2 mx-auto w-fit justify-center">
            <h1 class=" text-[48px] h-fit  xl:text-left text-center" style="animation-delay: 0s;">
                Igor Maciejak
            </h1>
            <p class=" text-[24px]  h-fit xl:text-left text-center" style="animation-delay: 0s;">
                Based in Gdynia, Poland
            </p>
            <div class="flex items-center animate-fade-left xl:mx-0 mx-auto" style="animation-delay: 0.5s;">
                <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                </span>
                <h5 class="ml-1.5 ">open for job offers</h5>
            </div>
        </div>
        <div class="xl:col-span-2  lg:col-span-1 md:p-10 p-0 xl:max-w-[650px]  lg:max-w-[600px] max-w-[550px] mx-auto">
            <img class="h-auto w-full  rounded-full  shadow-xl shadow-accent border border-accent border-opacity-50  p-[3%] bg-secondary animate-fade animate-once animate-ease-in" src="https://picsum.photos/500/500">
        </div>
         <div class="flex flex-col gap-2 justify-center   lg:mx-0 mx-auto  w-full text-right sm:text-[52px] text-[36px]">

                <h1 class="text-accent animate-fade-down xl:text-left text-center ">
                    Web Dev
                </h1>
                 <h2 class="text-[#D8A25E]  animate-fade-up xl:text-left text-center flex-col flex ">
                    <span class=" text-sm ">and freelance</span>
                    Photographer
                </h2>

        </div>
    </section>

    <section class="bg-secondary  animate-fade-up animate-once animate-duration-1000 min-h-[642px] animate-ease-linear p-5  bg-opacity-50  mx-auto  w-full mt-20  h-fit transition-transform duration-300 rounded-3xl  mb-20 shadow-accent shadow-2xl hidden xl:block overflow-x-scroll">
        <div class="container     relative  h-full  transition-all duration-500 w-[1500px] ">
            <div id="ghostCard" class="rounded-2xl bg-accent cursor-pointer absolute duration-500 transition-all opacity-0"></div>
             <div :id="layout.getNextKey()" size="3x3" class="flex flex-col text-secondary justify-between select-none animate-fade-up animate-once animate-ease-out card rounded-2xl border border-gray-300 p-4  border-opacity-15 cursor-pointer absolute   text-2xl text-bold bg-neutral">
                <iframe class="w-full h-full rounded-2xl " src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d176947.71646215045!2d18.469212004145366!3d54.52354239343998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fda145071ed789%3A0xdee2f99989236636!2sGdynia!5e1!3m2!1spl!2spl!4v1727367023123!5m2!1spl!2spl"  style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div :id="layout.getNextKey()" size="3x2" class=" flex flex-col gap-4 text-secondary text-2xl select-none animate-fade-up animate-once animate-ease-out card rounded-2xl border border-gray-300 border-opacity-15 cursor-pointer absolute flex items-center justify-center    text-bold bg-neutral">
                <i class="fa-solid fa-phone"></i>
                <h2 class="text-3xl">+48 725 262 368</h2>
            </div>
            <div :id="layout.getNextKey()" size="6x2" class=" select-none animate-fade-up animate-once animate-ease-out card rounded-2xl border border-gray-300 border-opacity-15 cursor-pointer absolute  p-5 text-white text-2xl text-bold bg-neutral">
                <h1 class="text-secondary  text-3xl mb-3">Experience</h1>
                <div class="px-3 pb-3 flex flex-row text-secondary items-center justify-between">
                    <span class="text-3xl font-bold  ">FullStack Web dev</span>
                    <div class="flex flex-col text-2xl font-semibold ">
                        <a href="https://pesi.pl/" target="_blank">Pesi</a>
                    </div>
                </div>
                <div class="px-3 pb-3 flex flex-row text-secondary items-center justify-between">
                    <span class="text-3xl font-bold  ">Photographer</span>
                    <div class="flex flex-col text-2xl font-semibold ">
                        <a>On 2 weddings</a>
                    </div>
                </div>
            </div>
            <div :id="layout.getNextKey()" size="3x1" class=" flex flex-col gap-4 text-secondary text-2xl select-none animate-fade-up animate-once animate-ease-out card rounded-2xl border border-gray-300 border-opacity-15 cursor-pointer absolute flex items-center justify-center    text-bold bg-neutral">
                <h2 class="text-2xl">you can move tiles</h2>
            </div>
            <div :id="layout.getNextKey()" size="2x2" class="select-none animate-fade-up animate-once animate-ease-out card rounded-2xl border border-gray-300 border-opacity-15 cursor-pointer absolute flex items-center justify-center text-white text-2xl text-bold bg-neutral">
                <a href="https://www.instagram.com/ratadorer.photography/" target="_blank" class="fa-brands fa-instagram text-[120px] text-secondary hover:text-text duration-300"></a>
            </div>
            <div :id="layout.getNextKey()" size="4x2" class="select-none animate-fade-up animate-once animate-ease-out card rounded-2xl border border-gray-300 border-opacity-15 cursor-pointer absolute flex items-center justify-center text-white text-2xl text-bold bg-neutral">
                <a href="mailto:igor.w.maciejak@gmail.com" target="_blank" class="fa-solid fa-envelope text-[120px] text-secondary hover:text-text duration-300"></a>
            </div>
            <div :id="layout.getNextKey()" size="2x2" class="select-none animate-fade-up animate-once animate-ease-out card rounded-2xl border border-gray-300 border-opacity-15 cursor-pointer absolute flex items-center justify-center text-white text-2xl text-bold bg-neutral">
                <a href="https://github.com/Cingciong/" target="_blank" class="fa-brands fa-github text-[120px] text-secondary hover:text-text duration-300"></a>
            </div>
            <div :id="layout.getNextKey()" size="2x2" class="select-none animate-fade-up animate-once animate-ease-out card rounded-2xl border border-gray-300 border-opacity-15 cursor-pointer absolute flex items-center justify-center text-white text-2xl text-bold bg-neutral">
                <a href="https://www.linkedin.com/in/igor-maciejak-745063253/" target="_blank" class="fa-brands fa-linkedin text-[120px] text-secondary hover:text-text duration-300"></a>
            </div>

            <div :id="layout.getNextKey()" size="4x1" class=" text-secondary flex flex-row justify-between select-none animate-fade-up animate-once animate-ease-out card rounded-2xl border border-gray-300 border-opacity-15 cursor-pointer absolute p-8 items-center  text-white text-2xl text-bold bg-neutral">
                <div class="flex flex-col text-secondary ">
                    <h3 class="text-xl">2024 CV</h3>
                    <h1 class="uppercase text-3xl font-semibold">RESUME</h1>
                </div>
                <div class="flex flex-row gap-5 text-secondary text-[32px]">
                    <button @click="downloadCV()" class="fa-solid fa-download hover:text-text duration-300"></button>
                    <button @click=" viewCV ()" class="fa-solid fa-eye hover:text-text duration-300"></button>
                </div>
            </div>

        </div>
    </section>
    <section class="  md:my-10  flex flex-wrap w-full h-full text-text gap-5 justify-center block xl:hidden">
        <div class="h-64 w-64 flex items-center justify-center border-text/10 border-2 p-10 rounded-3xl \ text-center py-auto">
            <a href="https://github.com/Cingciong/" target="_blank" class="fa-brands fa-github text-[120px] hover:text-text duration-300"></a>
        </div>
        <div class="h-64 w-64 flex items-center justify-center border-text/10 border-2 p-10 rounded-3xl \ text-center py-auto">
            <a href="https://www.linkedin.com/in/igor-maciejak-745063253/" target="_blank" class="fa-brands fa-linkedin text-[120px] hover:text-text duration-300"></a>
        </div>
        <div class=" h-64 w-64 flex items-center justify-center border-text/10 border-2 p-10 rounded-3xl \ text-center py-auto">
            <a href="https://www.instagram.com/ratadorer.photography/" target="_blank" class="fa-brands fa-instagram text-[120px]  hover:text-text duration-300"></a>
        </div>
        <div class=" border-text/10 border-2 p-2 rounded-3xl  text-center py-auto h-64 w-64">
            <iframe class=" w-full h-full rounded-3xl overflow-hidden" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d176947.71646215045!2d18.469212004145366!3d54.52354239343998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fda145071ed789%3A0xdee2f99989236636!2sGdynia!5e1!3m2!1spl!2spl!4v1727367023123!5m2!1spl!2spl"  style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

        </div>
        <div class=" border-text/10 border-2 p-10 rounded-3xl w-fit  py-auto h-64 md:block hidden">
            <h1 class="  text-3xl mb-3">Experience</h1>
            <div class="px-3 pb-3 flex flex-row items-center justify-between">
                <span class="text-3xl font-bold  ">FullStack Web dev</span>
                <div class="flex flex-col text-2xl font-semibold ">
                    <a href="https://pesi.pl/" target="_blank">Pesi</a>
                </div>
            </div>
            <div class="px-3 pb-3 flex flex-row  items-center justify-between">
                <span class="text-3xl font-bold  ">Photographer</span>
                <div class="flex flex-col text-2xl font-semibold ml-10">
                    <a>On 2 weddings</a>
                </div>
            </div>
        </div>
        <div class=" border-text/10 border-2 p-10 rounded-3xl w-fit h-full text-center py-auto ">
            <i class="fa-solid fa-phone text-[28px]  mb-2"></i>
            <h2 class="text-3xl">+48 725 262 368</h2>
        </div>
        <div class="border-text/10 border-2  p-5 rounded-3xl w-fit h-fit py-auto flex flex-row gap-10 w-32">
            <div class="flex flex-col  ">
                <h3 class="text-xl">2024 CV</h3>
                <h1 class="uppercase text-3xl font-semibold">RESUME</h1>
            </div>
            <div class="flex flex-row gap-5  text-[32px]">
                <button @click="downloadCV()" class="fa-solid fa-download hover:text-text duration-300"></button>
                <button @click=" viewCV ()" class="fa-solid fa-eye hover:text-text duration-300"></button>
            </div>
        </div>
    </section>



</template>

