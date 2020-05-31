<template>
  <div class="mt20 ml20 widthShow">
    <div class="searchWrap">
      <i-input v-model="searchCommentsMsg" class="noWidth" icon="md-search" enter-button placeholder="输入内容搜索评论" @on-enter="searchComments" @on-click="searchComments" />
    </div>
    <Table border stripe :columns="commentHeader" :data="commentHistoryList">
        <template slot-scope="{ row }" slot="username">
            <strong>{{row.user.username}}</strong>
        </template>
        <template slot-scope="{ row }" slot="msg">
            <strong>{{row.commentHistory.msg}}</strong>
        </template>
        <template slot-scope="{ row }" slot="flag">
            <strong>{{row.commentHistory.flag}}</strong>
        </template>
        <template slot-scope="{ row }" slot="checkmsg">
            <strong>{{row.commentHistory.checkmsg}}</strong>
        </template>
        <template slot-scope="{ row }" slot="commentcreatetime">
            <strong>{{row.commentHistory.commentcreatetime}}</strong>
        </template>
        <template slot-scope="{ row }" slot="createtime">
            <strong>{{row.commentHistory.createtime}}</strong>
        </template>
        <template slot-scope="{row,index}" slot="action">
            <Button type="primary" size="large" stype="margin-rightL: 5px" @click="show(row,index)">查看详情</Button>
        </template>
    </Table>
    <Page :current="currentPage" :total="totalCount" @on-change="getNextPage" simple />
      <!-- <div v-for="(item, index) in commentHistoryList" :key="index">
        <Card :bordered="true" class="customCard item mt20">
          <comment :comment="item.comment" :history="item.history" :currentPage="currentPage" @flushComment="flushComment"></comment>
        </Card>
        <Divider v-if="index !== commentHistoryList.length - 1"/>
      </div> -->
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
      commentHistoryList: [],
      currentPage: 1,
      totalPage: 1,
      totalCount: 0,
      currentCommenthistory: {},
      searchCommentsMsg: "",
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
              title: "审核信息",
              slot: "checkmsg"
          },
          {
              title: "评论时间",
              slot: "commentcreatetime"
          },
          {
              title: "审核时间",
              slot: "createtime"
          },
          {
              title: "操作",
              slot: "action"
          }
      ]
    }
  },
  created () {
    this.$store.commit("admin/setLeftCurrent", "3-2")
    this.getCommentHistorys(this.currentPage)
    this.$store.commit("switchLoading", !1)
  },
  methods: {
    show (commentHistory, index) {
        var content = '审核状态: ' + commentHistory.commentHistory.flag + '<br>用户名: ' + commentHistory.user.username + "<br> 评论内容: " + commentHistory.commentHistory.msg
        this.$Modal.info({
            title: "评论详情",
            content
        })
    },
    searchComments () {
      this.$store.commit("switchLoading", !0)
      this.getCommentHistorys(1)
    },
    getCommentHistorys (pageIndex) {
      if (!this.adminInfo.id) {
        this.$router.push("/")
      } else {
        var _this = this
        var commentParam = {
          page: pageIndex,
          search: _this.searchCommentsMsg,
          success: (commentHistoryList) => {
            _this.currentPage = commentHistoryList.currentPage
            _this.commentHistoryList = commentHistoryList.list
            _this.totalCount = commentHistoryList.totalCount
            _this.totalPage = commentHistoryList.totalPage
            _this.$store.commit("switchLoading", !1)
          },
          fail: () => {
            _this.$router.push("/")
          },
          actionError: (info) => {
            _this.$store.commit("switchLoading", !1)
            _this.$Message.error(info)
          }
        }
        this.$store.dispatch("comment/getCommentHistorys", commentParam)
      }
    },
    getNextPage (pageIndex) {
      if (pageIndex <= this.totalPage) {
        this.$store.commit("switchLoading", !0)
        this.getCommentHistorys(pageIndex)
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
.noWidth{
  width: auto !important;
}
.widthShow{
  width: 100%;
}
</style>
