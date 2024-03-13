<script setup>

import Login from "./components/views/index.vue";
</script>

<template>
  <div id="app" class="app-background">
    <el-card style="width: 300px;height: 500px;position: absolute;left: 42%">
      <span style="display: block;text-align: center;">协作化项目管理系统</span>
      <login></login>
    </el-card>
  </div>
</template>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

#app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: url('./assets/img/BG.jpg') no-repeat center center fixed;
  background-size: cover;
}
</style>
