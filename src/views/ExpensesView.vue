<template>
        <Expense class="list" />
</template>
  
<script>
import Expense from "@/components/Expense.vue";

export default ({
    components: { Expense },
});
</script>
  
<style scoped>
h3 {
    text-decoration: underline;
    text-decoration-skip-ink: none;
    text-underline-offset: 0.1em;
}

.list {
    min-height: 85vh;
}

</style>