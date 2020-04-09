<template>
<div>
  <div id="social">
    <Dropdown trigger="click" placement="top-start">
      <Button type="primary">
        <span>社交</span>
        <Icon type="ios-arrow-down"></Icon>
      </Button>
      <DropdownMenu slot="list">
          <div @click="goPath('1')"><DropdownItem>评论</DropdownItem></div>
          <div @click="goPath('2')"><DropdownItem>回复</DropdownItem></div>
          <div @click="goPath('3')"><DropdownItem>关注</DropdownItem></div>
          <div @click="goPath('4')"><DropdownItem>粉丝</DropdownItem></div>
          <div @click="goPath('5')"><DropdownItem>云信</DropdownItem></div>
      </DropdownMenu>
    </Dropdown>
  </div>
</div>
</template>
<script>
export default {
  methods: {
    goPath (current) {
      console.log('hahaha')
      let path = ''
      switch (current) {
        case '1':
          path = 'comment'
          break
        case '2':
          path = 'reply'
          break
        case '3':
          path = 'attention'
          break
        case '4':
          path = 'fan'
          break
        case '5':
          path = 'letter'
          break
        default:
          path = 'comment'
      }
      if (this.$route.path !== `/social/${path}`) {
        this.$store.commit('social/setLeftCurrent', current)
        this.$router.push(`/social/${path}`)
      }
    }
  }
}
</script>
<style scoped>
#social .ivu-dropdown-menu,
#social .ivu-dropdown-menu a{
  text-align: center
}
</style>
