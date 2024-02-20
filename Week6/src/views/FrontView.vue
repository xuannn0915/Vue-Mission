<template>
  <h1 class="text-center mb-4">你現在在前台頁面</h1>
  <div class="container">
    <nav class="d-flex align-items-center justify-content-center">
      <router-link to="/home" class="px-3">首頁</router-link>|
      <router-link to="/productList" class="px-3">前台產品列表</router-link>|
      <router-link to="/cartList" class="px-3">前台購物車</router-link>
      <router-link to="/admin/product" class="btn btn-outline-secondary">後台</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style>
.active {
  color: green;
  font-weight: 500;
}
</style>
