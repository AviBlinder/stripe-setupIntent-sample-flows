import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: ['banana','cucumer','carrot','onion']
  }),
  getters: {
    productCount(state) {
      return state.products.length
    },
    productsCheaperThan(state) {
      return (price) => (
        state.products.filter(product =>
          product.price < price
        )
      )
    }
  },
  actions: {
    addProduct(product) {
      this.products.push(product)
    }
  }
})