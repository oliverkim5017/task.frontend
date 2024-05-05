<template>
  <el-header class="page-header">
    <el-col :span="20" :xs="24">
      <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="68px">
        <el-form-item label="用户名称" prop="userName">
          <el-input
              v-model="queryParams.userName"
              placeholder="请输入用户名称"
              clearable
              style="width: 240px"
          />
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-date-picker
              v-model="queryParams.createTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 240px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query"><el-icon><Search /></el-icon>搜索</el-button>
          <el-button icon="el-icon-refresh" @click="resetQuery">重置</el-button>
          <el-button
              type="primary"
              plain
              size="small"
              @click="handleAdd"
          ><el-icon><Plus /></el-icon>新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

  </el-header>



  <el-main>
    <el-table
      >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="projectName" label="项目名称"></el-table-column>
      <el-table-column prop="description" label="详细描述"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间"></el-table-column>
      <el-table-column prop="createdBy" label="创建者"></el-table-column>
      <el-table-column prop="updatedBy" label="更新者"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>

import {Plus} from "@element-plus/icons-vue";

export default {
  name: 'Project',
  components: {Plus},
  data() {
    return {
      loading: false,
      queryParams: {
        projectName: '',
        createTime: []
      },
      projects: []
    }
  },
  methods: {
    query() {

    },
    resetQuery() {
      this.queryParams.userName = ''
      this.queryParams.phonenumber = ''
      this.query()
    },
    handleEdit() {

    },
    handleDelete() {

    },
    handleAdd() {

    }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>
