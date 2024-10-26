<template>
  <NavBar></NavBar>
  <div class="support">
    <h1>Contact Us</h1>
    <SupportForm />
  </div>
</template>

<script>
import SupportForm from "@/components/Support/SupportForm.vue";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "SupportPage",
  components: {
    SupportForm,
    NavBar,
  },
};
</script>

<style scoped>
.support {
  background-color: var(--color-close-dark);
  min-height: 100vh;
}
h1 {
  padding-top: 10px;
  text-align: center;
  color: white;
}
</style>
