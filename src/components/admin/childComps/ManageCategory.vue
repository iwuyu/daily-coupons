<template>
  <div id="manage-category">
    <h2>分类管理</h2>
    <el-table
      :data="categoryData"
      style="width: 100%">
      <el-table-column
        label="分类名"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.category_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template> 

<script>
import {getCategory} from "network/getNotes/note";

export default {
  name:'ManageCategory',
  data() {
    return {
      categoryData: []
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  mounted() {
    getCategory().then(res => {
      let data = res.data;
      if(data.statusCode === 200){
        this.categoryData = data.data
      }else {
        this.$message({
          type:"error",
          message: data.message
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang="scss" scoped>
  #manage-category {
    padding: 2rem 3rem;
  }
</style>