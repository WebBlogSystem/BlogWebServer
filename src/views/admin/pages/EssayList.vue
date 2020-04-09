<template>
  <div :class="{essayList:!0, isWidthShow: !0, mt20: !0, ml20: !0}">
    <div :class="{ essayListWrapper: !0 }" v-if="!isEmptyList">
      <div v-for="(item, index) in essayList" :key="index">
        <div :class="{item: !0, isPaddingShow: !0}">
          <div class="left">
            <div>
              <avatar :imgId="item.user.imgid"/>
            </div>
            <div>{{ item.user.username }}{{ index }}</div>
          </div>
          <div class="right">
            <essayBriefInfo :essay="item.essay" :currentPage = "currentPage" @flushEssay = "flushEssay"></essayBriefInfo>
          </div>
        </div>
        <Divider v-if="!(index === (essayList.length-1))" :dashed="true"/>
      </div>
       <Page v-if="totalPage > 1" :current="currentPage" :total="totalCount" @on-change="getNextPage" simple />
    </div>
    <div v-else>
      当前无新文章需要审核
    </div>
  </div>
</template>
<script>
import avatar from "@/components/utils/Avatar"
import essayBriefInfo from "@/components/admin/EssayBriefInfo"
import { mapState } from "vuex"
export default {
  components: {
    avatar,
    essayBriefInfo
  },
  created () {
    this.$store.commit("admin/setLeftCurrent", "1-1")
    this.getEssays(1)
  },
  computed: {
    ...mapState({
      adminInfo: state => state.admin.adminInfo
    })
  },
  data () {
    return {
      currentPage: 1,
      totalCount: 1,
      totalPage: 1,
      essayList: [],
      isEmptyList: !1
    }
  },
  methods: {
    flushEssay (pageIndex) {
      if (this.essayList.length === 1) {
        if (pageIndex > 1) {
          this.getEssays(pageIndex - 1)
        } else {
          this.essayList = []
          this.isEmptyList = !0
        }
      } else {
        this.getEssays(pageIndex)
      }
    },
    getEssays (pageIndex) {
      if (!this.adminInfo.id) {
        this.$router.push("/")
      } else {
        var _this = this
        var essayParam = {
          page: pageIndex,
          flag: 0,
          success: (essayList) => {
            if (essayList.list.length === 0) {
              _this.isEmptyList = !0
            } else {
              _this.currentPage = essayList.currentPage
              _this.totalCount = essayList.totalCount
              _this.totalPage = essayList.totalPage
              _this.essayList = essayList.list
              _this.isEmptyList = !1
            }
          },
          fail: () => {
            _this.$router.push("/")
          }
        }
        _this.$store.dispatch("essay/getEssaysWithoutCheck", essayParam)
      }
    },
    getNextPage (pageIndex) {
      if (pageIndex <= this.totalPage) {
        this.getEssays(pageIndex)
      }
    }
  }
}
</script>
<style scoped>
.essayList {
  margin: 0 auto;
}
.isWidthShow {
  width: 960px;
}
.essayListWrapper .isPaddingShow {
  padding: 0 50px;
}
.essayListWrapper .item{
  display: flex;
  align-items: left;
  margin-top: 20px;
}
.essayListWrapper .item .left {
  margin-right: 50px;
  flex-shrink: 0;
  flex-grow: 0;
  width: 50px;
}
.essayListWrapper .item .right {
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
