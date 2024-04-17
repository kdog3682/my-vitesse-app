<script setup>
import { ref, onMounted } from 'vue'

const message = ref('')

function mountedFunction() {
  message.value = 'Component mounted!'
}

onMounted(mountedFunction)
</script>

<template>
  <div>{{ message }}</div>
</template>
