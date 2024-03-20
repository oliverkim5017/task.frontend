<template >
  <div  class="back">
    <el-card style="width: 300px;height: 500px;position: absolute;left: 42%">
      <span style="display: block;text-align: center;">协作化项目管理系统</span>
      <div class="el-container">
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="100px"
                 v-show="loginFormShow" title="登录">
          <el-form-item label="用户名" prop="username" style="margin-top: 5vh">
            <el-input v-model="loginForm.username" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password" clearable></el-input>
          </el-form-item>
        </el-form>

        <el-form :model="registerForm" :rules="registerRules" ref="registerForm" label-position="left"
                 label-width="100px"
                 v-show="!loginFormShow" title="注册">
          <el-form-item label="用户名" prop="username" style="margin-top: 5vh">
            <el-input placeholder="请输入用户名"
                      v-model="registerForm.username" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerForm.password" clearable></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="password">
            <el-input type="text" v-model="registerForm.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="组别">
            <el-select v-model="registerForm.teamId" label="请选择小组">
              <el-option
                  v-for="item in teams"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div class="footer-buttons">
          <div v-show="loginFormShow">
            <el-button type="primary" @click="handleLogin" v-show="loginFormShow">登录</el-button>
            <el-button type="info" @click="switchForm">注册</el-button>
          </div>
          <div v-show="!loginFormShow">
            <el-button type="success" @click="handleRegister" v-show="!loginFormShow">注册</el-button>
            <el-button type="info" @click="switchForm">去登录</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import request from '../utils/request.js';
import authService from "../utils/authService.js";

export default {
  name: 'Login',
  data() {
    return {
      teams: [],
      loginForm: {
        username: '',
        password: '',
      },
      registerForm: {
        username: '',
        password: '',
        rePassword: '',
        name: '',
        teamId: ''
      },
      loginFormShow: true,
      loginRules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
      },
      registerRules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
      },
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          authService.login({
            username: this.loginForm.username,
            password: this.loginForm.password
          }).then(res => {
            if (res.data.code === 200) {
              localStorage.setItem('token', res.data.data); // 保存 token
              this.$nextTick(() => {
                this.$router.push({name: 'DashBoard'}); // 跳转到 DashBoard 页面
              });
            }
          });

        } else {
          return false;
        }
      });
    },
    handleRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          const res = authService.register(this.registerForm);
          if (res.data.code === 200) {
            localStorage.setItem('token', res.data.data);
            this.$router.push({name: 'DashBoard'});
          }
        } else {
          return false;
        }
      });
    },
    switchForm() {
      this.loginFormShow = !this.loginFormShow;
    }
  },
  mounted() {
    request({
      url: '/getTeams',
      method: 'get'
    }).then(res => {
      this.teams = res.data.data;
    })
  }
};
</script>

<style scoped>

.footer-buttons {
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
}

.back {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: url('/BG.jpg') no-repeat fixed center;
  background-size: cover;
}

</style>