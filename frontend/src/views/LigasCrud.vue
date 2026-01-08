<template>
  <div class="container">
    <h2>Ligas</h2>

    <form @submit.prevent="criarLiga">
      <input v-model="nova.nome" placeholder="Nome" required />
      <input v-model="nova.pais" placeholder="País" required />
      <input v-model="nova.epoca" placeholder="Época" required />
      <button>Criar</button>
    </form>

    <ul>
      <li v-for="liga in ligas" :key="liga.id">
        {{ liga.nome }} ({{ liga.epoca }})
        <button @click="remover(liga.id)">Remover</button>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      ligas: [],
      nova: {},
    };
  },
  mounted() {
    this.carregar();
  },
  methods: {
    async carregar() {
      this.ligas = (await api.get('ligas/')).data;
    },
    async criarLiga() {
      await api.post('ligas/', this.nova);
      this.nova = {};
      this.carregar();
    },
    async remover(id) {
      await api.delete(`ligas/${id}/`);
      this.carregar();
    },
  },
};
</script>
