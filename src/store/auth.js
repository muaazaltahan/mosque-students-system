import { defineStore } from "pinia";
import jwt_decode from "jwt-decode";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    refreshToken: null,
    tokenExpiry: null,
    userId: null,
  }),
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    setTokens(token, refreshToken, userId) {
      this.token = token;
      this.refreshToken = refreshToken;
      this.userId = userId;
      localStorage.setItem("token", token);
      const decodedToken = jwt_decode(token);
      this.tokenExpiry = decodedToken.exp * 1000;
    },

    async refreshAccessToken() {
      try {
        const response = await fetch(
          `http://muaazaltahan-001-site1.dtempurl.com/api/auth/app-admin/refresh-access-token/${this.userId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.refreshToken}`,
            },
          }
        );

        const data = await response.json();
        if (data.token) {
          this.setTokens(data.token, this.refreshToken);
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        this.logout();
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
      // if localstorge emty return true and if ather thing return false
      return !tokenInLocalStorage;
    },
    isTokenNearExpiry: (state) => {
      const currentTime = Date.now();
      const fiveMinutes = 5 * 60 * 1000;
      return state.tokenExpiry && state.tokenExpiry - currentTime < fiveMinutes;
    },
  },
});
