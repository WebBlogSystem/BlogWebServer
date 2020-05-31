<template>
  <div>
    <div id="loading" v-if="loading">
      <Loading></Loading>
    </div>
    <div id="contentWrap">
      <router-view></router-view>
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
  },
  created () {
    this.$store.commit("switchLoading", !0)
  }
}
</script>
<style>
body{
  background-image: url("./assets/blue-snow.png");
  height: 100%;
  background-attachment: fixed;
}
.bgImg{
  width: 100%;
  height: 100%;
  background-image: url("./static/No.jpg");
  background-size: cover;
}
</style>
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
  z-index: 1000;
}
#contentWrap{
  margin-top: 20px;
}
</style>
