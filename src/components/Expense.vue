<template>
	<div class="container">
		<div class="d-flex justify-content-between gap-2 mx-1 my-3">
			<button class="btn rounded-pill" @click="toggleEditColumn">
				<i class="bi bi-pencil-square fs-1 text-light"></i>
			</button>
			<div class="d-flex gap-2">
				<button class="btn rounded-pill" @click="openAddExpenseModal">
					<i class="bi bi-plus-circle fs-1 text-light"></i>
				</button>
				<button class="btn rounded-pill" @click="toggleDeleteColumn">
					<i class="bi bi-trash fs-1 text-light"></i>
				</button>
			</div>
		</div>
		<!-- /// -->
		<div class="d-flex justify-content-center">
			<div class="form-floating px-1">
				<input type="text" class="form-control transparent-input rounded-1 text-light" id="expenseNameFilter"
					v-model="searchTerm" placeholder="" />
				<label class="transparent-label" for="expenseNameFilter">
					<i class="bi bi-search"></i> Search
				</label>
			</div>
			<button class="btn rounded-pill" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling"
				aria-controls="offcanvasScrolling">
				<i class="bi bi-filter-circle fs-1 text-light"></i>
			</button>
		</div>
		<!-- /// -->
		<div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1"
			id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
			<div class="offcanvas-header">
				<h5 class="offcanvas-title" id="offcanvasScrollingLabel">
					Filter Methods
				</h5>
				<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
			</div>
			<div class="offcanvas-body">
				<div>
					<ul class="list-group">
						<li class="list-group-item">
							<label for="budgetFilter">Filter by Budget:</label>
							<select id="budgetFilter" class="form-select" v-model="selectedBudgetFilter">
								<option value="">All Budgets</option>
								<option v-for="budget in budgets" :key="budget.name" :value="budget.name">
									{{ budget.name }}
								</option>
							</select>
						</li>
						<li class="list-group-item">
							<label for="expenseTypeFilter">Filter by Expense Type:</label>
							<select id="expenseTypeFilter" class="form-select" v-model="selectedExpenseTypeFilter">
								<option value="">All Types</option>
								<option value="Payment">Payment</option>
								<option value="Debit Order">Debit Order</option>
								<option value="Subscription">Subscription</option>
							</select>
						</li>
						<li class="list-group-item">
							<label for="expenseCategoryFilter">Filter by Category:</label>
							<select id="expenseCategoryFilter" class="form-select" v-model="selectedCategoryFilter">
								<option value="">All Categories</option>
								<option value="personal">Personal</option>
								<option value="family">Family</option>
								<option value="traveling">Traveling</option>
								<option value="other">Other</option>
							</select>
						</li>
						<li class="list-group-item">
							<label for="paymentMethodFilter">Filter by Payment Method:</label>
							<select id="paymentMethodFilter" class="form-select" v-model="selectedPaymentMethodFilter">
								<option value="">All Payment Methods</option>
								<option value="Card">Card</option>
								<option value="Cash">Cash</option>
								<!-- <option value="Withdrawal">Withdrawal</option> -->
							</select>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- /// -->
		<h3 class="text-start px-3 py-3">List of Expenses</h3>
		<div class="container">
			<div class="scrollable-row">
				<div class="card p-0" v-for="(expense, index) in filteredExpenses" :key="index">
					<p class="card-text p-5" v-if="filteredExpenses.length === 0">
						Your expenses will appear here.
					</p>
					<div class="card-body py-3">
						<div class="row d-flex justify-content-between">
							<div class="d-flex justify-content-start">
								<button class="btn p-0 m-0 rounded-5" @click="editExpense(index)" v-if="showEditColumn">
									<i class="bi bi-pencil-square fs-3 text-light"></i>
								</button>
							</div>
								<div class="d-flex align-items-center gap-3 justify-content-between">
									<i :class="['bi expense-icon', categoryIcons[expense.category]]"></i>
									<div>
										<p class="time-text">{{ formatDate(expense.dateTime) }}</p>
										<p class="expense-name m-0">
											{{ expense.name }}
										</p>
										<p class="payment-method m-0">
											{{ expense.selectedPaymentMethod }}
										</p>
										<div class="d-flex gap-3 align-items-center justify-content-start">
											<button class="btn p-0 m-0 rounded-5" @click="deleteExpense(index)"
												v-if="showDeleteColumn">
												<i class="bi bi-dash-circle fs-3 text-light"></i>
											</button>
											<p class="price-text pt-3">R{{ expense.amount }}</p>
										</div>
									</div>
								</div>
						</div>
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
			selectedBudgetFilter: "",
			selectedExpenseTypeFilter: "",
			selectedCategoryFilter: "",
			selectedPaymentMethodFilter: "",
			selectedDateFilter: "",
			searchTerm: "",
			editingIndex: -1,
			showEditColumn: false,
			showDeleteColumn: false,
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
		filteredExpenses() {
			return this.expenses.filter(
				(expense) =>
					(!this.selectedExpenseTypeFilter ||
						expense.type === this.selectedExpenseTypeFilter) &&
					(!this.selectedCategoryFilter ||
						expense.category === this.selectedCategoryFilter) &&
					(!this.selectedPaymentMethodFilter ||
						expense.selectedPaymentMethod ===
						this.selectedPaymentMethodFilter) &&
					(!this.selectedBudgetFilter ||
						expense.budgetName === this.selectedBudgetFilter) &&
					(!this.selectedDateFilter ||
						expense.dateTime === this.selectedDateFilter) &&
					(!this.searchTerm ||
						expense.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
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
				this.expenses = this.expenses.filter(
					(expense) => expense.budgetName !== deletedBudget.name
				);
				this.saveDataToLocalStorage();
			}
		},
		addExpense(expense) {
			this.expenses.push(expense);
			this.saveDataToLocalStorage();
		},
		openAddExpenseModal() {
			$("#addExpenseModal").modal("show");
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
		toggleEditColumn() {
			this.showEditColumn = !this.showEditColumn;
		},
		toggleDeleteColumn() {
			this.showDeleteColumn = !this.showDeleteColumn;
		},
		sortByAmount(order) {
			if (order === "highToLow") {
				this.expenses.sort((a, b) => b.amount - a.amount);
			} else if (order === "lowToHigh") {
				this.expenses.sort((a, b) => a.amount - b.amount);
			}
		},
		formatDate(dateTime) {
			const date = new Date(dateTime);
			const options = { year: 'numeric', month: 'long', day: 'numeric' };
			return date.toLocaleDateString(undefined, options);
		},

		clearDateFilter() {
			this.selectedDateFilter = "";
		},
		clearSearchTerm() {
			this.searchTerm = "";
		},
	},
	mounted() {
		this.loadDataFromLocalStorage();
	},
};
</script>

<style scoped>
</style>
