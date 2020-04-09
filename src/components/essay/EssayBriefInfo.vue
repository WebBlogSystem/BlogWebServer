<template>
  <div id="essayBriefInfo">
    <div class="item">
      <div class="line header">
        <div class="title mgr20">
          <!-- {{essay.title}} -->
        </div>
        <div class="date mgr20">
          时间:{{essay.createtime}}
        </div>
        <div class="goodnum mgr20">
          点赞数:5
        </div>
        <div v-if="essayListFrom === 1">
          <Button size="small" type="dashed">编辑文章</Button>
          <Button size="small" type="dashed">删除文章</Button>
        </div>
      </div>
      <div class="line content">
        {{essay.msg}}
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['essay'],
  computed: {
    ...mapState({
      // 0 主页文章列表 1其他用户文章列表
      essayListFrom: state => state.essay.essayListFrom
    })
  }
}
</script>
<style scoped>
.mgr20{
  margin-right: 20px;
}
#essayBriefInfo .item{
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
}
#essayBriefInfo .content{
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
