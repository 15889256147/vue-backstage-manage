<template>
  <el-dialog v-model="isVisible" :title="msg">
    <el-form :model="form" :rules="rules" ref="fromData">
      <el-form-item label="姓名" prop="name">
        <el-input v-model.trim="form.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="form.age" placeholder="请选择年龄" />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="form.sex" placeholder="请选择性别">
          <el-option label="男" :value="1" />
          <el-option label="女" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期" prop="birth">
        <el-date-picker v-model="form.birth" type="date" label="请选择日期" placeholder="请选择日期" style="width: 100%"
          :clearable="false" value-format="YYYY-MM-DD" />
      </el-form-item>
      <el-form-item label="地址" prop="addr">
        <el-input v-model="form.addr" placeholder="请选择地址" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">重置</el-button>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, computed, defineProps, defineEmits, toRefs } from 'vue'
import { useStore } from 'vuex'
const store = new useStore()

const props = defineProps({ msg: String }) // 接收父组件传递的props参数
const { msg } = toRefs(props)  //解析props参数
const emit = defineEmits(['addFormData']) // 接收自定义事件

// 获取DOM元素
const fromData = ref()
// 是否展开对话框
let isVisible = computed({
  get() {
    return store.state.daiLog.isVisible
  },
  set(newValue) {
    store.commit('CHANGE_DAI', newValue)
    // isVisible = newValue
  }
})
// 获取表单数据
let form = computed({
  get() {
    return store.state.daiLog.form
  },
  set(newValue) {
    store.commit('CHANGE_FROM', newValue)
  }
})
// 校验规则
const rules = reactive({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
  ],
  sex: [
    { required: true, message: '请选择性别', trigger: 'blur' },
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { type: 'number', min: 1, max: 130, message: '请输入正确年龄', trigger: 'blur' },
  ],
  addr: [
    { required: true, message: '请输入地址', trigger: 'blur' },
  ],
  birth: [
    { required: true, message: '请选择日期', trigger: 'blur' },
  ],
})

// 提交表单数据
const onSubmit = () => {
  fromData.value.validate((isValid) => {
    if (isValid) {
      store.commit('CHANGE_FROM', form)
      store.commit('CHANGE_DAI', false)
      if (msg.value == '新增用户数据') emit('addFormData', 1)
      else if (msg.value == '编辑用户数据') emit('addFormData', 0)
    }
    store.commit('DELETE_FROM')
  })
}
// 重置表单数据
let onCancel = () => {
  store.commit('DELETE_FROM')
}


</script>

<style scoped>
.el-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>