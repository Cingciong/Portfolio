<script setup>
import { ref, onMounted } from 'vue';
import { createLayout } from '../utils/layout.js';
import { initializeCardElements } from '../utils/cursor.js';

const layout = createLayout();
const cards = ref([]);

onMounted(async () => {
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


            <section class=" grid grid-cols-4">
                <div class="flex flex-col gap-2  justify-center">
                    <h2 class="text-6xl animate-fade-left">Igor Maciejak</h2>
                    <p class="text-lg text-left animate-fade-right">
                        Based in Gdynia, Poland
                        <br>
                        <div class="flex  items-center animate-fade-left">
                            <span class="relative flex h-2 w-2">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                            </span>
                            <h5 class="ml-1.5">open for job offers</h5>
                        </div>
                    </p>
                </div>
                <img class="h-[650px] w-[650px] col-span-2  rounded-full mx-auto
                shadow-xl shadow-accent
                border border-accent border-opacity-50 p-4 bg-secondary
animate-fade animate-once animate-ease-in" src="https://picsum.photos/1000/1000">
                <div class="flex flex-col gap-2 justify-center w-fit pl-auto text-5xl ml-5">

                    <h1 class="  w-fit  flex flex-col text-right">
                        <span class="text-accent animate-fade-down ">

                            Web Dev
                        </span>
                        <span class="text-[#D8A25E]  animate-fade-up">
                            <span class="text-2xl">freelance</span>
                            Photographer
                        </span>
                    </h1>

                </div>

            </section>

            <div class="bg-secondary p-5 w-[1250px] bg-opacity-50 mx-auto rounded-3xl mt-20 mb-20 shadow-accent shadow-2xl">
                <section class="container mx-auto w-[1200px] min-h-screen relative l">
                    <div id="ghostCard" class="rounded-2xl bg-accent cursor-pointer absolute duration-500 transition-all opacity-0"></div>
                    <div :id="layout.getNextKey()" size="5x3" class="flex flex-col text-secondary select-none animate-fade-up animate-once animate-ease-out card rounded-2xl border border-gray-300 p-8  border-opacity-15 cursor-pointer absolute   text-2xl text-bold bg-base">
                        <h1 class="text-2xl font-semibold mb-5">Hi welcome to my web page</h1>
                        <p>i'm currently looking for job or any form of new expiearence on field of IT and photography</p>

                    </div>
                    <div :id="layout.getNextKey()" size="5x3" class="flex flex-col text-secondary justify-between select-none animate-fade-up animate-once animate-ease-out card rounded-2xl border border-gray-300 p-8  border-opacity-15 cursor-pointer absolute   text-2xl text-bold bg-neutral">
                        <h1 class="text-3xl mb-2">About Me</h1>
                        <p class="line-clamp-4">I'm a student at Gdańsk University of Technology, studying Automation, Cybernetics, and Robotics. I'm passionate
                            about these fields for their blend of cutting-edge technology and real-world problem solving. I enjoy learning about
                            3d printing, web development, arduino, and constantly seek to improve my skills and stay updated with industry advancements.</p>
                        <button class="border-2   rounded-full px-2 bg-secondary bg-opacity-15 border-secondary w-fit ml-auto">Learn more</button>
                    </div>
                    <div :id="layout.getNextKey()" size="3x3" class="flex flex-col text-secondary justify-between select-none animate-fade-up animate-once animate-ease-out card rounded-2xl border border-gray-300 p-4  border-opacity-15 cursor-pointer absolute   text-2xl text-bold bg-neutral">
                        <iframe class="w-full h-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d176947.71646215045!2d18.469212004145366!3d54.52354239343998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fda145071ed789%3A0xdee2f99989236636!2sGdynia!5e1!3m2!1spl!2spl!4v1727367023123!5m2!1spl!2spl"  style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div :id="layout.getNextKey()" size="3x2" class=" flrx flex-col gap-4 text-secondary text-2xl select-none animate-fade-up animate-once animate-ease-out card rounded-2xl border border-gray-300 border-opacity-15 cursor-pointer absolute flex items-center justify-center    text-bold bg-neutral">
                        <i class="fa-solid fa-phone"></i>
                        <h2 class="text-3xl">+48 725 262 368</h2>
                    </div>
                    <div :id="layout.getNextKey()" size="2x2" class="select-none animate-fade-up animate-once animate-ease-out card rounded-2xl border border-gray-300 border-opacity-15 cursor-pointer absolute flex items-center justify-center text-white text-2xl text-bold bg-neutral">
                        <a href="https://github.com/Cingciong/" target="_blank" class="fa-brands fa-github text-[120px] text-secondary hover:text-text duration-300"></a>
                    </div>

                    <div :id="layout.getNextKey()" size="2x2" class="select-none animate-fade-up animate-once animate-ease-out card rounded-2xl border border-gray-300 border-opacity-15 cursor-pointer absolute flex items-center justify-center text-white text-2xl text-bold bg-neutral">
                        <a href="https://www.linkedin.com/in/igor-maciejak-745063253/" target="_blank" class="fa-brands fa-linkedin text-[120px] text-secondary hover:text-text duration-300"></a>
                    </div>
                    <div :id="layout.getNextKey()" size="6x2" class=" select-none animate-fade-up animate-once animate-ease-out card rounded-2xl border border-gray-300 border-opacity-15 cursor-pointer absolute  p-5 text-white text-2xl text-bold bg-neutral">
                        <h1 class="text-secondary  text-3xl mb-3">Expireance</h1>
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

                    <div :id="layout.getNextKey()" size="2x2" class="select-none animate-fade-up animate-once animate-ease-out card rounded-2xl border border-gray-300 border-opacity-15 cursor-pointer absolute flex items-center justify-center text-white text-2xl text-bold bg-neutral">
                        <a href="https://www.instagram.com/ratadorer.photography/" target="_blank" class="fa-brands fa-instagram text-[120px] text-secondary hover:text-text duration-300"></a>
                    </div>

                    <div :id="layout.getNextKey()" size="4x2" class="select-none animate-fade-up animate-once animate-ease-out card rounded-2xl border border-gray-300 border-opacity-15 cursor-pointer absolute flex items-center justify-center text-white text-2xl text-bold bg-neutral">
                        <a href="mailto:igor.w.maciejak@gmail.com" target="_blank" class="fa-solid fa-envelope text-[120px] text-secondary hover:text-text duration-300"></a>
                    </div>

                </section>
            </div>

</template>

