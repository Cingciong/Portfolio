<template>
    <section class="w-3/4 mx-auto flex flex-col ">
        <h1 class="text-5xl text-center mb-28">About me</h1>
        <article class="grid grid-cols-2 mb-28 justify-center items-center">
            <img class="rounded-3xl h-auto w-11/12 cursor-pointer transform transition-transform duration-300 hover:scale-110 bg-white bg-opacity-0 hover:bg-opacity-15" src="../../../public/assets/page/pesi.png" alt="Pesi">
            <div class="flex flex-col gap-10 justify-center ml-10">
                <h2 class="text-4xl typing" style="animation-delay: 0s; color: #D8A25E;">Who I Am</h2>
                <p class="text-xl leading-10 w-fit">
                    I'm a {{ age }}-year-old passionate about technology and creativity. I started working in IT at 17, gaining experience in both front-end and back-end development. Beyond coding, I enjoy 3D printing, photography, and constantly exploring new ways to innovate. Currently, I’m studying at
                    <a href="https://pg.edu.pl/rekrutacja/rekrutacja-obywatele-polscy/studia-i-stopnia/wykaz-kierunkow/automatyka-cybernetyka-i-robotyka" class="text-neutral hover:underline hover:text-neutral/30 duration-300" style="text-decoration: none !important;">
                        <span>Gdańsk University of Technology, majoring in Automation, Robotics, and Cybernetics at ETI</span>
                    </a>, where I continue to develop my skills and pursue my passion for tech.
                </p>
            </div>
        </article>
        <div class="w-full h-1 bg-text blur-sm shadow-text shadow-2xl my-10 flex justify-center"></div>
    </section>

    <section class="mx-20 flex flex-col items-center gap-10">
        <h1 class="text-6xl text-center mb-16">IT</h1>
        <ArticleComponent
            title="Quadrator Simulation"
            link="https://github.com/Cingciong/Projekct-IV-sem.-2"
        >
            <li>A C++ project simulating quadrator flight dynamics.</li>
            <li>Developed in my 4th semester, showcasing my skills in physics-based simulations.</li>
            <li>Used object-oriented programming to create a realistic and interactive simulation environment.</li>
        </ArticleComponent>

        <ArticleComponent
            title="Twitter Copy in Laravel"
            link="https://github.com/Cingciong/Twitter-Copy-In-Laravel"
        >
            <li>A Twitter clone built using Laravel, showcasing full-stack web development skills.</li>
            <li>Implemented core functionalities like tweet posting, user authentication, and real-time feed updates.</li>
            <li>Focused on back-end development and integrating with front-end components using JavaScript.</li>
        </ArticleComponent>

        <ArticleComponent
            title="Pathfinding Algorithms Visualization"
            link="https://github.com/Cingciong/Pathfinding-Algorithms-Visualization"
        >
            <li>A web tool to visualize how pathfinding algorithms operate on a 2D grid.</li>
            <li>Built with Laravel and JavaScript, allowing interactive exploration of algorithms like A* and Dijkstra.</li>
            <li>This project helps users understand the intricacies of different pathfinding approaches through real-time visualization.</li>
        </ArticleComponent>

        <ArticleComponent
            title="Centrum Aktywności"
            link="https://github.com/Cingciong/centrumaktywnosci"
        >
            <li>This is a replica of the real website <a href="https://centrumaktywnosci.eu" target="_blank" class="text-secondary hover:underline">Centrum Aktywności</a>, with all original functionalities cloned.</li>
            <li>The site features room booking functionality, allowing users to book spaces for various events.</li>
            <li>I recreated the entire website using Laravel, Vue.js, and TailwindCSS, enhancing my skills in front-end and back-end development.</li>
            <li>Working on this project, I gained extensive experience with Vue.js, especially in handling dynamic user interfaces and integrating it with Laravel for a seamless user experience.</li>
        </ArticleComponent>
        <div class="w-full h-1 bg-text blur-sm shadow-text shadow-2xl my-10 flex justify-center"></div>
    </section>

    <section class="mx-20 flex flex-col items-center gap-10">
        <h1 class="text-6xl text-center mb-16">3D Printing</h1>

        <ArticleComponent
            title="3D Printing Journey"
            link="#"
        >
            <li>I've been passionate about 3D printing for over 3 years, continually honing my skills in designing and creating complex objects.</li>
            <li>Currently, I print using the Bambu Lab P1P, a high-performance machine that allows for precise and detailed prints.</li>
            <li>I especially enjoy creating intricate contraptions, like gearboxes and other mechanical systems, pushing the boundaries of what can be done with 3D printing.</li>
            <li>This hobby has taught me a lot about CAD design, mechanics, and material science, fueling my love for innovation and hands-on creativity.</li>
        </ArticleComponent>
    </section>
</template>

<script setup>
import { computed } from 'vue';
import ArticleComponent from './UI/ItArticle.vue';

const birthDate = new Date('2004-11-24');
const age = computed(() => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
});
</script>
