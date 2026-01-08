<template>
  <div class="container">
    <h2>{{ jogador.nome }}</h2>
    <p><strong>Posição:</strong> {{ jogador.posicao }}</p>
    <p><strong>Número:</strong> {{ jogador.numero }}</p>
    <p><strong>Idade:</strong> {{ jogador.idade }}</p>
    <p><strong>Equipa:</strong> {{ jogador.equipa_nome }}</p>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return { jogador: {} };
  },
  async mounted() {
    const id = this.$route.params.id;
    const res = await api.get(`jogadores/${id}/`);
    this.jogador = res.data;
  },
};
</script>
