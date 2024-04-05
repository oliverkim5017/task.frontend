<template>
  <el-container class="app-wrapper" style="height: 100vh; display: flex; flex-direction: column;">
    <el-header class="header" style="background-color: #545c64; color: white; line-height: 60px; flex: 0 0 auto;">
      任务管理系统
    </el-header>
    <el-container class='content-wrapper' style="display: flex; flex: 1 1 auto;">
      <el-aside class="menu" width="200px" style="height: calc(100vh - 60px); flex: 0 0 200px; background-color: #545c64;overflow-y: auto;">
        <el-menu active-text-color="#ffd04b"
                 background-color="#545c64"
                 class="el-menu-vertical-demo"
                 default-active="2"
                 text-color="#fff"
        >
          <el-menu-item index="1" @click="navigateTo('TaskBoard')"><el-icon><Menu /></el-icon>任务看板</el-menu-item>
          <el-menu-item index="2" @click="navigateTo('TaskManagement')"><el-icon><Pointer /></el-icon>任务管理</el-menu-item>
          <el-menu-item index="3" @click="navigateTo('MyInfo')"><el-icon><InfoFilled/></el-icon><span>我的信息</span></el-menu-item>
          <el-menu-item index="4" @click="logout">
            <span>登出</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main class="content" style="flex: 1 1 auto; overflow-y: scroll;">
        <router-view></router-view>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
export default {
  name: 'DashBoard',
  methods: {
    navigateTo(routeName) {
      this.$router.push({name: routeName});
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push({name: 'Login'});
    }
  },
};
</script>

<style scoped>
.app-wrapper {
  width: 100%;
  height: 100%;
}

.header {
  height: 50px;
  background-color: burlywood;
  padding: 0px;
  border-bottom: 1px solid #e5e7eb;
}

.menu {
  background-color: aquamarine;
  position: relative;
  top: 0px;
  left: 0px;
  width: 220px;
  height: calc(100vh - 50px);
}

.content {
  position: relative;
  width: 100%;
  height: calc(100vh - 50px);
  overflow-y: scroll;
}
</style>
