<script>
import api from '../services/api';

export default {
  name: 'LigaCard',
  props: {
    liga: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      jogos: [],
    };
  },
  async mounted() {
    const res = await api.get('jogos/');
    this.jogos = res.data.filter(j => j.liga === this.liga.id);
  },
};
</script>

<template>
  <div class="liga-card">
    <h3>{{ liga.nome }} ({{ liga.epoca }})</h3>
    <p class="pais">{{ liga.pais }}</p>

    <ul v-if="jogos.length">
      <li v-for="jogo in jogos" :key="jogo.id">
        {{ jogo.equipa_casa_nome }}
        {{ jogo.golos_casa }} -
        {{ jogo.golos_visitante }}
        {{ jogo.equipa_visitante_nome }}
      </li>
    </ul>

    <p v-else class="empty">Sem jogos registados</p>
  </div>
</template>

<style scoped>
.liga-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.liga-card h3 {
  margin: 0;
  color: #1e293b;
}

.pais {
  color: #64748b;
  margin-bottom: 10px;
}

ul {
  padding-left: 20px;
}

li {
  margin-bottom: 5px;
}

.empty {
  font-style: italic;
  color: #94a3b8;
}
</style>
