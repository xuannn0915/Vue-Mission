<template>
    <h1 class="text-center mb-4">
        這是後台頁面</h1>
    <nav class="d-flex align-items-center justify-content-center">
        <router-link to="/admin/product" class="px-3">後台產品列表</router-link>|
        <router-link to="/admin/order" class="px-3">後台訂單</router-link>
        <router-link to="/">
            <a href="#" class="btn btn-outline-secondary">
                        回前台
                    </a>
        </router-link>
    </nav>
    <router-view></router-view>
</template>

<style>
.active{
    color: green;
    font-weight: 500;
}
</style>
