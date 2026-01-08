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
        equipa_nome: '',
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

    <div class="jogador-content">
      <!-- Botões de ação -->
      <div class="action-buttons">
        <button class="btn btn-secondary" @click="$router.back()">
          <i class="icon">←</i> Voltar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.jogador-detalhe-container {
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

.jogador-header {
  background-color: #012a6c;
  color: white;
  padding: 200px;
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
  color: #ffffff94;
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
  margin-top: 60px;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px 20px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
}

/* Conteúdo principal */
.jogador-content {
  max-width: 1200px;
  margin: -10px auto 0;
  padding: 0 20px 40px;
  position: relative;
  z-index: 1;
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