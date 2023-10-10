<template>
	<div class="container">
		<div class="form-floating mx-2 mb-3">
			<input type="text" class="form-control transparent-input" id="expenseNameFilter" v-model="searchTerm"
				placeholder="">
			<label class="transparent-label" for="expenseNameFilter">Search by Expense Name</label>
		</div>
		<!-- /// -->
		<div class="my-2">
			<div class="table-responsive">
				<table class="table">
					<thead>
						<tr>
							<th class="text-center">Category</th>
							<th>Expense</th>
							<th>Amount</th>
						</tr>
					</thead>
					<tbody>
						<tr class="border-bottom" v-for="(expense, index) in displayedExpenses" :key="index">
							<td class="align-middle text-center">
								<i :class="['bi fs-1 pe-3', categoryIcons[expense.category]]"></i>
							</td>
							<td class="align-middle">{{ expense.name }}</td>
							<td class="align-middle">R{{ expense.amount }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<!-- /// -->
		<router-link v-if="showViewMoreButton" to="/expenses">
			<button class="btn btn-primary mx-2">
				View More
			</button>
		</router-link>
		<AddBudget @budgetAdded="addBudget" />
		<AddExpense ref="addExpense" @expenseAdded="addExpense" :selectedBudget="selectedBudget" :budgets="budgets" />
	</div>
</template>
  
<script>
import AddBudget from "./AddBudget.vue";
import AddExpense from "./AddExpense.vue";

export default {
	components: {
		AddBudget,
		AddExpense,
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
			selectedDateFilter: '',
			searchTerm: '',
			editingIndex: -1,
			categoryIcons: {
				personal: 'bi-person-fill',
				food: 'bi-cup-straw',
				family: 'bi-people-fill',
				entertainment: 'bi-controller',
				traveling: 'bi-car-front',
				other: 'bi-star-fill',
			},
		};
	},
	computed: {
		displayedExpenses() {
			return this.sortedExpenses.slice(0, 5);
		},
		showViewMoreButton() {
			return this.sortedExpenses.length > 5;
		},
		filteredExpenses() {
			return this.expenses.filter((expense) =>
				(!this.selectedDateFilter || expense.dateTime === this.selectedDateFilter) && // Add date filter
				(!this.searchTerm || expense.name.toLowerCase().includes(this.searchTerm.toLowerCase())) // Add expense name search
			);
		},
		sortedExpenses() {
			return this.filteredExpenses.slice().sort((a, b) => {
				const dateA = new Date(a.dateTime);
				const dateB = new Date(b.dateTime);
				return dateB - dateA; // Sort in descending order
			});
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
  
<style scoped>
.transparent-input {
	background-color: transparent;
	border: none;
	border-bottom: 1px solid #ced4da;
	color: #fff;
}

.transparent-label {
	background-color: transparent;
}
</style>
  