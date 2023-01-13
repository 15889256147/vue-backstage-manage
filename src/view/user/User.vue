<template>
  <div class="header">
    <el-button type="primary" size="small" @click="changeDialog">+ 增加</el-button>
    <el-input class="search" v-model="searchData" placeholder="搜索姓名" @input="handleSearch">
      <template #prefix>
        <el-icon class="el-input__icon">
          <search />
        </el-icon>
      </template>
    </el-input>
  </div>
  <MyDialog :msg="msg" @addFormData="handleAdd"></MyDialog>
  <div class="common-table">
    <!-- 表单区域 -->
    <el-table :data="userData" stripe style="width: 100%;margin-bottom:10px" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="sex" label="性别" width="120" />
      <el-table-column prop="age" label="年龄" width="120" />
      <el-table-column prop="birth" label="出生日期" width="200" />
      <el-table-column prop="addr" label="地址" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-button class="delete" size="small" type="danger" @click="handleSelect">一键删除</el-button>
      <!-- 分页区域 -->
      <el-pagination background small layout="prev, pager, next" :total="total" @current-change="handleCurrent" />
    </div>
  </div>
</template>

<script setup>
import MyDialog from '../../components/CommonDialog.vue'
import { ref, getCurrentInstance, onMounted, nextTick } from 'vue'
import { useStore } from 'vuex'
const store = new useStore()
const { proxy } = getCurrentInstance()

let userData = ref([])
let msg = ref('')
let total = ref()
let searchData = ref('')
let selection = ref([])

// 打开对话框
let changeDialog = () => {
  msg.value = "新增用户数据"
  store.commit('CHANGE_DAI', true)
  store.commit('DELETE_FROM')
}
// 获取用户数据
let getData = (params) => {
  proxy.$api.getUser(params).then((res) => {
    // 用户数据逻辑
    userData.value = res.data
    userData.value.map(item => item.sex = item.sex == 1 ? '男' : '女')
    // 分页逻辑
    total.value = res.count
  })
}
// 修改表格数据
let handleEdit = (row) => {
  msg.value = '编辑用户数据'
  store.commit('CHANGE_DAI', true)
  store.commit('CHANGE_FROM', row)
}
// 删除表格数据
let handleDelete = (row) => {
  ElMessageBox.confirm(
    '此操作将永久删除该数据, 是否继续?',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    proxy.$api.delUser(row)
    getData()

    ElMessage({
      type: 'success',
      message: '成功删除',
    })
  })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}
// 新增表单数据
let handleAdd = (index) => {
  getData()
  if (index == 1) {  //1表新增用户数据
    proxy.$api.addUser(store.state.daiLog.form)
  } else {          //0表编辑用户数据
    proxy.$api.editUser(store.state.daiLog.form)
  }
  getData()
}
// 分页变更
let handleCurrent = (index) => {
  getData({ page: index })
}
// 搜索数据
let handleSearch = (value) => {
  getData({ name: value })
}
// 多行选择
let handleSelectionChange = (val) => {
  selection.value = val
}
// 一键清除
let handleSelect = () => {
  let data = selection.value.map(item => item.id)
  proxy.$api.batchDel({ ids: data })
  getData()
}
onMounted(() => {
  getData()
})

</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;

  .search {
    width: 200px;
    margin-right: 50px;
  }
}

.common-table {
  // position: relative;
  height: 95%;

  .el-table {
    // padding-bottom: 5px;
    height: 95%
  }

  .footer {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
  }

  // .el-pagination {
  //   position: absolute;
  //   right: 20px;
  // }
}
</style>