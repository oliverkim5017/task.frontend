<template>
  <el-header class="page-header">
    <el-col :span="20" :xs="24">
      <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="68px">
        <el-form-item label="名称" prop="name">
          <el-input
              v-model="queryParams.name"
              placeholder="请输入状态名称"
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
        :data="status"
        style="width: 100%"
        stripe
        border
        height="500"
    >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="状态名称"></el-table-column>
      <el-table-column prop="defaultStatus" label="是否是默认状态">
        <template #default="scope">
          <el-tag v-if="scope.row.defaultStatus" type="success">是</el-tag>
          <el-tag v-else type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="hexCode" label="状态颜色">
        <template #default="scope">
          <el-tag :style="{backgroundColor: scope.row.hexCode}"></el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="forFinish" label="是完成状态">
        <template #default="scope">
          <el-tag v-if="scope.row.forFinish" type="success">是</el-tag>
          <el-tag v-else type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </el-main>

  <el-dialog
      title="编辑状态"
      v-model="dialog"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
  >
    <el-form :model="sta" ref="statusForm" size="small" label-width="80px">
      <el-form-item label="状态名称" prop="name">
        <el-input v-model="sta.name" placeholder="请输入状态名称" clearable/>
      </el-form-item>
      <el-form-item label="是否是默认状态" prop="defaultStatus">
        <el-switch
            v-model="sta.defaultStatus"
            active-text="是"
            inactive-text="否"
            active-color="#13ce66"
            inactive-color="#ff4949"
        ></el-switch>
      </el-form-item>
      <el-form-item label="状态颜色" prop="hexCode">
        <el-color-picker v-model="sta.hexCode" show-alpha></el-color-picker>
      </el-form-item>
      <el-form-item label="是否是完成状态" prop="forFinish">
        <el-switch
            v-model="sta.forFinish"
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


</template>

<script>
import {Plus, RefreshRight} from "@element-plus/icons-vue";
import api from "../utils/api.js";

export default {
  name: 'Status',
  components: {Plus, RefreshRight},
  data() {
    return {
      queryParams: {
        name: '',
      },
      dialog: false,
      status: [],
      sta: {
        name: '',
        defaultStatus: false,
        hexCode: "",
        forFinish: false
      }
    }
  },
  methods: {
    query() {
      api.getStatus(this.queryParams).then(res => {
        this.status = res.data.data
      })
    },
    resetQuery() {
      this.queryParams = {}
      this.query()
    },
    onConfirm() {
      api.saveStatus(this.sta).then(res => {
        this.dialog = false
        this.query()
      })
    },
    handleAdd() {
      this.sta = {
        name: '',
        defaultStatus: false,
        hexCode: "",
        forFinish: false
      }
      this.dialog = true
    },
    handleEdit(data) {
      this.sta = data
      this.dialog = true
    },
    handleDelete(data) {
      api.delStatus(data.id).then(res => {
        this.query()
      })
    },
  },
  mounted() {
    this.query()
  }
}
</script>

<style scoped>

</style>
