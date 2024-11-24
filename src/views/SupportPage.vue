<template>
  <div class="all">
    <div class="support">
      <SupportForm />
    </div>
  </div>
</template>

<script>
import SupportForm from "@/components/Support/SupportForm.vue";
import "@/assets/bg-color.css";
export default {
  name: "SupportPage",
  components: {
    SupportForm,
  },
};
</script>

<style scoped>
.support {
  background-color: var(--color-close-dark);
  height: 100vh;
}
</style>
