<template>
    <div class="container-fluid">
        <h2>All Expenses</h2>
        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop"
            aria-controls="offcanvasTop">Filter By</button>

        <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasTopLabel">Offcanvas top</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div class="col-md-3">
                    <div class="form-group">
                        <label for="budgetFilter">Filter by Budget:</label>
                        <select id="budgetFilter" class="form-control" v-model="selectedBudgetFilter">
                            <option value="">All Budgets</option>
                            <option v-for="budget in budgets" :key="budget.name" :value="budget.name">{{ budget.name }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="expenseTypeFilter">Filter by Expense Type:</label>
                        <select id="expenseTypeFilter" class="form-control" v-model="selectedExpenseTypeFilter">
                            <option value="">All Types</option>
                            <option value="Payment">Payment</option>
                            <option value="Debit Order">Debit Order</option>
                            <option value="Subscription">Subscription</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="expenseCategoryFilter">Filter by Category:</label>
                        <select id="expenseCategoryFilter" class="form-control" v-model="selectedCategoryFilter">
                            <option value="">All Categories</option>
                            <option value="personal">Personal</option>
                            <option value="family">Family</option>
                            <option value="traveling">Traveling</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="paymentMethodFilter">Filter by Payment Method:</label>
                        <select id="paymentMethodFilter" class="form-control" v-model="selectedPaymentMethodFilter">
                            <option value="">All Payment Methods</option>
                            <option value="Card">Card</option>
                            <option value="Cash">Cash</option>
                            <option value="Withdrawal">Withdrawal</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="dateFilter">Filter by Date:</label>
                        <input type="text" id="dateFilter" class="form-control" v-model="selectedDateFilter"
                            placeholder="YYYY-MM-DD">
                        <button class="btn btn-danger" @click="clearDateFilter">Clear Date Filter</button>
                    </div>
                    <div class="form-group">
                        <label for="expenseNameFilter">Search by Expense Name:</label>
                        <input type="text" id="expenseNameFilter" class="form-control" v-model="searchTerm">
                        <button class="btn btn-danger" @click="clearSearchTerm">Clear Expense Name Search</button>
                    </div>
                    <div class="btn-group" role="group" aria-label="Sort by Amount">
                        <button class="btn btn-secondary" @click="sortByAmount('highToLow')">High to Low</button>
                        <button class="btn btn-secondary" @click="sortByAmount('lowToHigh')">Low to High</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row py-3">
            <div class="col-md-9">
                <div class="row">
                    <div class="col-md-4" v-for="(expense, index) in filteredExpenses" :key="index">
                        <div class="card mb-4">
                            <div class="card-body">
                                <h5 class="card-title">{{ expense.name }}</h5>
                                <p class="card-text">Description: {{ expense.description }}</p>
                                <p class="card-text">Amount: R{{ expense.amount }}</p>
                                <p class="card-text">Budget: {{ expense.budgetName }}</p>
                                <p class="card-text">Type: {{ expense.type }}</p>
                                <p class="card-text">Category: {{ expense.category }}</p>
                                <p class="card-text">Payment Method: {{ expense.selectedPaymentMethod }}</p>
                                <p class="card-text">Date: {{ expense.dateTime }}</p>
                                <button class="btn btn-secondary" @click="editExpense(index)">
                                    <i class="bi bi-pencil-square"></i> Edit
                                </button>
                                <button class="btn btn-danger" @click="deleteExpense(index)">
                                    <i class="bi bi-trash"></i> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                    <div v-if="filteredExpenses.length === 0" class="col-md-12">
                       Your expenses will appear here.
                    </div>
                </div>
            </div>
        </div>
        <AddBudget @budgetAdded="addBudget" />
        <AddExpense ref="addExpense" @expenseAdded="addExpense" :selectedBudget="selectedBudget" :budgets="budgets" />
        <EditExpense :expense="expenses[editingIndex]" :show="editingIndex >= 0" ref="editExpense"
            @expenseUpdated="updateExpense" :budgets="budgets" />
    </div>
</template>
  
<script>
import AddBudget from "./AddBudget.vue";
import AddExpense from "./AddExpense.vue";
import EditExpense from "./EditExpense.vue";

export default {
    components: {
        AddBudget,
        AddExpense,
        EditExpense,
    },
    data() {
        return {
            budgets: [],
            expenses: [],
            selectedBudget: "",
            selectedBudgetFilter: '',
            selectedExpenseTypeFilter: '',
            selectedCategoryFilter: '',
            selectedPaymentMethodFilter: '',
            selectedDateFilter: '', // New property for date filter
            searchTerm: '', // New property for expense name search
            editingIndex: -1,
        };
    },
    computed: {
        filteredExpenses() {
            return this.expenses.filter((expense) =>
                (!this.selectedExpenseTypeFilter || expense.type === this.selectedExpenseTypeFilter) &&
                (!this.selectedCategoryFilter || expense.category === this.selectedCategoryFilter) &&
                (!this.selectedPaymentMethodFilter || expense.selectedPaymentMethod === this.selectedPaymentMethodFilter) &&
                (!this.selectedBudgetFilter || expense.budgetName === this.selectedBudgetFilter) &&
                (!this.selectedDateFilter || expense.dateTime === this.selectedDateFilter) && // Add date filter
                (!this.searchTerm || expense.name.toLowerCase().includes(this.searchTerm.toLowerCase())) // Add expense name search
            );
        },
    },
    methods: {
        addBudget(budget) {
            this.budgets.push(budget);
            this.saveDataToLocalStorage();
        },
        deleteBudget(index) {
            if (confirm("Are you sure you want to delete this budget?")) {
                const deletedBudget = this.budgets.splice(index, 1)[0];
                this.expenses = this.expenses.filter((expense) => expense.budgetName !== deletedBudget.name);
                this.saveDataToLocalStorage();
            }
        },
        addExpense(expense) {
            this.expenses.push(expense);
            this.saveDataToLocalStorage();
        },
        editExpense(index) {
            this.editingIndex = index;
            this.$refs.editExpense.openModal();
        },
        updateExpense(expense) {
            if (this.editingIndex >= 0) {
                this.expenses[this.editingIndex] = expense;
                this.saveDataToLocalStorage();
            }
            this.editingIndex = -1;
        },
        deleteExpense(index) {
            if (confirm("Are you sure you want to delete this expense?")) {
                this.expenses.splice(index, 1);
                this.saveDataToLocalStorage();
            }
        },
        sortByAmount(order) {
            if (order === 'highToLow') {
                this.expenses.sort((a, b) => b.amount - a.amount);
            } else if (order === 'lowToHigh') {
                this.expenses.sort((a, b) => a.amount - b.amount);
            }
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
        clearDateFilter() {
            this.selectedDateFilter = '';
        },
        clearSearchTerm() {
            this.searchTerm = '';
        },
    },
    mounted() {
        this.loadDataFromLocalStorage();
    },
};
</script>
  
<style scoped></style>
  