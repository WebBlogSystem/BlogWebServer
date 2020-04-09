<template>
  <div :class="{essayHistoryList:!0, isWidthShow: !0, mt20: !0, ml20: !0}">
    <div class="searchWrap">
      <i-input v-model="searchTitle" class="noWidth" icon="md-search" enter-button placeholder="输入文章标题搜索文章" @on-enter="searchEssay" @on-click="searchEssay" />
    </div>
    <div :class="{ essayHistoryListWrapper: !0 }" v-if="!isEmptyList">
      <div v-for="(item, index) in essayHistoryList" :key="index">
        <div :class="{item: !0}">
          <div class="left">
            <div>
              <avatar :imgId="item.user.imgid"/>
            </div>
            <div>{{ item.user.username }}</div>
          </div>
          <div class="right">
            <essayHistoryBriefInfo :essay="item.essay" :history="item.history" :currentPage = "currentPage" @flushEssay = "flushEssay"></essayHistoryBriefInfo>
          </div>
        </div>
        <Divider v-if="!(index === (essayHistoryList.length-1))" :dashed="true"/>
      </div>
       <Page v-if="totalPage > 1" :current="currentPage" :total="totalCount" @on-change="getNextPage" simple />
    </div>
    <div v-else>
      无文章审核历史记录
    </div>
  </div>
</template>
<script>
import avatar from "@/components/utils/Avatar"
import { mapState } from "vuex"
import essayHistoryBriefInfo from "@/components/admin/EssayHistoryBriefInfo"
export default {
  data () {
    return {
      essayHistoryList: [],
      currentPage: 1,
      totalCount: 0,
      totalPage: 0,
      isEmptyList: !1,
      searchTitle: ""
    }
  },
  computed: {
    ...mapState({
      adminInfo: state => state.admin.adminInfo
    })
  },
  components: {
    avatar,
    essayHistoryBriefInfo
  },
  created () {
    this.$store.commit("admin/setLeftCurrent", "3-1")
    this.getEssayHistorys(1)
  },
  methods: {
    searchEssay () {
      console.log(this.searchTitle)
      this.getEssayHistorys(1)
    },
    flushEssay (pageIndex) {
      if (this.essayHistoryList.length === 1) {
        if (pageIndex > 1) {
          this.getEssayHistorys(pageIndex - 1)
        } else {
          this.essayHistoryList = []
          this.isEmptyList = !0
        }
      } else {
        this.getEssayHistorys(pageIndex)
      }
    },
    getEssayHistorys (pageIndex) {
      if (!this.adminInfo.id) {
        this.$router.push("/")
      } else {
        var _this = this
        var essayParam = {
          page: pageIndex,
          search: _this.searchTitle,
          success: (essayHistoryList) => {
            if (essayHistoryList.list.length === 0) {
              _this.isEmptyList = !0
            } else {
              _this.currentPage = essayHistoryList.currentPage
              _this.totalCount = essayHistoryList.totalCount
              _this.totalPage = essayHistoryList.totalPage
              _this.essayHistoryList = essayHistoryList.list
              _this.isEmptyList = !1
            }
          },
          fail: () => {
            _this.$router.push("/")
          }
        }
        _this.$store.dispatch("essay/getEssayHistorys", essayParam)
      }
    },
    getNextPage (pageIndex) {
      if (pageIndex <= this.totalPage) {
        this.getEssayHistorys(pageIndex)
      }
    }
  }
}
</script>
<style scoped>
.noWidth{
  width: auto !important;
}
.essayHistoryList {
  margin: 0 auto;
}
.isWidthShow {
  width: 960px;
}
.essayHistoryListWrapper .isPaddingShow {
  padding: 0 50px;
}
.essayHistoryListWrapper .item{
  display: flex;
  align-items: left;
  margin-top: 20px;
}
.essayHistoryListWrapper .item .left {
  margin-right: 50px;
  flex-shrink: 0;
  flex-grow: 0;
  width: 50px;
}
.essayHistoryListWrapper .item .right {
  max-width: 92%;
  flex-shrink: 1;
  flex-grow: 1;
}
.mt20{
  margin-top: 20px;
}
.ml20{
  margin-left: 20px;
}
</style>
