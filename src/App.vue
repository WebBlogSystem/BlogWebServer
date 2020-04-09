<template>
  <div>
    <div id="loading" v-if="loading">
      <Loading></Loading>
    </div>
    <div id="contentWrap">
      <router-view></router-view>
    </div>
    <div id="footerWrap">
      我的尾部
    </div>
  </div>
</template>
<script>
import Loading from '@/components/utils/loading'
import { mapState } from "vuex"

export default {
  computed: {
    ...mapState({
      loading: state => state.loading
    })
  },
  components: {
    Loading
  }
}
</script>
<style scoped>
#loading{
  width:100px;
  height:100px;
  margin: auto;
  position: fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
}
#contentWrap{
  width: 960px;
  margin: 0 auto;
  border:1px solid #2d8cf0;
}
#footerWrap{
  height: 100px;
}
#contentWrap,
#footerWrap{
  border: 1px solid #2d8cf0;
  margin-top: 20px;
}
</style>
