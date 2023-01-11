<template>
  <!-- 标签 -->
  <el-tag v-for="(tag, index) in tags" :key="tag.path" class="mx-1" :closable="tag.path != '/home'" type="info"
    @close="handleClose(tag, index)" :effect="tag.path === route.path ? 'dark' : 'plain'" @click="clickTag(tag)">
    {{ tag.label }}
  </el-tag>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex'
const route = new useRoute()
const router = new useRouter()
const store = new useStore()

// 获取菜单数据
let tags = computed(() => store.state.tab.tabsList)

// 关闭tag标签方法
const handleClose = (tag, index) => {
  // 删除数据
  store.commit('DEL_MENU', tag)
  // 为结尾元素，则将高亮转移至前一个数据
  if (route.path == tag.path) router.push(tags.value[index - 1].path)
}
// 点击跳转至对应路由
const clickTag = (item) => {
  router.push(item.path)
  console.log(1);
}



</script>

<style scoped>
.el-tag {
  margin-left: 10px;
  cursor: pointer;
}
</style>