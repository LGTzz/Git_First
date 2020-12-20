import Vue from 'vue'
import VueRouter from 'vue-router'


// 引入测试案例(MintUI组件)
// 引入Header.vue模块
import Header from "../testing/Header.vue"
// 引入Button.vue模块
import Button from "../testing/Button.vue"
//引入Field模块
import Field from "../testing/Field.vue"
// 引入导航栏
import Navbar from "../testing/Navbar.vue"
// 引入 我的 me.vue模块
import Me from "../testing/Me.vue"
// 引入 购物车 Cart.vue模块
import Cart from "../testing/Cart.vue"
// 引入登录界面 
import Login from "../testing/Login.vue"
// //引入无限滚动页面
import Infinite from "../testing/Infinite.vue"
// //引入vuex中的测试内容页面
import Access1 from "../testing/Access1.vue"
import Access2 from "../testing/Access2.vue"
//引入vuex中actions的测试内容页面
import Ajax from "../testing/Ajax.vue"


// 引入项目案例(MintUI)组件
// 引入导航界面 
import Register from "../views/Register.vue"
// 引入首页(首页路由字典中已设置)
import Home from '../views/Home.vue'
// 引入文章详情页
import Article from "../views/Article.vue"



  
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  // 增加一个路由地址 能访问到Header组件页面
  {
    path:"/header",
    component:Header
  },
  // 增加一个路由地址 能访问到Button组件页面
  {
    path:"/button",
    component:Button
  },
  // 增加一个路由地址 能访问到Field组件页面
  {
    path:"/field",
    component:Field
  },
  // 增加一个路由地址 能访问到Register组件页面
  {
    path:"/register",
    component:Register
  },
  // 增加一个路由地址 能访问到Navbar组件页面
  {
    path:"/navbar",
    component:Navbar
  },
   // 增加一个路由地址 能访问到"我的"组件页面
   {
    path:"/me",
    component:Me
   },
   // 增加一个路由地址 能访问到购物车组件页面
   {
    path:"/cart",
    component:Cart
   },
   // 增加一个路由地址 能访问到登录组件页面
   {
    path:"/login",
    component:Login
   },
  // 增加一个路由地址 能访问到滚动页面
  {
      path:"/infinite",
      component:Infinite
  },
  // 增加一个详情地址 能访问到滚动页面
  {
    path:"/article/:id",
    component:Article
},
  // 增加一个Access地址 能访问到vuex数据页面
  {
    path:"/access1",
    component:Access1
},// 增加一个Access地址 能访问到vuex数据页面
{
  path:"/access2",
  component:Access2
},
//增加一个地址 能够访问vuex中actions的测试内容页面
{
  path:"/ajax",
  component:Ajax
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router