<template>
  <div class="mt20 ml20">
    <div class="searchWrap">
      <i-input v-model="searchCommentsMsg" class="noWidth" icon="md-search" enter-button placeholder="输入内容搜索评论" @on-enter="searchComments" @on-click="searchComments" />
    </div>
    <div v-if="!isEmptyList">
      <div v-for="(item, index) in commentHistoryList" :key="index">
        <comment :comment="item.comment" :history="item.history" :currentPage="currentPage" @flushComment="flushComment"></comment>
        <Divider v-if="index !== commentHistoryList.length - 1"/>
      </div>
      <Page v-if="totalPage > 1" :current="currentPage" :total="totalCount" @on-change="getNextPage" simple />
    </div>
    <div v-else>
      当前无新评论需要审核
    </div>
  </div>
</template>
<script>
import comment from "@/views/admin/pages/CommentHistory"
import { mapState } from "vuex"
export default {
  components: {
    comment
  },
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
      isEmptyList: !1,
      searchCommentsMsg: ""
    }
  },
  created () {
    this.$store.commit("admin/setLeftCurrent", "3-2")
    this.getCommentHistorys(this.currentPage)
  },
  methods: {
    searchComments () {
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
            if (commentHistoryList.list.length < 1) {
              _this.isEmptyList = !0
            } else {
              _this.currentPage = commentHistoryList.currentPage
              _this.commentHistoryList = commentHistoryList.list
              _this.totalCount = commentHistoryList.totalCount
              _this.totalPage = commentHistoryList.totalPage
              _this.isEmptyList = !1
            }
          },
          fail: () => {
            _this.$router.push("/")
          }
        }
        this.$store.dispatch("comment/getCommentHistorys", commentParam)
      }
    },
    getNextPage (pageIndex) {
      if (pageIndex <= this.totalPage) {
        this.getCommentHistorys(pageIndex)
      }
    },
    flushComment (pageIndex) {
      if (this.commentHistoryList.length === 1) {
        if (pageIndex > 1) {
          this.getCommentHistorys(pageIndex - 1)
        } else {
          this.commentHistoryList = []
          this.isEmptyList = !0
        }
      } else {
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
</style>
