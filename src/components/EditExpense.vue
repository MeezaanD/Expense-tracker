<template>
	<div class="modal fade" tabindex="-1" role="dialog" id="editExpenseModal">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title text-dark">Edit Expense</h5>
					<button type="button" class="btn-close" @click="closeModal">
						<span aria-hidden="true"></span>
					</button>
				</div>
				<div class="modal-body">
					<form @submit.prevent="updateExpense">
						<div class="mb-3 form-floating">
							<input type="text" class="form-control" id="editExpenseName" v-model="editedExpense.name"
								required>
							<label for="editExpenseName">Name:</label>
						</div>
						<div class="mb-3 form-floating">
							<input type="number" class="form-control" id="editExpenseAmount" v-model="editedExpense.amount"
								required>
							<label for="editExpenseAmount">Amount:</label>
						</div>
						<div class="mb-3 form-floating">
							<select class="form-select" id="editPaymentMethod" v-model="editedExpense.selectedPaymentMethod"
								required>
								<option value="">Select Payment Method</option>
								<option value="Card">Card</option>
								<option value="Cash">Cash</option>
								<!-- <option value="Withdrawal">Withdrawal</option> -->
							</select>
							<label for="editPaymentMethod">Payment Method:</label>
						</div>
						<div class="mb-3 form-floating">
							<select class="form-select" id="editExpenseType" v-model="editedExpense.type" required>
								<option value="">Select Expense Type</option>
								<option value="Payment">Payment</option>
								<option value="Debit Order">Debit Order</option>
								<option value="Subscription">Subscription</option>
								<option value="other">Other</option>
							</select>
							<label for="editExpenseType">Expense Type:</label>
						</div>
						<div v-if="editedExpense.type === 'other'" class="mb-3 form-floating">
							<input type="text" class="form-control" id="editOtherType" v-model="editedExpense.otherType"
								required>
							<label for="editOtherType">Other Expense Type:</label>
						</div>
						<div class="mb-3 form-floating">
							<select class="form-select" id="editExpenseCategory" v-model="editedExpense.category" required>
								<option value="">Select Category</option>
								<option value="personal">Personal</option>
								<option value="food">Food</option>
								<option value="family">Family</option>
								<option value="entertainment">Entertainment</option>
								<option value="traveling">Traveling</option>
								<option value="other">Other</option>
							</select>
							<label for="editExpenseCategory">Category:</label>
						</div>
						<div v-if="editedExpense.category === 'other'" class="mb-3 form-floating">
							<input type="text" class="form-control" id="editOtherCategory"
								v-model="editedExpense.otherCategory" required>
							<label for="editOtherCategory">Other Category:</label>
						</div>
						<button type="submit" class="btn btn-primary">Save Changes</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		expense: Object,
		show: Boolean,
		budgets: Array,
		originalDateTime: String,
	},
	data() {
		return {
			editedExpense: {
				name: "",
				amount: null,
				budgetName: "",
				selectedPaymentMethod: "",
				type: "",
				otherType: "",
				category: "",
				otherCategory: "",
				dateTime: this.originalDateTime,
			},
		};
	},
	computed: {
		formattedDate() {
			if (this.editedExpense.dateTime) {
				const date = new Date(this.editedExpense.dateTime);
				const year = date.getFullYear();
				const month = (date.getMonth() + 1).toString().padStart(2, '0');
				const day = date.getDate().toString().padStart(2, '0');
				return `${year}-${month}-${day}`;
			}
			return null;
		},
	},

	methods: {
		closeModal() {
			$("#editExpenseModal").modal("hide");
		},
		openModal() {
			if (this.expense) {
				this.editedExpense = {
					name: this.expense.name || "",
					amount: this.expense.amount || null,
					budgetName: this.expense.budgetName || "",
					selectedPaymentMethod: this.expense.selectedPaymentMethod || "",
					type: this.expense.type || "",
					otherType: this.expense.otherType || "",
					category: this.expense.category || "",
					otherCategory: this.expense.otherCategory || "",
					dateTime: this.expense.dateTime || null,
				};
				$("#editExpenseModal").modal("show");
			}
		},



		updateExpense() {
			this.$emit("expenseUpdated", this.editedExpense);
			this.closeModal();
		},
	},
};
</script>
