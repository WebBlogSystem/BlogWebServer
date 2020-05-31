<template>
  <div :class="{essayHistoryList:!0, isWidthShow: !0, mt20: !0, ml20: !0}">
    <div class="searchWrap">
      <i-input v-model="searchTitle" class="noWidth" icon="md-search" enter-button placeholder="输入文章标题搜索文章" @on-enter="searchEssay" @on-click="searchEssay" />
    </div>
    <div :class="{ essayHistoryListWrapper: !0 }" v-if="!isEmptyList">
      <Table border stripe :columns="essayHeader" :data="getEssayHistoryList">
          <template slot-scope="{ row }" slot="title">
              <strong>{{row.title}}</strong>
          </template>
          <template slot-scope="{row,index}" slot="action">
              <Button type="primary" size="large" stype="margin-rightL: 5px" @click="show(row,index)">查看详情</Button>
          </template>
      </Table>
      <Page :current="currentPage" :total="totalCount" @on-change="getNextPage" simple />
      <div v-if="showEssayDetail">
          <Modal v-model="showEssayDetail" :styles="{ top: '5px' }" :width="40" @on-cancel="cancelDetail" @on-ok="cancelDetail">
              <div>
                审核状态: <span>{{currentEssayHistory.essayHistory.flag === 1 ? "审核通过" : "审核不通过"}}</span>
              </div>
              <div>
                  作者: <span>{{currentEssayHistory.user.username}}</span>
              </div>
              <div v-if="content.html">
                  <editor v-model="content"></editor>
              </div>
          </Modal>
      </div>
      <!-- al<div v-for="(item, index) in essayHistoryList" :key="index">
        <Card :bordered="true" class="customCard">
          <div class="item">
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
        </Card>
        <Divider v-if="!(index === (essayHistoryList.length-1))" :dashed="true"/>
      </div>
       <Page v-if="totPage > 1" :current="currentPage" :total="totalCount" @on-change="getNextPage" simple /> -->
    </div>
    <div v-else>
      <img :src="require('@/static/No.jpg')" height="100%" width="100%">
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import editor from "@/components/editor/Editor"
export default {
  data () {
    return {
      essayHistoryList: [],
      currentPage: 1,
      totalCount: 0,
      totalPage: 0,
      isEmptyList: !1,
      searchTitle: "",
      currentEssayHistory: {},
      showEssayDetail: !1,
      essayHeader: [
          {
              title: "文章标题",
              slot: "title"
          },
          {
              title: "审核状态",
              key: "flag"
          },
          {
              title: "审核信息",
              key: "checkmsg"
          },
          {
              title: "文章最后创建或修改的时间",
              key: "essaycreatetime"
          },
          {
              title: "审核时间",
              key: "createtime"
          },
          {
              title: "操作",
              slot: "action"
          }
      ],
      content: {
          txt: "",
          html: "",
          isEditable: false
      }
    }
  },
  components: {
    editor
  },
  computed: {
    ...mapState({
      adminInfo: state => state.admin.adminInfo
    }),
    getEssayHistoryList () {
        return this.essayHistoryList.map(item => item.essayHistory)
    }
  },
  created () {
    this.$store.commit("admin/setLeftCurrent", "3-1")
    this.getEssayHistorys(1)
    this.$store.commit("switchLoading", !1)
  },
  methods: {
    cancelDetail () {
        this.showEssayDetail = !1
        this.content.txt = ""
        this.content.html = ""
        this.currentEssayHistory = {}
    },
    show (essay, index) {
        this.currentEssayHistory = this.essayHistoryList[index]
        this.content.txt = essay.msg
        this.content.html = essay.htmlmsg
        this.showEssayDetail = !0
    },
    searchEssay () {
      this.$store.commit("switchLoading", !0)
      this.getEssayHistorys(1)
    },
    getEssayHistorys (pageIndex) {
        var _this = this
        var essayParam = {
          page: pageIndex,
          search: _this.searchTitle,
          success: (essayHistoryList) => {
            _this.currentPage = essayHistoryList.currentPage
            _this.totalCount = essayHistoryList.totalCount
            _this.totalPage = essayHistoryList.totalPage
            _this.essayHistoryList = essayHistoryList.list
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
        _this.$store.dispatch("essay/getEssayHistorys", essayParam)
    },
    getNextPage (pageIndex) {
      this.$store.commit("switchLoading", !0)
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
  width: 100%;
}
.essayHistoryListWrapper .isPaddingShow {
  padding: 0 50px;
}
.essayHistoryListWrapper .item{
  display: flex;
  margin-top: 20px;
}
.essayHistoryListWrapper .item .left {
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
