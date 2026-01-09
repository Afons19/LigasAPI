<script>
import api from '../services/api';

export default {
  data() {
    return {
      liga: null,
      equipas: [],
      loading: true,
      error: null,
      jogo: null,
      jogos: []
    };
  },    
  async mounted() {
    const id = this.$route.params.id;

    try {
      const [ligaRes, equipasRes, jogoRes] = await Promise.all([
        api.get(`/ligas/${id}/`),
        api.get(`/ligas/${id}/equipas/`),
        api.get(`jogos/`),
      ]);

      this.liga = ligaRes.data;
      this.equipas = equipasRes.data;
      
      this.jogos = jogoRes.data.filter(
        jogo => jogo.liga === this.liga.id
      );

    } catch (e) {
      console.error(e);
      
      if (e.response?.status === 404) {
        this.error = "Não foi possível carregar as equipas da liga.";
      } else {
        this.error = "Erro ao carregar dados da liga.";
      }
    } finally {
      this.loading = false;
    }
  }

};
</script>


<template>
    <div class="page">
        <div v-if="loading" class="loader"></div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else class="content">
            <header class="header">
                <h1>{{ liga.nome }}</h1>
                <div class="liga-meta">
                    <div class="liga-meta-item">
                        <strong>País:</strong>
                        <span>{{ liga.pais }}</span>
                    </div>
                    <div class="liga-meta-item">
                        <strong>Época:</strong>
                        <span>{{ liga.epoca }}</span>
                    </div>
                    <div class="liga-meta-item">
                        <strong>Início:</strong>
                        <span>{{ liga.data_inicio }}</span>
                    </div>
                    <div class="liga-meta-item">
                        <strong>Fim:</strong>
                        <span>{{ liga.data_fim }}</span>
                    </div>
                </div>
            </header>

            <section class="section">
                <h2>Equipas</h2>

                <div v-if="equipas.length === 0" class="empty">
                    Nenhuma equipa registada nesta liga.
                </div>

                <div class="grid">
                    <div v-for="equipa in equipas" :key="equipa.id" class="card"
                        @click="$router.push(`/equipas/${equipa.id}`)">
                        <h3>{{ equipa.nome }}</h3>
                        <p>{{ equipa.cidade }}</p>
                    </div>
                </div>
            </section>
            <section class="section lista-jogos">
                <h2>Jogos</h2>                
                <ul v-if="jogos.length" class="lista-jogos-itens">
                    <li v-for="jogo in jogos" :key="jogo.id">
                        {{ jogo.equipa_casa_nome }}
                        {{ jogo.golos_casa }} -
                        {{ jogo.golos_fora }}
                        {{ jogo.equipa_visitante_nome }}
                    </li>
                </ul>
            </section>
            <div class="action-buttons">
                <button class="btn btn-secondary" @click="$router.back()">
                    <i class="icon">←</i> Voltar
                </button>
            </div>
        </div>

    </div>
</template>

<style scoped>
body {
    font-family: Arial, Helvetica, sans-serif;
}

.page {
  padding: 30px;
}

.header {
  margin-bottom: 25px;
}

.header h1 {
  font-size: 50px;
}

.header {
  background: linear-gradient(135deg, #012a6c 50%, #123d81 40%);
  color: white;
  padding: 70px;
  border-radius: 10px;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
}

.header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" opacity="0.1"><path d="M0,0 L100,0 L100,100 Z" fill="white"/></svg>');
  background-size: cover;
}

.liga-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
  position: relative;
  z-index: 1;
}

.liga-meta-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.liga-meta-item strong {
  font-weight: 600;
}

.liga-meta-item span {
  font-weight: 500;
}

.section h2 {
    text-align: center;
    margin-bottom: 10px;
}

.lista-jogos {
    background-color: white;
    padding: 40px;
}

li {
    list-style-type: disc;
    
}

.lista-jogos-itens {
    font-size: 15pt;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.card {
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  transition: 0.2s;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.241);
}

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

.btn-secondary {
  background: white;
  color: #475569;
  border: 2px solid #cbd5e1;
}

.btn-secondary:hover {
  background: #f1f5f9;
  border-color: #94a3b8;
}


.empty {
  color: #94a3b8;
  font-style: italic;
}

.error {
  color: #f87171;
}

.loader {
  width: 40px;
  height: 40px;
  border: 4px solid #1e293b;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 50px auto;
}

@keyframes spin {
  0% { transform: rotate(0); }
  100% { transform: rotate(360deg); }
}
</style>
