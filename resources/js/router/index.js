import { createRouter, createWebHistory} from "vue-router";

import Layout from "../components/Layout.vue";

import Home from "../components/HomePage.vue";
import NotFound from "../components/NotFound.vue";
import Work from "../components/Work.vue";
import About from "../components/About.vue";
import Photos from "../components/Photos.vue";


const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            { path: '', component: Home },
            { path: 'work', component: Work },
            { path: 'about', component: About },
            { path: 'photos', component: Photos },
        ]
    },
    {
        path: "/:pathMatch(.*)*",
        component: NotFound,
    },
];3

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
