<template>
  <div>
  <!-- 顶部导航最外层div -->
  <div>
      <mt-header title="学前端 到学问">
        <!-- 未登陆时显示 -->
        <div slot="right" class="h-top" v-if="$store.state.isLogin==0">
          <router-link to="/login">
          登录
          </router-link> 
          <router-link to="/">
          注册
          </router-link> 
        </div>
        <!-- 登陆后显示 -->
        <div slot="right" class="h-top" v-else>
          <span style="margin-right:1rem">您好,{{$store.state.userinfo.username}}</span>
          <mt-button @click="logout">注销</mt-button>
        </div>
      </mt-header>
    </div>       <!--导航最外层div over-->
  <!-- 头部选项卡 -->
    <div>
       <mt-navbar v-model="active">
      <mt-tab-item         
        v-for="(item,index) of category" 
        :key="index"
        :id="item.id.toString()">
        {{item.category_name}}
      </mt-tab-item>
    </mt-navbar>
    </div>        <!-- 头部选项卡 over-->
    <!-- 头部选项卡面板 -->
    <div class="main" infinite-scroll-dictance="20" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
    infinite-scroll-immediate-check="true" >
      <mt-tab-container v-model="active">
        <mt-tab-container-item   :id="active.toString()">
          <!--copy -->
          <!-- 单一文章信息开始 -->
          <div class="articleItem" v-for="(article,index) of articles" :key="index">
            <router-link :to="`/article/${article.id}`">
            <!-- 文章标题开始 -->
            <div class="articleItem-header">
              {{article.subject}}
            </div>
            <!-- 文章标题结束 -->
            <!-- 文章图文信息开始 -->
            <div class="articleItem-wrapper">
              <!-- 文章图像开始  -->
              <div class="articleImg" v-if="article.image!=null">
                <img v-lazy="article.image" />
              </div>
              <!-- 文章图像结束 -->
              <!-- 文章简介开始 -->
              <div class="articleDes">
                {{article.description}}
              </div>
              <!-- 文章简介结束 -->
            </div>
            <!-- 文章图文信息结束 -->
            </router-link>
          </div>
          <!-- 单一文章信息结束 -->
          <!-- copy end-->
        </mt-tab-container-item>
    
      </mt-tab-container>
    </div>       <!-- 头部选项卡面板over-->
    <!-- 底部选项卡 -->
    <div>
      <mt-tabbar v-model="footer" fixed>
        <mt-tab-item id="index">
          主页
        </mt-tab-item>
          <mt-tab-item id="me">
          我的
        </mt-tab-item>
      </mt-tabbar>
    </div>         <!-- 底部选项卡 over-->
  </div> 
</template>

