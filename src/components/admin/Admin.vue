<template>
  <div id="admin">
    <el-header style="text-align: center; font-size: 22px">
      <div class="contraction" @click="contraction">
        <el-tooltip class="item" effect="dark" content="展开/关闭菜单" placement="right">
          <i :class="elIcon"></i>
        </el-tooltip>
      </div>
      <div>后台管理平台 </div>
      <div class="loginer"><i class="el-icon-user-solid"> admin</i></div>
    </el-header>
    <el-container style="height: 500px;">
      <el-aside :width="asideWith" translate=".5s">
        <!-- default-active="1-1" -->
        <el-menu 
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        class="el-menu-vertical-demo"
        :collapse="isCollapse">
          <el-submenu opened="true" index="1">
            <template slot="title"><i class="el-icon-s-order"></i><span slot="title">商品管理</span></template>
              <el-menu-item @click.native="$router.push('/admin/manageGoods')" index="1-1">商品管理</el-menu-item>
              <el-menu-item @click.native="$router.push('/admin/addGoods')" index="1-2">添加商品</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-user-solid"></i><span slot="title">用户管理</span></template>
          <el-menu-item @click.native="$router.push('/admin/user/management')" index="2-1">用户管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-discount"></i><span slot="title">商品分类</span></template>
              <el-menu-item @click.native="$router.push('/admin/manageCategory')" index="3-1">商品分类</el-menu-item>
          </el-submenu>
          
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-menu"></i><span slot="title">其他内容</span></template>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-s-tools"></i><span slot="title">系统设置</span></template>
              <el-menu-item index="5-1">关于系统</el-menu-item>
              <el-menu-item index="5-2" >退出系统</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
  
      <el-container>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
  
</template>

<script>
export default {
  name:"Admin",
  data() {
    return {
      isCollapse:true,
      asideWith:'60px',
      elIcon:'el-icon-arrow-right'
    }
  },
  methods:{
    contraction(){
      this.isCollapse = !this.isCollapse;
      if(this.isCollapse == true) {
        this.asideWith = '60px';
        this.elIcon = 'el-icon-arrow-right';
      }else {
        this.asideWith = '199px';
        this.elIcon = 'el-icon-arrow-left';
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  #admin {
    height: 100vh;
    .el-header {
      background-color:#545c64;
      color: #fff;
      line-height: 60px;
      display: flex;
      justify-content: space-between;
      box-shadow: #ccc 0 .5rem .5rem 0;
    }
    .loginer {
      font-size: 1.3rem;
    }
    .el-aside {
      width: 200px;
      background-color:#545c64;
      min-height: calc(100vh - 60px);
    }

    .contraction {
      padding-left: .3em;
      font-size: 1.3rem;
      color: #fff;
    }

    .el-main {
      min-height: calc(100vh - 60px);
      padding: 0;
    }

    .el-aside::-webkit-scrollbar,.el-main::-webkit-scrollbar{
	    width: 0;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
</style>