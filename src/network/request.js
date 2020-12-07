import axios from 'axios';

axios.defaults.withCredentials=true //跨域
/* 1.创建axios实例 */
const instance = axios.create({
  baseURL: 'http://172.17.143.169:3000',
  timeout: 5000,
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded' 
  // },
})

/* 2.axios的拦截器 */
// 请求拦截
instance.interceptors.request.use(config => {
  // 释放拦截
  return config;
},error => {
  return Promise.reject(error)
})

// 响应拦截
instance.interceptors.response.use(res => {
  // 释放拦截
  return res;
},error => {
  return Promise.reject(error)
})

/* 3.导出网络请求 */
export default instance; 