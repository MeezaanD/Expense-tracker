<template>
	<div>
		<div class="modal fade" id="increaseBudget" tabindex="-1" aria-labelledby="increaseBudgetLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h1 class="modal-title text-dark" id="increaseBudgetLabel">Increase Budget</h1>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div class="form-floating mb-3">
							<select class="form-select" id="selectedBudget" v-model="selectedBudget">
								<option value="" disabled>Select a Budget</option>
								<option v-for="(budget, index) in budgets" :key="index" :value="budget.name">{{ budget.name
								}}</option>
							</select>
						</div>
						<div class="form-floating mb-3">
							<input type="number" class="form-control" id="increaseAmount" v-model="increaseAmount">
							<label for="increaseAmount">Amount to Increase</label>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary" @click="increaseBudget">Increase</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
  
<script>
export default {
	props: {
		budgets: Array, 
	},
	data() {
		return {
			selectedBudget: '',
			increaseAmount: '',
		};
	},
	methods: {
		increaseBudget() {
			if (parseFloat(this.increaseAmount) > 0) {
				this.$emit("budgetIncreased", {
					selectedBudget: this.selectedBudget,
					increaseAmount: parseFloat(this.increaseAmount),
				});
				this.selectedBudget = ''; 
				this.increaseAmount = ''; 
				$("#increaseBudget").modal("hide");
			}
		}

	},
};
</script>
  