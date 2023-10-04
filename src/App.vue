<template>
  <router-link class="nav-link text-center mx-auto p-2 sticky-top bg-body-tertiary" :to="{ name: 'dashboard' }">
    <i class="bi bi-house fs-1"></i>Dashboard
  </router-link>
  <router-view />
  <Navbar class="navbar sticky-bottom" />
</template>

<script>

import Navbar from '@/components/NavBar.vue';
export default ({
  components: { Navbar },
});
</script>