<script setup>
import { onMounted } from 'vue';
import Navbar from "@/components/navbar.vue";
import { generateNoiseCanvas, setNoiseBackground } from '../utils/noise.js'; // Import the functions

function animateElements(moveSpeed = 2, rotateSpeed = 0.5, maxRotation = 20) {
    const elements = document.querySelectorAll('.moving-element');

    elements.forEach(element => {
        let posX = Math.random() * window.innerWidth;
        let posY = Math.random() * window.innerHeight;
        let angle = Math.random() * 360;
        let directionX = (Math.random() - 0.5) * 2;
        let directionY = (Math.random() - 0.9) * 2; // Favor upward movement
        let rotationSpeed = (Math.random() - 0.5) * 2 * rotateSpeed;

        function animate() {
            posX += directionX * moveSpeed;
            posY += directionY * moveSpeed;
            angle += rotationSpeed;

            // Limit the rotation angle
            if (angle > maxRotation) angle = maxRotation;
            if (angle < -maxRotation) angle = -maxRotation;

            // Adjust movement to keep elements within bounds
            if (posX < window.innerWidth * 0.05 || posX > window.innerWidth * 0.95) directionX *= -1;
            if (posY < window.innerHeight * 0.05 || posY > window.innerHeight * 0.95) directionY *= -1;

            element.style.transform = `translate(${posX}px, ${posY}px) rotate(${angle}deg)`;
            requestAnimationFrame(animate);
        }

        animate();
    });
}

function followMouse(elementId, speed = 0.1) {
    const element = document.getElementById(elementId);
    let mouseX = 0, mouseY = 0;
    let elementX = 0, elementY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX - element.offsetWidth / 2;
        mouseY = event.clientY - element.offsetHeight / 2;
    });

    function animate() {
        elementX += (mouseX - elementX) * speed;
        elementY += (mouseY - elementY) * speed;
        element.style.transform = `translate(${elementX}px, ${elementY}px)`;
        requestAnimationFrame(animate);
    }

    animate();
}

onMounted(() => {
    const pointSize = 4; // Adjust this value to control the size of noise points
    const color1 = [160, 160, 160]; // First color (black)
    const color2 = [255, 255, 255]; // Second color (white)
    setNoiseBackground('background', 800, 600, pointSize, color1, color2);
    followMouse('follow-mouse', 0.1);
    animateElements(0.5, 1, 20); // Adjust these values to control move, rotate speeds, and max rotation
});
</script>

<template>
    <main id="background" class="overflow-hidden relative  font-main h-fit flex flex-col gap-20 w-full text-text animate-duration-600">
        <div class="absolute inset-0 bg-primary bg-opacity-90"></div>
        <div id="follow-mouse" class="w-[400px] h-[400px] bg-gradient-to-r from-teal-400/60 to-yellow-200/60 rounded-full pointer-events-none blur-3xl fixed z-10  translate-y-1/2 translate-x-1/2"></div>
        <div class="absolute inset-0 bg-primary opacity-50 z-0"></div>
        <div class="moving-element h-full w-32 bg-gradient-to-r from-sky-500/30 to-lime-500/30 top-0 absolute blur-3xl"></div>
        <div class="moving-element h-full w-48 bg-gradient-to-r from-red-600/30 to-lime-500/30 absolute top-0 blur-3xl"></div>
        <div class="moving-element h-full w-14 bg-gradient-to-r from-lime-500/30 to-fuchsia-900/30 absolute top-0 blur-3xl"></div>
        <div class="flex justify-center w-full fixed top-0  backdrop-blur-xl z-20 bg-secondary/10 shadow-2xl  shadow-secondary/30 h-[74px]">
            <Navbar />
        </div>
        <div class="h-fit flex flex-col gap-20 xl:w-10/12 w-9/12 mx-auto relative  max-w-[1500px] z-10 pt-24">
            <router-view />
        </div>
        <footer class="relative z-20">
            <div class="text-center text-text py-5 leading-9">
                <p>&copy; 2024 <strong class="text-accent font-bold">Igor Maciejak</strong>. All rights reserved.
                    <br>
                    Page made by  <strong class="text-accent font-bold">Igor Maciejak</strong>.</p>
            </div>
        </footer>
    </main>

</template>

<style scoped>

</style>
