<template>
  <div>
    <div
      class="skewed-bg rounded-xl w-full h-[300px] relative bg-gradient-to-r from-slate-200 from-0% via-red-500 via-50% to-slat-200 to-100% before:absolute before:top-0 before:left-[50%] before:content-[''] before:skew-x-[-20deg] before:w-[1px] before:h-full before:bg-slate-200"
    ></div>
    <div>
      Total Prducts: {{ productCount }}

      <ul>
        <li v-for="product in products">product: {{ product }}</li>
      </ul>
      <p>{{ productCount }}</p>
      <ul>
        <li v-for="product in productsCheaperThan(10)"></li>
      </ul>
      <button class="btn" @click="addProduct2('apples')">Add Apples</button>
    </div>
  </div>
</template>

<script setup>
  import { useProductStore } from '../stores/ProductStore';

  const { products, productCount, productsCheaperThan, addProduct } =
    useProductStore();

    const addProduct2 = (product) => {
      console.log('inside addProduct2 ',product)
      addProduct(product)
    }
</script>

<style scoped>
  .skewed-bg {
    background: linear-gradient(145deg, #6b7280 0%, #ef4444 50%, #6b7280 100%);
  }
</style>
