<template>
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

    <el-form :model="registerForm" :rules="loginRules" ref="registerForm" label-position="left" label-width="100px"
             v-show="!loginFormShow" title="注册">
      <el-form-item label="用户名" prop="username" style="margin-top: 5vh">
        <el-input :value="inputValue" @input="handleInput" placeholder="请输入英文和数字" v-model="registerForm.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerForm.password" clearable></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="password">
        <el-input type="text" v-model="registerForm.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="组别" >
        <el-select v-model="registerForm.departmentId" label="请选择小组">
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
</template>

<script>
import request from '../utils/request.js';
import _ from "lodash/fp.js";

export default {
  name: 'LoginForm',
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
        departmentId: ''
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
          request({
            url: '/login',
            method: 'post',
            data: {
              username: this.loginForm.username,
              password: this.loginForm.password
            }
          }).then(res => {
            const token = res.data;
            localStorage.setItem('token', token);
            console.log("登录成功")
          }).catch(error => {
            console.error('登录失败', error);
          })
        } else {
          return false;
        }
      });
    },
    handleRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          request({
            url: '/register',
            method: 'post',
            data: {
              username: this.registerForm.username,
              password: this.registerForm.password,
              name: this.registerForm.name,
              departmentId: this.registerForm.departmentId
            }
          }).then(res => {
            const token = res.data.data;
            localStorage.setItem('token', token);
            console.log("注册成功")
          }).catch(error => {
            console.error('注册失败', error);
          })
        } else {
          return false;
        }
      });
    },
    switchForm() {
      this.loginFormShow = !this.loginFormShow;
    },
    handleInput(value) {
      this.inputValue = value.replace(/[^a-zA-Z0-9]/g, '');
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
</style>