// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Swipe, SwipeItem, Loadmore ,InfiniteScroll } from 'mint-ui'
import 'mint-ui/lib/style.css'
// import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';

import Es6Promise from 'es6-promise'

Es6Promise.polyfill()

import 'babel-polyfill'

import {api, get, post ,postobj} from "./api/getdata"

Vue.use(ElementUI);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Loadmore.name, Loadmore);
Vue.use(InfiniteScroll);
// Vue.use(Swiper);

Vue.prototype.$api = api;
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$postobj = postobj;

Vue.config.productionTip = false

axios.defaults.baseURL = '/api' // 本地
// axios.defaults.baseURL = 'http://172.30.40.183:8081' // 服务器
// axios.defaults.baseURL = 'http://172.16.3.3:9120' // 服务器

/* eslint-disable no-new */
axios.interceptors.request.use((config) => {
  let token = localStorage.getItem('token');
  if (token && v.$route.path !== '/login') {
    config.headers.Authorization = `Bearer ${token}`
  }
  if (config.data === FormData) {
    config.headers['Content-Type'] = 'multipart/form-data'
  }
  // Do something before request is sent
  return config;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});
axios.interceptors.response.use((response) => {
  // Do something before request is sent
  if(response.data.code != 1){
    if(response.data.code == 700){
      // localStorage.removeItem('user')
      // v.$message('请先登录！')
      v.$router.push('/login')
    }else {
      v.$message({
          message: response.data.msg,
          type: 'error',
          duration:1500,
          center: true
      });
    }
    return
  }
  return response;
}, (error) => {
  // v.$message.error('出错了')
  return Promise.reject(error);
})


const v = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
