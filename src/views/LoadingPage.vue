<template>
  <div class="loading-page">
    <img src="../assets/logo.png" alt="EcoBite Logo" class="logo" />
    <h1 class="brand">EcoBite</h1>
    <el-progress :percentage="progress" status="success" class="progress" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const progress = ref(0)
const router = useRouter()

onMounted(() => {
  const timer = setInterval(() => {
    progress.value += 10
    if (progress.value >= 100) {
      clearInterval(timer)
      router.push('/home')
    }
  }, 200)
})
</script>

<style scoped>
.loading-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f7fafc;
}
.logo {
  width: 120px;
  margin-bottom: 24px;
}
.brand {
  font-size: 2.5rem;
  font-weight: 800;
  color: #2d3a4b;
  margin-bottom: 32px;
  letter-spacing: 2px;
}
.progress {
  width: 220px;
}
</style> 