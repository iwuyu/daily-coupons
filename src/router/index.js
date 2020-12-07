import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/home/Home.vue")
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../views/search/Search.vue")
  },
  {
    path: "/nine",
    name: "Nine",
    component: () => import("../views/nine/Nine.vue")
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/profile/Profile.vue")
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('../components/admin/childComps/AdminLogin.vue')
  }, 
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../components/admin/Admin.vue'),
    children: [
      {
        path: '/admin/addGoods',
        name: 'AddGoods',
        component: () => import('../components/admin/childComps/AddGoods.vue')
      },
      {
        path: '/admin/manageGoods',
        name: 'ManageGoods',
        component: () => import('../components/admin/childComps/ManageGoods.vue')
      },
      {
        path: '/admin/manageCategory',
        name: 'ManageCategory',
        component: () => import('../components/admin/childComps/ManageCategory.vue')
      },
    ]
  }
]
// 创建路由对象
const router = new VueRouter({
  routes,
  mode: "history",
})


/* 重定向不报错 */
const originalPush = VueRouter.prototype.replace
VueRouter.prototype.replace = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 导出
export default router;
