<template>
  <body>
      <h2 class="text-center my-2">Budget</h2>
    <Budget class="budget"/>
  </body>
</template>

<script>
import Budget from "@/components/Budget.vue";

export default ({
  components: { Budget},
});
</script>

<style scoped>

body {
  background-image: linear-gradient(#007bff, #FFFDE4) !important;
}
.budget {
  min-height: 80vh;
}
</style>