<template>
  <div class="container">
    <h2>Equipas</h2>

    <form @submit.prevent="criar">
      <input v-model="nova.nome" placeholder="Nome" required />
      <input v-model="nova.cidade" placeholder="Cidade" required />
      <input v-model="nova.treinador" placeholder="Treinador" required />
      <input v-model="nova.ano_fundacao" type="number" placeholder="Ano" required />

      <select v-model="nova.liga" required>
        <option disabled value="">Liga</option>
        <option v-for="l in ligas" :key="l.id" :value="l.id">
          {{ l.nome }}
        </option>
      </select>

      <button>Criar</button>
    </form>

    <ul>
      <li v-for="e in equipas" :key="e.id">
        {{ e.nome }} - {{ e.treinador }}
        <button @click="remover(e.id)">Remover</button>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      equipas: [],
      ligas: [],
      nova: {},
    };
  },
  async mounted() {
    this.equipas = (await api.get('equipas/')).data;
    this.ligas = (await api.get('ligas/')).data;
  },
  methods: {
    async criar() {
      await api.post('equipas/', this.nova);
      this.nova = {};
      this.equipas = (await api.get('equipas/')).data;
    },
    async remover(id) {
      await api.delete(`equipas/${id}/`);
      this.equipas = (await api.get('equipas/')).data;
    },
  },
};
</script>
