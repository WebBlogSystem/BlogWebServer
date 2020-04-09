<template>
  <div class="adminLogin">
    <div>
      <div class="top">
        <span>MyBlog后台管理系统</span>
      </div>
      <div>
        <Form class="formLogin" ref="formInline" :model="formInline" :rules="ruleInline">
          <FormItem prop="user">
            <i-input type="text" v-model="formInline.user" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </i-input>
          </FormItem>
          <FormItem prop="password">
            <i-input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </i-input>
          </FormItem>
          <FormItem class="loginBtnWrapper">
            <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          { required: true, message: '请输入管理员账户', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      var _this = this
      this.$refs[name].validate((valid) => {
        if (valid) {
          var adminParam = {
            username: _this.formInline.user,
            password: _this.formInline.password,
            success: (admin) => {
              _this.$store.commit("admin/setAdminInfo", admin)
              _this.$router.push("/home")
            }
          }
          _this.$store.dispatch("admin/adminLogin", adminParam)
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>
<style scoped>
.adminLogin{
  display: flex;
  justify-content: center;

}
.loginBtnWrapper{
  text-align: center;
}
.formLogin{
  margin-top: 20px;
}
.top{
  text-align: center;
  font-size: 34px;
  color: #2d8cf0;
}
</style>
