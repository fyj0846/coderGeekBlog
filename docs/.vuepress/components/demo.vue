<template>
  <div class="demo">
    {{ msg }}
    <my-hello></my-hello>
    <el-button>button</el-button>   // 使用了el-button
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello VuePress!'
    }
  }
}
</script>