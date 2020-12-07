<template>
  <div id="page">
    <div class="left">
      <el-button type="info" plain size="mini">批量删除</el-button>
    </div>
    <div class="right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name:"Page",
  data() {
    return {
      currentPage:0, // 当前页码
      pageSize:2, // 每页显示数量
    }
  },
  props: {
    total: {
      type: Number,
      default: 10
    },
  },
  methods: {
    /* 向父组件发送每页显示数量 */
    handleSizeChange(val) {
      this.pageSize = val;
      this.$emit('pageSize',this.pageSize)
    },
    /* 向父组件发送第几页 */
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$emit('currentPage',this.currentPage)
    }
  },
}
</script>

<style lang="scss" scoped>
  #page {
    padding: 1rem 0;
    div {
      display: inline-block;
    }
    .left {
      text-align: left;
      width: 15%;
    }
     .right {
       text-align: right;
     }
  }
</style>