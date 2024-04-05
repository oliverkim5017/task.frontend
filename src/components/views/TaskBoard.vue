<template>
  <el-container>
    <el-main>
      <el-container v-show="!showCalender">
        <el-table
            :data="tasks"
            class="scrolling-table"
            max-height="85vh"

        >
          <el-table-column label="任务" prop="content" sortable></el-table-column>
          <el-table-column label="负责小组" prop="team.name" sortable></el-table-column>
          <el-table-column label="状态" prop="state.name" :filters="states"
                           :filter-method="filterStatus"></el-table-column>
          <el-table-column label="截至日期" prop="deadLine" sortable></el-table-column>
          <el-table-column>
            <template #default="{ row }">
              <el-button type="text" @click="openCommentSection(row.id)">讨论组</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="showCalender = !showCalender">日历视图</el-button>
      </el-container>

      <el-container v-show="showCalender">
        <el-calendar
        >
          <template #date-cell="{ date,data }">
            <p :class="taskDic[data.day] ? 'task-date' : ''" @click="showTasks(data.day)">
              {{ data.day.split('-').slice(1).join('-') }}
              <br>
              {{ taskDic[data.day] ? taskDic[data.day].length + '个任务' : '' }}
            </p>
          </template>
        </el-calendar>
        <el-button type="primary" @click="showCalender = !showCalender">表格视图</el-button>
      </el-container>
    </el-main>
  </el-container>

  <el-dialog v-model="dialogVisible" title="当天任务">
    <el-table :data="selectedDateTasks">
      <el-table-column label="任务" prop="content"></el-table-column>
      <el-table-column label="负责小组" prop="team.name"></el-table-column>
      <el-table-column label="状态" prop="state.name"></el-table-column>
      <el-table-column label="截至日期" prop="deadLine"></el-table-column>
      <el-table-column>
        <template #default="{ row }">
          <el-button type="text" @click="openCommentSection(row.id)">讨论组</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>

  <el-dialog v-model="commentDialogVisible" title="讨论组">
    <comments-section></comments-section>
  </el-dialog>

</template>

<script>
import taskService from "../utils/taskService.js";
import {orderBy} from "loadsh"
import CommentsSection from "./CommentsSection.vue";
import commentApi from "../utils/commentApi.js";

export default {
  name: 'TaskBoard',
  components: {CommentsSection},
  data() {
    return {
      showCalender: true,
      tasks: [],
      states: [],
      dialogVisible: false,
      selectedDateTasks: [],
      taskDic: {},
      commentDialogVisible: false
    }
  },
  methods: {
    query() {
      taskService.getTasks().then(res => {
        const tasks = res.data.data;
        for (const task of tasks) {
          if (this.taskDic[task.deadLine]) {
            this.taskDic[task.deadLine].push(task)
          } else {
            this.taskDic[task.deadLine] = [task]
          }
        }
        this.tasks = orderBy(tasks, ['deadLine'], ['desc'])
      })
    },
    filterStatus(value, row) {
      return row.state.name === value;
    },
    showTasks(date) {
      this.selectedDateTasks = this.taskDic[date]
      this.dialogVisible = true
    },
    openCommentSection(id) {
      commentApi.getComments(id).then(res => {
        this.$refs.commentsSection.comments = res.data.data
      })
      this.commentDialogVisible = true;
    }
  },
  mounted() {
    this.query()
    taskService.getStates().then(res => {
      const states = res.data.data;
      this.states = states.map(state => {
        return {
          text: state.name,
          value: state.name
        }
      })
    })
  }
}
</script>

<style scoped>
.task-date {
  color: red;
}
</style>
