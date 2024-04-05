<template>
  <div class="container">
    <el-header>
      <span class="header-item">任务看板</span>
      <el-button type="primary" class="header-item" @click="addTask">新增任务</el-button>
      <el-select size="small"
                 class="header-item"
                 placeholder="选择组别"
                 v-model="selectedTeams"
                 clearable
                 multiple
      >
        <el-option
            v-for="item in teams"
            :key="item.id"
            :label="item.name"
            :value="item.id"
        >
        </el-option>
      </el-select>
      <el-select size="small"
                 class="header-item"
                 placeholder="选择任务状态"
                 v-model="selectedStates"
                 clearable
                 multiple
      >
        <el-option
            v-for="item in states"
            :key="item.id"
            :label="item.name"
            :value="item.id"
        >
        </el-option>
      </el-select>
      <el-button type="primary" class="header-item" @click="query">查询</el-button>
    </el-header>
    <el-main class="main">
      <el-table
          :data="tasks"
      >
        <el-table-column type="expand">
          <template #default="props">
            <div v-if="props.row.nodes && props.row.nodes.length > 0">
              <el-table :data="props.row.nodes">
                <el-table-column label="节点内容" prop="content"></el-table-column>
                <el-table-column label="节点负责人" prop="assignedUser.name"></el-table-column>
                <el-table-column label="节点状态" prop="taskState.name"></el-table-column>
                <el-table-column label="截至日期" prop="deadLine"></el-table-column>
                <el-table-column label="创建人" prop="creator.name"></el-table-column>
                <el-table-column label="操作">
                  <template #default="scope">
                    <el-button type="text" @click="editTaskNode(scope.row)">编辑</el-button>
                    <el-button type="text" @click="delTaskNode(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="任务内容" prop="content"></el-table-column>
        <el-table-column label="分配组" prop="team.name" sortable></el-table-column>
        <el-table-column label="任务状态" prop="state.name"></el-table-column>
        <el-table-column label="截至日期" prop="deadLine" sortable></el-table-column>
        <el-table-column label="创建人" prop="creator.name" sortable></el-table-column>
        <el-table-column label="操作"  min-width="200px">
          <template #default="scope">
            <el-button type="primary" @click="editTask(scope.row)">编辑</el-button>
            <el-button type="primary" @click="addTaskNode(scope.row)">添加子任务</el-button>
            <el-button type="danger" @click="delTask(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-dialog v-model="taskDialogVisible"
                title="编辑任务"
                width="30%"
    >
      <el-form :model="task" label-width="80px">
        <el-form-item label="任务内容">
          <el-input v-model="task.content"></el-input>
        </el-form-item>
        <el-form-item label="分配组">
          <el-select v-model="task.teamId" placeholder="请选择组别">
            <el-option
                v-for="item in teams"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务状态">
          <el-select v-model="task.stateId" placeholder="请选择任务状态">
            <el-option
                v-for="item in states"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="截至日期">
          <el-date-picker
              v-model="task.deadLine"
              type="date"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="taskDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSaveTask">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog v-model="taskNodeDialogVisible"
                title="编辑任务节点"
                width="30%"
    >
      <el-form :model="taskNode" label-width="80px">
        <el-form-item label="任务内容">
          <el-input v-model="taskNode.content"></el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-select v-model="taskNode.userId" placeholder="请选择负责人">
            <el-option
                v-for="item in limitUsers"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务状态">
          <el-select v-model="taskNode.stateId" placeholder="请选择任务状态">
            <el-option
                v-for="item in states"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="截至日期">
          <el-date-picker
              v-model="taskNode.deadLine"
              type="date"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="taskNodeDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSaveTaskNode">确定</el-button>
      </span>

    </el-dialog>
  </div>
</template>

<script>
import taskService from "../utils/taskService.js";
import taskNodeService from "../utils/taskNodeService.js";
import authService from "../utils/authService.js";

export default {
  name: 'TaskManagement',
  data() {
    return {
      teams: [],
      selectedTeams: [],
      states: [],
      selectedStates: [],
      tasks: [],
      task: {
        id: '',
        content: '',
        teamId: '',
        stateId: '',
        deadLine: ''
      },
      taskNode: {
        id: '',
        content: '',
        parentTaskId: '',
        assignedUserId: '',
        userId: '',
        deadLine: ''
      },
      taskDialogVisible: false,
      taskNodeDialogVisible: false,
      users: [],
      limitUsers: []
    }
  },
  methods: {
    query() {
      this.tasks = [];
      const selectedTeams = this.selectedTeams.join(',');
      const selectedStates = this.selectedStates.join(',');
      taskService.getTasks({
        teamIds: selectedTeams,
        stateIds: selectedStates
      }).then(res => {
        this.tasks = res.data.data;
      })
    },
    delTaskNode(data) {
      taskNodeService.delTaskNode(data.id).then(res => {
        this.query();
      })
    },
    editTaskNode(data) {
      this.taskNode = {
        id: data.id,
        content: data.content,
        parentTaskId: data.parentTaskId,
        userId: data.userId,
        stateId: data.stateId,
        deadLine: data.deadLine
      }
      this.limitUsers = this.users.filter(u => u.teamId === data.assignedUser.teamId);
      this.taskNodeDialogVisible = true;
    },
    addTask() {
      this.task = {
        id: '',
        content: '',
        teamId: '',
        stateId: '',
        deadLine: ''
      }

      this.taskDialogVisible = true;
    },
    editTask(data) {
      this.task = {...data}
      this.taskDialogVisible = true;
    },
    addTaskNode(data) {
      this.taskNode = {
        id: '',
        content: '',
        parentTaskId: data.id,
        userId: '',
        deadLine: ''
      }
      this.limitUsers = this.users.filter(u => u.teamId === data.teamId);
      this.taskNodeDialogVisible = true;
    },
    handleSaveTask() {
      if (this.task.id) {
        taskService.updateTask(this.task).then(res => {
          const task = res.data.data;
          const index = this.tasks.findIndex(t => t.id === task.id);
          this.tasks.splice(index, 1, task);
          this.taskDialogVisible = false;
        })
      } else {
        taskService.addTask(this.task).then(res => {
          const task = res.data.data;
          this.tasks.push(task);
          this.taskDialogVisible = false;
        })
      }
    },
    handleSaveTaskNode() {
      console.log(this.taskNode)
      if (this.taskNode.id) {
        taskNodeService.updateTaskNode(this.taskNode).then(res => {
          this.query();
          this.taskNodeDialogVisible = false;
        })
      } else {
        taskNodeService.addTaskNode(this.taskNode).then(res => {
         this.query();
          this.taskNodeDialogVisible = false;
        })
      }
    },
    delTask(data) {
      taskService.delTask(data.id).then(res => {
        this.query();
      })
    }
  },
  mounted() {
    taskService.getTeams().then(res => {
      this.teams = res.data.data;
    })
    taskService.getStates().then(res => {
      this.states = res.data.data;
    })
    authService.getUsers().then(res => {
      this.users = res.data.data;
    })
  }
}
</script>

<style scoped>
.header-item {
  flex: 1;
  max-width: 200px; /* 限制最大宽度，根据需要调整 */
  margin-left: 20px;
}
</style>
