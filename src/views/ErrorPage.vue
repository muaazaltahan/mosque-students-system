<template>
  <div class="error-page">
    <div class="error-container">
      <h1>{{ errorCode }}</h1>
      <p>{{ errorMessage }}</p>
      <router-link to="/" class="btn-home">Go Back to Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorCode: "404",
      errorMessage: "Page Not Found",
    };
  },
};
</script>

<style scoped>
.error-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-close-dark);
}

.error-container {
  text-align: center;
  padding: 40px;
}

h1 {
  font-size: 6rem;
  margin-bottom: 1rem;
  color: var(--color-blue);
}

p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: var(--color-blue);
}

.btn-home {
  display: inline-block;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.btn-home:hover {
  background-color: #2980b9;
}
</style>
