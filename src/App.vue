<template>
	<router-view class="p-2" />
	<Navbar class="navbar sticky-bottom" />
</template>

<script>

import Navbar from '@/components/NavBar.vue';
export default ({
	components: { Navbar },
});
</script>

<style scoped>
</style>
