<script setup>
        function importer(kind) {
            switch (kind) {
                case 'images': return ref(import.meta.glob('../resources/images/*', {query: '?url', import: 'default', eager: true}))
                case 'data': return ref(import.meta.glob('../resources/data/*', {import: 'default', eager: true}))
                case 'raw': return ref(import.meta.glob('../resources/raw/*', {query: '?raw', import: 'default', eager: true}))
            }
        }


    const images = importer('images')
        console.log(images.value)
    const raw = importer('raw')
    const data = importer('data')

    import { useCartStore } from '../stores/cart.ts'
    import { storeToRefs } from 'pinia'
    const store = useCartStore()
    const { removeItems } = store
    const { cartItems, sortedItems } = storeToRefs(store)
</script>
<template>
  <h1>This is the cart page</h1>
  <main v-if="sortedItems.length > 0">
    <div v-for="item in sortedItems" :key="item.id" class="item">
        <h1>{{item.title}}</h1>
      <button @click="removeItems(item.id)">Remove</button>
    </div>
  </main>
  <main v-else>
            <div v-for = "imageSrc in images">
            <pre>{{imageSrc}}</pre>
                <img :src = "imageSrc" />
            </div>
        <pre v-for = "val in data">{{val}}</pre>
            ---
        <pre v-for = "val in raw">{{val}}</pre>
    <h2>There is nothing in your cart</h2>
  </main>
</template>

