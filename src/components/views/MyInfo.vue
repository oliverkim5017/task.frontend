<template>
  <el-container>
    <el-main>
      <el-card>
        <el-row>
          <el-col :span="8">
            <el-avatar shape="square" size="100px"
                       src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></el-avatar>
          </el-col>
          <el-col :span="16">
            <el-row>
              <el-col :span="24">
                <span>用户名：</span>
                <span>{{ this.user.username }}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span>姓名：</span>
                <span>{{ this.user.name }}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span>组别：</span>
                <span>{{ this.user.team?.name }}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <span>角色：</span>
                <span>{{ this.user.role?.name }}</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>


      <el-row>
        <el-col :span="6">
          <el-card>
            <el-row>
              <el-col :span="24">
                <span>我的任务</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-table
                    :data="tasks"
                    class="scrolling-table"
                    max-height="85vh"
                >
                  <el-table-column label="任务" prop="content"></el-table-column>
                  <el-table-column label="状态" prop="taskState.name"></el-table-column>
                  <el-table-column label="截至日期" prop="deadLine" sortable></el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="18">
          <el-card style="height: 75vh">

          </el-card>
        </el-col>
      </el-row>





    </el-main>
  </el-container>
</template>


<script>

import authService from "../utils/authService.js";
import taskService from "../utils/taskService.js";

export default {
  name: 'MyInfo',
  data() {
    return {
      user: {
        username: '',
        name: '',
      },
      tasks: []
    }
  },
  methods: {},
  mounted() {
    authService.getMyInfo().then(res => {
      this.user = res.data.data
    })
    taskService.getMyTasks().then(res => {
      this.tasks = res.data.data
    })
  }
}

</script>