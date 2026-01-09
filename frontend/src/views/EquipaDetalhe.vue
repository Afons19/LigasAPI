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
    <!-- Cabeçalho da equipa -->
    <div class="equipa-header">
      <h1>{{ equipa.nome }}</h1>
      <div class="equipa-meta">
        <div class="equipa-meta-item">
          <strong>Cidade:</strong>
          <span>{{ equipa.cidade }}</span>
        </div>
        <div class="equipa-meta-item">
          <strong>Treinador:</strong>
          <span>{{ equipa.treinador }}</span>
        </div>
        <div class="equipa-meta-item">
          <strong>Fundado em:</strong>
          <span>{{ equipa.ano_fundacao }}</span>
        </div>
        <div class="equipa-meta-item">
          <strong>Liga:</strong>
          <span>{{ liga.nome }}</span>
        </div>
      </div>
    </div>

    <!-- Lista de jogadores -->
    <div class="card">
      <h2>Plantel</h2>
      
      <div class="jogadores-tabela" v-if="jogadores.length">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Posição</th>
              <th>Nº</th>
              <th>Idade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="j in jogadores" :key="j.id">
              <td>{{ j.nome }}</td>
              <td>
                <span :class="['posicao-badge', j.posicao.toLowerCase().replace(' ', '-')]">
                  {{ j.posicao }}
                </span>
              </td>
              <td><strong>{{ j.numero }}</strong></td>
              <td>{{ j.idade }} anos</td>
              <td>
                <button class="btn-primary btn-small" @click="verJogador(j.id)">
                  Ver detalhes
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p v-else class="empty">Nenhum jogador registado nesta equipa.</p>
    </div>
      <div class="action-buttons">
        <button class="btn btn-secondary" @click="$router.back()">
          <i class="icon">←</i> Voltar
        </button>
      </div>
  </div>
</template>

<style scoped>
body {
  font-family: Arial, Helvetica, sans-serif;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  margin: 0;
  min-height: 100vh;
}

.container {
  padding: 30px;
  max-width: 1400px;
  margin: 0 auto;
}

/* Cards gerais */
.card {
  background: white;
  padding: 25px;
  margin: 15px 0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #3b82f6;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Específicos para EquipaDetalhe */
.equipa-header {
  background: linear-gradient(135deg, #012a6c 50%, #123d81 40%);
  color: white;
  padding: 40px;
  border-radius: 10px;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
}

.equipa-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" opacity="0.1"><path d="M0,0 L100,0 L100,100 Z" fill="white"/></svg>');
  background-size: cover;
}


.equipa-header h1 {
  font-size: 2.5rem;
  margin: 0 0 10px 0;
  position: relative;
  z-index: 1;
}

.equipa-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
  position: relative;
  z-index: 1;
}

.equipa-meta-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.equipa-meta-item strong {
  font-weight: 600;
}

.equipa-meta-item span {
  font-weight: 500;
}

/* Tabela de jogadores */
.jogadores-tabela {
  text-align: center;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin: 20px 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

table > thead > tr > th {
  text-align: center;
}

thead {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

th {
  padding: 18px 16px;
  text-align: left;
  font-weight: 600;
  color: #1e293b;
  border-bottom: 2px solid #e2e8f0;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

td {

  padding: 16px;
  border-bottom: 1px solid #f1f5f9;
  color: #475569;
  transition: background 0.2s;
}

tbody tr:hover {
  background: #f8fafc;
}

tbody tr:last-child td {
  border-bottom: none;
}

/* Badges para posições */
.posicao-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
}

.posicao-badge.defesa {
  background: #10b981;
  color: white;
}

.posicao-badge.medio {
  background: #3b82f6;
  color: white;
}

.posicao-badge.ataque {
  background: #ef4444;
  color: white;
}

.posicao-badge.guarda-redes {
  background: #8b5cf6;
  color: white;
}

/* Botões */
button {
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(59, 130, 246, 0.3);
}

.btn-secondary {
  background: white;
  color: #475569;
  border: 2px solid #cbd5e1;
}

.btn-secondary:hover {
  background: #f1f5f9;
  border-color: #94a3b8;
}

.btn-small {
  padding: 6px 12px;
  font-size: 0.85rem;
}

/* Estado vazio */
.empty {
  text-align: center;
  padding: 40px;
  color: #64748b;
  font-style: italic;
  background: #f8fafc;
  border-radius: 8px;
  border: 2px dashed #cbd5e1;
}

/* Responsividade */
@media (max-width: 768px) {
  .container {
    padding: 15px;
  }
  
  .equipa-header {
    padding: 25px;
  }
  
  .equipa-header h1 {
    font-size: 2rem;
  }
  
  .equipa-meta {
    flex-direction: column;
    gap: 10px;
  }
  
  th, td {
    padding: 12px 8px;
  }
  
  .stats {
    grid-template-columns: 1fr;
  }
  
  .grid {
    grid-template-columns: 1fr;
  }
}

/* Animações */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fadeIn 0.5s ease-out;
}

/* Loader (pode ser usado enquanto carrega) */
.loader {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>