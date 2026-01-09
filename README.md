# Documentação do Projeto LigasAPI
---

# LigasAPI - Sistema Completo de Gestão de Ligas Desportivas (Futebol)

**Ano letivo: 2025/2026**

![Django](https://img.shields.io/badge/Django-4.x-092E20)
![DRF](https://img.shields.io/badge/DRF-3.x-a30000)
![Vue](https://img.shields.io/badge/Vue.js-3.x-42b883)
![Vite](https://img.shields.io/badge/Vite-fast-yellow)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB)
![Status](https://img.shields.io/badge/Status-Concluído-brightgreen)
![License](https://img.shields.io/badge/License-MIT-green)

Sistema completo para gestão de ligas desportivas de futebol, composto por **backend API REST** em Django e **frontend** em Vue.js 3.

---

## 1. 📌 Visão Geral

### Backend (API REST)
- Desenvolvido com **Django REST Framework**
- Fornece endpoints REST para gestão completa de ligas, equipas, jogadores e jogos
- Base de dados SQLite com relacionamentos bem definidos

### Frontend (Interface Web)
- Construído com **Vue.js 3** e **Vite**
- Consome a API REST do backend
- Interface intuitiva para visualização e gestão de dados

---

## 2. 🏗️ Arquitetura do Sistema

```
Sistema LigasAPI/
├── 📁 backend/          # API REST Django
│   ├── 📁 backend/
│   ├── 📁 liga_api/
│   ├── manage.py
│   └── requirements.txt
│
└── 📁 frontend/         # Interface Vue.js
    └── 📁 src/
        ├── 📁 components/
        ├── 📁 router/
        ├── 📁 services/
        └── 📁 views/
```

---

## 3. 📊 Backend - Modelos de Dados

### Liga
- nome
- pais
- epoca

### Equipa
- nome
- cidade
- treinador
- ano_fundacao
- liga (FK)

### Jogador
- nome
- posicao
- numero
- idade
- equipa (FK)

### Jogo
- data
- golos_casa
- golos_fora
- liga (FK)
- equipa_casa (FK)
- equipa_visitante (FK)

---

## 4. 🧩 Diagrama Entidade-Relacionamento (ER)

O diagrama abaixo representa os relacionamentos entre as entidades do sistema:

- Uma **Liga** possui várias **Equipas**
- Uma **Liga** possui vários **Jogos**
- Uma **Equipa** possui vários **Jogadores**
- Um **Jogo** envolve duas **Equipas** (casa e visitante)

### Diagrama Visual

```
┌──────────┐        1       N        ┌──────────┐
│  Liga    │────────────────────────▶│  Equipa  │
│──────────│                         │──────────│
│ id       │                         │ id       │
│ nome     │                         │ nome     │
│ pais     │                         │ cidade   │
│ epoca    │                         │ treinador│
└──────────┘                         │ ano_fund │
      │                              │ liga_id  │
      │                              └──────────┘
      │ 1
      │
      │ N
┌──────────┐        1       N        ┌──────────┐
│  Liga    │────────────────────────▶│  Jogo    │
│──────────│                         │──────────│
│ id       │                         │ id       │
│ nome     │                         │ data     │
└──────────┘                         │ golos_c  │
                                     │ golos_f  │
                                     │ liga_id  │
                                     │ equipa_c │
                                     │ equipa_v │
                                     └──────────┘

┌──────────┐        1       N        ┌──────────┐
│  Equipa  │────────────────────────▶│ Jogador  │
│──────────│                         │──────────│
│ id       │                         │ id       │
│ nome     │                         │ nome     │
└──────────┘                         │ posicao  │
                                     │ numero   │
                                     │ idade    │
                                     │ equipa_id│
                                     └──────────┘
```

### Resumo dos Relacionamentos

| Entidade Origem | Relação | Entidade Destino |
| --------------- | ------- | ---------------- |
| Liga            | 1 : N   | Equipa           |
| Liga            | 1 : N   | Jogo             |
| Equipa          | 1 : N   | Jogador          |
| Equipa          | 1 : N   | Jogo (casa)      |
| Equipa          | 1 : N   | Jogo (visitante) |

---

## 5. 🔗 Backend - Endpoints da API

**URL Base:** `http://127.0.0.1:8000/api/`

| Entidade   | Endpoint           | Métodos              |
|------------|--------------------|----------------------|
| Ligas      | `/ligas/`          | GET, POST            |
|            | `/ligas/{id}/`     | GET, PUT, DELETE     |
| Equipas    | `/equipas/`        | GET, POST            |
|            | `/equipas/{id}/`   | GET, PUT, DELETE     |
| Jogadores  | `/jogadores/`      | GET, POST            |
|            | `/jogadores/{id}/` | GET, PUT, DELETE     |
| Jogos      | `/jogos/`          | GET, POST            |
|            | `/jogos/{id}/`     | GET, PUT, DELETE     |

---

## 6. 🎨 Frontend - Estrutura do Projeto

```
frontend/
└── src/
    ├── assets/
    │   └── style.css          # Estilos globais
    ├── componentes/
    │   ├── Navbar.vue         # Navegação global
    │   ├── StatCard.vue       # Estatísticas
    │   └── LigaCard.vue       # Card de liga
    ├── router/
    │   └── router.js          # Gestão de rotas
    ├── services/
    │   └── api.js             # Comunicação com API
    └── views/
        ├── Home.vue           # Página inicial
        ├── Gerenciar.vue      # Gestão CRUD
        ├── LigaDetalhe.vue    # Detalhes da liga
        ├── EquipaDetalhe.vue  # Detalhes da equipa
        └── JogadorDetalhe.vue # Detalhes do jogador
```

---

## 7. 🖥️ Frontend - Views (Páginas)

### Home.vue
- Estatísticas globais do sistema
- Listagem de ligas, jogos e equipas
- Navegação rápida para detalhes

### Gerenciar.vue
- Interface completa de CRUD para todas as entidades
- Criação, edição e eliminação de dados

### Páginas de Detalhe
- Visualização detalhada de cada entidade
- Informações relacionadas e contexto

---

## 8. ⚙️ Instalação e Execução

### Passo 1: Clonar o Repositório Principal

```bash
# Clone o repositório principal (contém backend e frontend)
git clone https://github.com/Afons19/LigasAPI.git
cd LigasAPI
```

### Passo 2: Configurar e Executar o Backend

```bash
# Aceder ao diretório do backend
cd backend

# Criar ambiente virtual
python -m venv venv

# Ativar ambiente (Windows)
venv\Scripts\activate

# Ativar ambiente (Linux/macOS)
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Executar migrações da base de dados
python manage.py migrate

# Iniciar servidor de desenvolvimento
python manage.py runserver
```

O backend estará disponível em: `http://127.0.0.1:8000`

### Passo 3: Configurar e Executar o Frontend

```bash
# Abrir novo terminal
# Voltar ao diretório raiz do projeto
cd LigasAPI

# Aceder ao diretório do frontend
cd frontend

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O frontend estará disponível em: `http://localhost:5173`
---

## 9. 🌐 URLs de Acesso

- **Backend API:** `http://127.0.0.1:8000/api/`
- **Frontend:** `http://localhost:5173`

---

## 10. 🛠️ Tecnologias Utilizadas

### Backend
- Python 3.10+
- Django 4.x
- Django REST Framework
- SQLite 3
- django-cors-headers
- python-decouple
- dj-database-url

### Frontend
- Vue.js 3
- Vite
- Vue Router
- Axios
- CSS

---

## 11. ✅ Funcionalidades Implementadas

### Backend
- [x] API REST completa
- [x] CRUD para todas as entidades
- [x] Relacionamentos bem definidos
- [x] Serializers otimizados
- [x] CORS configurado

### Frontend
- [x] Interface responsiva
- [x] Consumo da API REST
- [x] Navegação por rotas
- [x] Componentes reutilizáveis
- [x] Gestão completa de dados

---

## 🎓 Projeto Académico

Este projeto foi desenvolvido para fins académicos.

---

## 🤝 Contribuição

Sinta-se à vontade para contribuir com melhorias abrindo um problema ou enviando um pull request.
---

## 📄 Licença

Este projeto é licenciado sob a **Licença MIT**. Consulte o ficheiro LICENSE para mais detalhes.

---

# LigasAPI Project Documentation
---

# LigasAPI - Complete Sports League Management System (Football)

**Academic Year: 2025/2026**

![Django](https://img.shields.io/badge/Django-4.x-092E20)
![DRF](https://img.shields.io/badge/DRF-3.x-a30000)
![Vue](https://img.shields.io/badge/Vue.js-3.x-42b883)
![Vite](https://img.shields.io/badge/Vite-fast-yellow)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen)
![License](https://img.shields.io/badge/License-MIT-green)

Complete system for managing football sports leagues, consisting of a **backend REST API** in Django and a **frontend** in Vue.js 3.

---

## 1. 📌 Overview

### Backend (REST API)
- Developed with **Django REST Framework**
- Provides REST endpoints for complete management of leagues, teams, players, and matches
- SQLite database with well-defined relationships

### Frontend (Web Interface)
- Built with **Vue.js 3** and **Vite**
- Consumes the backend REST API
- Intuitive interface for data viewing and management

---

## 2. 🏗️ System Architecture

```
LigasAPI System/
├── 📁 backend/          # Django REST API
│   ├── 📁 backend/
│   ├── 📁 liga_api/
│   ├── manage.py
│   └── requirements.txt
│
└── 📁 frontend/         # Vue.js Interface
    └── 📁 src/
        ├── 📁 components/
        ├── 📁 router/
        ├── 📁 services/
        └── 📁 views/
```

---

## 3. 📊 Backend - Data Models

### Liga
- nome
- pais
- epoca

### Equipa
- nome
- cidade
- treinador
- ano_fundacao
- liga (FK)

### Jogador
- nome
- posicao
- numero
- idade
- equipa (FK)

### Jogo
- data
- golos_casa
- golos_fora
- liga (FK)
- equipa_casa (FK)
- equipa_visitante (FK)

---

## 4. 🧩 Entity-Relationship Diagram (ERD)

The diagram below represents the relationships between the system entities:

- One **Liga** has many **Equipas**
- One **Liga** has many **Jogos**
- One **Equipa** has many **Jogadores**
- One **Jogo** involves two **Equipas** (home and away)

### Visual Diagram

```
┌──────────┐        1       N        ┌──────────┐
│  Liga    │────────────────────────▶│  Equipa  │
│──────────│                         │──────────│
│ id       │                         │ id       │
│ nome     │                         │ nome     │
│ pais     │                         │ cidade   │
│ epoca    │                         │ treinador│
└──────────┘                         │ ano_fund │
      │                              │ liga_id  │
      │                              └──────────┘
      │ 1
      │
      │ N
┌──────────┐        1       N        ┌──────────┐
│  Liga    │────────────────────────▶│  Jogo    │
│──────────│                         │──────────│
│ id       │                         │ id       │
│ nome     │                         │ data     │
└──────────┘                         │ golos_c  │
                                     │ golos_f  │
                                     │ liga_id  │
                                     │ equipa_c │
                                     │ equipa_v │
                                     └──────────┘

┌──────────┐        1       N        ┌──────────┐
│  Equipa  │────────────────────────▶│ Jogador  │
│──────────│                         │──────────│
│ id       │                         │ id       │
│ nome     │                         │ nome     │
└──────────┘                         │ posicao  │
                                     │ numero   │
                                     │ idade    │
                                     │ equipa_id│
                                     └──────────┘
```

### Relationship Summary

| Source Entity | Relationship | Target Entity |
| ------------- | ------------ | ------------- |
| Liga          | 1 : N        | Equipa        |
| Liga          | 1 : N        | Jogo          |
| Equipa        | 1 : N        | Jogador       |
| Equipa        | 1 : N        | Jogo (home)   |
| Equipa        | 1 : N        | Jogo (away)   |

---

## 5. 🔗 Backend - API Endpoints

**Base URL:** `http://127.0.0.1:8000/api/`

| Entity      | Endpoint           | Methods           |
|-------------|--------------------|-------------------|
| Ligas       | `/ligas/`          | GET, POST         |
|             | `/ligas/{id}/`     | GET, PUT, DELETE  |
| Equipas     | `/equipas/`        | GET, POST         |
|             | `/equipas/{id}/`   | GET, PUT, DELETE  |
| Jogadores   | `/jogadores/`      | GET, POST         |
|             | `/jogadores/{id}/` | GET, PUT, DELETE  |
| Jogos       | `/jogos/`          | GET, POST         |
|             | `/jogos/{id}/`     | GET, PUT, DELETE  |

---

## 6. 🎨 Frontend - Project Structure

```
frontend/
└── src/
    ├── assets/
    │   └── style.css          # Global styles
    ├── componentes/
    │   ├── Navbar.vue         # Global navigation
    │   ├── StatCard.vue       # Statistics
    │   └── LigaCard.vue       # League card
    ├── router/
    │   └── router.js          # Route management
    ├── services/
    │   └── api.js             # API communication
    └── views/
        ├── Home.vue           # Home page
        ├── Gerenciar.vue      # CRUD management
        ├── LigaDetalhe.vue    # League details
        ├── EquipaDetalhe.vue  # Team details
        └── JogadorDetalhe.vue # Player details
```

---

## 7. 🖥️ Frontend - Views (Pages)

### Home.vue
- Global system statistics
- Listing of leagues, matches, and teams
- Quick navigation to details

### Gerenciar.vue
- Complete CRUD interface for all entities
- Creation, editing, and deletion of data

### Detail Pages
- Detailed view of each entity
- Related information and context

---

## 8. ⚙️ Installation and Execution

### Step 1: Clone the Main Repository

```bash
# Clone the main repository (contains backend and frontend)
git clone https://github.com/Afons19/LigasAPI.git
cd LigasAPI
```

### Step 2: Configure and Run the Backend

```bash
# Access the backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate environment (Windows)
venv\Scripts\activate

# Activate environment (Linux/macOS)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run database migrations
python manage.py migrate

# Start development server
python manage.py runserver
```

The backend will be available at: `http://127.0.0.1:8000`

### Step 3: Configure and Run the Frontend

```bash
# Open new terminal
# Return to project root directory
cd LigasAPI

# Access the frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at: `http://localhost:5173`

---

## 9. 🌐 Access URLs

- **Backend API:** `http://127.0.0.1:8000/api/`
- **Frontend Application:** `http://localhost:5173`

---

## 10. 🛠️ Technologies Used

### Backend
- Python 3.10+
- Django 4.x
- Django REST Framework
- SQLite 3
- django-cors-headers
- python-decouple
- dj-database-url

### Frontend
- Vue.js 3
- Vite
- Vue Router
- Axios
- CSS

---

## 11. ✅ Implemented Features

### Backend
- [x] Complete REST API
- [x] CRUD for all entities
- [x] Well-defined relationships
- [x] Optimized serializers
- [x] CORS configured

### Frontend
- [x] Responsive interface
- [x] REST API consumption
- [x] Route navigation
- [x] Reusable components
- [x] Complete data management

---

## 🎓 Academic Project

This project was developed for academic purposes.

---

## 🤝 Contribution

Feel free to contribute with improvements by opening an issue or submitting a pull request.

---

## 📄 License

This project is licensed under the **MIT License**. See the LICENSE file for more details.
=======
>>>>>>> 18054eedd77d20a0d68f2705d10f570a66c6961b
