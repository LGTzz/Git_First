import Vue from 'vue'
import Vuex from 'vuex'
//引入axios和router对象
import axios from "axios"
import router from "../router"
//引入mint-ui的某一个组件
import {MessageBox} from "mint-ui"

Vue.use(Vuex)


var a=new Vuex.Store({
  name:"lee"
})
console.log(a,typeof a);
console.log("上面是你要的")
//new出来是对象类型的


export default new Vuex.Store({
  state: {
    username:"Tom",
    age:18,
    product:[{price:1,name:"TV"},
      {price:2,name:"phone"},
      {price:3,name:"table"}
    ],
    isLogin:localStorage.getItem("isLogin")||0,
    //存储用户登录后的相关信息(短路逻辑)
    userinfo://数据会从服务器端获取 
    JSON.parse(localStorage.getItem('userInfo')) || {}
  },
  mutations: {
    //创建一个年龄递增的方法
    Changeage(state){
      state.age++; 
    },
    addProduct(state,playload){
      state.product.push(playload);
      console.log(state);
      console.log(playload);
    },
    LoginChange(state,payload){
       state.isLogin=1;
       state.userinfo=payload;
       console.log(payload)
    },
    LoginOut(state){
      state.isLogin=0;
      state.userinfo={}
    }
  },
  actions: {
    getServerData(context){
      //发送异步请求
      axios.get("http://127.0.0.1:3000/data").then(res=>{
        //获取服务器端的数据 并用mutation将其放入state
        context.commit("addProduct",res.data.result)
      })
    },
      login_actions(context,payload){
        //console.log("调用了actions中的函数")
        //接收到页面组件传输过来的参数 调用axios发送请求
        axios.post("/login",payload).then(res=>{
          if(res.data.code){
      //提交Mutations,以修改用户登录状态
            context.commit("LoginChange",res.data.loadInfo);
            //将用户的登录状态和服务器端返回的数据 保存到webstorage中
            localStorage.setItem("isLogin",1)
            localStorage.setItem("userInfo",JSON.stringify(res.data.loadInfo))

            //页面跳转
            router.push("/");
          }else{
            //显示警示对话框
            MessageBox("登录提示","用户名或密码错误")
          }
        })
      }
  },
  modules: {
  }
})
  