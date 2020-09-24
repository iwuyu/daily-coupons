<!-- TabBarItem -->
<template>
  <div class="tab-bar-item" :style="activeStyle" @click="itemClick">
    <div class="icon"><slot name="item-icon"></slot></div>
    <div><slot name='item-text'></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "#9466ff"
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) != -1;
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {};
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    }
  }
}
</script>

<style lang="scss" scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    padding-top: 8px;
    font-size: 12px;
  }
</style>