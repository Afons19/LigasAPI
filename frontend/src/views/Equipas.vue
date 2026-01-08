<!-- <script>
    import api from '@/services/api.js';

    export default {
        data() {
            return { equipas: [] };
        },

        mounted() {
            api.get('equipas/')
            .then(r => this.equipas = r.data);
        },
    };
</script>
<template>
    <div>
        <h2>Equipas</h2>
        <ul>
            <li v-for="equipa in equipas" :key="equipa.id">
                {{ equipa.nome }} - {{ equipa.treinador }}
            </li>
        </ul>
    </div>
</template> -->
<script>
import api from '../services/api';

export default {
  data() {
    return {
      equipa: {},
      jogadores: [],
    };
  },
  async mounted() {
    const id = this.$route.params.id;

    const equipa = await api.get(`equipas/${id}/`);
    const jogadores = await api.get('jogadores/');

    this.equipa = equipa.data;
    this.jogadores = jogadores.data.filter(
      j => j.equipa === this.equipa.id
    );
  },
};
</script>

<template>
  <div class="container">
    <h2>{{ equipa.nome }}</h2>

    <div class="info">
      <p><strong>Cidade:</strong> {{ equipa.cidade }}</p>
      <p><strong>Treinador:</strong> {{ equipa.treinador }}</p>
      <p><strong>Ano:</strong> {{ equipa.ano_fundacao }}</p>
      <p><strong>Liga:</strong> {{ equipa.liga_nome }}</p>
    </div>

    <h3>Jogadores</h3>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Posição</th>
          <th>Nº</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="j in jogadores" :key="j.id">
          <td>{{ j.nome }}</td>
          <td>{{ j.posicao }}</td>
          <td>{{ j.numero }}</td>
          <td>
            <button @click="$router.push(`/jogadores/${j.id}`)">
              Ver detalhes
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
