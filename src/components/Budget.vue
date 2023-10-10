<template>
	<div class="container">
		<div>
			<div>
				<h2 class="text-center my-2">My Budget</h2>
				<div class="progress-container">
					<div class="progress-circle">
						<svg class="progress-svg" width="100" height="100">
							<circle class="progress-bg" cx="50" cy="50" r="45" stroke="#eee" stroke-width="10"
								fill="transparent">
							</circle>
							<circle class="progress-bar" cx="50" cy="50" r="45" :stroke-dasharray="circumference"
								:stroke-dashoffset="progressOffset" stroke="#dc3545" stroke-width="10" fill="transparent">
							</circle>
						</svg>
					</div>
					<div class="progress-label">
						<span>{{ budgetPercentage.toFixed(0) }}%</span>
					</div>
				</div>
				<div>
					<p class="text-center" v-if="totalBudget === 0">No budget currently selected</p>
					<p class="text-center" v-else>Available Budget: R<span>{{ availableBudget }} / {{ totalBudget }}</span>
					</p>
				</div>
				<div class="d-flex justify-content-center my-3 gap-3">
					<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#openBudget">
						<i class="bi bi-plus-circle"></i>
						Create Budget
					</button>
					<button type="button" class="btn btn-primary" @click="openIncreaseBudgetModal">
						Increase Budget
					</button>
				</div>
			</div>

			<div>
				<div class="form-floating my-2 transparent-select">
					<label for="budgetSelect" v-if="!selectedBudget">Select Budget</label>
					<select class="form-select" v-model="selectedBudget">
						<option class="text-black" v-for="(budget, index) in budgets" :key="index" :value="budget.name">{{
							budget.name }}</option>
					</select>
				</div>

				<div class="my-2">
					<table class="table">
						<thead>
							<tr>
								<th scope="col">Budget</th>
								<th scope="col">Amount</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<tbody>
							<!-- Check if budgets array is empty -->
							<tr v-if="budgets.length === 0">
								<td colspan="3">Budgets will appear when you add them.</td>
							</tr>
							<!-- If there are budgets, display the table rows -->
							<tr v-else v-for="(budget, index) in budgets" :key="index">
								<td>{{ budget.name }}</td>
								<td>R{{ budget.amount }}</td>
								<td>
									<button class="btn btn-danger btn-sm" @click="deleteBudget(index)">
										Remove <i class="bi bi-trash"></i>
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div>
			<div v-if="selectedBudget">
				<div class="d-flex justify-content-between pe-1 my-2">
					<h2>Expenses for {{ selectedBudget }}</h2>
					<button class="btn btn-primary rounded-pill" @click="openAddExpenseModal">
						<i class="bi bi-plus-circle fs-5"></i>
					</button>
				</div>
				<div>
					<table class="table">
						<thead>
							<tr>
								<th scope="col">Expense</th>
								<th scope="col">Amount</th>
								<th scope="col" class="text-center">Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(expense, index) in filteredExpenses" :key="index">
								<td>{{ expense.name }}</td>
								<td>R{{ expense.amount }}</td>
								<td>
									<div class="d-flex justify-content-center gap-1">
										<button class="btn rounded-pill btn-secondary" @click="editExpense(index)">
											<i class="bi bi-pencil-square"></i>
										</button>
										<button class="btn rounded-pill btn-danger" @click="deleteExpense(index)">
											<i class="bi bi-trash"></i>
										</button>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div v-else>
				<p class="text-center">Please select your budget to view expenses.</p>
			</div>
		</div>
		<AddBudget @budgetAdded="addBudget" />
		<AddExpense ref="addExpense" @expenseAdded="addExpense" :selectedBudget="selectedBudget" :budgets="budgets" />
		<EditExpense :expense="expenses[editingIndex]" :show="editingIndex >= 0" ref="editExpense"
			@expenseUpdated="updateExpense" :budgets="budgets" />
		<IncreaseBudget :budgets="budgets" @budgetIncreased="increaseBudgetValue" />
	</div>
</template>
  
<script>
import AddBudget from "./AddBudget.vue";
import AddExpense from "./AddExpense.vue";
import EditExpense from "./EditExpense.vue";
import IncreaseBudget from "./IncreaseBudget.vue"

export default {
	components: {
		AddBudget,
		AddExpense,
		EditExpense,
		IncreaseBudget
	},
	data() {
		return {
			budgets: [],
			expenses: [],
			selectedBudget: "",
			editingIndex: -1,
		};
	},
	computed: {
		totalBudget() {
			if (this.selectedBudget === "") {
				return 0;
			}
			return this.budgets.find((budget) => budget.name === this.selectedBudget)?.amount || 0;
		},
		budgetPercentage() {
			if (this.totalBudget === 0) return 0;
			return Math.round(((this.totalBudget - this.availableBudget) / this.totalBudget) * 100);
		},
		circumference() {
			return Math.PI * 45 * 2;
		},
		progressOffset() {
			return this.circumference - (this.budgetPercentage / 100) * this.circumference;
		},
		availableBudget() {
			const budget = this.budgets.find((budget) => budget.name === this.selectedBudget);
			if (!budget) {
				return 0;
			}
			const totalExpenses = this.expenses.reduce((total, expense) => {
				if (expense.budgetName === this.selectedBudget) {
					return total + expense.amount;
				}
				return total;
			}, 0);
			return budget.amount - totalExpenses;
		},
		filteredExpenses() {
			// Filter expenses based on the selected budget
			return this.expenses.filter((expense) => expense.budgetName === this.selectedBudget);
		},
	},
	mounted() {
		this.loadDataFromLocalStorage();
	},
	methods: {
		addBudget(budget) {
			this.budgets.push(budget);
			this.saveDataToLocalStorage();
		},
		deleteBudget(index) {
			if (confirm("Are you sure you want to delete this budget?")) {
				// Remove the budget from the budgets array
				const deletedBudget = this.budgets.splice(index, 1)[0];

				// Remove all expenses associated with the deleted budget
				this.expenses = this.expenses.filter((expense) => expense.budgetName !== deletedBudget.name);

				this.saveDataToLocalStorage();
			}
		},
		// Method to open the IncreaseBudget modal
		openIncreaseBudgetModal() {
			$("#increaseBudget").modal("show");
		},
		// Method to increase the budget value
		increaseBudgetValue(increaseData) {
			const { selectedBudget, increaseAmount } = increaseData;
			console.log("Selected Budget:", selectedBudget);
			console.log("Increase Amount:", increaseAmount);

			// Find the budget to increase based on the selectedBudget
			const budgetToIncrease = this.budgets.find((budget) => budget.name === selectedBudget);

			if (budgetToIncrease && parseFloat(increaseAmount) > 0) {
				// Update the budget amount
				budgetToIncrease.amount += parseFloat(increaseAmount);

				// Save the updated budget data to local storage or perform any other necessary actions
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
	},
};
</script>
  
<style scoped>
</style>
  