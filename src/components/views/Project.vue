<template>
  <el-header class="page-header">
    <el-col :span="20" :xs="24">
      <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="68px">
        <el-form-item label="项目名称" prop="userName">
          <el-input
              v-model="queryParams.projectName"
              placeholder="请输入项目名称"
              clearable
              style="width: 240px"
          />
        </el-form-item>

        <el-form-item label="开始时间" prop="createTime">
          <el-date-picker
              v-model="queryParams.startTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 240px"
          />
        </el-form-item>
        <el-form-item label="结束时间" prop="createTime">
          <el-date-picker
              v-model="queryParams.endTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
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
        <el-form-item label="更新时间" prop="createTime">
          <el-date-picker
              v-model="queryParams.updateTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 240px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query"><el-icon><Search /></el-icon>搜索</el-button>
          <el-button icon="el-icon-refresh" @click="resetQuery"><el-icon><RefreshRight/></el-icon>重置</el-button>
          <el-button
              type="primary"
              plain
              size="small"
              @click="handleAdd"
          ><el-icon><Plus /></el-icon> 新增</el-button>
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
      <el-table-column prop="startTime" label="开始时间"></el-table-column>
      <el-table-column prop="endTime" label="结束时间"></el-table-column>
      <el-table-column prop="status" label="状态">

      </el-table-column>
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

  <el-dialog
      title="编辑项目"
      v-model="dialog"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
  >
    <el-form :model="project" ref="projectForm" size="small" label-width="80px">
      <el-form-item label="项目名称" prop="projectName">
        <el-input v-model="project.projectName" placeholder="请输入项目名称" clearable/>
      </el-form-item>
      <el-form-item label="详细描述" prop="description">
        <el-input type="textarea" v-model="project.description" placeholder="请输入详细描述" clearable/>
      </el-form-item>
      <el-form-item label="项目开始时间" prop="startTime">
        <el-date-picker
            v-model="project.startTime"
            type="datetime"
            placeholder="选择项目开始时间"
            style="width: 240px"
        />
      </el-form-item>
      <el-form-item label="项目结束时间" prop="endTime">
        <el-date-picker
            v-model="project.endTime"
            type="datetime"
            placeholder="选择项目结束时间"
            style="width: 240px"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialog = false">取 消</el-button>
      <el-button type="primary" @click="handleEdit">确 定</el-button>
    </div>
  </el-dialog>


</template>

<script>

import {Plus, RefreshRight} from "@element-plus/icons-vue";
import projectService from "../utils/projectService.js";
import api from "../utils/api.js";

export default {
  name: 'Project',
  components: {RefreshRight, Plus},
  data() {
    return {
      loading: false,
      queryParams: {
        projectName: '',
        startTime: [],
        endTime: [],
        createTime: [],
        updateTime: [],
      },
      projects: [],
      dialog: false,
      project: {
        projectName: '',
        description: '',
      },
      status: []
    }
  },
  methods: {
    query() {
      const data = {
        projectName: this.queryParams.projectName,
        startTime: this.queryParams.startTime[0] + '~' + this.queryParams.startTime[1],
        endTime: this.queryParams.endTime[0] + '~' + this.queryParams.endTime[1],
        createTime: this.queryParams.createTime[0] + '~' + this.queryParams.createTime[1],
        updateTime: this.queryParams.updateTime[0] + '~' + this.queryParams.updateTime[1],
      }
      projectService.getProjects(data).then(res => {
        this.projects = res.data.data
      })
    },
    resetQuery() {
      this.queryParams.projectName = ''
      this.queryParams.createTime = []
      this.queryParams.updateTime = []
      this.query()
    },
    handleEdit() {

    },
    handleDelete() {

    },
    handleAdd() {
      console.log(1)
      this.project = {
        projectName: '',
        description: '',
      }
      this.dialog = true;
    }
  },
  mounted() {
    api.getStatus().then(res => {
      this.status = res.data.data;
    })
  }
}
</script>

<style scoped>

</style>
