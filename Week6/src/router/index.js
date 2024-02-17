import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'FrontPage',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/HomeView.vue'),
      },
      {
        path: 'productList',
        name: 'ProductList',
        component: () => import('../views/ProductListView.vue'),
      },
      {
        path: 'cartList',
        name: 'CartList',
        component: () => import('../views/CartListView.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: 'BackStage',
    component: () => import('../views/DashBoard/BackStageView.vue'),
    children: [
      {
        path: 'product',
        name: 'Product',
        component: () => import('../views/DashBoard/DashboardList.vue'),
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('../views/DashBoard/DashboardOrder.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;
