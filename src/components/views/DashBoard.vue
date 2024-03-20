<template>
  <el-container style="height: auto;">
    <el-aside width="200px">
      <el-menu active-text-color="#ffd04b"
               background-color="#545c64"
               class="el-menu-vertical-demo"
               default-active="2"
               text-color="#fff"
               @open="handleOpen"
               @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><Document /></el-icon>
            <span>任务</span>
          </template>
          <el-menu-item index="1-1" @click="navigateTo('TaskBoard')">任务看板</el-menu-item>
          <el-menu-item index="1-2" @click="navigateTo('TaskManagement')">任务管理</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="2" @click="navigateTo('MyInfo')">
          <el-icon><InfoFilled /></el-icon>
          <span>我的信息</span>
        </el-menu-item>
        <el-menu-item index="3" @click="logout">
          <span>登出</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-main style="height: 100%; overflow-y: auto;"> <!-- 让 el-main 处理滚动 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'DashBoard',
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    navigateTo(routeName) {
      this.$router.push({ name: routeName });
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push({ name: 'Login' });
    }
  },
};
</script>

<style scoped>
</style>
