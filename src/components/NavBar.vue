<template>
  <div class="button-container">
    <router-link class="button home" to="/" active-class="active-link">
      <font-awesome-icon icon="fas fa-home" />
      <p>Home</p></router-link
    >
    <router-link
      class="button not"
      to="/notifications"
      active-class="active-link"
    >
      <font-awesome-icon icon="fas fa-bell" />
      <p>Notifications</p>
    </router-link>
    <router-link class="button" to="/users-admin" active-class="active-link">
      <font-awesome-icon icon="fas fa-users" />
      <p>Users</p>
    </router-link>
    <router-link
      class="button view"
      to="/view-issues"
      active-class="active-link"
    >
      <font-awesome-icon icon="fas fa-question-circle" />
      <p>View</p>
      <p>Issue</p>
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
  background-color: var(--color-close-dark);
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: space-between;
}

.button {
  border: 0;
  width: 40px;
  height: 40px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.3s ease;
  position: relative;
}
.home {
  margin-left: 40px;
}
.view {
  width: 60px;
}
.not {
  width: 60px;
}
.button p {
  margin-left: 10px;
}
.active-link::after {
  content: "";
  display: block;
  width: 200%;
  height: 2px;
  background-color: var(--color-blue);
  position: absolute;
  bottom: -4px;
  left: 5;
}
.button:hover {
  color: var(--color-blue);
}
.active-link {
  color: var(--color-blue);
}
@media (max-width: 600px) {
  .button p {
    display: none;
  }
  .active-link::after {
    width: 100%;
  }
  .Btn {
    width: 75px !important;
    height: 27px !important;
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
  margin-right: 15px;
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
