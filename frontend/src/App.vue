<script>
  import Navbar from './components/Navbar.vue';
  export default{
    name: 'app',
    components: {
      Navbar,
    }
  }
</script>

<template>
  <div id="app">
    <!-- <nav>
      <h1>Gestão de Ligas de Futebol</h1>
    </nav> -->
    <navbar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>

  #app {
    min-height: 100vh;
    background-color: #f1f5f9;
  }

  nav {
    padding: 20px;
    background-color: #1e293b;
    color: white;
  }


  main {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>