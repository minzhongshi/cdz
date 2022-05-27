import axios from "axios";
import {PERSONAL_URL} from './pathMap';
import Toast from "./Toast";

const instance=axios.create({
    baseURL:PERSONAL_URL
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
   Toast.showLoading("加载中")
    console.log("添加拦截器")
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    Toast.hideLoading();
    console.log("请求失败")
    Toast.message("失败",2000,"center");
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    console.log("添加响应拦截器")
    Toast.hideLoading();
    console.log(response.data)
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    Toast.hideLoading();
    console.log("响应失败")
    Toast.message("失败",2000,"center");
    console.log(error)
    return Promise.reject(error);
});

export default {
    get:instance.get,
    post:instance.post
}
