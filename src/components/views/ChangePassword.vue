<template>

  <el-card style="width: 300px;height: 500px;position: absolute;left: 42%">
    <el-form>
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="changeDto.oldPassword" clearable></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="changeDto.newPassword" clearable></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="changeDto.confirmPassword" clearable></el-input>
      </el-form-item>
      <el-button type="primary" @click="changePassword">修改密码</el-button>
    </el-form>
  </el-card>

</template>

<script>
import authService from "../utils/authService.js";

export default {
  name: 'ChangePassword',
  data() {
    return {
      changeDto: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    changePassword() {
      if (this.changeDto.newPassword !== this.changeDto.confirmPassword) {
        this.$message.error('两次输入的密码不一致')
        return
      }
      authService.changePassword(this.changeDto).then(res => {
        this.$message.success('修改成功')
      })
    }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>
