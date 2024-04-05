<template>
  <el-container>
    <el-main>
      <!-- 展示评论的卡片 -->
      <el-card style="height: 50vh; overflow-y: auto;">
        <div
            class="comment"
            v-for="(comment, index) in comments"
            :key="index"
        >
          <!-- 显示评论内容，包括评论者、被@的用户和时间 -->
          <p>
            <span class="author">{{ comment.name }}</span>
            <span v-if="comment.toUserId" class="mention"> @{{ comment.toUserName }}</span>
            <span>: {{ comment.content }}</span>
            <span class="timestamp">- {{ formatDateTime(comment.createdAt) }}</span>
          </p>
        </div>
      </el-card>
      <br>
      <!-- 提交评论的表单 -->
      <el-form @submit.prevent="addComment">
        <el-form-item label="你的发言">
          <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="newComment"
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

export default {
  name: 'CommentsSection',
  data() {
    return {
      newComment: '',
      comments: [
        {
          id: 1,
          userId: 1,
          name: "王大雷",
          content: "能不能赶快！",
          toUserId: 2,
          toUserName: "章士博",
          createdAt: new Date().toISOString()
        },
      ]
    };
  },
  methods: {
    addComment() {
      if (this.newComment.trim()) {
        this.comments.push({
          content: this.newComment,
          createdAt: new Date().toISOString()
        });
        this.newComment = '';
      }
    },
    formatDateTime(dateTime) {
      return dayjs(dateTime).format('YYYY-MM-DD HH:mm:ss');
    }
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
