import { defineStore } from 'pinia'

export const useFoodStore = defineStore('food', {
  state: () => ({
    foods: [
      { name: 'Carrot', quantity: 2, expire: '2024-05-02' },
      { name: 'Milk', quantity: 1, expire: '2024-05-03' },
      { name: 'Chicken', quantity: 1, expire: '2024-05-11' }
    ]
  }),
  actions: {
    addFood(food) {
      this.foods.push(food)
    },
    removeFood(index) {
      this.foods.splice(index, 1)
    }
  }
}) 