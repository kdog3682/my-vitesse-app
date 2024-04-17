<!-- Component part -->
<template>
	<h1>{{ msg }}</h1>
	<button @click="count++">count is: {{ count }}</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<!-- Preview part -->

<preview lang="md">

	# This is preview page of HelloWorld.vue

	## Props

	| Props       | Description    |
	| ----------- | -------------- |
	| msg         | Title message  |

	## Examples

	<script setup>
	const msgs = [
	'Hello Peter',
	'Hello John',
	];
	</script>

	<template v-for="msg in msgs">
		<slot :msg="msg"></slot>
	</template>

	<style>
	body {
		background-color: green;
	}
	</style>

</preview>

