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
    ...mapState(useAuthStore, ["isAuthenticated", "isTokenNearExpiry"]),
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
};
</script>

<style lang="scss">
:root {
  --color-blue: #2188ff;
  --color-close-dark: rgba(17, 24, 39, 1);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
