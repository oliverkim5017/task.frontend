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
                <span>{{ this.user.department?.name }}</span>
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
        <el-col :span="12">
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
                  <el-table-column label="任务" prop="content" ></el-table-column>
                  <el-table-column label="状态" prop="state.name"></el-table-column>
                  <el-table-column label="截至日期" prop="endTime" sortable></el-table-column>
                  <el-table-column min-width="200px">
                    <template #default="scope">
                      <el-button type="primary" @click="startApproval(scope.row)">已完成，提交审核</el-button>
                      <el-button type="warning" @click="specialApproval(scope.row)">特殊情况，提交申请</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </el-card>
        </el-col>

        <el-col :span="12">
          <el-card style="height: 75vh">
            <el-row>
             <span>待审核</span>
            </el-row>
              <el-table
                :data="toApproves"
                class="scrolling-table"
                max-height="85vh"
              >
                <el-table-column label="任务" prop="taskName"></el-table-column>
                <el-table-column label="发起人" prop="startUserName"></el-table-column>
                <el-table-column label="备注" prop="remarks" sortable></el-table-column>
                <el-table-column label="请求完成" prop="forFinish">
                  <template #default="scope">
                    <el-tag v-if="scope.row.forFinish" type="success">是</el-tag>
                    <el-tag v-else type="danger">否</el-tag>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template #default="scope">
                    <el-button type="primary" @click="showApprove(scope.row)">审批</el-button>
                  </template>
                </el-table-column>
              </el-table>
          </el-card>
        </el-col>

      </el-row>
    </el-main>

    <el-dialog
        title="提交审核"
        v-model="approveDialog"
        width="30%"
    >
      <el-form label-width="80px">
        <el-form-item label="任务内容">
          <el-input v-model="approveDetail.taskContent" disabled></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="approveDetail.status" disabled></el-input>
        </el-form-item>
        <el-form-item label="截至日期">
          <el-input v-model="approveDetail.endTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="approveDetail.remarks"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onConfirm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      v-model="replyDialog"
      title="回复"
      width="30%"
    >
      <el-form label-width="80px">
        <el-form-item label="回复内容">
          <el-input v-model="replyDetail.reply" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="任务状态" v-if="replyDetail.forFinish">
          <el-select v-model="replyDetail.stateId" placeholder="请选择状态">
            <el-option
                v-for="state in states"
                :key="state.id"
                :label="state.name"
                :value="state.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onReply">回复</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </el-container>
</template>


<script>

import authService from "../utils/authService.js";
import taskService from "../utils/taskService.js";
import commentApi from "../utils/commentApi.js";
import api from "../utils/api.js";

export default {
  name: 'MyInfo',
  data() {
    return {
      user: {
        username: '',
        name: '',
      },
      tasks: [],
      myComments: [],
      myMessage: [],
      showMyMessage: false,
      unreadMessages: 0,
      approveDetail: {
        id: '',
        taskContent: '',
        status: '',
        endTime: '',
        remarks: '',
        forFinish: ''
      },
      approveDialog: false,
      toApproves: [],
      replyDialog: false,
      replyDetail: {
        taskId: '',
        reply: '',
        stateId: ''
      },
      states: []
    }
  },
  methods: {
    onReply() {
      api.approveReply(this.replyDetail).then(res => {
        this.query()
        this.replyDialog = false
      })
    },
    showApprove(data) {

      api.getTaskById(data.taskId).then(res => {
        this.replyDetail = {
          taskId: data.taskId,
          reply: '',
          stateId: res.data.data.stateId,
          forFinish: data.forFinish
        }
      })


      this.replyDialog = true
    },
    onConfirm() {
      this.approveDialog = false;
      console.log(this.approveDetail)
      api.startApproval(this.approveDetail).then(res => {
        this.approveDialog = false;
      })
    },
    startApproval(data) {

      api.getApproval(data).then(res => {
        if (res.data.data && res.data.data !== '') {
          this.approveDetail = {
            id: res.data.data.id,
            taskId: data.id,
            taskContent: data.content,
            status: data.state.name,
            endTime: data.endTime,
            remarks: res.data.data.remarks,
            forFinish: true
          }
        } else {
          this.approveDetail = {
            taskId: data.id,
            taskContent: data.content,
            status: data.state.name,
            endTime: data.endTime,
            remarks: '',
            forFinish: true
          }
        }
      })
      this.approveDialog = true;
    },
    specialApproval(data) {
      api.getApproval(data).then(res => {
        if (res.data.data && res.data.data !== '') {
          this.approveDetail = {
            id: res.data.data.id,
            taskId: data.id,
            taskContent: data.content,
            status: data.state.name,
            endTime: data.endTime,
            remarks: res.data.data.remarks,
            forFinish: false
          }
        } else {
          this.approveDetail = {
            taskId: data.id,
            taskContent: data.content,
            status: data.state.name,
            endTime: data.endTime,
            remarks: '',
            forFinish: false
          }
        }
      })
      this.approveDialog = true;
    },
    getComments() {
      commentApi.getMyComments().then(res => {
        const comments = res.data.data
        this.myComments = comments.filter(comment => comment.username === this.user.name)
        this.myMessage = comments.filter(comment => comment.toUserName === this.user.name)
        this.calculateUnreadMessages()
      })
    },
    reply(data) {
      const newComment = {
        content: '',
        toUserId: data.userId
      }
      this.$prompt('请输入回复内容', '回复', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '内容不能为空'
      }).then(({value}) => {
        newComment.content = value
        commentApi.addComment(newComment, data.taskId).then(res => {
          this.getComments()
        })
      }).catch(() => {
      });
    },
    calculateUnreadMessages() {
      const ids = localStorage.getItem('readMessageIds')
      console.log('ids' + ids)
      if (ids) {
        const readIds = ids.split(',')
        this.unreadMessages = this.myMessage.filter(comment => !readIds.includes(comment.id)).length
      } else {
        this.unreadMessages = this.myMessage.length
        console.log(this.myMessage.length)
      }
      console.log(this.unreadMessages)
    },
    read() {
      const ids = this.myMessage.map(comment => comment.id).join(',')
      localStorage.setItem('readMessageIds', ids)
      this.unreadMessages = 0
    },
    query() {
      authService.getMyInfo().then(res => {
        this.user = res.data.data
      })
      taskService.getMyTasks().then(res => {
        this.tasks = res.data.data
      })
      api.getToApprove().then(res => {
        this.toApproves = res.data.data;
      })
      api.getStates().then(res => {
        this.states = res.data.data
      })
    }
  },
  mounted() {
   this.query()

  },

}

</script>

<style scoped>
.mention {
  margin-left: 10px;
  font-size: 0.8em;
  color: #36e887;
}
</style>
