<template>
  <div class="mt20 ml20 width100">
    <div v-if="!isEmptyList">
      <div v-for="(item, index) in commentList" :key="index">
        <comment :comment="item" :currentPage="currentPage" @flushComment="flushComment"></comment>
        <Divider v-if="index !== commentList.length - 1"/>
      </div>
      <Page v-if="totalPage > 1" :current="currentPage" :total="totalCount" @on-change="getNextPage" simple />
    </div>
    <div v-else>
      当前无新评论需要审核
    </div>
  </div>
</template>
<script>
import comment from "@/views/admin/pages/Comment"
import { mapState } from "vuex"
export default {
  components: {
    comment
  },
  data () {
    return {
      commentList: [],
      currentPage: 1,
      totalPage: 1,
      totalCount: 0,
      isEmptyList: !1
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
  },
  methods: {
    getComments (pageIndex) {
      if (!this.adminInfo.id) {
        this.$router.push("/")
      } else {
        var _this = this
        var commentParam = {
          page: pageIndex,
          flag: 0,
          success: (commentList) => {
            if (commentList.list.length < 1) {
              _this.isEmptyList = !0
            } else {
              _this.currentPage = commentList.currentPage
              _this.commentList = commentList.list
              _this.totalCount = commentList.totalCount
              _this.totalPage = commentList.totalPage
              _this.isEmptyList = !1
            }
          },
          fail: () => {
            _this.$router.push("/")
          }
        }
        this.$store.dispatch("comment/getCommentWithoutCheck", commentParam)
      }
    },
    getNextPage (pageIndex) {
      if (pageIndex <= this.totalPage) {
        this.getComments(pageIndex)
      }
    },
    flushComment (pageIndex) {
      if (this.commentList.length === 1) {
        if (pageIndex > 1) {
          this.getComments(pageIndex - 1)
        } else {
          this.commentList = []
          this.isEmptyList = !0
        }
      } else {
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
