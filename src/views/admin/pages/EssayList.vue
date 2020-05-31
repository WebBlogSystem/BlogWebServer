<template>
  <div :class="{essayList:!0, isWidthShow: !0, mt20: !0, ml20: !0}">
    <Table border stripe :columns="essayHeader" :data="getEssayList">
        <template slot-scope="{ row }" slot="title">
            <strong>{{row.title}}</strong>
        </template>
        <template slot-scope="{row,index}" slot="action">
            <Button type="primary" size="large" stype="margin-rightL: 5px" @click="show(row,index)">查看</Button>
            <Button type="success" size="large" stype="margin-rightL: 5px" @click="check(row,index,1)">通过</Button>
            <Button type="error" size="large" stype="margin-rightL: 5px" @click="check(row,index,-1)">不通过</Button>
        </template>
    </Table>
    <Page :current="currentPage" :total="totalCount" @on-change="getNextPage" simple />
    <div v-if="showEssayDetail">
        <Modal v-model="showEssayDetail" :styles="{ top: '5px' }" :width="40" @on-cancel="cancelDetail" @on-ok="cancelDetail">
            <div>
                作者: <span>{{currentEssay.user.username}}</span>
            </div>
            <div>
                <span class="mr10">标签:</span><Tag color="#57a3f3" class="mr10" v-for="(cate, index) in cateListOfEssay" :key="index" type="border">{{cate.name}}</Tag>
            </div>
            <div v-if="content.html">
                <editor v-model="content"></editor>
            </div>
        </Modal>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import editor from "@/components/editor/Editor"
export default {
  components: {
    editor
  },
  created () {
    this.$store.commit("admin/setLeftCurrent", "1-1")
    this.getEssays(1)
    this.$store.commit("switchLoading", !1)
  },
  computed: {
    ...mapState({
      adminInfo: state => state.admin.adminInfo
    }),
    getEssayList () {
        return this.essayList.map(item => item.essay)
    }
  },
  data () {
    return {
      currentPage: 1,
      totalCount: 0,
      totalPage: 1,
      essayList: [],
      currentEssay: {},
      showEssayDetail: !1,
      cateListOfEssay: [],
      failMsg: "",
      essayHeader: [
          {
              title: "文章标题",
              slot: "title"
          },
          {
              title: "拥有标签数量",
              key: "catenums"
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
              title: "最后创建或修改的时间",
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
  methods: {
    getCatesOfEssay (essayId) {
        var _this = this
        var cateParam = {
            essayId,
            success: (cateList) => {
                _this.cateListOfEssay = cateList
            }
        }
        this.$store.dispatch("cate/getCatesByEssay", cateParam)
    },
    cancelDetail () {
        this.cateListOfEssay = []
        this.showEssayDetail = !1
        this.content.txt = ""
        this.content.html = ""
        this.currentEssay = {}
    },
    show (essay, index) {
        this.currentEssay = this.essayList[index]
        this.content.txt = essay.msg
        this.content.html = essay.htmlmsg
        this.showEssayDetail = !0
        this.getCatesOfEssay(essay.id)
    },
    getEssays (pageIndex) {
        var _this = this
        var essayParam = {
          page: pageIndex,
          flag: 0,
          success: (essayList) => {
              _this.currentPage = essayList.currentPage
              _this.totalCount = essayList.totalCount
              _this.totalPage = essayList.totalPage
              _this.essayList = essayList.list
             _this.$store.commit("switchLoading", !1)
          },
          actionError: (info) => {
              _this.$Message.error(info)
              _this.$store.commit("switchLoading", !1)
          },
          fail: () => {
            _this.$router.push("/")
          }
        }
        _this.$store.dispatch("essay/getEssaysWithoutCheck", essayParam)
    },
    getNextPage (pageIndex) {
      this.$store.commit("switchLoading", !0)
      if (pageIndex <= this.totalPage) {
        this.getEssays(pageIndex)
      }
    },
    getEssaysAgain (index) {
      this.essayList.splice(index, 1)
      if (this.essayList.length > 0) {
        this.getEssays(this.currentPage)
      } else {
        if (this.currentPage !== 1) {
          this.getEssays(this.currentPage - 1)
        } else {
          this.$store.commit("switchLoading", !1)
        }
      }
    },
    check (essay, index, flag) {
        var _this = this
        if (flag === 1) {
          this.$Modal.confirm({
            title: "当前文章 :" + essay.title,
            content: "你确定将当前文章设定为审核通过吗",
            onOk: () => {
              this.$store.commit("switchLoading", !0)
              var essayParam = {
                essayId: essay.id,
                flag,
                success: () => {
                  _this.getEssaysAgain(index)
                },
                fail: () => {
                  _this.$router.go(0)
                },
                actionError: (info) => {
                  _this.$Message.error(info)
                  this.$store.commit("switchLoading", !1)
                }
              }
              this.$store.dispatch("admin/setEssayFlag", essayParam)
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
              var essayParam = {
                essayId: essay.id,
                flag,
                checkmsg: this.failMsg,
                success: () => {
                  _this.getEssaysAgain(index)
                },
                fail: () => {
                  _this.$router.go(0)
                },
                actionError: (info) => {
                  _this.$Message.error(info)
                  this.$store.commit("switchLoading", !1)
                }
              }
              this.$store.dispatch("admin/setEssayFlag", essayParam)
            }
          })
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
  width: 100%;
}
.essayListWrapper .isPaddingShow {
  padding: 0 38px;
}
.essayListWrapper .item{
  display: flex;
  align-items: left;
  margin-top: 20px;
}
.essayListWrapper .item .left {
  margin-right: 20px;
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
  margin-left: 10px;
}
</style>
