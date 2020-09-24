import instance from "../request";

/* 发送验证码 */
export function sendMail(data) {
  return instance.request({
    method: "post",
    url:"/admin/sendMail",
    data
  });
}

/* 管理员登录 */
export function adminLogin(data) {
  return instance.request({
    method: "post",
    url:"/admin/login",
    data
  });
}