<template>
  <el-header class="page-header">
    <el-col :span="20" :xs="24">
      <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="68px">
        <el-form-item label="所属项目" prop="projectId">
          <el-select v-model="queryParams.projectId" placeholder="选择项目" style="width: 200px">
            <el-option
                v-for="item in projects"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="query" :disabled="disableQuery"><el-icon><Search/></el-icon>搜索</el-button>
          <el-button icon="el-icon-refresh" @click="resetQuery"><el-icon><RefreshRight/></el-icon>重置</el-button>
          <el-button type="primary" plain size="small" @click="handleAdd"><el-icon><Plus/></el-icon>新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-header>

  <el-main>
    <el-table :data="tasks" stripe border style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column label="任务内容">
        <template #default="{ row }">
          <span v-html="'—'.repeat(row.level)"></span>
          {{ row.content }}
        </template>
      </el-table-column>
      <el-table-column prop="user.name" label="负责人"></el-table-column>
      <el-table-column prop="approveUser.name" label="审批人"></el-table-column>
      <el-table-column prop="project.name" label="所属项目"></el-table-column>
      <el-table-column prop="creator.name" label="创建人"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="startTime" label="开始时间"></el-table-column>
      <el-table-column prop="endTime" label="结束时间"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <el-button type="text" size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleDelete(row)">删除</el-button>
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
    <el-form :model="task" ref="statusForm" size="small" label-width="80px">
      <el-form-item label="任务内容" prop="content">
        <el-input v-model="task.content"></el-input>
      </el-form-item>
      <el-form-item label="负责人">
        <el-select v-model="task.userId" placeholder="选择负责人">
          <el-option
              v-for="item in userUnderDepartment"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审批人">
        <el-select v-model="task.approveUserId" placeholder="选择审批人">
          <el-option
              v-for="item in users"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属项目">
        <el-select v-model="task.projectId" placeholder="选择所属项目" disabled>
          <el-option
              v-for="item in projects"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="父任务">
        <el-select v-model="task.parentId" placeholder="选择父任务">
          <el-option
              v-for="item in tasksUnderProject"
              :key="item.id"
              :label="item.content"
              :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker
            v-model="task.startTime"
            value-format="YYYY-MM-DD HH:mm:ss"
            format="YYYY-MM-DD HH:mm:ss"
            type="datetime"
            placeholder="选择开始时间"
            style="width: 100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker
            v-model="task.endTime"
            value-format="YYYY-MM-DD HH:mm:ss"
            format="YYYY-MM-DD HH:mm:ss"
            type="datetime"
            placeholder="选择结束时间"
            style="width: 100%"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialog = false">取消</el-button>
      <el-button type="primary" @click="onConfirm">确定</el-button>
    </span>
  </el-dialog>


</template>

<script>
import {Plus, RefreshRight} from "@element-plus/icons-vue";
import api from "../utils/api.js";
import projectService from "../utils/projectService.js";
import taskService from "../utils/taskService.js";

export default {
  name: 'TaskManagement',
  components: {Plus, RefreshRight},
  data() {
    return {
      queryParams: {
        projectId: undefined,
        startTime: [],
        endTime: [],
        userId: undefined
      },
      dialog: false,
      tasks: [],
      task: {
        content: '',
        userId: '',
        user: {},
        approveUserId: '',
        approveUser: {},
        projectId: '',
        project: {},
        parentId: '',
        creatorId: '',
        creator: {},
        createTime: '',
        startTime: '',
        endTime: ''
      },
      departments: [],
      projects: [],
      users: []
    }
  },
  computed: {
    userUnderDepartment: {
      get() {
        const p =  this.projects.find(project => project.id === this.task.projectId)
        return this.users.filter(user => user.departmentId === p?.departmentId)
      }
    },
    tasksUnderProject: {
      get() {
        const data = this.tasks.filter(task => task.projectId === this.task.projectId)
        console.log(data)
        return data;
      }
    },
    disableQuery() {
      return !this.queryParams.projectId
    }
  },
  methods: {
    query() {
      const data = {
        projectId: this.queryParams.projectId,
        startTime: this.queryParams.startTime[0] + '~' + this.queryParams.startTime[1],
        endTime: this.queryParams.endTime[0] + '~' + this.queryParams.endTime[1],
        userId: this.queryParams.userId,
      }
      taskService.getTasks(data).then(res => {
        const sortedTasks = res.data.data.sort((a, b) => a.startTime.localeCompare(b.startTime));
        this.tasks = this.buildTaskHierarchy(sortedTasks);
      })
    },
    resetQuery() {
      this.queryParams = {}
      this.query()
    },
    onConfirm() {
      api.saveTask(this.task).then(res => {
        this.dialog = false
        this.query()
      })
    },
    handleAdd() {
      this.task = {
        content: '',
        userId: '',
        user: {},
        approveUserId: '',
        approveUser: {},
        projectId: this.queryParams.projectId,
        project: this.projects.find(project => project.id === this.queryParams.projectId),
        parentId: '',
        creatorId: '',
        creator: {},
        createTime: '',
        startTime: '',
        endTime: ''
      }
      this.dialog = true
    },
    handleEdit(data) {
      this.task = data
      this.dialog = true
    },
    handleDelete(data) {
      api.delTask(data.id).then(res => {
        this.query()
      })
    },
    buildTaskHierarchy(tasks) {
      const map = new Map();
      const roots = [];

      tasks.forEach((task) => {
        task.children = [];
        map.set(task.id, task);
      });

      tasks.forEach((task) => {
        if (task.parentId) {
          const parentTask = map.get(task.parentId);
          if (parentTask) {
            parentTask.children.push(task);
            task.level = (parentTask.level || 0) + 1;
          }
        } else {
          task.level = 0;
          roots.push(task);
        }
      });

      const orderedTasks = [];
      function flatten(tasks) {
        tasks.forEach((task) => {
          orderedTasks.push(task);
          flatten(task.children);
        });
      }
      flatten(roots);

      return orderedTasks;
    },

  },
  mounted() {
    api.getDepartments().then(res => {
      this.departments = res.data.data
    })
    projectService.getProjects().then(res => {
      this.projects = res.data.data
    })
    api.getUser().then(res => {
      this.users = res.data.data
    })
  }
}
</script>

<style scoped>

</style>
