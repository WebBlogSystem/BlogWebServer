<template>
    <div>
        <div ref="editor" style="text-align:left"></div>
        <button>查看内容</button>
    </div>
</template>

<script>
import E from 'wangeditor'

export default {
  name: 'editor',
  model: {
    prop: 'content',
    event: 'dingjinfeng'
  },
  props: {
    content: String
  },
  mounted () {
    var editor = new E(this.$refs.editor)
    editor.customConfig.zIndex = 100
    // 自定义菜单配置
    editor.customConfig.menus = [
      // 标题
      'head',
      // 粗体
      'bold',
      // 字号
      'fontSize',
      // 字体
      'fontName',
      // 斜体
      'italic',
      // 下划线
      'underline',
      // 删除线
      'strikeThrough',
      // 文字颜色
      'foreColor',
      // 背景颜色
      'backColor',
      // 插入链接
      'link',
      // 列表
      'list',
      // 对齐方式
      'justify',
      // 引用
      'quote',
      // 表情
      'emoticon',
      // 插入图片
      'image',
      // 表格
      'table',
      // 插入视频
      // 'video',
      // 插入代码
      'code',
      // 撤销
      'undo',
      // 重复
      'redo'
    ]
    editor.customConfig.onchange = () => {
      var txt = editor.txt.text()
      var html = editor.txt.html()
      this.$emit("dingjinfeng", { txt, html })
    }
    editor.create()
  }
}
</script>

<style scoped>
</style>
