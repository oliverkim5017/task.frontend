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
          <p>{{ comment }}</p>
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
export default {
  name: 'CommentsSection',
  data() {
    return {
      newComment: '',
      comments: []
    };
  },
  methods: {
    addComment() {
      if (this.newComment.trim()) {
        this.comments.push(this.newComment);
        this.newComment = ''; // 清空输入框
      }
    }
  }
};
</script>

<style scoped>
.comment {
  margin-bottom: 10px;
}
</style>
