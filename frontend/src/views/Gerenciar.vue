<script>
import api from '../services/api';

export default {
  data() {
    return {
      abaAtiva: 'ligas',
      ligas: [],
      equipas: [],
      jogadores: [],
      jogos: [],
      showForm: false,
      editingId: null,
      form: {},
      formErrors: [],
    };
  },
  computed: {
    equipasComLiga() {
      return this.equipas.map(equipa => ({
        ...equipa,
        liga_nome: this.ligas.find(l => l.id === equipa.liga)?.nome || 'N/A'
      }));
    },
    jogosComNomes() {
      return this.jogos.map(jogo => ({
        ...jogo,
        equipa_casa_nome: this.equipas.find(e => e.id === jogo.equipa_casa)?.nome || jogo.equipa_casa_nome,
        equipa_visitante_nome: this.equipas.find(e => e.id === jogo.equipa_visitante)?.nome || jogo.equipa_visitante_nome,
        liga_nome: this.ligas.find(l => l.id === jogo.liga)?.nome || 'N/A',
        resultado_casa: jogo.golos_casa,
        resultado_visitante: jogo.golos_fora
      }));
    },
  },
  async mounted() {
    await this.carregarDados();
  },
  methods: {
    async carregarDados() {
      try {
        const [ligas, equipas, jogadores, jogos] = await Promise.all([
          api.get('ligas/'),
          api.get('equipas/'),
          api.get('jogadores/'),
          api.get('jogos/'),
        ]);
        this.ligas = ligas.data;
        this.equipas = equipas.data;
        this.jogadores = jogadores.data;
        this.jogos = jogos.data;

        // console.log('Equipas completo:', JSON.stringify(this.equipas, null, 2));
        // console.log('Primeiro item equipa:', this.equipas[0]);
        // console.log('Jogadores completo:', JSON.stringify(this.jogadores, null, 2));
        // console.log('Jogos:', JSON.stringify(this.jogos, null, 2));

      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    },
    abrirForm(item = null) {
        this.formErrors = [];
    if (item) {
        this.editingId = item.id;
        this.form = { ...item };
        if (this.abaAtiva === 'jogos') {
            this.form.equipa_fora = item.equipa_visitante;
            this.form.resultado_casa = item.golos_casa;
            this.form.resultado_fora = item.golos_fora;
        }
    } else {
            this.editingId = null;
            this.form = this.formularioVazio();
        }
      this.showForm = true;
    },
    fecharForm() {
      this.showForm = false;
      this.editingId = null;
      this.form = {};
    },
    formularioVazio() {
      if (this.abaAtiva === 'ligas') {
        return { 
            nome: '', pais: '', ano_fundacao: '' 
        };
      } else if (this.abaAtiva === 'equipas') {
        return { nome: '', cidade: '', treinador: '', ano_fundacao: '', liga: '' };
      } else if (this.abaAtiva === 'jogadores') {
        return { nome: '', posicao: '', numero: '', idade: '', equipa: '' };
      } else if (this.abaAtiva === 'jogos') {
        return { equipa_casa: '', equipa_fora: '', data: '', resultado_casa: '', resultado_fora: '', liga: '' };
      }
      return {};
    },
    async salvar() {
      try {
        const dados = { ...this.form };
        
        // Converter valores numéricos se necessário
        if (this.abaAtiva === 'jogos') {
          dados.equipa_casa = parseInt(dados.equipa_casa) || null;
          dados.equipa_visitante = parseInt(dados.equipa_fora) || null;
          dados.liga = parseInt(dados.liga) || null;
          dados.golos_casa = dados.resultado_casa !== '' ? parseInt(dados.resultado_casa) : null;
          dados.golos_fora = dados.resultado_fora !== '' ? parseInt(dados.resultado_fora) : null;
          delete dados.equipa_fora;
          delete dados.resultado_casa;
          delete dados.resultado_fora;
        } else if (this.abaAtiva === 'equipas') {
          dados.liga = parseInt(dados.liga) || null;
          dados.ano_fundacao = dados.ano_fundacao !== '' ? parseInt(dados.ano_fundacao) : null;
        } else if (this.abaAtiva === 'jogadores') {
          dados.equipa = parseInt(dados.equipa) || null;
          dados.numero = dados.numero !== '' ? parseInt(dados.numero) : null;
          dados.idade = dados.idade !== '' ? parseInt(dados.idade) : null;
        } else if (this.abaAtiva === 'ligas') {
          dados.ano_fundacao = dados.ano_fundacao !== '' ? parseInt(dados.ano_fundacao) : null;
        }
        
        if (this.editingId) {
          await api.put(`${this.abaAtiva}/${this.editingId}/`, dados);
        } else {
          await api.post(`${this.abaAtiva}/`, dados);
        }
        await this.carregarDados();
        this.fecharForm();
      } catch (error) {
        console.error('Erro completo:', error.response?.data);
        this.formErrors = [error.response?.data?.detail || JSON.stringify(error.response?.data) || 'Erro ao salvar'];
      }
    },
    async deletar(id) {
      if (confirm('Tem certeza que deseja deletar?')) {
        try {
          await api.delete(`${this.abaAtiva}/${id}/`);
          await this.carregarDados();
        } catch (error) {
          console.error('Erro ao deletar:', error);
        }
      }
    },
    trocarAba(aba) {
      this.abaAtiva = aba;
      this.fecharForm();
    },
  },
};
</script>

<template>
  <div class="container">
    <h1>Gerenciamento de Dados</h1>

    <!-- Abas -->
    <div class="tabs">
      <button
        v-for="aba in ['ligas', 'equipas', 'jogadores', 'jogos']"
        :key="aba"
        @click="trocarAba(aba)"
        :class="{ active: abaAtiva === aba }"
        class="tab"
      >
        {{ aba.charAt(0).toUpperCase() + aba.slice(1) }}
      </button>
    </div>

    <!-- Header -->
    <div class="header">
      <h2>
        {{ abaAtiva.charAt(0).toUpperCase() + abaAtiva.slice(1) }}
      </h2>
      <button @click="abrirForm()" class="btn-primary">
        + Novo
      </button>
    </div>

    <!-- Formulário Modal -->
    <div v-if="showForm" class="modal">
      <div class="modal-content">
        <h3>{{ editingId ? 'Editar' : 'Nova(o)' }} {{ abaAtiva.slice(0, -1) }}</h3>

        <div v-if="formErrors" class="errors">
          <p v-for="(error, idx) in formErrors" :key="idx">{{ error }}</p>
        </div>

        <form @submit.prevent="salvar">
          <!-- Ligas -->
          <div v-if="abaAtiva === 'ligas'">
            <div class="form-group">
              <label>Nome:</label>
              <input v-model="form.nome" type="text" required />
            </div>
            <div class="form-group">
              <label>País:</label>
              <input v-model="form.pais" type="text" required/>
            </div>
            <div class="form-group">
              <label>Época:</label>
              <input v-model="form.epoca" type="text" placeholder="202X/202X" required/>
            </div>
            <div class="form-group">
              <label>Data início:</label>
              <input v-model="form.data_inicio" type="date" required/>
            </div>
            <div class="form-group">
              <label>Data fim:</label>
              <input v-model="form.data_fim" type="date" required/>
            </div>
          </div>

          <!-- Equipas -->
          <div v-if="abaAtiva === 'equipas'">
            <div class="form-group">
              <label>Nome:</label>
              <input v-model="form.nome" type="text" required />
            </div>
            <div class="form-group">
              <label>Cidade:</label>
              <input v-model="form.cidade" type="text" />
            </div>
            <div class="form-group">
              <label>Treinador:</label>
              <input v-model="form.treinador" type="text" />
            </div>
            <div class="form-group">
              <label>Ano de Fundação:</label>
              <input v-model="form.ano_fundacao" type="number" />
            </div>
            <div class="form-group">
              <label>Liga:</label>
              <select v-model="form.liga" required>
                <option value="">Selecione uma liga</option>
                <option v-for="liga in ligas" :key="liga.id" :value="liga.id">
                  {{ liga.nome }}
                </option>
              </select>
            </div>
          </div>

          <!-- Jogadores -->
          <div v-if="abaAtiva === 'jogadores'">
            <div class="form-group">
              <label>Nome:</label>
              <input v-model="form.nome" type="text" required />
            </div>
            <div class="form-group">
              <label>Posição:</label>
              <input v-model="form.posicao" type="text" placeholder="[GR, DEF, MED, AV]"/>
            </div>
            <div class="form-group">
              <label>Número:</label>
              <input v-model="form.numero" type="number" />
            </div>
            <div class="form-group">
              <label>Idade:</label>
              <input v-model="form.idade" type="number" />
            </div>
            <div class="form-group">
              <label>Equipa:</label>
              <select v-model="form.equipa" required>
                <option value="">Selecione uma equipa</option>
                <option v-for="equipa in equipas" :key="equipa.id" :value="equipa.id">
                  {{ equipa.nome }}
                </option>
              </select>
            </div>
          </div>

          <!-- Jogos -->
          <div v-if="abaAtiva === 'jogos'">
            <div class="form-group">
              <label>Equipa Casa:</label>
              <select v-model="form.equipa_casa" required>
                <option value="">Selecione</option>
                <option v-for="equipa in equipas" :key="equipa.id" :value="equipa.id">
                  {{ equipa.nome }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Equipa Fora:</label>
              <select v-model="form.equipa_fora" required>
                <option value="">Selecione</option>
                <option v-for="equipa in equipas" :key="equipa.id" :value="equipa.id">
                  {{ equipa.nome }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Data:</label>
              <input v-model="form.data" type="date"/>
            </div>
            <div class="form-group">
              <label>Resultado Casa:</label>
              <input v-model="form.resultado_casa" type="number" />
            </div>
            <div class="form-group">
              <label>Resultado Fora:</label>
              <input v-model="form.resultado_fora" type="number" />
            </div>
            <div class="form-group">
              <label>Liga:</label>
              <select v-model="form.liga" required>
                <option value="">Selecione</option>
                <option v-for="liga in ligas" :key="liga.id" :value="liga.id">
                  {{ liga.nome }}
                </option>
              </select>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn-primary">Salvar</button>
            <button type="button" @click="fecharForm()" class="btn-secondary">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Tabelas -->
    <div id="card">
      <!-- Ligas -->
      <table v-if="abaAtiva === 'ligas' && ligas.length">
        <thead>
          <tr>
            <th>Nome</th>
            <th>País</th>
            <th>Época</th>
            <th>Início</th>
            <th>Fim</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in ligas" :key="item.id">
            <td>{{ item.nome }}</td>
            <td>{{ item.pais }}</td>
            <td>{{ item.epoca }}</td>
            <td>{{ item.data_inicio }}</td>
            <td>{{ item.data_fim }}</td>
            <td>
              <button @click="abrirForm(item)" class="btn-edit">Editar</button>
              <button @click="deletar(item.id)" class="btn-delete">Deletar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Equipas -->
      <table v-if="abaAtiva === 'equipas' && equipas.length">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cidade</th>
            <th>Treinador</th>
            <th>Ano Fundação</th>
            <th>Liga</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in equipasComLiga" :key="item.id">
            <td>{{ item.nome }}</td>
            <td>{{ item.cidade }}</td>
            <td>{{ item.treinador }}</td>
            <td>{{ item.ano_fundacao }}</td>
            <td>{{ item.liga_nome }}</td>
            <td>
              <button @click="abrirForm(item)" class="btn-edit">Editar</button>
              <button @click="deletar(item.id)" class="btn-delete">Deletar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Jogadores -->
      <table v-if="abaAtiva === 'jogadores' && jogadores.length">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Posição</th>
            <th>Número</th>
            <th>Idade</th>
            <th>Equipa</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in jogadores" :key="item.id">
            <td>{{ item.nome }}</td>
            <td>{{ item.posicao }}</td>
            <td>{{ item.numero }}</td>
            <td>{{ item.idade }}</td>
            <td>{{ item.equipa_nome }}</td>
            <td>
              <button @click="abrirForm(item)" class="btn-edit">Editar</button>
              <button @click="deletar(item.id)" class="btn-delete">Deletar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Jogos -->
      <table v-if="abaAtiva === 'jogos' && jogos.length">
        <thead>
          <tr>
            <th>Casa</th>
            <th>Fora</th>
            <th>Resultado</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in jogosComNomes" :key="item.id">
            <td>{{ item.equipa_casa_nome }}</td>
            <td>{{ item.equipa_visitante_nome }}</td>
            <td>{{ item.resultado_casa }} - {{ item.resultado_visitante }}</td>
            <td>{{ item.data }}</td>
            <td>
              <button @click="abrirForm(item)" class="btn-edit">Editar</button>
              <button @click="deletar(item.id)" class="btn-delete">Deletar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-if="!ligas.length && abaAtiva === 'ligas'" class="empty">Nenhuma liga registada.</p>
      <p v-if="!equipas.length && abaAtiva === 'equipas'" class="empty">Nenhuma equipa registada.</p>
      <p v-if="!jogadores.length && abaAtiva === 'jogadores'" class="empty">Nenhum jogador registado.</p>
      <p v-if="!jogos.length && abaAtiva === 'jogos'" class="empty">Nenhum jogo registado.</p>
    </div>
    <div class="action-buttons">
        <button class="btn btn-secondary" @click="$router.back()">
          <i class="icon">←</i> Voltar
        </button>
    </div>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #ddd;
}

.tab {
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  border-bottom: 3px solid transparent;
  transition: all 0.3s;
}

.tab.active {
  border-bottom-color: #007bff;
  color: #007bff;
  font-weight: bold;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  min-width: 400px;
  max-height: 90vh;
  overflow-y: auto;
}

#card {
  text-align: center;
  background: white;
  padding: 15px;
  margin: 10px;
  /* padding-right: 10px; */
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn-primary, .btn-secondary, .btn-edit, .btn-delete {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-edit {
  background: #28a745;
  color: white;
  margin: 0px 10px;     
}

.btn-delete {
  background: #dc3545;
  color: white;
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

.errors {
  background: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.empty {
  text-align: center;
  color: #999;
  padding: 2rem;
}

table {
  width: 100%;
  border-collapse: collapse;  
}

th, td {
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

th {
  background: #f5f5f5;
  font-weight: bold;
      /* text-align: center; */
}
</style>