<template>
  <body>
    <h2 class="text-center text-light my-2">Dashboard</h2>
    <h3 class="m-3 text-center text-light">My Budget</h3>
    <BudgetBar class="budget"/>
    <div class="d-flex align-items-center justify-content-between pe-3">
      <h3 class="m-3">Transactions</h3> 
      <router-link class="btn btn-primary" to="/expenses">
            View Expenses
    </router-link>
    </div>
  </body>
    <ExpenseList class="expense-L rounded-5 p-0"/>
</template>

<script>
import BudgetBar from "@/components/BudgetBar.vue";
import ExpenseList from "@/components/ExpenseList.vue";

export default ({
  components: { BudgetBar, ExpenseList},
});
</script>

<style scoped>

body {
  background-image: linear-gradient( #007bff 30%,#FFFDE4) !important;
}
.expense-L {
  min-height: 45vh;
}
</style>
