<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="title">活动发布平台</h3>
      <div class="checkbox">
        <el-radio v-model="stateChange" label="login">登陆</el-radio>
        <el-radio v-model="stateChange" label="register">注册</el-radio>
      </div>
      <div v-if="stateChange=='login'">
        <el-form-item prop="username">
          <span class="svg-container svg-container_login">
            <svg-icon icon-class="user"/>
          </span>
          <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password"></svg-icon>
          </span>
          <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
            placeholder="密码"></el-input>
            <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
        </el-form-item>
      </div>
      <div v-else>
        <el-form-item prop="username">
          <span class="svg-container svg-container_login">
            <svg-icon icon-class="user"/>
          </span>
          <el-input name="registerName" type="text" v-model="loginForm.registerName" autoComplete="on" placeholder="注册账号" />
        </el-form-item>
        <el-form-item prop="username">
          <span class="svg-container svg-container_login">
            <svg-icon icon-class="user"/>
          </span>
          <el-input name="username" type="text" v-model="loginForm.name"  placeholder="用户姓名" />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password"></svg-icon>
          </span>
          <el-input name="registerPsw" v-model="loginForm.registerPsw"
                    placeholder="密码" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password"></svg-icon>
          </span>
          <el-input name="confirmPsw" v-model="loginForm.confirmPsw" type="password"
                    placeholder="确认密码"></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          {{buttonText}}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import { setToken, getToken , setName} from '@/utils/auth'
import { Message } from 'element-ui'
import * as api from '@/axios/login'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      buttonText:"登陆",
      stateChange:"login",
      loginForm: {
        username: '',
        password: '',
        registerName:"",
        registerPsw:"",
        confirmPsw:"",
        name:""
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        confirmPsw: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.stateChange == 'login' ? this.login(): this.register()
    },
    login(){
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then((res) => {
            if(res.data.code==200){
              if(res.data.token){
                setToken(res.data.token)
                setName(res.data.name)
              }
            }else {
              this.loading = false
              Message.error(res.data.message)
            }
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    register(){
      if(this.stateChange != 'login'&&this.loginForm.registerPsw!=this.loginForm.confirmPsw){
        this.$message.error("两次输入密码不一致")
      }else{
        this.loading = true
        api.register(this.loginForm).then((res) => {
          if(res.data.code==200){
            Message.success(res.data.message)
          }else {
            this.loading = false
            Message.error(res.data.message)
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
    },
  },
  watch:{
    stateChange(){
      this.stateChange == 'login' ?this.buttonText ='登陆':this.buttonText ='注册'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    @include relative;
    height: 100vh;
    background-color: $bg;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .checkbox{
      text-align: center;
      font-weight: bold;
      margin: 0px auto 20px auto;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 20px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select:none;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>
