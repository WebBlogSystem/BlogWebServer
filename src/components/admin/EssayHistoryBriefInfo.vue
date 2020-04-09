<template>
  <div id="essayBriefInfo">
    <div class="essayItem">
      <div class="line header">
        <div class="title mgr20" @click="showEssayDetail = !0;getCatesOfEssay(essay.id)">
          {{essay.title}}(发表时间:{{essay.createtime}})
        </div>
        <div class="date mgr20">
          {{essay.createtime}}
        </div>
        <div class="rightAlign">
          <div v-if="history.flag === 1">审核通过[审核时间:{{history.createtime}}]</div>
          <div v-else-if="history.flag === -1">审核失败(原因:{{history.checkmsg}})[审核时间:{{history.createtime}}]</div>
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
          <div>
            <editor v-model="content"></editor>
          </div>
        </Modal>
      </div>
    </div>
  </div>
</template>
<script>
import editor from "@/views/admin/pages/Editor"
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
  components: {
    editor
  },
  props: ['essay', "currentPage", "history"],
  watch: {
    "essay" (newVal, oldVal) {
      this.essay = newVal
      this.getCatesOfEssay(this.essay.id)
      this.content.txt = this.essay.msg
      this.content.html = this.essay.htmlmsg
    },
    "currentPage" (newVal, oldVal) {
      this.currentPage = newVal
    },
    "history" (newVal, oldVal) {
      this.history = newVal
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
