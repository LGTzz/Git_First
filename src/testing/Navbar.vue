<template>
  <div>
    <!-- 顶部选选项卡 -->
    <mt-navbar v-model="active" fixed>
      <mt-tab-item id="1">
        新闻
        <img src="../assets/common/news.png" alt="" slot="icon">
      </mt-tab-item>
      <mt-tab-item id="2">
        财经
      </mt-tab-item>
      <mt-tab-item id="3">
        金融
      </mt-tab-item>
      <mt-tab-item id="4">
        社会
      </mt-tab-item>
      <mt-tab-item id="5">
        娱乐 
      </mt-tab-item>
    </mt-navbar>        <!--顶部选项卡  over-->

    <!-- 选项卡面板 -->
     <div class="main">
       <!-- 给所有选项卡面板都加上下外边距 -->
      <mt-tab-container v-model="active">
      <mt-tab-container-item id="1">
       
          <p v-for="(a,k) of 100" :key="k">
          编号:{{a}}
          </p>
      
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          财经
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          金融
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
          社会
        </mt-tab-container-item>
        <mt-tab-container-item id="5">
          娱乐
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
 
 
  <!-- 底部选项卡 -->
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="index">
        首页
          <img src="../assets/common/index_enabled.png" alt="" slot="icon" v-if="selected==`index`">
        <img src="../assets/common/index_disabled.png" alt="" slot="icon" v-else-if="selected!==index">       
      </mt-tab-item>
      <mt-tab-item id="cart">
        购物车
        <img src="../assets/common/cart_enabled.png" alt="" slot="icon" v-if="selected==`cart`">
        <img src="../assets/common/cart_disabled.png" alt="" slot="icon" v-else>     
      </mt-tab-item>
      <mt-tab-item id="me">
        我的
        <img src="../assets/common/me_enabled.png" alt="" slot="icon" v-if="selected==`me`"> 
        <img src="../assets/common/me_disabled.png" alt="" slot="icon" v-else> 
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<style scoped>
  .main{
    margin-bottom: 60px;
  }
</style>

<script>
  export default{
    data(){
      return {
        active:"1",
        selected:"me"
      }
    },
    watch:{
      selected(newValue){
        if(newValue=="index"){
          this.$router.push("/")
        }else if(newValue=="cart"){
          this.$router.push("/cart")
        }else if(newValue=="me"){
          this.$router.push("/me")
        }
      }
    }
  }
</script>

