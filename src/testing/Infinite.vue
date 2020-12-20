<template>
  <div infinite-scroll-distance="5" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy">
    <p v-for="(v,k) of n" :key="k">{{
      k+1}}</p>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        n:50,
        busy:false
        // 初始为false 意为一直正常加载
      }
    },
    methods:{
      loadMore(){
       //开启加载提示框
       //this.$indicator.open("加载中")
       this.$indicator.open({
         text:"等等哦...",
         spinnerType:"double-bounce"
       })
       this.busy=true;
        console.log("触发函数")
    //模拟浏览器加载较慢的过程    
        window.setTimeout(()=>{
          this.n+=30;
           this.busy=false;
            this.$indicator.close()
          console.log("5min 加载结束")
        },5000)
        
      }
    }
  }
</script>