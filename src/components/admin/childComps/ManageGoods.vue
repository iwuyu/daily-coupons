<template>
  <div id="manage-goods">
    <h2><i class="el-icon-s-grid"></i> 商品管理</h2>
    <div class="search">
      <el-select v-model="param.categoryId" @change="selectChanged" filterable placeholder="请选择商品分类">
        <el-option
          v-for="item in categoryData"
          :key="item.category_id"
          :label="item.category_name"
          :value="item.category_id">
        </el-option>
      </el-select>
      <el-input
        class="input-keywork"
        v-model="param.keyword"
        @blur="inputEnd"
        placeholder="请输入关键字"
        clearable
      ></el-input>
    </div>
    <div class="goods">
      <el-table
        :data="goodsData"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column label="商品图" width="80" >
          <template slot-scope="scope">
            <div class="good-image">
              <img :src="scope.row.image" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="商品名">
          <template slot-scope="scope">
            <span style="-webkit-line-clamp: 1;display: -webkit-box;word-break: break-all;-webkit-box-orient: vertical;line-height: 1.8;">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="店铺"
          width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.store }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="分类"
          width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.category_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="来源"
          width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.from_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="优惠券"
          width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.discount }}元</span>
          </template>
        </el-table-column>
        <el-table-column
          label="券后价"
          width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.price }}元</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-dialog title="修改商品信息" width="80%" :visible.sync="dialogFormVisible">
              <add-goods/>
            </el-dialog>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <page :total="total" @pageSize="getPageSize" @currentPage="getCurrentPage"/>
    </div>
  </div>
</template>

<script>
import {getCategory, getGoods, getGoodsCount, getGoodsByKeyword} from "network/getNotes/note";
import upload from "network/upload";
import Page from "components/content/page/Page";
import addGoods from "./AddGoods";

export default {
  name:'ManageGoods',
  components:{
    Page,
    addGoods
  },
  data() {
    return {
      baseurl:upload.UPLOADIMG.BASEURL, // baseurl
      categoryData: [], // 分类集
      goodsData: [], // 商品集
      selectionValue: [], // 选中的数据
      total:0, // 商品总数
      dialogFormVisible: false,
      param:{
        categoryId:"", // 当前分类
        keyword:"", // 关键字
        currentPage:1, // 当前页码
        pageSize:2 // 每页数据量
      }
    }
  },
  methods:{
    /* 选中分类 搜索该分类的数据 */
    selectChanged(val){
      this.param.currentPage = 1; // 初始化页码，默认第一页
      this.param.keyword = ""; // 初始化关键字框
      this.getGoodsDataCount(this.param); // 获取该分类的总数
      this.getGoodsData(this.param); // 获取该分类的商品
    },

    /* 关键字查询input失去焦点查询 */
    inputEnd(val){
      this.param.categoryId = ""; // 分类初始化
      this.getGoodsDataCount(this.param); // 获取该关键字所有商品的总数
      this.getGoodsData(this.param); // 获取该关键字的商品
    },

    /* 初始化获取商品数量 */
    getGoodsDataCount(param) {
      getGoodsCount(param).then(res => {
        let data = res.data;
        if(data.statusCode === 200) {
          this.total = data.data[0].count;
        }else {
          this.$message({
            type:"error",
            message: "商品数量获取失败请稍后重试！"
          })
        }
      }).catch(err => {console.log(err)})
    },
    
    /* 初始化获取商品 */
    getGoodsData(param) {
      getGoods(param).then(res =>{
        let data = res.data;
        if(data.statusCode === 200) {
          this.goodsName = [];
          data.data.forEach(ele => {
            ele.image = this.baseurl + ele.image;
            let name = {}
            name.id = ele.id;
            name.value = ele.name;
            this.goodsName.push(name);
          });
          this.goodsData = data.data;
        }else {
          this.$message({
            type:'error',
            message: "商品获取失败请稍后重试！"
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    
    /* 获取该页数量的数据 */
    getPageSize(val){
      this.param.pageSize = val; // 获取每页请求数量
      this.getGoodsDataCount(this.param); // 获取商品所有数量
      this.getGoodsData(this.param); // 获取商品数据
    },
    
    /* 获取该页的数据 */
    getCurrentPage(val) {
      this.param.currentPage = val; // 获取当前页
      this.getGoodsDataCount(this.param); // 获取对应条件的所有商品数量
      this.getGoodsData(this.param); // 获取对应条件的商品
    },

    /* 选中的商品 */
    handleSelectionChange(val) {
      this.selectionValue = val;
      console.log("你已选中",this.selectionValue)
    },

    /* 商品编辑 */
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      console.log(index, row);
    },

    /* 商品删除 */
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  mounted() {
    /* 获取所有商品数量 */
    this.getGoodsDataCount(this.param);

    /* 获取所有商品*/
    this.getGoodsData(this.param);
    
    /* 获取分类 */
    getCategory().then(res => {
      let data = res.data;
      if(data.statusCode === 200){
        this.categoryData = data.data;
        
      }else {
        this.$message({
          type:"error",
          message: "分类获取失败请稍后重试！"
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang="scss" scoped>
  #manage-goods {
    padding: 2rem 3rem;
    .search {
      padding: 1rem;
      border-bottom: 1px solid #ccc;
    }
    .input-keywork {
      margin-left: 1rem;
      width: 16rem;
      display: inline-block;
    }
    .good-image {
      height: 2rem;
      width: 2rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>