import instance from "../request";

/* 添加商品 */
export function addGoods(data) {
  return instance.request({
    method: "post",
    url:"/admin/addGoods",
    data
  })
}