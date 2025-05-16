<template>
  <div class="recipe-container">
    <h2 class="recipe-title">Recommended Recipes</h2>
    <div class="recipe-list">
      <el-card
        v-for="recipe in recommendedRecipes"
        :key="recipe.name"
        class="recipe-card"
        shadow="hover"
      >
        <div class="card-header">
          <img :src="recipe.img" :alt="recipe.name" class="recipe-img" />
          <div>
            <div class="recipe-name">{{ recipe.name }}</div>
            <div class="match-info">
              <el-tag type="success" v-if="recipe.missing.length === 0">All ingredients ready!</el-tag>
              <el-tag type="warning" v-else>Missing: {{ recipe.missing.join(', ') }}</el-tag>
            </div>
          </div>
        </div>
        <div class="ingredients">
          <b>Ingredients:</b>
          <ul>
            <li v-for="item in recipe.ingredients" :key="item">
              <span :class="{ owned: userIngredients.includes(item) }">{{ item }}</span>
            </li>
          </ul>
        </div>
        <el-collapse>
          <el-collapse-item title="Show Steps">
            <ol>
              <li v-for="(step, idx) in recipe.steps" :key="idx">{{ step }}</li>
            </ol>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>
    <el-button @click="goHome" class="back-btn">Back</el-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useFoodStore } from '../store/index.js'

// 示例图片
import spaghettiImg from '../assets/spaghetti.jpg'
const saladImg = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80'

const router = useRouter()
const store = useFoodStore()

// 你的库存食材
const userIngredients = store.foods.map(f => f.name)

// 食谱库
const recipes = [
  {
    name: 'Spaghetti',
    img: spaghettiImg,
    ingredients: ['Tomato', 'Garlic', 'Olive Oil', 'Spaghetti'],
    steps: [
      'Boil spaghetti until al dente.',
      'Sauté garlic in olive oil, add tomatoes.',
      'Mix spaghetti with sauce, serve hot.'
    ]
  },
  {
    name: 'Fresh Salad',
    img: saladImg,
    ingredients: ['Lettuce', 'Tomato', 'Cucumber', 'Olive Oil'],
    steps: [
      'Wash and chop all vegetables.',
      'Mix in a bowl, drizzle with olive oil.',
      'Toss and serve fresh.'
    ]
  }
]

// 计算推荐（有食材的优先）
const recommendedRecipes = recipes
  .map(recipe => {
    const missing = recipe.ingredients.filter(i => !userIngredients.includes(i))
    return { ...recipe, missing }
  })
  .sort((a, b) => a.missing.length - b.missing.length)

function goHome() { router.push('/home') }
</script>

<style scoped>
.recipe-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f7fafc;
  padding-bottom: 60px;
}
.recipe-title {
  font-size: 2rem;
  font-weight: 800;
  color: #2d3a4b;
  margin: 32px 0 24px 0;
  text-align: center;
}
.recipe-list {
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 100%;
  max-width: 420px;
}
.recipe-card {
  border-radius: 16px;
  box-shadow: 0 4px 24px #e0e7ef33;
  padding: 18px 18px 10px 18px;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 10px;
}
.recipe-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 2px 8px #e0e7ef33;
}
.recipe-name {
  font-size: 1.2rem;
  font-weight: 700;
  color: #7b3f00;
  margin-bottom: 6px;
}
.match-info {
  margin-bottom: 2px;
}
.ingredients {
  margin-bottom: 8px;
  font-size: 1rem;
}
.ingredients ul {
  margin: 0;
  padding-left: 18px;
}
.owned {
  color: #42b983;
  font-weight: 600;
}
.back-btn {
  margin: 32px auto 0 auto;
  min-width: 120px;
  display: block;
}
</style>