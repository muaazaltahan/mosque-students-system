import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: JSON.parse(localStorage.getItem("_user"))?.accessToken,
    tokenExpiry: parseInt(localStorage.getItem("tokenExpiry"), 10),
    userId: JSON.parse(localStorage.getItem("_user"))?.userId,
  }),
  actions: {
    // setToken(token) {
    //   this.token = token;
    //   localStorage.setItem("token", token);
    //   console.log(this.token);
    // },
    setTokens(token, userId) {
      this.token = token;
      this.userId = userId;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("_user", JSON.stringify({ userId }));
      } else {
        // router.push("/login");
        console.log(this.token);
      }
      const decodedToken = jwtDecode(token);
      this.tokenExpiry = decodedToken.exp * 1000;
      localStorage.setItem("tokenExpiry", this.tokenExpiry);
    },

    async refreshAccessToken() {
      try {
        const response = await fetch(
          `https://muaazaltahan-001-site1.dtempurl.com/api/auth/app-admin/refresh-access-token/${this.userId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (data.accessToken) {
          this.setTokens(data.accessToken, this.userId);
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        this.logout();
        // router.push("/login");
      }
    },

    logout() {
      this.token = null;
      this.refreshToken = null;
      this.tokenExpiry = null;
      localStorage.removeItem("_user");
      localStorage.removeItem("token");
    },
  },
  getters: {
    isAuthenticated: () => {
      const tokenInLocalStorage = localStorage.getItem("token");
      return !tokenInLocalStorage;
    },
    isTokenNearExpiry: (state) => {
      const currentTime = Date.now();
      const fiveMinutes = 5 * 60 * 1000;
      return state.tokenExpiry && state.tokenExpiry - currentTime < fiveMinutes;
    },
  },
});
