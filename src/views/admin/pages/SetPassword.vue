<template>
  <div class="fixPwdWrapper">
    <div class="fixPwd mt20">
        <Form ref="formSetPwd" :model="formSetPwd" :rules="ruleSetPwd" style="width:400px">
            <FormItem label="原密码" prop="oldPassword">
                <i-input type="password" v-model="formSetPwd.oldPassword" placeholder="请输入原密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </i-input>
            </FormItem>
            <FormItem label="新密码" prop="newPassword">
                <i-input type="password" v-model="formSetPwd.newPassword" placeholder="请输入新密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </i-input>
            </FormItem>
            <FormItem>
                <Button class="mr20" type="primary" @click="setPwdSubmit('formSetPwd')">修改</Button>
                <Button class="ml20" @click="setPwdReset('formSetPwd')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
export default {
  created () {
    this.$store.commit("admin/setLeftCurrent", "2-1")
  },
  data () {
    return {
      formSetPwd: {
        oldPassword: '',
        newPassword: ''
      },
      ruleSetPwd: {
        oldPassword: [
          { required: true, message: '原密码不能为空', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '新密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      adminInfo: state => state.admin.adminInfo
    })
  },
  methods: {
    setPwdSubmit (name) {
      if (!this.adminInfo.id) {
        this.$router.push("/")
      } else {
        var _this = this
        _this.$refs[name].validate((valid) => {
          var adminParam = {
            adminId: _this.adminInfo.id,
            oldPassword: _this.formSetPwd.oldPassword,
            newPassword: _this.formSetPwd.newPassword,
            success: () => {
              _this.$Message.success("修改成功")
              _this.$router.go(0)
            },
            fail: () => {
              _this.$router.go(0)
            }
          }
          if (valid) {
            this.$store.dispatch("admin/setPassword", adminParam)
          } else {
            _this.$Message.error('Fail!')
          }
        })
      }
    },
    setPwdReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
<style scoped>
.fixPwdWrapper, .fixPwd{
    display: flex;
    justify-content: center;
    text-align: center;
}
.mr20{
  margin-right: 40px;
}
.ml20{
  margin-left: 40px;
}
.mt20{
  margin-top: 40px;
}
</style>
