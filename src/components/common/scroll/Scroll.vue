<!-- Scroll -->
<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: { // 传入的参数是否开启上拉加载
      type: Boolean,
      default: false
    },
    
  },
  data () {
    return {
      scroll: null
    }
  },
  mounted() {
    // 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad  // 上拉加载
    })

    // 监听滚动位置
    if (this.probeType ===2 || this.probeType === 3){
      this.scroll.on('scroll', position => {
        this.$emit('scroll',position)
      })
    }

    // 监听上拉事件
    if (this.pullUpLoad){
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp');
      })
    }
  },
  methods: {
    scrollTo(x,y,time=500){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ?  this.scroll.y : 0;
    }
  }
}
</script>

<style scoped>

</style>