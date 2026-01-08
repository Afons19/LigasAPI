<template>
  <div class="container">
    <h2>Jogos</h2>

    <form @submit.prevent="criar">
      <select v-model="novo.liga" required>
        <option disabled value="">Liga</option>
        <option v-for="l in ligas" :key="l.id" :value="l.id">
          {{ l.nome }}
        </option>
      </select>

      <select v-model="novo.equipa_casa" required>
        <option disabled value="">Casa</option>
        <option v-for="e in equipas" :key="e.id" :value="e.id">
          {{ e.nome }}
        </option>
      </select>

      <select v-model="novo.equipa_visitante" required>
        <option disabled value="">Visitante</option>
        <option v-for="e in equipas" :key="e.id" :value="e.id">
          {{ e.nome }}
        </option>
      </select>

      <button>Criar</button>
    </form>

    <ul>
      <li v-for="j in jogos" :key="j.id">
        {{ j.equipa_casa_nome }} vs {{ j.equipa_visitante_nome }}
        <button @click="remover(j.id)">Remover</button>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      jogos: [],
      ligas: [],
      equipas: [],
      novo: {},
    };
  },
  async mounted() {
    this.jogos = (await api.get('jogos/')).data;
    this.ligas = (await api.get('ligas/')).data;
    this.equipas = (await api.get('equipas/')).data;
  },
  methods: {
    async criar() {
      await api.post('jogos/', this.novo);
      this.novo = {};
      this.jogos = (await api.get('jogos/')).data;
    },
    async remover(id) {
      await api.delete(`jogos/${id}/`);
      this.jogos = (await api.get('jogos/')).data;
    },
  },
};
</script>
