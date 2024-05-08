<template>
  <el-container class="app-wrapper" style="height: 100vh; display: flex; flex-direction: column;">
    <!-- Top Navigation Bar -->
    <el-header class="header" style="background-color: #545c64; color: white; line-height: 60px; flex: 0 0 auto;">
      <div class="logo">任务管理系统</div>
      <el-menu
          class="navigation-menu"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
      >
        <el-menu-item index="2" @click="">修改密码</el-menu-item>
        <el-menu-item index="3" @click="logout">登出</el-menu-item>
      </el-menu>
    </el-header>

    <el-container class='content-wrapper' style="display: flex; flex: 1 1 auto;">
      <el-aside class="menu" width="200px" style="height: calc(100vh - 60px); flex: 0 0 200px; background-color: #545c64;overflow-y: auto;">
        <el-menu active-text-color="#ffd04b"
                 background-color="#545c64"
                 class="el-menu-vertical-demo"
                 default-active="2"
                 text-color="#fff"
        >
          <el-menu-item index="1" @click="navigateTo('MyInfo')">主页</el-menu-item>
          <el-menu-item index="10" @click="navigateTo('TaskBoard')"><el-icon><Menu /></el-icon>看板</el-menu-item>
          <el-sub-menu index="20" v-if="role.name !== '组员'">
            <template #title>项目视图</template>
            <el-menu-item index="20-1" @click="navigateTo('Project')"><el-icon><Management /></el-icon>项目管理</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="30" v-if="role.name !== '组员'">
            <template #title >任务视图</template>
            <el-menu-item index="30-1" v-if="role.name !== '组员'" @click="navigateTo('TaskManagement')"><el-icon><Pointer/></el-icon>任务管理</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="40"  v-if="role.name !== '组员'">
            <template #title>人员视图</template>
            <el-menu-item index="40-1" @click="navigateTo('User')">人员管理</el-menu-item>
            <el-menu-item index="40-2" @click="navigateTo('Department')">部门管理</el-menu-item>
            <el-menu-item index="40-3" @click="navigateTo('Role')">角色管理</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="50"  v-if="role.name === '管理员'">
            <template #title>系统配置</template>
            <el-menu-item index="50-1" @click="navigateTo('Status')">项目状态管理</el-menu-item>
            <el-menu-item index="50-2" @click="navigateTo('State')">任务状态管理</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="60"  v-if="role.name === '管理员'" @click="navigateTo('OperationLog')">操作日志</el-menu-item>
        </el-menu>
      </el-aside>

      <el-main class="content" style="flex: 1 1 auto; overflow-y: scroll;">
        <router-view></router-view>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
import {Management, Pointer} from "@element-plus/icons-vue";
import Api from "../utils/api.js";
import api from "../utils/api.js";
import authService from "../utils/authService.js";

export default {
  name: 'DashBoard',
  components: {Management, Pointer},
  data() {
    return {
      role: {},
    }
  },
  methods: {
    navigateTo(routeName) {
      this.$router.push({name: routeName});
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push({name: 'Login'});
    },

  },
  mounted() {
    authService.getMyInfo().then(res => {
      this.role = res.data.data.role
    })
  }
};
</script>

<style scoped>
.app-wrapper {
  width: 100%;
  height: 100%;
}

.header {
  height: 60px; /* Changed height to 60px to match the navigation bar */
  background-color: burlywood;
  padding: 0px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navigation-menu {
  line-height: 60px; /* Center items vertically */
}

.logo {
  font-size: 20px;
  margin-left: 20px; /* Adjust margin as needed */
}

.menu {
  background-color: aquamarine;
  position: relative;
  top: 0px;
  left: 0px;
  width: 220px;
  height: calc(100vh - 60px); /* Adjust height */
}

.content {
  position: relative;
  width: 100%;
  height: calc(100vh - 60px); /* Adjust height */
  overflow-y: scroll;
}
</style>
