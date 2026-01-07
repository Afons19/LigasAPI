import { createRouter, createWebHistory } from "vue-router";

import Ligas from '@/views/Ligas.vue';
import Equipas from '@/views/Equipas.vue';
import Jogadores from '@/views/Jogadores.vue';
import Jogos from '@/views/Jogos.vue';

const routes = [
    {path: '/', component: Ligas},
    {path: '/equipas', component: Equipas},
    {path: '/jogadores', component: Jogadores},
    {path: '/jogos', component: Jogos},
];

export default createRouter({
    history: createWebHistory(),
    routes,
});