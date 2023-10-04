<template>
    <body>
        <h3 class="m-3">Recent Transactions</h3>
        <Expense class="list" />
    </body>
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
    min-height: 80vh;
}

body {
    background-image: linear-gradient(#007bff, #FFFDE4) !important;
}
</style>