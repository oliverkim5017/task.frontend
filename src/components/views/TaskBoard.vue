<template>
  <div v-loading="loading">
        <el-row>
          <el-col :span="8">
            <el-select
                v-model="selectedYear"
                placeholder="选择年份"
                style="margin-right: 10px; width: 150px;"
            >
              <el-option
                  v-for="year in availableYears"
                  :key="year"
                  :label="year"
                  :value="year"
                  @change="query"
              />
            </el-select>
            <el-select
                v-model="selectedMonth"
                placeholder="选择月份"
                style="width: 150px;"
                @change="query"
            >
              <el-option
                  v-for="month in availableMonths"
                  :key="month.value"
                  :label="month.label"
                  :value="month.value"
              />
            </el-select>
          </el-col>
        </el-row>

    <el-row>
      <el-col :span="8">
        <div class="panel" ref="statusChart"></div>
      </el-col>
      <el-col :span="8">
        <div class="panel" ref="statesChart"></div>
      </el-col>
      <el-col :span="8">
        <div class="panel" ref="departmentsChart"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="panel" ref="statusPieChart"></div>
      </el-col>
      <el-col :span="8">
        <div class="panel" ref="statesPieChart"></div>
      </el-col>
      <el-col :span="8">
        <div class="panel" ref="departmentsPieChart"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import api from "../utils/api.js";

export default {
  name: 'TaskBoard',
  data() {
    const currentYear = new Date().getFullYear();
    return {
      status: [],
      states: [],
      departments: [],
      projectChartData: {},
      taskChartData: {},
      departmentChartData: {},
      selectedYear: currentYear,
      selectedMonth: new Date().getMonth() + 1,
      availableYears: Array.from({length: 10}, (_, index) => currentYear - index),
      availableMonths: [
        {value: 1, label: '1月'},
        {value: 2, label: '2月'},
        {value: 3, label: '3月'},
        {value: 4, label: '4月'},
        {value: 5, label: '5月'},
        {value: 6, label: '6月'},
        {value: 7, label: '7月'},
        {value: 8, label: '8月'},
        {value: 9, label: '9月'},
        {value: 10, label: '10月'},
        {value: 11, label: '11月'},
        {value: 12, label: '12月'}
      ],
      loading: false,
    }
  },
  methods: {
    query() {
      this.loading = true;
      const data = {
        year: this.selectedYear,
        month: this.selectedMonth
      }
      api.getProjectSummary(data).then(res => {
        this.projectChartData = res.data.data;
        this.updateBarChart(this.$refs.statusChart, this.projectChartData, '项目完成情况');
        this.updatePieChart(this.$refs.statusPieChart, this.projectChartData, '项目完成情况');
      });
      api.getTaskSummary(data).then(res => {
        this.taskChartData = res.data.data;
        this.updateBarChart(this.$refs.statesChart, this.taskChartData, '任务完成情况');
        this.updatePieChart(this.$refs.statesPieChart, this.taskChartData, '任务完成情况');
      });
      api.getProjectOfDepartmentSummary(data).then(res => {
        this.departmentChartData = res.data.data;
        this.updateBarChart(this.$refs.departmentsChart, this.departmentChartData, '部门任务数');
        this.updatePieChart(this.$refs.departmentsPieChart, this.departmentChartData, '部门任务数');
      });
      this.loading = false;
    },
    updateBarChart(chartRef, data, title) {
      let chart = echarts.getInstanceByDom(chartRef);
      if (!chart) {
        chart = echarts.init(chartRef);
      }
      const option = {
        title: {text: title, left: 'center'},
        xAxis: {
          type: 'category',
          data: data.map(item => item.name)
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          type: 'bar',
          data: data.map(item => item.value)
        }]
      };
      chart.setOption(option, true);
    },
    updatePieChart(chartRef, data, title) {
      let chart = echarts.getInstanceByDom(chartRef);
      if (!chart) {
        chart = echarts.init(chartRef);
      }
      const option = {
        title: {text: title, left: 'center'},
        series: [{
          type: 'pie',
          radius: '50%',
          data: data.map(item => ({name: item.name, value: item.value})),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      };
      chart.setOption(option, true);
    },
    initBarChart(element, title, data) {
      const chart = echarts.init(element);
      const option = {
        title: {text: title},
        tooltip: {},
        xAxis: {
          type: 'category',
          data: data.map(item => item.name)
        },
        yAxis: {type: 'value'},
        series: [{type: 'bar', data: data.map(item => item.value)}]
      };
      chart.setOption(option, true);
    },
    initPieChart(element, title, data) {
      const chart = echarts.init(element);
      const option = {
        title: {text: title, left: 'center'},
        tooltip: {trigger: 'item'},
        series: [
          {
            name: title,
            type: 'pie',
            radius: '50%',
            data: data.map(item => ({name: item.name, value: item.value})),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      chart.setOption(option, true);
    },
    initCharts() {
      this.initBarChart(this.$refs.statusChart, '项目完成情况', this.status);
      this.initBarChart(this.$refs.statesChart, '任务完成情况', this.states);
      this.initBarChart(this.$refs.departmentsChart, '部门任务数', this.departments);
      this.initPieChart(this.$refs.statusPieChart, '项目完成情况', this.status);
      this.initPieChart(this.$refs.statesPieChart, '任务完成情况', this.states);
      this.initPieChart(this.$refs.departmentsPieChart, '部门任务数', this.departments);
    }
  },
  mounted() {
    Promise.all([
      api.getStatus(),
      api.getStates(),
      api.getDepartments(),
    ]).then(([statusRes, statesRes, departmentsRes]) => {
      this.status = statusRes.data.data;
      this.states = statesRes.data.data;
      this.departments = departmentsRes.data.data;
    });
    this.initCharts();
    this.$nextTick(() => {
      this.query();
    });
  }
}
</script>

<style scoped>
.panel {
  border: 1px solid #ebeef5;
  padding: 20px;
  box-sizing: border-box;
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
}
</style>
