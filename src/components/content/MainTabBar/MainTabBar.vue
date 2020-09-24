<!-- MainTabBar -->
<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="#ff5777">
      <i slot="item-icon" class="iconfont icon-shouye1"></i>
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/search" activeColor="#ff5777">
      <i slot="item-icon" class="iconfont icon-tubiao_huaban"></i>
      <div slot="item-text">查优惠券</div>
    </tab-bar-item>
    <tab-bar-item path="/nine" activeColor="#ff5777">
      <i slot="item-icon" class="iconfont icon-99"></i>
      <div slot="item-text">9.9包邮</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="#ff5777">
      <i slot="item-icon" class="iconfont icon-wode"></i>
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
// 导入组件
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

</style>