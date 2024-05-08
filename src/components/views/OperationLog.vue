<template>

  <el-header class="page-header">
    <el-col :span="20" :xs="24">
      <el-form :model="params" ref="queryForm" size="small" :inline="true" label-width="68px">
        <el-form-item label="操作时间" prop="time">
          <el-date-picker
              v-model="params.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 240px"
              value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>
      </el-form>
    </el-col>
  </el-header>

  <el-main>
    <el-table
        :data="filteredLogs"
        style="width: 100%"
        stripe
        border
        height="500"
    >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="操作"></el-table-column>
      <el-table-column label="参数">
      <template #default="scope">
        <el-tooltip
            class="item"
            effect="dark"
            :content="scope.row.params"
            placement="top"
        >
          <span>{{ truncate(scope.row.params, 50) }}</span>
        </el-tooltip>
      </template>
      </el-table-column>
      <el-table-column prop="user.name" label="用户"></el-table-column>
      <el-table-column prop="time" label="操作时间"></el-table-column>
      <el-table-column prop="code" label="状态码"></el-table-column>
      <el-table-column prop="ip" label="ip地址"></el-table-column>
    </el-table>
  </el-main>

</template>

<script>
import api from "../utils/api.js";

export default {
  name: 'OperationLog',
  data() {
    return {
      logs: [],
      params: {
        time: ''
      }
    }
  },
  computed: {
    filteredLogs() {
      if (!this.params.time || this.params.time.length === 0) return this.logs
      return this.logs.filter(log => {
        return log.time >= this.params.time[0] && log.time <= this.params.time[1]
      })
    }
  },
  methods: {
    query() {
      api.getOperationLog(this.params).then(res => {
        this.logs = res.data.data
      })
    },
    truncate(str, n) {
      return str.length > n ? str.substr(0, n-1) + '...' : str;
    },
  },
  mounted() {
    this.query();
  }
}
</script>

<style scoped>

</style>
