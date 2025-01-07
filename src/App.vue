<template>
  <router-view />
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { mapActions, mapState } from "pinia";

export default {
  data() {
    return {
      intervalId: null,
    };
  },
  computed: {
    ...mapState(useAuthStore, [
      "isAuthenticated",
      "isTokenNearExpiry",
      "token",
      "userId",
    ]),
  },
  methods: {
    ...mapActions(useAuthStore, ["refreshAccessToken"]),

    checkTokenExpiry() {
      if (this.isTokenNearExpiry) {
        this.refreshAccessToken();
      }
    },
  },

  mounted() {
    this.intervalId = setInterval(this.checkTokenExpiry, 60 * 1000);
  },
  beforeUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
  beforeMount() {
    if (window.location.hostname.includes("localhost")) return;
    if (this.userId && this.token) {
      this.refreshAccessToken();
    }
  },
};
</script>

<style>
@font-face {
  font-family: "Roboto";
  src: url("@/assets/fonts/roboto-bold-webfont.woff2") format("woff2"),
    url("@/assets/fonts/roboto-bold-webfont.woff") format("woff");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: "Roboto";
  src: url("@/assets/fonts/roboto-regular-webfont.woff2") format("woff2"),
    url("@/assets/fonts/roboto-regular-webfont.woff") format("woff");
  font-weight: 700;
  font-style: normal;
}
:root {
  --color-blue: #2188ff;
  --color-close-dark: rgba(17, 24, 39, 1);
}
#app {
  font-family: "Roboto", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
