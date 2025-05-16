<template>
  <div class="settings-container">
    <el-card class="settings-card">
      <h2 class="settings-title">Settings</h2>
      <el-form label-width="120px" class="settings-form">
        <el-form-item label="User Detail">
          <el-input v-model="user" placeholder="Your name" />
        </el-form-item>
        <el-form-item label="Notification">
          <el-switch v-model="notify" />
        </el-form-item>
        <el-form-item label="Language">
          <el-select v-model="lang" placeholder="Select">
            <el-option label="English" value="en" />
            <el-option label="中文" value="zh" />
          </el-select>
        </el-form-item>
      </el-form>
      <h3 class="chart-title">Inventory Data</h3>
      <div ref="chart" class="chart-box"></div>
      <el-button @click="goHome" class="back-btn">Back</el-button>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'
import { useFoodStore } from '../store/index.js'

const user = ref('EcoBite User')
const notify = ref(true)
const lang = ref('en')
const chart = ref(null)
const router = useRouter()
const store = useFoodStore()

function goHome() { router.push('/home') }

onMounted(() => {
  const myChart = echarts.init(chart.value)
  myChart.setOption({
    xAxis: { type: 'category', data: store.foods.map(f => f.name) },
    yAxis: { type: 'value' },
    series: [{ data: store.foods.map(f => f.quantity), type: 'bar' }]
  })
})
</script>

<style scoped>
.settings-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7fafc;
}
.settings-card {
  width: 420px;
  padding: 32px 24px 24px 24px;
  border-radius: 16px;
  box-shadow: 0 4px 24px #e0e7ef33;
}
.settings-title {
  text-align: center;
  font-size: 1.6rem;
  font-weight: 700;
  color: #2d3a4b;
  margin-bottom: 24px;
}
.settings-form {
  margin-bottom: 18px;
}
.chart-title {
  text-align: center;
  font-size: 1.1rem;
  color: #7b8a9b;
  margin-bottom: 8px;
  margin-top: 18px;
}
.chart-box {
  width: 340px;
  height: 220px;
  margin: 0 auto 18px auto;
  background: #f9fafb;
  border-radius: 10px;
}
.back-btn {
  display: block;
  margin: 24px auto 0 auto;
  min-width: 120px;
}
</style> 