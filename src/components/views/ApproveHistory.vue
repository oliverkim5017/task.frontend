<template>
  <el-header>
    <el-row>
      <el-col :span="12">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>审批记录</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>

    </el-row>
  </el-header>

  <el-main>
    <el-table
        :data="approveDetails"
        style="width: 100%"
        stripe
        border
        height="500"
    >
      <el-table-column type="index" label="序号" width="50" ></el-table-column>
      <el-table-column prop="taskName" label="任务内容"></el-table-column>
      <el-table-column prop="taskState" label="任务状态"></el-table-column>
      <el-table-column prop="approveUserName" label="审批人"></el-table-column>
      <el-table-column prop="remarks" label="备注"></el-table-column>
      <el-table-column prop="forFinish" label="申请完成">
        <template #default="scope">
          <el-tag v-if="scope.row.forFinish" type="success">是</el-tag>
          <el-tag v-else type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="reply" label="回复"></el-table-column>
      <el-table-column prop="createTime" label="申请时间" sortable></el-table-column>
      <el-table-column prop="approveTime" label="审批时间" sortable></el-table-column>
    </el-table>
  </el-main>
</template>


<script>

import api from "../utils/api.js";

export default {
  name: 'ApproveHistory',
  data() {
    return {
      approveDetails: [],
      approveDetail: {
        id: '',
        taskContent: '',
        status: '',
        endTime: '',
        remarks: '',
        forFinish: '',
        reply: ''
      },
    }
  },
  methods: {

  },
  mounted() {
    api.getApproveDetails().then(res => {
      this.approveDetails = res.data.data
    })
  }

}

</script>
