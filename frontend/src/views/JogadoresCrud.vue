<template>
  <div class="container">
    <h2>Jogadores</h2>

    <form @submit.prevent="criar">
      <input v-model="novo.nome" placeholder="Nome" required />
      <input v-model="novo.numero" type="number" placeholder="Número" required />
      <input v-model="novo.idade" type="number" placeholder="Idade" required />

      <select v-model="novo.posicao" required>
        <option disabled value="">Posição</option>
        <option value="GR">GR</option>
        <option value="DEF">DEF</option>
        <option value="MED">MED</option>
        <option value="AV">AV</option>
      </select>

      <select v-model="novo.equipa" required>
        <option disabled value="">Equipa</option>
        <option v-for="e in equipas" :key="e.id" :value="e.id">
          {{ e.nome }}
        </option>
      </select>

      <button>Criar</button>
    </form>

    <ul>
      <li v-for="j in jogadores" :key="j.id">
        {{ j.nome }} (#{{ j.numero }})
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
      jogadores: [],
      equipas: [],
      novo: {},
    };
  },
  async mounted() {
    this.jogadores = (await api.get('jogadores/')).data;
    this.equipas = (await api.get('equipas/')).data;
  },
  methods: {
    async criar() {
      await api.post('jogadores/', this.novo);
      this.novo = {};
      this.jogadores = (await api.get('jogadores/')).data;
    },
    async remover(id) {
      await api.delete(`jogadores/${id}/`);
      this.jogadores = (await api.get('jogadores/')).data;
    },
  },
};
</script>
