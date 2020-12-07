<!-- GoodsListItem -->
<template>
  <div class="goods-item" @click="itemClick">
    <img class="goods-item-img" :src="goodsItem.image" @load="imageLoad">
    <div class="coupon-box">
      <p><span>优惠券</span>{{goodsItem.discount}} 元</p>
      <p>去领券></p>
    </div>
    <div class="goods-info">
      <p>{{goodsItem.name}}</p>
      <span class="collect"><i class="iconfont icon-piliangshedingyuanjia">原价</i>￥{{goodsItem.original_price}}</span>
      <span class="price">券后￥{{goodsItem.price}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    showImage() {
      // return this.goodsItem.image || this.goodsItem.img;
    }
  },
  methods: {
    imageLoad() {
      // this.$bus.$emit('goodItemImageLoad');
    },
    itemClick() {
      // 跳到详情页
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
}

</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
    /* margin-left: 2%; */

  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-item .coupon-box {
    /* height: 3rem; */
    position: absolute;
    right: 0;
    top: 0;
    width: 3.5rem;
    font-size: .9rem;
    line-height: 1.2rem;
    border-radius: 0 0 5px 5px;
    /* position: relative; */
    /* margin-top: -3rem; */
    text-align: center;
    opacity: .9;
    background-color:#ff00aa;
    color: #fff;
  }

  .coupon-box p:nth-child(1) span {
    color: yellow;
  }

  .coupon-box p:nth-child(2){
    background-color: yellow;
    color: fuchsia;
  }
  .goods-info {
    font-size: 10px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info span{
    padding: 0 .2rem;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .collect i{
    font-size: 9px;
    color: coral;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    /* background: url("~assets/img/common/collect.svg") 0 0/14px 14px; */
  }
</style>