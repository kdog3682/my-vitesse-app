<script setup>
  import { RouterLink, RouterView} from 'vue-router'
</script>
<template>
  <header>
    <RouterLink to="/">
      <h2>Home</h2>
    </RouterLink>
    <RouterLink to="/merch">
      <h2>Merch</h2>
    </RouterLink>
    <RouterLink to="/cart">
      <h2>Cart</h2>
    </RouterLink>
  </header>
  <RouterView />
</template>
<style>
  header {
    display: flex;
  }
  header :first-child {
    margin-right: 10px;
  }
</style>

