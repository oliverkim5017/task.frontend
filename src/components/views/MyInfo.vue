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
            <el-row>
              <el-col>
                <el-button type="text" @click="showMyMessage = false">我的评论</el-button>
                <el-badge style="margin-left: 20px" :value="unreadMessages" @click="read">
                  <el-button type="text" @click="showMyMessage = true">回复我的</el-button>
                </el-badge>
              </el-col>
            </el-row>

            <el-container style="height: 68vh" v-show="showMyMessage">
              <el-row>
                <el-col :span="24">
                  <div
                      v-for="(comment, index) in myMessage"
                      :key="index"
                      style="width: 100%"
                      class="box-card scrollable-content"
                  >
                    <p>
                      <span class="author">{{ comment.username }}</span>
                      <span v-if="comment.toUserId" class="mention"> @{{ comment.toUserName }}</span>
                      <span>:</span>
                      <span class="timestamp">- {{ comment.createdAt }}</span>
                      <br>
                      <span> {{ comment.content }}</span>
                      <el-button type="text" @click="reply(comment)">回复</el-button>
                    </p>

                  </div>
                </el-col>
              </el-row>
            </el-container>


            <el-container style="height: 68vh" v-show="!showMyMessage">
              <el-row>
                <el-col :span="24">
                  <div
                      v-for="(comment, index) in myComments"
                      :key="index"
                      style="width: 100%"
                      class="box-card scrollable-content"
                  >
                    <p>
                      <span class="author">{{ comment.username }}</span>
                      <span v-if="comment.toUserId" class="mention"> @{{ comment.toUserName }}</span>
                      <span>:</span>
                      <span class="timestamp">- {{ comment.createdAt }}</span>
                      <br>
                      <span> {{ comment.content }}</span>
                    </p>
                  </div>
                </el-col>
              </el-row>
            </el-container>
          </el-card>
        </el-col>

      </el-row>
    </el-main>
  </el-container>
</template>


<script>

import authService from "../utils/authService.js";
import taskService from "../utils/taskService.js";
import commentApi from "../utils/commentApi.js";

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
      unreadMessages: 0
    }
  },
  methods: {
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
      const ids =  localStorage.getItem('readMessageIds')
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
    }
  },
   mounted() {
    authService.getMyInfo().then(res => {
      this.user = res.data.data
    })
    taskService.getMyTasks().then(res => {
      this.tasks = res.data.data
    })
     this.getComments()

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