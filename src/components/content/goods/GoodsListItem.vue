<!-- GoodsListItem -->
<template>
  <div class="goods-item" @click="itemClick">
    <img class="goods-item-img" :src="goodsItem.img" @load="imageLoad">
    <div class="coupon-box">
      <p><span>优惠券</span> ￥{{goodsItem.coupon}}</p>
      <p>去领券></p>
    </div>
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="collect"><i class="iconfont icon-piliangshedingyuanjia">原价</i>￥{{goodsItem.orgPrice}}</span>
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
    height: 3rem;
    line-height: 1.5rem;
    border-radius: 0 0 5px 5px;
    position: relative;
    margin-top: -3rem;
    text-align: center;
    opacity: .8;
    background-color:fuchsia;
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
    font-size: 12px;
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
    padding: 0 .3rem;
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