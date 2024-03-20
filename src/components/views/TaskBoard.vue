<template>
  <div class="container">
    <el-header>
      <span class="header-item">任务看板</span>
      <el-button type="primary" class="header-item">新增任务</el-button>
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
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="任务内容" prop="content"></el-table-column>
        <el-table-column label="分配组" prop="team.name"></el-table-column>
        <el-table-column label="任务状态" prop="state.name"></el-table-column>
        <el-table-column label="截至日期" prop="deadLine"></el-table-column>
        <el-table-column label="创建人" prop="creator.name"></el-table-column>
        <el-table-column label="操作">
          <el-button type="primary">编辑</el-button>
          <el-button type="danger">删除</el-button>
          <el-button type="warning">讨论区</el-button>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
import taskService from "../utils/taskService.js";

export default {
  name: 'TaskBoard',
  data() {
    return {
      teams: [],
      selectedTeams: [],
      states: [],
      selectedStates: [],
      tasks: []
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
    }
  },
  mounted() {
    taskService.getTeams().then(res => {
      this.teams = res.data.data;
    })
    taskService.getStates().then(res => {
      this.states = res.data.data;
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
