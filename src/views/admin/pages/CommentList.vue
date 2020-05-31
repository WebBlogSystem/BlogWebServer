<template>
  <div class="mt20 ml20 width100">
    <Table border stripe :columns="commentHeader" :data="commentList">
        <template slot-scope="{ row }" slot="username">
            <strong>{{row.user.username}}</strong>
        </template>
        <template slot-scope="{ row }" slot="msg">
            <strong>{{row.comment.msg}}</strong>
        </template>
        <template slot-scope="{ row }" slot="flag">
            <strong>{{row.comment.flag}}</strong>
        </template>
        <template slot-scope="{ row }" slot="checkmsg">
            <strong>{{row.comment.checkmsg}}</strong>
        </template>
        <template slot-scope="{ row }" slot="createtime">
            <strong>{{row.comment.createtime}}</strong>
        </template>
        <template slot-scope="{row,index}" slot="action">
            <Button type="primary" size="large" stype="margin-rightL: 5px" @click="show(row,index)">查看</Button>
            <Button type="success" size="large" stype="margin-rightL: 5px" @click="check(row.comment,index,1)">通过</Button>
            <Button type="error" size="large" stype="margin-rightL: 5px" @click="check(row.comment,index,-1)">不通过</Button>
        </template>
    </Table>
    <Page :current="currentPage" :total="totalCount" @on-change="getNextPage" simple />
    <!-- <div v-if="!isEmptyList">
      <div v-for="(item, index) in commentList" :key="index">
        <Card :bordered="true" class="customCard">
          <comment :comment="item" :currentPage="currentPage" @flushComment="flushComment"></comment>
        </Card>
        <Divider v-if="index !== commentList.length - 1"/>
      </div>
      <Page v-if="totalPage > 1" :current="currentPage" :total="totalCount" @on-change="getNextPage" simple />
    </div>
    <div v-else>
      <img :src="require('@/static/No.jpg')" height="100%" width="100%">
    </div> -->
  </div>
</template>
<script>
import { mapState } from "vuex"
export default {
  data () {
    return {
      failMsg: "",
      commentList: [],
      currentPage: 1,
      totalPage: 1,
      totalCount: 0,
      currentComment: {},
      commentHeader: [
          {
              title: "用户",
              slot: "username"
          },
          {
              title: "评论内容",
              slot: "msg"
          },
          {
              title: "审核状态",
              slot: "flag"
          },
          {
              title: "评论时间",
              slot: "createtime"
          },
          {
              title: "操作",
              slot: "action"
          }
      ]
    }
  },
  computed: {
    ...mapState({
      adminInfo: state => state.admin.adminInfo
    })
  },
  created () {
    this.$store.commit("admin/setLeftCurrent", "1-2")
    this.getComments(1)
    this.$store.commit("switchLoading", !1)
  },
  methods: {
    show (comment, index) {
        var content = '<br>用户名: ' + comment.user.username + "<br> 评论内容: " + comment.comment.msg
        this.$Modal.info({
            title: "评论详情",
            content
        })
    },
    getCommentsAgain (index) {
      this.commentList.splice(index, 1)
      if (this.commentList.length > 0) {
        this.getComments(this.currentPage)
      } else {
        if (this.currentPage !== 1) {
          this.getComments(this.currentPage - 1)
        } else {
          this.$store.commit("switchLoading", !1)
        }
      }
    },
    check (comment, index, flag) {
      if (!this.adminInfo.id) {
        this.$store.commit("switchLoading", !0)
        this.$router.push("/")
      } else {
        var _this = this
        if (flag === 1) {
          _this.$Modal.confirm({
            title: "当前评论内容 :" + comment.msg,
            content: "你确定将当前评论设定为审核通过吗",
            onOk: () => {
              this.$store.commit("switchLoading", !0)
              var commentParam = {
                commentId: comment.id,
                flag,
                success: () => {
                  _this.getCommentsAgain(index)
                },
                fail: () => {
                  _this.$router.go(0)
                },
                actionError: (info) => {
                  _this.$Message.error(info)
                  this.$store.commit("switchLoading", !1)
                }
              }
              _this.$store.dispatch("admin/setCommentFlag", commentParam)
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
              this.$store.commit("switchLoading", !0)
              var _this = this
              var commentParam = {
                commentId: comment.id,
                flag,
                checkmsg: this.failMsg,
                success: () => {
                  _this.getCommentsAgain(index)
                },
                fail: () => {
                  _this.$router.go(0)
                },
                actionError: (info) => {
                  _this.$Message.error(info)
                  this.$store.commit("switchLoading", !1)
                }
              }
              this.$store.dispatch("admin/setCommentFlag", commentParam)
            }
          })
        }
      }
    },
    getComments (pageIndex) {
        var _this = this
        var commentParam = {
          page: pageIndex,
          flag: 0,
          success: (commentList) => {
              _this.currentPage = commentList.currentPage
              _this.commentList = commentList.list
              _this.totalCount = commentList.totalCount
              _this.totalPage = commentList.totalPage
              _this.$store.commit("switchLoading", !1)
          },
          fail: () => {
            _this.$router.push("/")
          },
          actionError: (info) => {
            _this.$Message.error(info)
            _this.$store.commit("switchLoading", !1)
          }
        }
        this.$store.dispatch("comment/getCommentWithoutCheck", commentParam)
    },
    getNextPage (pageIndex) {
      if (pageIndex <= this.totalPage) {
        this.$store.commit("switchLoading", !0)
        this.getComments(pageIndex)
      }
    }
  }
}
</script>
<style scoped>
.mt20{
  margin-top: 20px;
}
.ml20{
  margin-left: 20px;
}
.width100{
  width: 100%;
}
</style>
