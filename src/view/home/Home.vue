<template>
  <el-row>
    <!-- 左侧卡片 -->
    <el-col :span="8" style="padding-right:10px">
      <!-- 上方个人信息 -->
      <el-card class="info" shadow="hover">
        <div class="user-info">
          <img class="user-picture" src="../../assets/images/user-default.png" alt="">
          <div class="user">
            <p class="name">Admin</p>
            <p class="state">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p class="lastTime">上次登录时间：<span class="time">2023-1-4</span></p>
          <p class="lastPlace">上次登录地点：<span class="place">汕头</span></p>
        </div>
      </el-card>
      <!-- 下方课程信息 -->
      <div class="class">
        <el-card shadow="hover" style="margin-top:20px;height:480px;">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val">
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </el-col>
    <!-- 右侧卡片 -->
    <el-col :span="16" style="padding-left:10px">
      <!-- 支付订单数据展示 -->
      <div class="order">
        <el-card shadow="hover" class="order-card" v-for="item in countTData" :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }">
          <div class="icon">
            <component class="order-icon" :is="item.icon" :style="`background:${item.color}`"></component>
          </div>
          <div class="order-data">
            <p class="order-data-value">￥{{ item.value }}</p>
            <p class="order-data-name">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 折线图 -->
      <el-card shadow="hover" style="height:260px">
        <div ref="phoneDate" style="height:260px"></div>
      </el-card>
      <div class="graph">
        <!-- 柱状图 -->
        <el-card shadow="hover">
          <div ref="userBar" style="height:260px"></div>
        </el-card>
        <!-- 饼图 -->
        <el-card shadow="hover">
          <div ref="phoneValue" style="height:240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>


</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
import * as echarts from 'echarts'

// 其proxy类似于vue2的this
const { proxy } = getCurrentInstance()
// 课程数据
const tableLabel = reactive({
  name: '课程',
  todayBuy: '今日购买',
  monthBuy: '本月购买',
  totalBuy: '总购买'
},)
let tableData = ref([])
const countTData = ref([])
let phoneDate = ref()
let userBar = ref()
let phoneValue = ref()

// 调用请求接口
const getData = async () => {
  let res = await proxy.$api.getTableData()
  const { orderData, userData, videoData, countData } = res.data
  tableData.value = res.data.tableData
  countTData.value = countData
  linePhoneData(orderData)
  barUserData(userData)
  pirPhoneValue(videoData)
  // console.log(res);
}

// 绘制折线图
const linePhoneData = (orderData) => {
  // 基于准备好的dom，初始化echarts实例
  let linePhone = echarts.init(phoneDate.value)
  const xAxis = Object.keys(orderData.data[0])
  // // 指定图表的配置项和数据
  let linePhoneOption = {
    tooltip: {},
    legend: { data: xAxis },
    xAxis: { data: orderData.date },
    yAxis: {},
    series: []
  };
  xAxis.forEach(item => {
    linePhoneOption.series.push({
      name: item,
      type: 'line',
      data: orderData.data.map(key => key[item])
    })
  });
  linePhone.setOption(linePhoneOption);
}
// 绘制用户数据柱状图
const barUserData = (userData) => {
  const barUser = echarts.init(userBar.value)
  const barUserOption = {
    tooltip: { trigger: "axis", },//触发时机
    legend: { textStyle: { color: '#333' } },
    xAxis: { data: userData.map(item => item.date), },
    yAxis: {},
    series: [
      {
        type: 'bar',
        name: '新增用户',
        data: userData.map(item => item.new)
      },
      {
        type: 'bar',
        name: '活跃用户',
        data: userData.map(item => item.active)
      }
    ]
  }
  barUser.setOption(barUserOption)
}
// 绘制手机价格饼图
const pirPhoneValue = (videoData) => {
  let pirPhone = echarts.init(phoneValue.value)
  let pirPhoneOption = {
    tooltip: { trigger: "item" },//触发时机
    series: [
      {
        type: 'pie',
        data: videoData,
        label: { overflow: 'none' }  //使得较长文本不会变为省略号
      }
    ]
  }
  pirPhone.setOption(pirPhoneOption)
}

// 在挂载时
onMounted(() => {
  // 请求数据
  getData()
})

</script>

<style lang="less" scoped>
// 个人信息卡片
.info {
  .user-info {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;

    .user-picture {
      width: 30%;
      height: 30%;
      border-radius: 50%;
      margin-right: 20px;
    }

    .user {
      .name {
        font-size: 2vw;
      }

      .state {
        font-size: 1vw;
        color: #999999;
      }
    }
  }

  .login-info {

    .lastTime,
    .lastPlace {
      line-height: 24px;
      font-size: 1vw;
      color: #999999;

      .time,
      .place {
        color: #666666;
        margin-left: 30px;
      }
    }
  }
}

// 右侧数据展示信息
.order {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;


  .order-card {
    width: 32%;
    margin-bottom: 20px;

    .icon {
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      margin-right: 10px;

      .order-icon {
        width: 100%;
        height: 100%;
        color: #fff;
      }
    }

    .order-data {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .order-data-value {
        font-size: 2vw;
      }

      .order-data-name {
        font-size: 1vw;
        color: #999;
      }
    }
  }
}

// 右下方图表
.graph {
  display: flex;
  justify-content: space-between;

  .el-card {
    width: 48%;
    height: 260px;
    margin-top: 20px;
  }
}
</style>
