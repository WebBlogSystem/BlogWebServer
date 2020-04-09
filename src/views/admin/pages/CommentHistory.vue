<template>
  <div class="comment">
    <div class="top">
      <span>({{comment.createtime}})</span>
      <span class="mr10 ml10 fc">{{user.username}}</span>
      <span>评论了:</span>
      <div class="rightAlign ml20">
          <div v-if="history.flag === 1">审核通过[审核时间:{{history.createtime}}]</div>
          <div v-else-if="history.flag === -1">审核失败(原因:{{history.checkmsg}})[审核时间:{{history.createtime}}]</div>
      </div>
    </div>
    <div class="bottom" @click="showCommentDetail = !0">
      <span>{{comment.msg}}</span>
    </div>
    <div>
      <Modal v-model="showCommentDetail" :styles="{ top: '5px' }" :width="40" @on-cancel="cancelDetail" @on-ok="cancelDetail">
        <div>{{comment.msg}}</div>
      </Modal>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showCommentDetail: !1,
      user: {},
      failMsg: ""
    }
  },
  props: ["comment", "currentPage", "history"],
  watch: {
    comment (newVal, oldVal) {
      this.comment = newVal
      this.getUser(this.comment.userId)
      this.showCommentDetail = !1
      this.failMsg = ""
    },
    currentPage (newVal) {
      this.currentPage = newVal
    },
    history (newVal) {
      this.history = newVal
    }
  },
  created () {
    this.getUser(this.comment.userId)
  },
  methods: {
    getUser (userId) {
      var userParams = {
        userId,
        success: (res) => {
          this.user = res
        }
      }
      this.$store.dispatch("user/getUserByUserId", userParams)
    },
    cancelDetail () {
      this.failMsg = ""
      this.showCommentDetail = !1
    }
  }
}
</script>
<style scoped>
.comment .top .showOrHide{
  display: inline-block;
}
.mr10{
  margin-right: 10px;
}
.ml20{
  margin-left: 20px;
}
.mt10{
  margin-top: 10px;
}
.mb10{
  margin-bottom: 10px;
}
.fc{
  text-decoration: underline;
}
.rightAlign{
  display: inline-block;
}
</style>
