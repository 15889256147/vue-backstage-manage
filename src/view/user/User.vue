<template>
  <el-button type="primary" size="small" @click="changeDialog">+ 增加</el-button>
  <MyDialog :msg="msg" @addFormData="handleAdd">
  </MyDialog>
  <!-- 表单区域 -->
  <el-table :data="userData" stripe style="width: 100%;margin-top:10px" height="95%">
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

</template>

<script setup>
import MyDialog from '../../components/CommonDialog.vue'
import { ref, getCurrentInstance, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = new useStore()
const { proxy } = getCurrentInstance()

let userData = ref([])
let msg = ref('')

// 打开对话框
let changeDialog = () => {
  msg.value = "新增用户数据"
  store.commit('CHANGE_DAI', true)
}
// 获取用户数据
let getData = () => {
  proxy.$api.getUser().then((res) => {
    userData.value = res
    userData.value.map(item => item.sex = item.sex == 1 ? '男' : '女')
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
  )
    .then(() => {
      getData()
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
  if (index == 1) {  //1表新增用户数据
    proxy.$api.addUser(store.state.daiLog.form)
  } else {          //0表编辑用户数据
    proxy.$api.editUser(store.state.daiLog.form)
  }
  getData()
  getData()
}
onMounted(() => {
  getData()
})

</script>

<style>
.user-container {
  height: 90%;
}
</style>