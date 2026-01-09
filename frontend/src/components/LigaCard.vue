<script>
  import api from '@/services/api';

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
    try {
      const res = await api.get('jogos/');
      this.jogos = res.data.filter(
        jogo => jogo.liga === this.liga.id
      );
      
      // console.log('Jogos:', JSON.stringify(this.jogos, null, 2));
    } catch (e) {
      console.error('Erro ao carregar jogos', e);
    }
  },
};
</script>


<template>
  <div class="liga-card">
    <h3>{{ liga.nome }}</h3>

    <ul v-if="jogos.length">
      <li v-for="jogo in jogos" :key="jogo.id">
        {{ jogo.equipa_casa_nome }}
        {{ jogo.golos_casa }} -
        {{ jogo.golos_fora }}
        {{ jogo.equipa_visitante_nome }}
      </li>
    </ul>

    <p v-else>Sem jogos registados</p>
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