<script>
  "use strict"
  export default{
    data(){
      return {
        active:"1",
        footer:"index",
        category:[],
        articles:[],  //存储文章标题和简介的对象
        busy:false,
        page:1,
        pagecount:0
        }
    },
    methods:{
      //用户注销 清除用户信息
      logout(){
          console.log("触发了LoginOut");this.$store.commit("LoginOut");
          //清空localStorage中存储的用户登录信息和登陆状态
          localStorage.clear();
      },
    
      //封装一个函数,实现向/articles传参并获取数据,并且对获取的数据进行img的url的处理 返回值放入给面板传递数据的data(){}中的变量里面
      loadData(cid,page){
         //显示加载提示框
        this.$indicator.open("在加载哦");
        // 使当前滚动结束之前 再滚动不加载新的内容
        this.busy=true;
         
         
         
         this.axios.get(`/articles?cid=${cid}&page=${page}`).then(
          res=>{
          //获取传输回来的数组
          let data=res.data.results;
          //存储拿回来的总页码数
          this.pagecount=res.data.pagecount;
          console.log(`拿回来的是${ this.pagecount}`)
          //遍历数组 拿出对象中的img属性并处理
          data.forEach(item=>{
            if(item.image!=null){
              item.image=require(`../assets/images/articles/${item.image}`)
            }
            //无论图片是否为空 都重新放入articles数组
            this.articles.push(item);  
          });
          //关闭加载提示框
           this.$indicator.close();
      //     恢复可加载新内容
           this.busy=false;
          }
        )
      },

      //滚动函数
      loadMore(){
        //******** 封装前 ******/
        // //显示加载提示框
        // this.$indicator.open("在加载哦");
        // // 使当前滚动结束之前 再滚动不加载新的内容
        // this.busy=true;
        //******** 封装前 end ******/
        
        
        //每新加载一次 都加载下一页的内容
        this.page++;
        //此处不可写this.articles=[],因为页面是接着前面的加载的;
        //获取后端来的数据并处理
        
        //调用封装的函数,并增加一个条件,当数据库中的页码到最后时 就不再调用滚动函数
    
        if(this.page<=this.pagecount){
        this.loadData(this.active,this.page)    
        } 
        console.log("到头l")
        console.log(this.pagecount,this.page)
      
      /////******封装之前******
      //   this.axios.get(
      //     `/articles?cid=${this.active}&page=${this.page}`
      //   ).then(res=>{
      //     //接收服务器端返回的数据 并把图像信息做以处理 放入data(){}中给页面提供数据的变量中
      //   //接收数据(数组)  
      //     let data=res.data.results;
      //   //遍历数组修改img属性为转化后的url
      //   data.forEach(item=>{
      //     if(item.image!=null){
      //       item.image=require(`../assets/images/articles/${item.image}`)
      //     }
      //   //把转化后的 和未转化的img属性为null的对象 全部放入articles数组
      //   this.articles.push(item);
      //  })
      //     //关闭加载提示框
      //     this.$indicator.close();
      //     //恢复可加载新内容
      //     this.busy=false;
      //     //console.log(`获取第${this.page}页的数据`)
      //     }
      //   )
      //////****** 封装之前 end*******/
      }
    },
    mounted(){
      // 通过axios工具向服务器发送请求
      // 获取文章分类数据
      this.axios.get("/category").then(
        res=>{
          //将接收到的结果(此处设置的 服务器端会返回一个对象) 放入data中的变量 
          this.category=res.data.results;
          //console.log(this.category)
        }
      );
      //获取文章按类型查找的结果 并传参(第一次传的是active的初始值)
      
      //调用封装好的函数
      this.loadData(this.active,this.page)
      
      
      //////******封装之前*****/
      // this.axios.get(`/articles?cid=${this.active}&page=1`).then(res=>{
      //   //将接收到的结果放入data中的变量 
        
 
      //   //this.articles=res.data.results;
      //   //得到对象组成的数组
      //     console.log(this.articles)  
      //   //!!!此处不能这样写 这样写会往articles里面放入一次传输回来未处理的值,后面push()会再放一次! 就会有两遍值!!!
       
       

      //   // 为了改变数据库中获得的img值,使其变为一个完整的 模拟webpack打包后的url路径(原本获得的是img的名称)
      //   let data=res.data.results;
      //   //data得到数组 遍历数组 得到对象
      //   data.forEach(item=>{
      //     if(item.image!=null){
      //       //不为空的img属性也转化为转化后的url
      //       item.image=require(`../assets/images/articles/${item.image}`)
      //     }
      //     //写在循环里 循环将对象加入articles数组
      //       this.articles.push(item);
      //   })
      //   }
      // )
      //////******封装之前 end*****/



    },
    watch:{
      active(){
        this.articles=[];
        //使得每一次改变面板 都从第一页开始显示
        this.page=1;
        
        
      //调用封装好的函数
      this.loadData(this.active,this.page)  
        
        //////******封装之前*****/
        // this.axios.get(`/articles?cid=${this.active}&page=${this.page}`).then(
        //   res=>{
        //   //获取传输回来的数组
        //   let data=res.data.results;
        //   //遍历数组 拿出对象中的img属性并处理
        //   data.forEach(item=>{
        //     if(item.image!=null){
        //       item.image=require(`../assets/images/articles/${item.image}`)
        //     }
        //     //无论图片是否为空 都重新放入articles数组
        //     this.articles.push(item)
        //   })
        //   }
        // )
        //////******封装之前 end*****/
      }
    }
  }
</script>

<style scoped>
  .h-top a{
    padding-left:.6rem ;
    text-decoration: none;
    color: #fff ;
  }
  .main{
    margin-bottom:55px ;
    }
    .articleItem{
  padding:10px 0;
  margin:0 10px;
  border-bottom:1px solid #999;
}
.articleItem-header{
  font-weight: 600;
  font-size: 17px;
  color: #1a1a1a;
  line-height: 22px;
}
.articleItem-wrapper{
  display: flex;
  align-items: center;
  padding-top: 10px;
  width:100%;
}
.articleImg{
  margin-right:15px;
}
.articleImg img{
  width: 112px;
  height: 74px;
  border-radius: 5px;
}
.articleDes{
  height: 65px;
  font-size: 15px;
  overflow: hidden;
  font-weight: 400;
  text-overflow: ellipsis;
  line-height: 21px;
  letter-spacing: normal;
  color: #444;
}
</style>
