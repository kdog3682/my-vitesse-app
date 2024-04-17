    <script setup>
    import { ref } from 'vue';

    const newItems = ref([
      {
        title: 'HP Laptop',
        id: 1
      },
      {
        title: 'Iphone X',
        id: 2
      },
      {
        title: 'Travelling Bag',
        id: 3
      },
      {
        title: 'Nike Shoes',
        id: 4
      },
      {
        title: 'Leather Belts',
        id: 5
      },
      {
        title: 'Mechanical Keyboard',
        id: 6
      },
      {
        title: 'Water Gun',
        id: 7
      },
      {
        title: 'Earth Globe',
        id: 8
      },
      {
        title: 'Javascript book',
        id: 9
      },
      {
        title: 'Black T-shirt',
        id: 10
      },
    ])

import { useCartStore } from "../stores/cart.ts";
const store = useCartStore();
const { addItems } = store;
    </script>
    <template>
      <main>
        <h1>Items for sale</h1>
        <div v-for="item in newItems" :key="item.id">
          <div class="item">
                <h1>{{item.title}}</h1>
                <button @click="addItems(item)">Add</button>
          </div>
        </div>
      </main>
    </template>

    <style>
      .item {
        width: 50em;
        height: auto;
        margin: 10px auto;
        border: solid black 3px;
      }
      button {
        margin-left: 10px;
        height: 20px;
        width: 70px;
      }
    </style>

