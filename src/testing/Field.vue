<template>
  <div>
    <mt-field 
    type="text" 
    label="用户名:" 
    placeholder="请输入用户名" 
    readonly>
    </mt-field>
     <mt-field
     type="password" 
     label="密码:" 
     placeholder="请输入密码"
     :attr="{maxlength:10,
     minlength:5,
     autocomplete:`off`}">
    </mt-field>
    
    <mt-field 
    placeholder="请输入" label="身份证号" state="success">
    </mt-field>
    <mt-field 
    placeholder="请输入" label="电子邮箱" state="success">
    </mt-field>
  
    <hr>
    <hr> 
    <h1>模拟用户注册</h1>
    <mt-field 
    type="text" 
    label="用户名:" 
    placeholder="请输入用户名" 
    v-model="username">
    </mt-field>
    
    <mt-field
    type="password" 
      label="密码"
      placeholder="请输入密码"
      :attr="{minlength:5,maxlength:10,autocomplete:'off'}"
      v-model="password">
    </mt-field>
    
    <mt-field
    type="password" 
      label="密码" 
      placeholder="请再次输入密码"
      :attr="{minlength:15,maxlength:10,autocomplete:'off'}"
      v-model="conpassword">
    </mt-field>
     <mt-button type="primary" size="large"  @click="handle">
      注册
    </mt-button>
  </div>
</template>
<script>
  "use strict"
  export default{
    data(){
      return{
        username:"",
        password:"",
        conpassword:""
      }
    },
    methods:{
      handle(){
      // 获取用户输入的内容
      let username=this.username;
      let password=this.password;
      let conpassword=this.conpassword
      //console.log(username);
      //校验用户输入的内容,并弹出提示框
      let usernameReg=/^[A-Za-z0-9]{6,12}$/;
      if(
        usernameReg.test(username)
      ){
        console.log("用户名可以使用")
      }else{
        //this.$toast("请输入合法用户名")
        this.$toast({
          message:"欧吼 用户名不合法",
          position:"middle",
          duration:1000
        })
        return;
        //用户名错误则不再校验后面的内容
      };
     
     // 校验密码
      let passwordReg=/^[0-9A-Za-z\.,/]{6,15}$/;
      if(passwordReg.test(password)){
        console.log("密码格式正确")
      }else{
        this.$toast({
          message:"密码格式不正确",
          position:"middle",
          duration:1000
        })
        return console.log("password false")
      };
     
     
     //如果两次密码输入一致
      if(conpassword==password){
        this.$toast({
          message:"恭喜 注册成功!",
          position:"bottom",
          duration:3000
        })
      }else{
        this.$toast({
          message:"两次密码输入不一致",
          position:"bottom",
          duration:3000,
      })   
      console.log(password,conpassword)
      }
    
      }
    }
  }
</script>