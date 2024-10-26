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
    <button class="Btn">
      <div @click="logoutUser()" class="text">Logout</div>
    </button>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { mapActions } from "pinia";
export default {
  name: "NavBar",
  methods: {
    ...mapActions(useAuthStore, ["logout"]),
    logoutUser() {
      this.logout();
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
.button-container {
  display: flex;
  background-color: black;
  width: 100%;
  height: 60px;
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
  transform: translateY(-3px);
  color: var(--color-blue);
}
@media (max-width: 400px) {
  .button p {
    display: none;
  }
}
.Btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 40px;
  width: 125px;
  height: 45px;
  cursor: pointer;
  background-color: var(--color-blue);
}
.text {
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  margin: 25%;
}
.Btn:hover {
  background-color: white;
  transition-duration: 0.3s;
}
.Btn:hover .text {
  color: var(--color-blue);
}
.Btn:active {
  transform: translate(2px, 2px);
}
</style>
