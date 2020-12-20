<template>
    <div class="article">
        <!-- 顶部导航开始 -->
        <header>
            <mt-header title="学前端，上学问">
                <router-link slot="left" to="/">
                    <mt-button  icon="back"></mt-button>
                </router-link>
            </mt-header>
        </header>
        <!-- 导航导航结束 -->
        <!-- 正文区域开始 -->
        <div class="question">
            <!-- 标题开始 -->
            <div class="question-header">
                <div class="question-header-title" v-html="info.subject">
                  
                </div>
                <div class="question-header-datetime" v-html="this.moment.unix(info.created_at).format(`Y年MM月DD日HH:mm`)">
                   
                </div> 
            </div>
            <!-- 标题结束 -->
            <!-- 作者信息开始 -->
            <div class="author-info">
                <img :src="info.avatar" class="author-info-avatar">
                <div class="author-info-detail">
                    <div class="author-info-nickname" v-html="info.nickname"></div>
                    <div class="author-info-badge">
                        共<mt-badge type="primary" size="small" v-html="info.article_number"></mt-badge>篇
                    </div>
                </div>
                
            </div>
            <!-- 作者信息结束 -->
            <!-- 内容开始 -->
            <div class="question-content">
                <div class="rich-content" v-html="info.content">
                
                </div>
            </div>
            <!-- 内容结束 -->
        </div>
    </div>
</template>

 
   
    <script src="../public/moment/Moment.js">
 // 为解析日期和时间 引入moment日期和时间库
    //   引入js的日期时间库 
    </script>

<script>
  export default{
    data(){
      return{
        info:{}
      }
    },
    //在初始化时就要接住home链接传过来的参数,并请求和获取对应参数的值
    mounted(){
      let id=this.$route.params.id;
      //console.log(id);
      //发送请求
      this.axios.get(`/details?id=${id}`).then(
        res=>{
        //将获取到的数据放入data(){}的变量中
        //并在页面上将info的内容放进相应位置
          this.info=res.data.result;
          
        //处理头像的avatar属性
        this.info.avatar=require(`../assets/images/avatar/${this.info.avatar}`);
        //console.log(this.info);
        
        //关于日期和时间的获取
        console.log(this.moment.unix(0).format());
    console.log(this.moment.unix(0).hour(15).format());
    console.log(this.moment.unix(0).hour(15).format('Y年MM月DD日HH:mm'));
    console.log("------------------")
    console.log(this.moment.unix(0).month(1).format(`MM月`))
        }
      )
    }
  }
</script>



<style scoped>
.article{
    background: #f6f6f6;
    height: 100vh;
}
.question-header{
    margin-bottom: 5px;
    padding: 10px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(26,26,26,.1);
}
.question-header-title {
    font-size: 18px;
    color: #1a1a1a;
    line-height: 1.5;
}
.question-header-datetime{
    margin-top:5px;
    font-size:14px;
    color:#646464;
}
.author-info{
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    padding: 8px 10px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(26,26,26,.1);
}
.author-info-avatar{
    width:40px;
    height: 40px;
    border-radius: 100%;
}
.author-info-detail{
    margin-left:15px;
}
.author-info-nickname{
    font-size: 15px;
    margin-bottom:6px;
}
.author-info-badge{
    font-size: 14px;
}
.question-content {
    padding: 10px;
    background-color:#fff;
}
</style>


<style>
.rich-content p,.rich-content li{
    padding: 5px 0;
    line-height: 1.7;
}
.rich-content img{
    max-width:100%;
}
</style>