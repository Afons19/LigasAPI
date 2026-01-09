<script>
export default {
  methods: {
    irParaHome() {
      this.$router.push('/');
    },

    irParaGerenciar() {
      this.$router.push('/crud')
    }
  },
};
</script>

<template>
  <nav class="navbar">
    <h1>Gestão de Ligas de Futebol</h1>
    <div class="links">
      <router-link to="/">Início</router-link>
      <router-link to="/gerenciar">Gerenciar</router-link>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #011d4a;
  padding: 15px 30px;
  color: white;
}
.links a {
  margin-left: 15px;
  color: white;
  text-decoration: none;
}
.links a.router-link-active {
  font-weight: bold;
  border-bottom: 2px solid white;
}
</style>
