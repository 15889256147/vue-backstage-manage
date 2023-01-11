<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <my-aside></my-aside>
      </el-aside>
      <el-container>
        <el-header>
          <my-header></my-header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import MyHeader from '../components/CommonHeader.vue'
import MyAside from '../components/CommonAside.vue'
</script>

<style lang="less">
.common-layout {
  height: 100%;

  .el-container {
    height: 100%;

    .el-header {
      padding: 0;
    }
  }
}
</style>