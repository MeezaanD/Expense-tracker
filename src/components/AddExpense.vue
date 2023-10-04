<template>
    <div class="modal fade" tabindex="-1" role="dialog" id="addExpenseModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add Expense</h5>
                    <button type="button" class="btn-close" @click="closeModal">
                        <span aria-hidden="true"></span>
                    </button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="addExpense">
                        <div class="mb-3 form-floating">
                            <select class="form-select" id="budgetSelect" v-model="newExpense.budgetName" required>
                                <option v-for="(budget, index) in budgets" :key="index" :value="budget.name">{{ budget.name
                                }}</option>
                            </select>
                            <label for="budgetSelect">Select Budget:</label>
                        </div>
                        <div class="mb-3 form-floating">
                            <input type="text" class="form-control" id="expenseName" v-model="newExpense.name" required>
                            <label for="expenseName">Name:</label>
                        </div>
                        <div class="mb-3 form-floating">
                            <input type="text" class="form-control" id="expenseDescription"
                                v-model="newExpense.description">
                            <label for="expenseDescription">Description:</label>
                        </div>
                        <div class="mb-3 form-floating">
                            <input type="number" class="form-control" id="expenseAmount" v-model="newExpense.amount"
                                required>
                            <label for="expenseAmount">Amount:</label>
                        </div>
                        <div class="mb-3 form-floating">
                            <select class="form-select" id="expenseType" v-model="newExpense.type" required>
                                <option value="">Select Expense Type</option>
                                <option value="Payment">Payment</option>
                                <option value="Debit Order">Debit Order</option>
                                <option value="Subscription">Subscription</option>
                            </select>
                            <label for="expenseType">Expense Type:</label>
                        </div>
                        <div class="mb-3 form-floating">
                            <select class="form-select" id="expenseCategory" v-model="newExpense.category" required>
                                <option value="">Select Category</option>
                                <option value="personal">Personal</option>
                                <option value="food">Food</option>
                                <option value="family">Family</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="traveling">Traveling</option>
                                <option value="other">Other</option>
                            </select>
                            <label for="expenseCategory">Category:</label>
                        </div>
                        <div v-if="newExpense.category === 'other'" class="mb-3 form-floating">
                            <input type="text" class="form-control" id="otherCategory" v-model="newExpense.otherCategory" required>
                            <label for="otherCategory">Other Category:</label>
                        </div>
                        <div class="mb-3 form-floating">
                            <select class="form-select" id="paymentMethod" v-model="newExpense.selectedPaymentMethod"
                                required>
                                <option value="">Select Payment Method</option>
                                <option value="Card">Card</option>
                                <option value="Cash">Cash</option>
                                <option value="Withdrawal">Withdrawal</option>
                            </select>
                            <label for="paymentMethod">Payment Method:</label>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
props: {
    selectedBudget: String,
    budgets: Array,
},
data() {
    return {
        newExpense: {
            name: "",
            description: "",
            amount: null,
            selectedPaymentMethod: "",
            budgetName: this.selectedBudget,
            category: "",
            otherCategory: "",
            // Initialize a property for date and time
            dateTime: null,
        },
    };
},
methods: {
    addExpense() {
        // Find the selected budget
        const selectedBudget = this.budgets.find(
            (budget) => budget.name === this.newExpense.budgetName
        );
        if (!selectedBudget) {
            alert("Selected budget not found!");
            return;
        }
        const remainingBudget = selectedBudget.amount - this.newExpense.amount;
        if (remainingBudget < 0) {
            alert("Expense would exceed the budget amount!");
            return;
        }
        // Set the date and time property to the current date and time
        this.newExpense.dateTime = new Date().toLocaleString();
        this.$emit("expenseAdded", this.newExpense);
        this.newExpense = {
            name: "",
            description: "",
            amount: null,
            budgetName: this.selectedBudget,
            selectedPaymentMethod: "",
            category: "",
            otherCategory: "",
            dateTime: null, // Reset the dateTime property
        };
        this.closeModal();
    },
    closeModal() {
        $("#addExpenseModal").modal("hide");
    },
    openModal() {
        $("#addExpenseModal").modal("show");
    },
},
};
</script>