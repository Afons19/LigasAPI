<script>
import api from '../services/api';
import StatCard from '../components/StatCard.vue';
import LigaCard from '../components/LigaCard.vue';

export default {
  components: { StatCard, LigaCard },
  data() {
    return {
      stats: {},
      ligas: [],
      equipas: [],
    };
  },
  async mounted() {
    const [ligas, equipas, jogadores, jogos] = await Promise.all([
      api.get('ligas/'),
      api.get('equipas/'),
      api.get('jogadores/'),
      api.get('jogos/'),
    ]);

    this.stats = {
      ligas: ligas.data.length,
      equipas: equipas.data.length,
      jogadores: jogadores.data.length,
      jogos: jogos.data.length,
    };

    this.ligas = ligas.data;
    this.equipas = equipas.data;
  },
};
</script>

<template>
  <div class="container">
    <!-- Estatísticas -->
    <div class="stats">
      <StatCard title="Ligas" :value="stats.ligas" />
      <StatCard title="Equipas" :value="stats.equipas" />
      <StatCard title="Jogadores" :value="stats.jogadores" />
      <StatCard title="Jogos" :value="stats.jogos" />
    </div>

    <!-- Ligas e jogos -->
    <section>
      <h2>Ligas e Jogos</h2>
      <LigaCard
        v-for="liga in ligas"
        :key="liga.id"
        :liga="liga"
      />
    </section>

    <!-- Equipas -->
    <section>
      <h2>Equipas</h2>
      <div class="grid">
        <div
          class="card"
          v-for="equipa in equipas"
          :key="equipa.id"
          @click="$router.push(`/equipas/${equipa.id}`)"
        >
          <h3>{{ equipa.nome }}</h3>
          <p>{{ equipa.cidade }}</p>
          <small>{{ equipa.liga_nome }}</small>
        </div>
      </div>
    </section>
  </div>
</template>
