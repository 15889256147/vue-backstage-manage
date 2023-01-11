<template>
  <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
    :default-active="router.currentRoute.value.path" text-color="#fff" :collapse="isCollapse"
    :collapse-transition="false" router>
    <div class="titleName" v-show="!isCollapse" style="width:160px">通用后台管理</div>
    <div class="titleName" v-show="isCollapse">后台</div>
    <el-menu-item :index="item.path" v-for="item in noChild" :key="item.path" @click="addMenu(item)">
      <!-- 动态引入图标组件 -->
      <component class="icon" :is="item.icon"></component>
      <span>{{ '\xa0'+ item.label }}</span>
    </el-menu-item>
    <el-sub-menu :index="item.label" v-for="item in hasChild" :key="item.path">
      <template #title>
        <component class="icon" :is="item.icon"></component>
        <span>{{ '\xa0'+ item.label }}</span>
      </template>
      <el-menu-item-group :index="subitem.path" v-for="subitem in item.children" :key="subitem.path"
        @click="addMenu(subitem)">
        <el-menu-item :index="subitem.path">{{ '\xa0'+ subitem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

  </el-menu>

</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const router = new useRouter()
const store = new useStore()

// 定义菜单数据
const menu = reactive([
  {
    path: '/home',
    name: 'home',
    label: '首页',
    icon: 'HomeFilled',
    url: 'Home/Home'
  },
  {
    path: '/mall',
    name: 'mall',
    label: '商品管理',
    icon: 'video-play',
    url: 'MallManage/MallManage'
  },
  {
    path: '/user',
    name: 'user',
    label: '用户管理',
    icon: 'user',
    url: 'UserManage/UserManage'
  },
  {
    label: '其他',
    icon: 'location',
    children: [
      {
        path: '/page1',
        name: 'page1',
        label: '页面1',
        icon: 'setting',
        url: 'Other/PageOne'
      },
      {
        path: '/page2',
        name: 'page2',
        label: '页面2',
        icon: 'setting',
        url: 'Other/PageTwo'
      }
    ]
  }
])
// 定义是否折叠
let isCollapse = computed(() => store.state.tab.isCollapse)
// 不含子菜单的菜单
const noChild = computed(() => menu.filter(item => !item.children))
// 含有子菜单的菜单
const hasChild = computed(() => menu.filter(item => item.children))

// 增加菜单数据方法
const addMenu = (item) => {
  store.commit('ADD_MENU', item)
}

onMounted(() => {
  // console.log(router);
})

</script>

<style>
.el-menu {
  border-right: 0;
  height: 100%;
}

.icon {
  width: 18px;
  height: 18px;
}

.titleName {
  padding: 0 20%;
  line-height: 48px;
  font-size: 16px;
  color: #fff;
}
</style>