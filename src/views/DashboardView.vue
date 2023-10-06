<template>
    <h2 class="text-center">Dashboard</h2>
    <BudgetBar class="budget"/>
    <div class="d-flex align-items-center justify-content-between pe-3">
      <h3 class="m-3">Transactions</h3> 
      <router-link class="btn btn-expenses" to="/expenses">
            View Expenses
    </router-link>
    </div>
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

.expense-L {
  min-height: 45vh;
}
</style>
