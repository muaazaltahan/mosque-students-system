<template>
  <div class="button-container">
    <router-link class="button" to="/">
      <font-awesome-icon icon="fas fa-home" />
      <p>Home</p></router-link
    >
    <router-link class="button" to="/notifications">
      <font-awesome-icon icon="fas fa-bell" />
      <p>Notifications</p>
    </router-link>
    <router-link class="button" to="/users">
      <font-awesome-icon icon="fas fa-users" />
      <p>Users</p>
    </router-link>
    <router-link class="button" to="/support">
      <font-awesome-icon icon="fas fa-question-circle" />
      <p>Support</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
.button-container {
  display: flex;
  background-color: black;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: space-around;
}

.button {
  outline: 0;
  border: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  transition: all ease-in-out 0.3s;
  cursor: pointer;
  text-decoration: none;
}
.button p {
  margin-left: 10px;
}
.button:hover {
  /* transform: translateY(-3px); */
  color: #2188ff;
}

.icon {
  font-size: 40px;
}
@media (max-width: 400px) {
  .button p {
    display: none;
  }
}
</style>
