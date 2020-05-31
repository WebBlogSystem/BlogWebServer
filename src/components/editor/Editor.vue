<template>
    <div>
        <div class="essayEditorAuto" ref="editor" style="text-align:left"></div>
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
  data () {
    return {
      uploadAddress: process.env.VUE_APP_API + process.env.VUE_APP_upoadApi
    }
  },
  watch: {
    "content.html" (newValue) {
      this.content.html = newValue
      this.editor.txt.html(newValue)
    }
  },
  props: {
    content: Object
  },
  methods: {
    initEditor () {
      this.editor.txt.text(this.content.txt)
      this.editor.txt.html(this.content.html)
      this.editor.$textElem.attr('contenteditable', !!this.content.isEditable)
    }
  },
  mounted () {
    var editor = new E(this.$refs.editor)
    editor.customConfig.zIndex = 100
    // 自定义菜单配置
    editor.customConfig.menus = []
    editor.customConfig.onchange = () => {
      var txt = editor.txt.text()
      var html = editor.txt.html()
      this.$emit("dingjinfeng", { txt, html, isEditable: this.content.isEditable })
    }
    editor.create()
    this.editor = editor
    this.initEditor()
  }
}
</script>

<style>
.essayEditorAuto .w-e-text-container{
  height: auto !important;
}
.essayEditorAuto .w-e-text{
  overflow-y: auto !important;
}
</style>
