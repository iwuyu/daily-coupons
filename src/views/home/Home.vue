<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">每日优惠券</div></nav-bar>
    <tab-control :titles="['默认排序','最新','销量','价格','折扣']"
                 @tabClick="tabClick" 
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"/>
    <scroll class="content" 
            ref="scroll" 
            @scroll="contentScroll" 
            :probe-type="3" 
            :pull-up-load="true">
      <el-carousel trigger="click" height="150px">
        <el-carousel-item v-for="item in swiper" :key="item">
          <img :src="item" alt="">
        </el-carousel-item>
      </el-carousel>
      <recommend-view :recommends="recommends"/>
      <tab-control :titles="['默认排序','最新','销量','价格','折扣' ]" 
                   @tabClick="tabClick" 
                   ref="tabControl2"/>
      <goods-list :goods="showGoods"></goods-list>
      <div class="load-down"><i class="el-icon-loading"></i>加载更多...</div>
    </scroll>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import Scroll from 'components/common/scroll/Scroll';
import RecommendView from './childComps/RecommendView';
import TabControl from 'components/content/tabcontrol/TabControl';
import GoodsList from 'components/content/goods/GoodsList';

import {getGoods} from 'network/getNotes/note.js';
import upload from 'network/upload';

import boy from 'assets/img/boy.jpg';
import girl from 'assets/img/girl.jpg';
import life from 'assets/img/life.jpg';
import shose from 'assets/img/shose.jpg';
export default {
  name:"Home",
  components:{
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    RecommendView
  },
  data() {
    return {
      baseurl:upload.UPLOADIMG.BASEURL, // baseurl
      recommends: [
                    {link:"www.codejay.cn",image:boy,title:"男装"},
                    {link:"www.codejay.cn",image:girl,title:"女装"},
                    {link:"www.codejay.cn",image:life,title:"日用"},
                    {link:"www.codejay.cn",image:shose,title:"鞋品"}
                  ],
      swiper:["https://aecpm.alicdn.com/simba/img/TB1_JXrLVXXXXbZXVXXSutbFXXX.jpg",
              "https://aecpm.alicdn.com/simba/img/TB1W4nPJFXXXXbSXpXXSutbFXXX.jpg",
              "https://aecpm.alicdn.com/simba/img/TB183NQapLM8KJjSZFBSutJHVXa.jpg"
              ],
      goods: {
        'defaults' : {page: 0,list: [
          // {shopId:1,title:"2018秋季新款韩版百搭格子长袖衬衫+前短后长针织气质开衫外套+高腰直筒九分牛仔裤三件套装",img:"http://s3.mogucdn.com/mlcdn/c45406/180808_600abce0g8dc8i4f6ic7k27i7837l_640x960.jpg_560x999.jpg",orgPrice:59,coupon:19,price:40}
        ]},
        'new': {page: 0,list: []},
        'sell': {page: 0,list: []},
        'price': {page: 0,list: []},
        'discount': {page: 0,list: []}
      },
      param:{
        categoryId:"",
        currentPage:0,
        pageSize:8
      },
      currentType: 'defaults',
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed:{
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    tabClick(index) {
      switch (index) {
        case 0: this.currentType = 'pop'; break;
        case 1: this.currentType = 'new'; break;
        case 2: this.currentType = 'sell';break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    contentScroll(position) {
      // 获取tabControl的offsetTop
      // 所有组件都有一个属性$el: 用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // 决定tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
  },
  mounted() {
    getGoods(this.param).then(res => {
      let data = res.data
      if(data.statusCode === 200){
        data.data.forEach(el => {
          el.image = this.baseurl + el.image;
        });
        this.goods.defaults.list = data.data;
      }else {
        this.$message({
          type:'error',
          message: data.message
        })
      }
    }).catch(err => {console.log(err)})
  }
}
</script>

<style lang="scss" scoped>
  #home {
    padding-top: 44px;
    padding-bottom: 49px;
    height: 100vh;
    position: relative;

    .home-nav {
      background-color: #ff5777;
      color: #fff;
    }

    .content {
      overflow: hidden;
      position: absolute;
      top: 44px;
      bottom: 49px;
      left: 0;
      right: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }

    .el-carousel__item img {
      width: 100%;
    }

    .tab-control {
      position: relative;
      z-index: 9;
    }

    .load-down {
      height: 65px;
      line-height: 65px;
      text-align: center;
    }
  }

</style>