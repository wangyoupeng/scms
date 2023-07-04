/*
 * 入口文件
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './models'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 全局函数及变量
import Global from './Global';
Vue.use(Global);

import Axios from 'axios';
Axios.interceptors.request.use(
  request => {
    console.log("aa",request)
    request.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return request;
  },
  error => {
    console.log("aaaaa",error)
    console.log("cccc", error)
    return Promise.reject(error);
  }
);
// 响应拦截器
Axios.interceptors.response.use(
  response => {
    // 对响应数据进行处理
    if (response.data.status === 401) {
      window.location.href = '/#/login'
    }
    return response;
  },
  error => {
    
    return Promise.reject(error);
  }
);
Vue.prototype.$axios = Axios;


// 相对时间过滤器,把时间戳转换成时间
// 格式: 2020-02-25 21:43:23
Vue.filter('dateFormat', (dataStr) => {
  var time = new Date(dataStr);
  function timeAdd0 (str) {
    if (str < 10) {
      str = '0' + str;
    }
    return str;
  }
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
});

//全局组件 to delete
import MyMenu from './components/MyMenu';
Vue.component(MyMenu.name, MyMenu);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
