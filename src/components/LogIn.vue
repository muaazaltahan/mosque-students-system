<template>
  <div class="login">
    <div class="form-container">
      <p class="title">Login</p>
      <form @submit.prevent="login" class="form">
        <div class="input-group">
          <label for="email">Email</label>
          <input
            v-model="email"
            type="text"
            name="email"
            id="email"
            placeholder=""
          />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input
            v-model="password"
            type="password"
            name="password"
            id="password"
            placeholder=""
          />
          <div class="forgot">
            <a rel="noopener noreferrer" href="#">Forgot Password ?</a>
          </div>
        </div>
        <button class="sign">Log in</button>
      </form>
      <div class="">
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
      <div class="center-load" v-if="isLoading">
        <svg viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { mapActions } from "pinia";
export default {
  name: "LogIn",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      isLoading: false,
    };
  },
  methods: {
    ...mapActions(useAuthStore, ["setToken", "setTokens"]),
    async login() {
      this.isLoading = true;
      const loginData = {
        email: this.email,
        password: this.password,
      };
      try {
        const response = await fetch(
          "https://muaazaltahan-001-site1.dtempurl.com/api/auth/app-admin/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
          }
        );
        if (!response.ok) {
          throw new Error("Login failed");
        }
        const data = await response.json();
        localStorage.setItem("_user", JSON.stringify(data));
        this.$router.push("/");
      } catch (error) {
        this.errorMessage = error.message;
        console.log("failed");
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.login {
  background-color: var(--color-close-dark);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 5%;
}
.form-container {
  width: 320px;
  border-radius: 0.75rem;
  padding: 2rem;
  color: rgba(243, 244, 246, 1);
}

.title {
  text-align: center;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
}

.form {
  margin-top: 1.5rem;
}

.input-group {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.input-group label {
  display: block;
  color: rgba(156, 163, 175, 1);
  margin-bottom: 4px;
}

.input-group input {
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid rgba(55, 65, 81, 1);
  outline: 0;
  background-color: var(--color-close-dark);
  padding: 0.75rem 1rem;
  color: rgba(243, 244, 246, 1);
}

.input-group input:focus {
  border-color: var(--color-blue);
}

.forgot {
  display: flex;
  justify-content: flex-end;
  font-size: 0.75rem;
  line-height: 1rem;
  color: var(--color-blue);
  margin: 8px 0 14px 0;
}

.forgot a {
  color: var(--color-blue);
  text-decoration: none;
  font-size: 14px;
}

.forgot a:hover {
  text-decoration: underline var(--color-blue);
}

.sign {
  display: block;
  width: 100%;
  background-color: var(--color-blue);
  padding: 0.75rem;
  text-align: center;
  color: var(--color-close-dark);
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  color: white;
}
.sign:hover {
  background-color: rgb(0, 183, 255);
}
.error-message {
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 15px;
}
/* loading */
.center-load {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}
svg {
  width: 3.25em;
  transform-origin: center;
  animation: rotate4 2s linear infinite;
}

circle {
  fill: none;
  stroke: hsl(214, 97%, 59%);
  stroke-width: 2;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: dash4 1.5s ease-in-out infinite;
}

@keyframes rotate4 {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash4 {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }

  100% {
    stroke-dashoffset: -125px;
  }
}
</style>
