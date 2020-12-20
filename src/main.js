import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
// 导入MintUI的所有组件
import MintUI from "mint-ui";
// 导入MintUI的样式文件
import "mint-ui/lib/style.min.css";
// 通过Vue.use()方法将Mint UI注册为Vue插件
Vue.use(MintUI); 
//导入moment日期时间库
import moment from "moment";
//将moment放入vue的原型对象
Vue.prototype.moment = moment;

axios.defaults.baseURL = 'http://127.0.0.1:3000'
//将axios放入vue的原型对象
Vue.prototype.axios = axios;
Vue.config.productionTip = false
//将qs放入vue的原型对象
Vue.prototype.qs = qs;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
