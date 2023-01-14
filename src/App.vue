<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { ref } from 'vue'

let locale = ref(zhCn)
</script>

<template>
  <el-config-provider :locale="locale">
    <RouterView></RouterView>
  </el-config-provider>

</template>

<style scoped>

</style>
