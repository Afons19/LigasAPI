import { createRouter, createWebHistory } from "vue-router";

// import Ligas from '@/views/Ligas.vue';
// import Equipas from '@/views/Equipas.vue';
// import Jogadores from '@/views/Jogadores.vue';
// import Jogos from '@/views/Jogos.vue';

// const routes = [
//     {path: '/', component: Ligas},
//     {path: '/equipas', component: Equipas},
//     {path: '/jogadores', component: Jogadores},
//     {path: '/jogos', component: Jogos},
// ];

const routes = [
    { path: '/', component: () => import('@/views/Home.vue')},
    { path: '/equipas/:id', component: () => import('@/views/EquipaDetalhe.vue') },
    { path: '/jogador/:id', component: () => import('@/views/JogadorDetalhe.vue')},
    { path: '/crud', component: () => import('@/views/Gerenciar.vue')}
]

export default createRouter({
    history: createWebHistory(),
    routes,
});