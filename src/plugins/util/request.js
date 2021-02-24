import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { REQUEST_BASE_URL, REQUEST_TIMEOUT } from '@/config'


let myAxios = axios.create({
  baseURL: REQUEST_BASE_URL,
  timeout: REQUEST_TIMEOUT
})

// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let { baseURL, url, method, params, data } = config
  NProgress.start()
  if (url.includes('http')) config.baseURL = ''
  console.log(`用:${method}方法请求了:${baseURL+url}，请求参数:`, method === "get" ? params : data)
  return config;
}, function (error) {
  // 对请求错误做些什么
  console.log('失败请求，错误为', error.message);
  NProgress.done()
  return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  NProgress.done()
  
  return response;
}, function (error) {
  // 对响应错误做点什么
  NProgress.done()
  console.log('响应失败，错误为', error.message);
  return Promise.reject(error);
});

export async function $get(url, params) {
  let { data } = myAxios.get(url, { params })
  return data
}
export function $post(url, params) {
  let { data } = myAxios.post(url, params)
  return data
}