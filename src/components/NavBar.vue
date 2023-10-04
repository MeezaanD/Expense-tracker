<template>
  <div class="d-flex justify-content-center">
    <div id="animatedButtons" class="collapse">
      <div class="d-flex justify-content-center gap-3 my-1">
        <button class="btn custom-btn rounded-pill p-2 btn-primary" @click="openAddExpenseModal">
          <i class="bi bi-plus-circle"></i> Expense
        </button>
        <button class="btn custom-btn rounded-pill p-2 btn-primary" data-bs-toggle="modal" data-bs-target="#openBudget">
          <i class="bi bi-plus-circle"></i> Budget
        </button>
      </div>
    </div>
    <ul class="nav nav-fill d-flex justify-content-center p-3">
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'expenses' }">
          <i class="bi bi-bag fs-1"></i>
        </router-link>
      </li>
      <li class="nav-item">
        <button class="btn btn-primary rounded-pill" data-bs-toggle="collapse" data-bs-target="#animatedButtons">
          <i class="bi bi-plus-circle fs-3"></i>
        </button>
      </li>
      <li class="nav-item">
        <router-link class="nav-link rounded-pill" :to="{ name: 'budget' }">
          <i class="bi bi-coin fs-1"></i>
        </router-link>
      </li>
    </ul>
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
      editingIndex: -1,
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


  
<style scoped>
.nav {
  display: flex;
  justify-content: center;
  border-radius: 50px;
  background: #ffffff;
  box-shadow: inset 20px 20px 60px #bdbdbd,
    inset -20px -20px 60px #ffffff;
  width: 100%;
}

.nav-link {
  color: #000000;
}

.nav-link:hover {
  color: #000000;
}

/* Additional styles for animated buttons */
#animated-buttons {
  display: flex;
  justify-content: center;
  position: absolute;
  top: calc(100% + 10px);
  /* Adjust the vertical position */
  left: 0;
  right: 0;
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s;
  transform: translateY(-20px);
}

.animated-buttons.show {
  opacity: 1;
  transform: translateY(0);
}

.custom-btn {
  border-radius: 50%;
}
</style>
  