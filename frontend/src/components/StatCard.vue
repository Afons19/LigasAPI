<script>
export default {
  name: 'StatCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
};
</script>

<template>
  <div class="stat-card">
    <h3>{{ title }}</h3>
    <p>{{ value }}</p>
  </div>
</template>

<style scoped>
.stat-card {
  background: rgb(255, 255, 255);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.stat-card h3 {
  margin: 0;
  font-size: 16px;
  color: #475569;
}

.stat-card p {
  margin-top: 10px;
  font-size: 28px;
  font-weight: bold;
  color: #1e293b;
}
</style>
