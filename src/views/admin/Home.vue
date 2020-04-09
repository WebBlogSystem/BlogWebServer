<template>
  <div class="home">
    <div>
      <adminLeft></adminLeft>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
   <!-- 待审核（当天24点默认审核通过）
      博文审核
                  博文列表        审核状态  审核中 审核成功 审核失败   描述信息
                  博文链接         -1/0/1

      评论审核
                  评论列表        审核状态
                  评论内容         -1/0/1
   待处理的举报或者投诉（2期） 没有默认投诉通过  只查询投诉中
      用户  列表   投诉理由     操作：失败或者成功   投诉成功后被投诉的内容被直接删除    投诉状态 投诉中 投诉失败  投诉成功
      博文  列表   投诉理由     。。。
      评论  列表   投诉理由     。。。
      回复  列表   投诉理由     。。。

   列表集合 历史记录
    审核操作集合
      博文审核
    投诉操作集合
      用户
      博文
      评论
      回复

   查看
      平台所有用户

   设置
    修改密码 -->
  </div>
</template>
<script>
import adminLeft from "@/components/admin/AdminLeft"
export default {
  components: {
    adminLeft
  }
}
</script>
<style scoped>
.home{
  display: flex;
}
.right{
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
