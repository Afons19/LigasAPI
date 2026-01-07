<script>
  export default{
    name: 'app'
  }
</script>

<template>
  <div id="app">
    <nav>
      <router-link to="/">Ligas</router-link> |
      <router-link to="/equipas">Equipas</router-link> |
      <router-link to="/jogadores">Jogadores</router-link> |
      <router-link to="/jogos">Jogos</router-link> |
    </nav>
    <router-view />
  </div>
</template>

<style>
  nav {
    padding: 10px;
    background-color: lightcoral;
  }

  nav a {
    margin-right: 10px;
  }
</style>