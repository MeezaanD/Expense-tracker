<template>
	<Budget class="budget" />
</template>

<script>
import Budget from "@/components/Budget.vue";

export default ({
	components: { Budget },
});
</script>

<style scoped>
.budget {
	min-height: 85vh;
}
</style>
