<template>
  <div class="header">
    <!-- 左侧菜单区域 -->
    <div class="l-content">
      <el-button size="small" @click="handleMenu()"><el-icon>
          <Menu />
        </el-icon></el-button>
      <my-tag></my-tag>
    </div>
    <!-- 右侧头像区域 -->
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="user-picture" :src="imgUrl" alt="">
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

  </div>
</template>

<script setup>
import MyTag from './CommonTags.vue'
import { useStore } from 'vuex'
const store = new useStore()
// 动态引入图片
const imgUrl = new URL('../assets/images/user-default.png', import.meta.url).href

// 折叠菜单方法
const handleMenu = () => {
  store.commit('COLLAPSE_MENU')
}

</script>

<style lang="less" scoped>
.header {
  height: 60px;
  background-color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  .r-content {


    .user-picture {
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
  }
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>