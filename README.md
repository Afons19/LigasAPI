# Documentação do Projeto LigasAPI
---

#  LigasAPI - Sistema de Gestão de Ligas Desportivas(Futebol)

Este projeto consiste numa **API REST** e num **frontend web** para a gestão de ligas desportivas, equipas, jogadores e jogos, permitindo realizar operações CRUD completas através de uma interface gráfica.
**Ano letivo: 2025/2026**

![Django](https://img.shields.io/badge/Django-4.x-092E20)
![DRF](https://img.shields.io/badge/DRF-3.x-a30000)
![Vue](https://img.shields.io/badge/Vue.js-3.x-42b883)
![Vite](https://img.shields.io/badge/Vite-fast-yellow)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB)
![Status](https://img.shields.io/badge/Status-Concluído-brightgreen)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Tecnologias

### Backend

* Python 3
* Django
* Django REST Framework
* SQLite
* python-decouple
* dj-database-url
* Gunicorn

### Frontend

* Vue.js 3
* Vite
* Axios
* CSS

### Hospedagem

* **Backend**: Render
* **Frontend**: Render

---

## Funcionalidades

### Backend (API REST)

* **Gerir Ligas**
* **Gerir Equipas**
* **Gerir Jogadores**
* **Gerir Jogos**
* Relacionamentos entre entidades:

  * Liga → Equipas
  * Equipa → Jogadores
  * Liga → Jogos

### Frontend

* Visualização de ligas, equipas, jogadores e jogos
* CRUD completo através da interface gráfica
* Página inicial com estatísticas gerais
* Página de detalhes de equipas e jogadores
* Navegação por navbar

---

## Endpoints da API

### Ligas

| Verbo HTTP | Caminho          | Descrição       |
| ---------- | ---------------- | --------------- |
| POST       | /api/ligas/      | Criar liga      |
| GET        | /api/ligas/      | Listar ligas    |
| GET        | /api/ligas/{id}/ | Visualizar liga |
| PUT        | /api/ligas/{id}/ | Atualizar liga  |
| DELETE     | /api/ligas/{id}/ | Remover liga    |

### Equipas

| Verbo HTTP | Caminho            | Descrição         |
| ---------- | ------------------ | ----------------- |
| POST       | /api/equipas/      | Criar equipa      |
| GET        | /api/equipas/      | Listar equipas    |
| GET        | /api/equipas/{id}/ | Visualizar equipa |
| PUT        | /api/equipas/{id}/ | Atualizar equipa  |
| DELETE     | /api/equipas/{id}/ | Remover equipa    |

### Jogadores

| Verbo HTTP | Caminho              | Descrição          |
| ---------- | -------------------- | ------------------ |
| POST       | /api/jogadores/      | Criar jogador      |
| GET        | /api/jogadores/      | Listar jogadores   |
| GET        | /api/jogadores/{id}/ | Visualizar jogador |
| PUT        | /api/jogadores/{id}/ | Atualizar jogador  |
| DELETE     | /api/jogadores/{id}/ | Remover jogador    |

### Jogos

| Verbo HTTP | Caminho          | Descrição       |
| ---------- | ---------------- | --------------- |
| POST       | /api/jogos/      | Criar jogo      |
| GET        | /api/jogos/      | Listar jogos    |
| GET        | /api/jogos/{id}/ | Visualizar jogo |
| PUT        | /api/jogos/{id}/ | Atualizar jogo  |
| DELETE     | /api/jogos/{id}/ | Remover jogo    |

---

## Aplicação Online

* **API REST (Backend)**
  [https://ligasapi.onrender.com/api/](https://ligasapi.onrender.com/api/)

* **Frontend Web**
  [https://ligasapi-site.onrender.com/](https://ligasapi-site.onrender.com/)

PS: se os dados não forem exibidos após acessar o site é porque a API está inativa.
---

## Configuração Local

### Backend

```bash
git clone https://github.com/Afons19/LigasAPI.git
cd LigasAPI/backend
python -m venv .venv
Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

A API ficará disponível em:

```
http://127.0.0.1:8000/api/
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Observações

* A API não utiliza autenticação.
* Todos os métodos HTTP estão disponíveis.
* O backend utiliza SQLite.
* Os dados podem ser reiniciados em hospedagem gratuita.
* Projeto desenvolvido para fins académicos.

---
## Observação sobre Persistência de Dados

A aplicação utiliza SQLite como base de dados. Em ambiente de produção (Render), os dados não são persistentes após reinícios do serviço ou novos deploys.

Esta decisão foi tomada de forma intencional, uma vez que a API é pública e não possui autenticação, evitando assim a persistência de dados indevidos ou inconsistentes inseridos por utilizadores externos. Desta forma, garante-se um ambiente limpo para testes e demonstração das funcionalidades.

---
## Licença

Este projeto é licenciado sob a Licença MIT.
