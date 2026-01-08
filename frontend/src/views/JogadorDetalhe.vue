<template>
  <div class="jogador-detalhe-container">
    <!-- Cabeçalho com fundo gradiente -->
    <div class="jogador-header">
      <div class="header-content">
        <div class="jogador-info">
          <div class="jogador-numero">{{ jogador.numero }}</div>
          <h1 class="jogador-nome">{{ jogador.nome }}</h1>
          <div class="jogador-metadata">
            <span class="badge posicao">{{ jogador.posicao }}</span>
            <span class="badge idade">{{ jogador.idade }} anos</span>
          </div>
        </div>
        <div class="equipa-info">
          <h3 class="equipa-nome">{{ jogador.equipa_nome }}</h3>
        </div>
      </div>
    </div>

    <!-- Conteúdo principal -->
    <div class="jogador-content">
      <div class="stats-grid">
        <!-- Card de informações básicas -->
        <div class="info-card">
          <div class="card-header">
            <h3><i class="icon">👤</i> Informações Pessoais</h3>
          </div>
          <div class="card-body">
            <div class="info-item">
              <span class="label">Nome Completo</span>
              <span class="value">{{ jogador.nome }}</span>
            </div>
            <div class="info-item">
              <span class="label">Idade</span>
              <span class="value">{{ jogador.idade }} anos</span>
            </div>
            <div class="info-item">
              <span class="label">Número da Camisa</span>
              <span class="value">{{ jogador.numero }}</span>
            </div>
          </div>
        </div>

        <!-- Card de carreira -->
        <div class="info-card">
          <div class="card-header">
            <h3><i class="icon">⚽</i> Carreira</h3>
          </div>
          <div class="card-body">
            <div class="info-item">
              <span class="label">Posição</span>
              <span class="value badge posicao">{{ jogador.posicao }}</span>
            </div>
            <div class="info-item">
              <span class="label">Equipa</span>
              <span class="value">{{ jogador.equipa_nome }}</span>
            </div>
            <div class="info-item">
              <span class="label">Status</span>
              <span class="value status active">Ativo</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Botões de ação -->
      <div class="action-buttons">
        <button class="btn btn-secondary" @click="$router.back()">
          <i class="icon">←</i> Voltar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return { 
      jogador: {
        nome: '',
        posicao: '',
        numero: '',
        idade: '',
        equipa_nome: ''
      } 
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    try {
      const res = await api.get(`jogadores/${id}/`);
      this.jogador = res.data;
    } catch (error) {
      console.error('Erro ao carregar dados do jogador:', error);
    }
  },
};
</script>

<style scoped>
.jogador-detalhe-container {
  min-height: 100vh;
  background: #f8fafc;
}

/* Header com gradiente */
.jogador-header {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  color: white;
  padding: 40px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 30px;
}

.jogador-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.jogador-numero {
  font-size: 4rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.2);
  line-height: 1;
}

.jogador-nome {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  color: white;
}

.jogador-metadata {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.badge {
  padding: 6px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge.posicao {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.badge.idade {
  background: #10b981;
  color: white;
}

.equipa-info {
  text-align: right;
}

.equipa-nome {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin: 0;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px 20px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
}

/* Conteúdo principal */
.jogador-content {
  max-width: 1200px;
  margin: -40px auto 0;
  padding: 0 20px 40px;
  position: relative;
  z-index: 1;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.info-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
}

.card-header {
  background: #f1f5f9;
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
}

.card-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  font-size: 1.2rem;
}

.card-body {
  padding: 25px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f1f5f9;
}

.info-item:last-child {
  border-bottom: none;
}

.label {
  color: #64748b;
  font-weight: 500;
  font-size: 0.95rem;
}

.value {
  color: #1e293b;
  font-weight: 600;
  font-size: 1.05rem;
}

.status.active {
  color: #10b981;
  font-weight: 600;
}

.stats-placeholder {
  text-align: center;
  padding: 20px 0;
}

.stats-placeholder p {
  color: #64748b;
  margin-bottom: 20px;
}

/* Botões */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
}

.btn {
  padding: 12px 28px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
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

.btn-outline {
  background: transparent;
  color: #3b82f6;
  border: 2px solid #3b82f6;
}

.btn-outline:hover {
  background: #3b82f6;
  color: white;
}

/* Responsividade */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .equipa-info {
    text-align: center;
  }
  
  .jogador-numero {
    font-size: 3rem;
  }
  
  .jogador-nome {
    font-size: 2rem;
  }
  
  .jogador-content {
    margin-top: -20px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>