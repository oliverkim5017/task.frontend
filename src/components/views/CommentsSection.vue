<template>
  <el-container>
    <el-main>
      <el-card style="height: 50vh; overflow-y: auto;">
        <div
            class="comment"
            v-for="(comment, index) in comments"
            :key="index"
        >
          <p>
            <span class="author">{{ comment.username }}</span>
            <span v-if="comment.toUserId" class="mention"> @{{ comment.toUserName }}</span>
            <span>:</span>
            <span class="timestamp">- {{ formatDateTime(comment.createdAt) }}</span>
            <br>
            <span> {{ comment.content }}</span>
          </p>
        </div>
      </el-card>
      <br>
      <el-form @submit.prevent="addComment">
        <el-form-item label="@" label-width="80px">
          <el-autocomplete
              v-model="newComment.toUserName"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="你的发言"  label-width="80px">
          <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="newComment.content"
              rows="4">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addComment">提交</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import dayjs from 'dayjs';
import authService from "../utils/authService.js";
import commentApi from "../utils/commentApi.js";

export default {
  name: 'CommentsSection',
  props: {
    taskId: {
      type: Number,
      default: 0
    }
  },
  watch: {
    taskId(newVal) {
      if (newVal) {
        this.loadComments();
      }
    }
  },
  data() {
    return {
      newComment: {
        toUserId: '',
        toUserName: '',
        content: ''
      },
      comments: []
    };
  },
  methods: {
    addComment() {
      const data = {...this.newComment}
      this.newComment = {}
      commentApi.addComment(data, this.taskId).then(res => {
        this.loadComments()
      });

      // if (this.newComment.trim()) {
      //   this.comments.push({
      //     content: this.newComment,
      //     createdAt: new Date().toISOString()
      //   });
      //   this.newComment = '';
      // }
    },
    formatDateTime(dateTime) {
      return dayjs(dateTime).format('YYYY-MM-DD HH:mm:ss');
    },
    querySearch(queryString, cb) {
      const results = this.users
          .filter(user => user.name.toLowerCase().includes(queryString.toLowerCase()))
          .map(user => ({ value: user.name, userId: user.id }));
      cb(results);
    },
    handleSelect(item) {
      this.newComment.toUserId = item.userId;
      this.newComment.toUserName = item.value;
    },
    loadComments() {
      commentApi.getComments(this.taskId).then(res => {
        this.comments = res.data.data;
      })
    }
  },
  mounted() {
    authService.getUsers().then(res => {
      this.users = res.data.data;
    })
    console.log(this.taskId)
  }
};
</script>

<style scoped>
.author {
  font-weight: bold;
}

.mention {
  color: #42b983;
}

.timestamp {
  margin-left: 10px;
  font-size: 0.8em;
  color: #999;
}

.comment {
  margin-bottom: 10px;
}
</style>
