// CounterComponent.vue
<template>
  <div>
    <button @click="increment">Increment</button>
    <span>Count: {{ count }}</span>
  </div>
</template>

<script setup>
import { onMounted, defineComponent, ref } from 'vue';

    defineProps(["abc"])
    const count = ref(0);

    const increment = () => {
      count.value++;
    };
    
    onMounted((x) => increment())

</script>

