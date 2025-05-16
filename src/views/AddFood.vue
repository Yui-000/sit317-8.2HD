<template>
  <div class="add-container">
    <el-card class="add-card">
      <h2 class="add-title">Add New Food</h2>
      <el-form :model="form" label-width="100px" class="add-form">
        <el-form-item label="Food Name">
          <el-input v-model="form.name" placeholder="e.g. Carrot" />
          <el-button icon="el-icon-camera" @click="mockImageRecog" class="img-btn">Image</el-button>
        </el-form-item>
        <el-form-item label="Quantity">
          <el-input-number v-model="form.quantity" :min="1" />
        </el-form-item>
        <el-form-item label="Expiration">
          <el-date-picker v-model="form.expire" type="date" placeholder="Pick a date" />
        </el-form-item>
        <el-form-item class="btn-row">
          <el-button @click="onCancel">Cancel</el-button>
          <el-button type="primary" @click="onAdd">Add</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFoodStore } from '../store/index.js'

const router = useRouter()
const store = useFoodStore()
const form = ref({ name: '', quantity: 1, expire: '' })

function onAdd() {
  if (form.value.name && form.value.expire) {
    // YYYY-MM-DD
    let expire = form.value.expire
    if (expire instanceof Date) {
      const year = expire.getFullYear()
      const month = String(expire.getMonth() + 1).padStart(2, '0')
      const day = String(expire.getDate()).padStart(2, '0')
      expire = `${year}-${month}-${day}`
    }
    store.addFood({ ...form.value, expire })
    router.push('/home')
  }
}
function onCancel() {
  router.push('/home')
}
function mockImageRecog() {
  // 
  form.value.name = 'Tomato'
}
</script>

<style scoped>
.add-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7fafc;
}
.add-card {
  width: 380px;
  padding: 32px 24px 24px 24px;
  border-radius: 16px;
  box-shadow: 0 4px 24px #e0e7ef33;
}
.add-title {
  text-align: center;
  font-size: 1.6rem;
  font-weight: 700;
  color: #2d3a4b;
  margin-bottom: 24px;
}
.add-form {
  margin-top: 12px;
}
.img-btn {
  margin-left: 8px;
}
.btn-row {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}
</style> 