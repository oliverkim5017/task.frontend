<template>
  <el-header class="page-header">
    <el-col :span="20" :xs="24">
      <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="68px">
        <el-form-item label="角色名称" prop="userName">
          <el-input
              v-model="queryParams.name"
              placeholder="请输入项目名称"
              clearable
              style="width: 240px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query"><el-icon><Search/></el-icon>搜索</el-button>
          <el-button icon="el-icon-refresh" @click="resetQuery"><el-icon><RefreshRight/></el-icon>重置</el-button>
          <el-button type="primary" plain size="small" @click="handleAdd"><el-icon><Plus/></el-icon>新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-header>

  <el-main>
    <el-table
        :data="roles"
        style="width: 100%"
        stripe
        border
        height="500"
    >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="角色"></el-table-column>
      <el-table-column prop="defaultRole" label="是否是默认角色">
        <template #default="scope">
          <el-switch
              v-model="scope.row.defaultRole"
              active-text="是"
              inactive-text="否"
              active-color="#13ce66"
              inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="disabled" label="是否禁用">
        <template #default="scope">
          <el-switch
              v-model="scope.row.disabled"
              active-text="是"
              inactive-text="否"
              active-color="#13ce66"
              inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
        title="编辑角色"
        v-model="dialog"
        width="30%"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
    >
      <el-form :model="role" ref="roleForm" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="role.name" clearable placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="默认角色" prop="defaultRole">
          <el-switch
              v-model="role.defaultRole"
              active-text="是"
              inactive-text="否"
              active-color="#13ce66"
              inactive-color="#ff4949"
          ></el-switch>
        </el-form-item>
        <el-form-item label="是否禁用" prop="disabled">
          <el-switch
              v-model="role.disabled"
              active-text="是"
              inactive-text="否"
              active-color="#13ce66"
              inactive-color="#ff4949"

          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>

  <el-dialog
      title="编辑项目"
      v-model="dialog"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
  >

  </el-dialog>


</template>

<script>
import {Plus, RefreshRight} from "@element-plus/icons-vue";
import api from "../utils/api.js";

export default {
  name: 'Role',
  components: {Plus, RefreshRight},
  data() {
    return {
      queryParams: {
        name: '',
      },
      dialog: false,
      roles: [],
      role: {
        name: '',
        defaultRole: false,
        disabled: false,
      }
    }
  },
  methods: {
    query() {
      api.getRoles(this.queryParams).then(response => {
        this.roles = response.data.data
      })
    },
    resetQuery() {
      this.queryParams = {}
      this.query()
    },
    onConfirm() {
      api.saveRole(this.role).then(response => {
        this.dialog = false
        this.query()
      })
    },
    handleAdd() {
      this.role = {
        name: '',
        defaultRole: false,
        disabled: false,
      }
      this.dialog = true
    },
    handleEdit(data) {
      this.role = data
      this.dialog = true
    },
    handleDelete(data) {
      api.delRole(data.id).then(response => {
        this.query()
      })
    },
  },
  mounted() {

  }
}
</script>

<style scoped>
</style>
