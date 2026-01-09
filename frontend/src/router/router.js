import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import LigaDetalhe from "@/views/LigaDetalhe.vue";
import EquipaDetalhe from "@/views/EquipaDetalhe.vue";
import JogadorDetalhe from "@/views/JogadorDetalhe.vue";
import Gerenciar from "@/views/Gerenciar.vue";

const routes = [
    {
        path: '/', 
        component: Home
    },
    {
        path: '/ligas/:id',
        component: LigaDetalhe
    },
    {
        path: '/equipas/:id',
        component: EquipaDetalhe
    },
    {
        path: '/jogador/:id',
        component: JogadorDetalhe
    },
    {
        path: '/gerenciar',
        component: Gerenciar
    }

]

export default createRouter({
    history: createWebHistory(),
    routes,
});