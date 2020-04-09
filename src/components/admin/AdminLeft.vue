<template>
  <div class="adminLeft">
    <div class="fontCenter mt20 mb20">
      <Avatar :src="imgSrc" size="large" />
      <div>
        <span>{{adminInfo.username}}</span>
      </div>
    </div>
    <div>
      <Menu :open-names="['1','2', '3']" :active-name="leftCurrent">
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-paper" />
            审核管理
          </template>
          <MenuItem name="1-1" @click.native="goOtherPage('1-1')">文章审核</MenuItem>
          <MenuItem name="1-2" @click.native="goOtherPage('1-2')">评论审核</MenuItem>
        </Submenu>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-paper" />
            审核记录
          </template>
          <MenuItem name="3-1" @click.native="goOtherPage('3-1')">文章审核记录</MenuItem>
          <MenuItem name="3-2" @click.native="goOtherPage('3-2')">评论审核记录</MenuItem>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-people" />
            账号管理
          </template>
          <MenuItem name="2-1" @click.native="goOtherPage('2-1')">修改密码</MenuItem>
        </Submenu>
      </Menu>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
export default {
  computed: {
    ...mapState({
      adminInfo: state => state.admin.adminInfo,
      leftCurrent: state => state.admin.leftCurrent
    })
  },
  data () {
    return {
      imgSrc: process.env.VUE_APP_domain + "/images/admin.jpg",
      socket: "",
      path: process.env.VUE_APP_WS + "/adminLoginCheck?adminid=" + this.$store.state.admin.adminInfo.id
    }
  },
  created () {
    if (this.adminInfo.id) {
      this.initWebSocket()
    }
  },
  methods: {
    goOtherPage (pageIndex) {
      if (pageIndex === "1-1") {
        this.$router.push("/home/essay")
      } else if (pageIndex === "1-2") {
        this.$router.push("/home/comment")
      } else if (pageIndex === "2-1") {
        this.$router.push("/home/setpassword")
      } else if (pageIndex === "3-1") {
        this.$router.push("/home/essayhistory")
      } else if (pageIndex === "3-2") {
        this.$router.push("/home/commenthistory")
      }
    },
    initWebSocket () {
      if (typeof (WebSocket) === "undefined") {
        this.$Notice.info({
          title: "浏览器版本过低",
          desc: "当前浏览器不支持WebSocket,请更换支持WebSocket的浏览器"
        })
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.path)
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        this.socket.onclose = this.close
        // 监听socket消息
        this.socket.onmessage = this.getMessage
      }
    },
    close () {
    },
    open () {
    },
    error () {
    },
    getMessage (msg) {
      var _this = this
      var loginCheck = JSON.parse(msg.data)
      if (!loginCheck.islogin) {
        this.$Notice.warning({
          title: "登录异常",
          desc: loginCheck.info,
          duration: 2,
          onClose: () => {
            _this.$store.commit("admin/setAdminInfo", {})
            _this.$router.push("/")
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.fontCenter{
  text-align: center;
}
.mt20{
  margin-top: 20px;
}
.mb20{
  margin-bottom: 20px;
}
</style>
