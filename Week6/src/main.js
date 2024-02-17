/* eslint-disable import/no-extraneous-dependencies */
// 外部引入
import './assets/all.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import LoadingOverlay from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import axios from 'axios';
import VueAxios from 'vue-axios';

// 內部引入SRC
import App from './App.vue';
import router from './router';

// 自己撰寫的程式碼
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component('LoadingComponent', LoadingOverlay);
app.use(VueAxios, axios);

app.mount('#app');
