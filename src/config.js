import axios from 'axios'
import {Toast} from 'antd-mobile'


// 在这里增加拦截器的功能  拦截发送请求和响应请求
axios.interceptors.request.use(function (config) {
    Toast.loading('数据加载中,请稍候')
    return config;
})

axios.interceptors.response.use(function (config) {
    Toast.hide()
    return config;
})


