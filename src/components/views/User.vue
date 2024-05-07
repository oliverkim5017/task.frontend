<template>
  <el-header class="page-header">
    <el-col :span="20" :xs="24">
      <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="68px">
        <el-form-item label="名称" prop="userName">
          <el-input
              v-model="queryParams.name"
              placeholder="请输人员名称"
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
        :data="users"
        style="width: 100%"
        stripe
        border
        height="70vh"
    >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="department.name" label="部门"></el-table-column>
      <el-table-column prop="role.name" label="角色"></el-table-column>
      <el-table-column prop="disabled" label="是否禁用">
        <template #default="scope">
          <el-switch
              v-model="scope.row.disabled"
              active-text="是"
              inactive-text="否"
              active-color="#13ce66"
              inactive-color="#ff4949"
              disabled
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

  </el-main>


  <el-dialog
      title="编辑人员"
      v-model="dialog"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
  >
    <el-form :model="user" ref="userForm" size="small" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="user.username" placeholder="请输入用户名" disabled/>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="user.name" placeholder="请输入姓名" disabled/>
      </el-form-item>
      <el-form-item label="部门">
        <el-select v-model="user.departmentId" placeholder="请选择部门">
          <el-option
              v-for="item in hierarchicalDepartments"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="user.roleId" placeholder="请选择角色">
          <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否禁用" prop="disabled">
        <el-switch
            v-model="user.disabled"
            active-text="是"
            inactive-text="否"
            active-color="#13ce66"
            inactive-color="#ff4949"
        ></el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialog = false">取 消</el-button>
      <el-button type="primary" @click="onConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {Plus, RefreshRight} from "@element-plus/icons-vue";
import api from "../utils/api.js";

export default {
  name: 'User',
  components: {Plus, RefreshRight},
  data() {
    return {
      queryParams: {
        username: '',
        name: '',
      },
      dialog: false,
      users: [],
      user: {
        username: '',
        name: '',
        departmentId: 0,
        department: {},
        roleId: 0,
        role: {},
        disabled: false
      },
      departments: [],
      roles: [],
      hierarchicalDepartments: []
    }
  },
  methods: {
    query() {
      api.getUser(this.queryParams).then(res => {
        this.users = res.data.data
      })
    },
    resetQuery() {
      this.queryParams = {}
      this.query()
    },
    onConfirm() {
      api.saveUser(this.user).then(res => {
        this.dialog = false
        this.query()
      })
    },
    handleAdd() {
      this.user = {
        username: '',
        name: '',
        departmentId: 0,
        roleId: 0,
      }
      this.dialog = true
    },
    handleEdit(data) {
      this.user = data
      this.dialog = true
    },
    handleDelete(data) {
      api.delStatus(data.id).then(res => {
        this.query()
      })
    },
    buildHierarchy(departments) {

      const departmentMap = {};
      departments.forEach(dept => {
        departmentMap[dept.id] = { ...dept, children: [] };
      });

      const tree = [];
      departments.forEach(dept => {
        if (dept.parentId) {
          departmentMap[dept.parentId].children.push(departmentMap[dept.id]);
        } else {
          tree.push(departmentMap[dept.id]);
        }
      });

      const flattenHierarchy = (node, prefix = '') => {
        const hierarchicalNode = { id: node.id, name: `${prefix}${node.name}` };
        return [
          hierarchicalNode,
          ...node.children.flatMap(child => flattenHierarchy(child, `${prefix}-`))
        ];
      };
      return tree.flatMap(root => flattenHierarchy(root));
    }
  },
  mounted() {
    api.getDepartments().then(res => {
      this.departments = res.data.data
      this.hierarchicalDepartments = this.buildHierarchy(this.departments);
    })
    api.getRoles().then(res => {
      this.roles = res.data.data
    })
  }
}
</script>

<style scoped>

</style>
