import instance from "../request";

/* 添加商品 */
export function addGoods(data) {
  instance.request({
    method: "post",
    url:"/addGoods",
    data
  })
}