<!-- RecommendView @/assets/img/boy.jpg-->
<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends">
      <a :href="item.link" target="_blank">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}

</script>

<style lang="scss" scoped>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;
  }
  .recommend-item {
    flex: 1;
    img {
      width: 70px;
      margin-bottom: 10px;
      border-radius: 50%;
    }
  }
</style>