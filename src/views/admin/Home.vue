<template>
  <div class="home">
    <div>
      <adminLeft></adminLeft>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
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
