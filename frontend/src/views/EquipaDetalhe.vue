<script>
import api from '../services/api';

export default {
  data() {
    return {
      liga: {},
      equipa: {},
      jogadores: [],
      ligas: [],
    };
  },
  async mounted() {
    const id = this.$route.params.id;

    try {
      // Buscar equipa
      const equipaRes = await api.get(`equipas/${id}/`);
      this.equipa = equipaRes.data;

      // Buscar todas as ligas para mapear o nome
      const ligasRes = await api.get('ligas/');
      this.ligas = ligasRes.data;

      // Mapear o nome da liga
      if (this.equipa.liga) {
        this.liga = this.ligas.find(l => l.id === this.equipa.liga);
      }

      console.log('Equipa completo:', JSON.stringify(this.equipa, null, 2));

      // Buscar apenas jogadores desta equipa
      const jogadoresRes = await api.get('jogadores/');
      this.jogadores = jogadoresRes.data.filter(
        j => j.equipa === this.equipa.id
      );
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  },
  methods: {
    verJogador(id) {
      this.$router.push(`/jogador/${id}`);
    },
  },
};
</script>

<template>
  <div class="container">
    <!-- Dados da Equipa -->
    <div class="card">
      <h2>{{ equipa.nome }}</h2>

      <p><strong>Cidade:</strong> {{ equipa.cidade }}</p>
      <p><strong>Treinador:</strong> {{ equipa.treinador }}</p>
      <p><strong>Ano de fundação:</strong> {{ equipa.ano_fundacao }}</p>
      <p><strong>Liga:</strong> {{ liga.nome }}</p>
    </div>

    <!-- Jogadores -->
    <div class="card">
      <h3>Jogadores</h3>

      <table v-if="jogadores.length">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Posição</th>
            <th>Nº</th>
            <th>Idade</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="j in jogadores" :key="j.id">
            <td>{{ j.nome }}</td>
            <td>{{ j.posicao }}</td>
            <td>{{ j.numero }}</td>
            <td>{{ j.idade }}</td>
            <td>
              <button @click="verJogador(j.id)">
                Ver detalhes
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else class="empty">Nenhum jogador registado.</p>
    </div>
  </div>
</template>
