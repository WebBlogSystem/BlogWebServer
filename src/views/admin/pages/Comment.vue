<template>
  <div class="comment">
    <div class="top">
      <span>({{comment.createtime}})</span>
      <span class="mr10 ml10 fc">{{user.username}}</span>
      <span>评论了:</span>
      <div class="rightAlign ml10">
          <Dropdown>
            <Button type="dashed">评论操作</Button>
            <DropdownMenu slot="list">
              <DropdownItem @click.native="showCommentDetail = !0">查看评论</DropdownItem>
              <DropdownItem @click.native="commentCheck(comment.id, 1)">审核通过</DropdownItem>
              <DropdownItem @click.native="commentCheck(comment.id, -1)">审核失败</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
    </div>
    <div class="bottom">
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
import { mapState } from "vuex"
export default {
  computed: {
    ...mapState({
      adminInfo: state => state.admin.adminInfo
    })
  },
  data () {
    return {
      showCommentDetail: !1,
      user: {},
      failMsg: ""
    }
  },
  props: ["comment", "currentPage"],
  watch: {
    comment (newVal, oldVal) {
      this.comment = newVal
      this.getUser(this.comment.userId)
      this.showCommentDetail = !1
      this.failMsg = ""
    },
    currentPage (newVal) {
      this.currentPage = newVal
    }
  },
  created () {
    this.getUser(this.comment.userId)
  },
  methods: {
    getUser (userId) {
      var userParam = {
        userId,
        success: (res) => {
          this.user = res
        }
      }
      this.$store.dispatch("user/getUserByUserId", userParam)
    },
    commentCheck (commentId, flag) {
      if (!this.adminInfo.id) {
        this.$router.push("/")
      } else {
        var _this = this
        if (flag === 1) {
          _this.$Modal.confirm({
            title: "当前评论内容 :" + _this.comment.msg,
            content: "你确定将当前评论设定为审核通过吗",
            onOk: () => {
              var commentParam = {
                commentId,
                flag,
                success: () => {
                  _this.$emit("flushComment", _this.currentPage)
                },
                fail: () => {
                  _this.$router.go(0)
                }
              }
              this.$store.dispatch("admin/setCommentFlag", commentParam)
            }
          })
        } else if (flag === -1) {
          this.$Modal.confirm({
            render: (h) => {
              return h('i-input', {
                props: {
                  value: this.failMsg,
                  autofocus: true,
                  placeholder: "请输入详细审核失败描述"
                },
                on: {
                  input: (val) => {
                    this.failMsg = val
                  }
                }
              })
            },
            onCancel: () => {
              this.failMsg = ""
            },
            onOk: () => {
              var _this = this
              var commentParam = {
                commentId,
                flag,
                checkmsg: this.failMsg,
                success: () => {
                  _this.$emit("flushComment", _this.currentPage)
                },
                fail: () => {
                  _this.$router.go(0)
                }
              }
              this.$store.dispatch("admin/setCommentFlag", commentParam)
            }
          })
        }
      }
    },
    cancelDetail () {
      this.failMsg = ""
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
.ml10{
  margin-left: 10px;
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
