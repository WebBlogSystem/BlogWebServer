<template>
  <div id="essayBriefInfo">
    <div class="essayItem">
      <div class="line header">
        <div class="title mgr20">
          {{essay.title}}
        </div>
        <div class="date mgr20">
          {{essay.createtime}}
        </div>
        <div class="mr10 ml10">
          <div v-if="essay.flag === 0">未审核</div>
          <div v-if="essay.flag === 1 || essay.flag === -1">已审核</div>
        </div>
        <div class="rightAlign">
          <Dropdown>
            <Button type="dashed">文章操作</Button>
            <DropdownMenu slot="list">
              <DropdownItem @click.native="showEssayDetail = !0;getCatesOfEssay(essay.id)">查看文章</DropdownItem>
              <DropdownItem @click.native="essayCheck(essay.id, 1)">审核通过</DropdownItem>
              <DropdownItem @click.native="essayCheck(essay.id, -1)">审核失败</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div class="line content">
        {{essay.msg}}
      </div>
      <div>
        <Modal v-model="showEssayDetail" :styles="{ top: '5px' }" :width="40" @on-cancel="cancelDetail" @on-ok="cancelDetail">
          <div>
            <span class="mr10">标签:</span><Tag color="#57a3f3" class="mr10" v-for="(cate, index) in cateListOfEssay" :key="index" type="border">{{cate.name}}</Tag>
          </div>
          <div v-if="content.html">
            <editor v-model="content"></editor>
          </div>
        </Modal>
      </div>
    </div>
  </div>
</template>
<script>
import editor from "@/views/admin/pages/Editor"
import { mapState } from "vuex"
export default {
  data () {
    return {
      showEssayDetail: !1,
      cateListOfEssay: [],
      content: {
        txt: "",
        html: "",
        isEditable: false
      },
      failMsg: ""
    }
  },
  computed: {
    ...mapState({
      adminInfo: state => state.admin.adminInfo
    })
  },
  components: {
    editor
  },
  props: ['essay', "currentPage"],
  watch: {
    "essay" (newVal, oldVal) {
      this.essay = newVal
      this.getCatesOfEssay(this.essay.id)
      this.content.txt = this.essay.msg
      this.content.html = this.essay.htmlmsg
    },
    "currentPage" (newVal, oldVal) {
      this.currentPage = newVal
    }
  },
  created () {
    this.content.txt = this.essay.msg
    this.content.html = this.essay.htmlmsg
  },
  methods: {
    cancelDetail () {
      this.cateListOfEssay = []
      this.showEssayDetail = !1
    },
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
    essayCheck (essayId, flag) {
      if (!this.adminInfo.id) {
        this.$router.push("/")
      } else {
        var _this = this
        if (flag === 1) {
          this.$Modal.confirm({
            title: "当前文章 :" + this.essay.title,
            content: "你确定将当前文章设定为审核通过吗",
            onOk: () => {
              var essayParam = {
                essayId,
                flag,
                success: () => {
                  _this.$emit("flushEssay", _this.currentPage)
                },
                fail: () => {
                  _this.$router.go(0)
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
              var _this = this
              var essayParam = {
                essayId,
                flag,
                checkmsg: this.failMsg,
                success: () => {
                  _this.$emit("flushEssay", _this.currentPage)
                },
                fail: () => {
                  _this.$router.go(0)
                }
              }
              this.$store.dispatch("admin/setEssayFlag", essayParam)
            }
          })
        }
      }
    }
  }
}
</script>
<style scoped>
.mgr20{
  margin-right: 20px;
}
.ml10{
  margin-left: 10px;
}
.mr10{
  margin-right: 10px;
}
#essayBriefInfo .rightAlign{
  text-align: right
}
#essayBriefInfo .checkStatus{
  margin-right: 40px;
}
#essayBriefInfo .essayItem{
  height:60px;
}
#essayBriefInfo .line{
  margin-bottom:10px;
}
#essayBriefInfo .line:last-child{
  margin-bottom:10px;
}
#essayBriefInfo .header{
  display: flex;
  align-items: center;
}
#essayBriefInfo .title{
  font-size:20px;
  width: 164px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#essayBriefInfo .content{
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
