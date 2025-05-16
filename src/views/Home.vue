<template>
  <div class="home-container">
    <h1 class="title">My Food Inventory</h1>
    <div class="search-add-row">
      <el-input
        v-model="search"
        placeholder="Search food..."
        clearable
        class="search-input"
      />
      <el-button type="primary" icon="el-icon-plus" @click="goAdd" class="add-btn">
        Add
      </el-button>
    </div>
    <div class="food-list">
      <el-card
        v-for="(food, idx) in filteredFoods"
        :key="idx"
        class="food-card"
        shadow="hover"
      >
        <div class="food-info">
          <el-avatar icon="el-icon-food" class="food-avatar" />
          <div class="food-details">
            <div class="food-name">{{ food.name }}</div>
            <div class="food-qty">Quantity: {{ food.quantity }}</div>
          </div>
          <el-tag
            :type="isExpired(food.expire) ? 'danger' : 'success'"
            class="expire-tag"
          >
            {{ food.expire }}
          </el-tag>
        </div>
      </el-card>
      <div v-if="filteredFoods.length === 0" class="empty-tip">
        No food found.
      </div>
    </div>
    <div class="footer-nav">
      <el-button @click="goRecipe" class="footer-btn">Recipe</el-button>
      <el-button @click="goSettings" class="footer-btn">Settings</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFoodStore } from '../store/index.js'

const search = ref('')
const router = useRouter()
const store = useFoodStore()

const filteredFoods = computed(() =>
  store.foods.filter(f => f.name.toLowerCase().includes(search.value.toLowerCase()))
)

function goAdd() { router.push('/add') }
function goRecipe() { router.push('/recipe') }
function goSettings() { router.push('/settings') }
function isExpired(date) {
  return new Date(date) < new Date()
}
</script>

<style scoped>
.home-container {
  max-width: 420px;
  margin: 40px auto 0 auto;
  padding: 24px 12px 80px 12px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 #e0e7ef33;
  min-height: 80vh;
  position: relative;
}
.title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: #2d3a4b;
}
.search-add-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}
.search-input {
  flex: 1;
}
.add-btn {
  min-width: 80px;
}
.food-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.food-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px #e0e7ef22;
  padding: 12px 18px;
}
.food-info {
  display: flex;
  align-items: center;
  gap: 16px;
}
.food-avatar {
  background: #e0e7ef;
}
.food-details {
  flex: 1;
}
.food-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3a4b;
}
.food-qty {
  font-size: 0.95rem;
  color: #7b8a9b;
}
.expire-tag {
  font-size: 0.95rem;
  min-width: 90px;
  text-align: center;
}
.empty-tip {
  text-align: center;
  color: #b0b8c9;
  margin-top: 32px;
}
.footer-nav {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  box-shadow: 0 -2px 12px #e0e7ef33;
  display: flex;
  justify-content: center;
  gap: 24px;
  padding: 16px 0;
  z-index: 10;
}
.footer-btn {
  min-width: 120px;
}
</style> 