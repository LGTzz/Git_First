<template>
  <div>
  访问vuex中的数据
  <h1>年龄:{{this.$store.state.age}}</h1>
  <h1>姓名:{{this.$store.state.username}}</h1>
  <h1 v-for="(a,k) of $store.state.product" :key="k">
    家具:{{a.name}}
  </h1>
  <mt-button @click="handle" type="primary"> 
    年龄增加
  </mt-button>
 
  <!-- 动态获取vuex中的数据 -->
    <div>
      <mt-field label="商品名称" type="text" placeholder="请输入商品名称" v-model="name"> 
      </mt-field>
      <mt-field label="商品价格" type="text" placeholder="请输入商品价格" v-model="price"> 
      </mt-field>
      <mt-button type="primary" @click="add">
        添加商品
      </mt-button>
    </div>
   
   
  </div>
</template>

<script>
  export default{
    data(){
      return{
       name:"",
       price:""
      }
      },
    methods:{
      handle(){
        //调用vuex中的mutations
        this.$store.commit(`Changeage`)
      },
      add(){
        let obj={
          name:this.name,
          price:this.price
        }
        console.log(obj)
        //当点击按钮 调用vuex中的Mutations
        this.$store.commit("addProduct",obj)
        }
    }
  }
</script>
