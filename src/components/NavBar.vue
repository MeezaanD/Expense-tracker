<template>
  <div class="d-flex justify-content-center">
    <div id="animatedButtons" class="collapse">
      <div class="d-flex justify-content-center gap-3 my-5">
        <button class="btn rounded-pill p-2 btn-primary" @click="openAddExpenseModal">
          <i class="bi bi-plus-circle"></i> Expense
        </button>
        <button class="btn rounded-pill p-2 btn-primary" data-bs-toggle="modal" data-bs-target="#openBudget">
          <i class="bi bi-plus-circle"></i> Budget
        </button>
      </div>
    </div>
    <!-- /// -->
    <ul class="nav nav-fill d-flex justify-content-between text-center gap-5 p-4 position-relative">
      <button class="btn btn-primary rounded-5 custom-btn position-absolute" data-bs-toggle="collapse"
        data-bs-target="#animatedButtons">
        <i class="bi bi-plus-circle fs-2"></i>
      </button>
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'expenses' }">
          <i class="bi bi-bag fs-2"></i>
        </router-link>
        Expense
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'dashboard' }">
          <i class="bi bi-house fs-2"></i>
        </router-link>
        Dashboard
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'budget' }">
          <i class="bi bi-coin fs-2"></i>
        </router-link>
        Budget
      </li>
    </ul>
    <!-- /// -->
    <AddBudget @budgetAdded="addBudget" />
    <AddExpense ref="addExpense" @expenseAdded="addExpense" :selectedBudget="selectedBudget" :budgets="budgets" />
  </div>
</template>
  
  
<script>

import AddBudget from "./AddBudget.vue";
import AddExpense from "./AddExpense.vue";

export default {
  components: {
    AddBudget, AddExpense
  },
  data() {
    return {
      showButtons: false,
      // 
      budgets: [],
      expenses: [],
      selectedBudget: "",
      editingIndex: -2,
    };
  },
  mounted() {
    this.loadDataFromLocalStorage();
  },
  methods: {
    toggleButtons() {
      this.showButtons = !this.showButtons;
    },
    // 
    addBudget(budget) {
      this.budgets.push(budget);
      this.saveDataToLocalStorage();
    },

    addExpense(expense) {
      this.expenses.push(expense);
      this.saveDataToLocalStorage();
    },
    saveDataToLocalStorage() {
      localStorage.setItem("budgets", JSON.stringify(this.budgets));
      localStorage.setItem("expenses", JSON.stringify(this.expenses));
    },
    loadDataFromLocalStorage() {
      const savedBudgets = localStorage.getItem("budgets");
      if (savedBudgets) {
        this.budgets = JSON.parse(savedBudgets);
      }
      const savedExpenses = localStorage.getItem("expenses");
      if (savedExpenses) {
        this.expenses = JSON.parse(savedExpenses);
      }
    },
    openAddExpenseModal() {
      $("#addExpenseModal").modal("show");
    },
  }
};
</script>


  
<style scoped></style>
  