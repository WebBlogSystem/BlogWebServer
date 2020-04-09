<template>
    <div class="search">
        <div class="searchWrap">
            <i-input v-model="txt" enter-button placeholder="默认搜索文章标题">
                <Select v-model="key" slot="prepend" style="width: 80px">
                    <Option value="0">全部</Option>
                    <Option value="1">标题</Option>
                    <Option value="2">作者</Option>
                    <Option value="3">评论</Option>
                    <Option value="4">回复</Option>
                    <Option value="5">标签</Option>
                </Select>
                <Button slot="append" icon="ios-search"></Button>
            </i-input>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      key: '0',
      txt: ''
    }
  }
}
</script>
<style>
.searchWrap .ivu-select,
.searchWrap .ivu-select-arrow,
.searchWrap .ivu-select-single .ivu-select-selection .ivu-select-placeholder{
    color:#fff;
}
</style>
<style scoped>
.searchWrap .ivu-select,
.searchWrap .ivu-select-single .ivu-select-selection .ivu-select-placeholder{
    background-color: #2d8cf0;
}
</style>
