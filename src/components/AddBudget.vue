<template>
    <div>
      <div class="modal fade" id="openBudget" tabindex="-1" aria-labelledby="openBudgetLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="openBudgetLabel">Create Budget</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="form-floating mb-3">
                <select class="form-select" v-model="useCustomName">
                  <option value="false">Select a Month</option>
                  <option value="true">Enter Custom Name</option>
                </select>
                <label>Select Budget Name</label>
              </div>
  
              <div v-if="useCustomName === 'true'" class="form-floating mb-3">
                <input type="text" class="form-control" id="customBudgetName" v-model="customBudgetName" placeholder="">
                <label for="customBudgetName">Custom Budget Name</label>
              </div>
  
              <div v-if="useCustomName === 'false'" class="form-floating mb-3">
                <select class="form-select" v-model="selectedMonth">
                  <option value="">Select a Month</option>
                  <option v-for="(month, index) in monthNames" :key="index" :value="month">{{ month }}</option>
                </select>
                <label>Select Month</label>
              </div>
  
              <div class="form-floating">
                <input type="number" class="form-control" id="budgetAmount" v-model="budgetAmount" placeholder="">
                <label for="budgetAmount">Amount</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="addBudgetToParent">Create</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        useCustomName: 'false', 
        customBudgetName: '',
        selectedMonth: '',
        monthNames: [
          'January', 'February', 'March', 'April',
          'May', 'June', 'July', 'August',
          'September', 'October', 'November', 'December'
        ],
        budgetAmount: '',
      };
    },
    methods: {
      addBudgetToParent() {
        if ((this.useCustomName === 'true' && this.customBudgetName) || (this.useCustomName === 'false' && this.selectedMonth)) {
          const budgetName = this.useCustomName === 'true' ? this.customBudgetName : this.selectedMonth;
          this.$emit("budgetAdded", {
            name: budgetName,
            amount: parseFloat(this.budgetAmount),
          });
          this.customBudgetName = '';
          this.selectedMonth = '';
          this.budgetAmount = '';
          this.useCustomName = 'false'; 
          $('#openBudget').modal('hide');
        }
      },
    },
  };
  </script>
  