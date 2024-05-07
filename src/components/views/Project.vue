<template>
  <el-header class="page-header">
    <el-col :span="20" :xs="24">
      <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="68px">
        <el-form-item label="项目名称" prop="userName">
          <el-input
              v-model="queryParams.name"
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
        <el-form-item label="所属部门" prop="departmentId">
          <el-select v-model="queryParams.departmentId" placeholder="请选择部门" style="width: 200px">
            <el-option
                v-for="item in hierarchicalDepartments"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">
            <el-icon>
              <Search/>
            </el-icon>
            搜索
          </el-button>
          <el-button icon="el-icon-refresh" @click="resetQuery">
            <el-icon>
              <RefreshRight/>
            </el-icon>
            重置
          </el-button>
          <el-button
              type="primary"
              plain
              size="small"
              @click="handleAdd"
          >
            <el-icon>
              <Plus/>
            </el-icon>
            新增
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-header>

  <el-main>
    <el-table
        :data="projects"
        style="width: 100%"
        stripe
        border
        height="500"
    >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="项目名称"></el-table-column>
      <el-table-column prop="detail" label="详细描述"></el-table-column>
      <el-table-column prop="startTime" label="开始时间"></el-table-column>
      <el-table-column prop="endTime" label="结束时间"></el-table-column>
      <el-table-column prop="statusId" label="状态">
        <template #default="scope">
          <el-tag
              :type="status.find(item => item.id === scope.row.statusId).hexCode"
              effect="dark"
          >
            {{ status.find(item => item.id === scope.row.statusId)?.name }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="department.name" label="负责部门"></el-table-column>
      <el-table-column prop="user.name" label="责任人"></el-table-column>
      <el-table-column prop="approveUser.name" label="审核人"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="creator.name" label="创建者"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间"></el-table-column>
      <el-table-column prop="updater.name" label="更新者"></el-table-column>
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
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="project.name" placeholder="请输入项目名称" clearable/>
      </el-form-item>
      <el-form-item label="详细描述" prop="detail">
        <el-input type="textarea" v-model="project.detail" placeholder="请输入详细描述" clearable/>
      </el-form-item>
      <el-form-item label="负责部门" prop="departmentId">
          <el-select v-model="project.departmentId" placeholder="请选择部门" @change="changeDepartment">
            <el-option
                v-for="item in hierarchicalDepartments"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            ></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="责任人" prop="userId">
        <el-select v-model="project.userId" placeholder="请选择责任人" clearable>
          <el-option
              v-for="item in usersUnderDepartment"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="审核人" prop="approveUserId">
        <el-select v-model="project.approveUserId" placeholder="请选择审核人" clearable>
          <el-option
              v-for="item in users"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间" prop="startTime">
        <el-date-picker
            v-model="project.startTime"
            value-format="YYYY-MM-DD"
            type="date"
            placeholder="选择项目开始时间"
            style="width: 240px"
        />
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker
            v-model="project.endTime"
            value-format="YYYY-MM-DD"
            type="date"
            placeholder="选择项目结束时间"
            style="width: 240px"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialog = false">取 消</el-button>
      <el-button type="primary" @click="handleSave()">确 定</el-button>
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
        name: '',
        startTime: [],
        endTime: [],
        createTime: [],
        updateTime: [],
      },
      projects: [],
      dialog: false,
      project: {
        name: '',
        detail: '',
        departmentId: '',
        userId: '',
        approveUserId: '',
        startTime: '',
        endTime: '',
      },
      status: [],
      departments: [],
      users: [],
      hierarchicalDepartments: []
    }
  },
  computed: {
    usersUnderDepartment: {
      get() {
        return this.users.filter(user => user.departmentId === this.project.departmentId)
      }
    }
  },
  methods: {
    query() {
      const data = {
        name: this.queryParams.name,
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
      this.queryParams.name = ''
      this.queryParams.createTime = []
      this.queryParams.updateTime = []
      this.query()
    },
    handleSave() {
      api.saveProject(this.project).then(() => {
        this.project = {}
        this.dialog = false
        this.query()
      })
    },
    handleDelete(data) {
      projectService.delProject(data.id).then(() => {
        this.query()
      })
    },
    handleEdit(data) {
      this.project = { ...data }
      this.dialog = true
    },
    handleAdd() {
      this.project = {
        name: '',
        detail: '',
        departmentId: '',
        userId: '',
        approveUserId: '',
        startTime: '',
        endTime: '',
      }
      this.dialog = true;
    },
    changeDepartment() {
      this.project.userId = undefined
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
    api.getStatus().then(res => {
      this.status = res.data.data;
    })
    api.getDepartments().then(res => {
      this.departments = res.data.data;
      this.hierarchicalDepartments = this.buildHierarchy(this.departments);
    })
    api.getUsers().then(res => {
      this.users = res.data.data;
    })
  }
}
</script>

<style scoped>

</style>
