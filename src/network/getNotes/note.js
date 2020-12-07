import instance from "../request";

/* 获取商品 */
export function getGoods(param) {
  return instance.request({
    method: "get",
    url:`/getGoods?categoryId=${param.categoryId}&currentPage=${param.currentPage}&pageSize=${param.pageSize}&keyword=${param.keyword}`
  })
}

/* 跟据关键字获取商品 */
export function getGoodsByKeyword(param) {
  return instance.request({
    method: "get",
    url:`/getGoodsByKeyword?keyword=${param}`
  })
}

/* 获取商品数量 */
export function getGoodsCount(param) {
  return instance.request({
    method: "get",
    url:`/getGoodsCount?categoryId=${param.categoryId}&keyword=${param.keyword}`
  })
}

/* 获取商品分类 */
export function getCategory() {
  return instance.request({
    method: "get",
    url:`/getGoodsCategory`
  })
}