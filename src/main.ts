import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import ElementPlus from 'element-plus';
import i18n from './i18n/index';
import './assets/css/tailwind.css';
import './assets/scss/style.scss';

createApp(App).use(router).use(store).use(ElementPlus).use(i18n).mount('#app');
