<template>
  <el-container style="height: auto;">
    <el-aside width="200px">
      <el-menu active-text-color="#ffd04b"
               background-color="#545c64"
               class="el-menu-vertical-demo"
               default-active="2"
               text-color="#fff"
      >
        <el-menu-item index="1" @click="navigateTo('TaskBoard')">任务看板</el-menu-item>
        <el-menu-item index="2" @click="navigateTo('TaskManagement')">任务管理</el-menu-item>
        <el-menu-item index="3" @click="navigateTo('MyInfo')">
          <el-icon>
            <InfoFilled/>
          </el-icon>
          <span>我的信息</span>
        </el-menu-item>
        <el-menu-item index="4" @click="logout">
          <span>登出</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-main style="height: 100%; overflow-y: auto;">
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
</style>
