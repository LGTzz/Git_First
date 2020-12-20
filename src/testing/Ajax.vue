<template>
  <div>
    <h1 v-for="(a,k) of $store.state.product" :key="k">
      商品名:{{a.name}};商品价格:{{a.price}}
     </h1>
     <br>
     <hr>
      <mt-button type="primary" @click="handle">
        获取服务器端来的信息
      </mt-button>
    
  </div>
</template>
<script>
  export default{
    methods:{
      handle(){
        //纷发actions
        this.$store.dispatch("getServerData")
      }
    }
  }
</script>

