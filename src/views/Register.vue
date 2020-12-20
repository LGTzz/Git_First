<template>
  <div>
    <!-- 头部展示 -->
    <div> 
    <mt-header title="新用户注册">
      <div slot="left">
      <mt-button icon="back">
      </mt-button>
      </div>
      <div slot="right">
        登录
      </div>
    </mt-header>
    </div>          <!-- 头部展示 over-->
 
    <!-- 轮播图 -->
    <div class="swipe">
    <mt-swipe>
      <mt-swipe-item>
        <img src="../assets/images/p3.png" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../assets/images/p4.png" alt="">
      </mt-swipe-item>
    </mt-swipe>
    </div>


    <!-- 注册内容 -->
    <div>
      <mt-field type="text" label="用户名" placeholder="请输入用户名" v-model="uname" :state="S1" @blur.native.capture="Bname">
       </mt-field>
      <mt-field type="password" label="密码" placeholder="请设置密码" v-model="password" @blur.native.capture="Bpassword" :state="S2">
      </mt-field>
      <mt-field type="password" label="确认密码" placeholder="请再次输入密码" v-model="conpassword" @blur.native.capture="Bconpassword" :state="S3">
      </mt-field>
      <!-- 按钮 -->
      <div class="b">
        <!-- <router-link to="/login"> -->
          <mt-button size="large" type="primary" @click="handle">
          注册
          </mt-button>
        <!-- </router-link> -->
      </div>      <!-- 按钮 over-->
    </div>      <!-- 注册内容 over-->
  </div>
</template>

<script>
  export default{
    data(){
      return{
        uname:"",
        password:"",
        conpassword:"",
        S1:"",
        S2:"",
        S3:""
      }
    },
    methods:{
      Bname(){
        var reg=/([\u4e00-\u9fa5]|\w){6,12}/;
        var bool=reg.test(this.uname);
        if(bool){
          this.S1="success"; 
          return true;
        }else{
          this.S1="error";
          return false;
        }
      },
      Bpassword(){
        var reg=/[\w\.,\/]{6,12}/;
        var bool=reg.test(this.password);
         if(bool){
          this.S2="success"; 
          return true;
        }else{
          this.S2="error";
          return false;
        }
      },
      Bconpassword(){
         if(this.conpassword!=="" && this.password==this.conpassword){
          this.S3="success"; 
          return true;
        }else if(this.conpassword!=="" &&  this.password!==this.conpassword){
          this.$toast("密码输入不一致");
          this.S3="error";
          return false;
        }
      },
      handle(){
        if(this.Bname()&&this.Bpassword()&&this. Bconpassword()){
          this.axios.post("/register",`username=${this.uname}&password=${this.password}`).then(res=>{
            //根据服务器端返回值来确认显示内容
            if(res.data.code==1){
              this.$router.push("/");
            }else{
               this.$messagebox("注册提示","该用户名已被使用");
              //console.log("未成功")
            }
          })
        }
      }
    }
  }
</script>
<style scoped>
  .swipe{
    height: 150px;
    text-align: center;
    margin-top:1rem;
  }
  .b>a{
    color: #fff;
    /* Q:如何去除下划线 */
    }
</style>