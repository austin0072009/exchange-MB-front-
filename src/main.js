import Vue from 'vue'
import App from './App.vue'
import router from './router'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import theme from 'muse-ui/lib/theme';
import Axios from "axios"
import VueAxios from 'vue-axios'
import i18n from './lang/lang'
import VueSocketIO from 'vue-socket.io'
import Qs from 'qs'
import store from "./store";
import Helpers from 'muse-ui/lib/Helpers';
import NProgress from 'muse-ui-progress';
import Loading from 'muse-ui-loading';
import 'muse-ui-loading/dist/muse-ui-loading.css'
import Toast from 'muse-ui-toast';
import Utils from "./lib/utils";
import Message from 'muse-ui-message';

Vue.use(Toast, {
    position: 'top',               // 弹出的位置
    time: 1000,                       // 显示的时长
    closeIcon: ':icon-guanbi',               // 关闭的图标
    close: true,                      // 是否显示关闭按钮
    successIcon: ':icon-chenggong1',      // 成功信息图标
    infoIcon: ':icon-info',                 // 信息信息图标
    warningIcon: ':icon-jinggao',     // 提醒信息图标
    errorIcon: ':icon-shibai',              // 错误信息图标
    color: '#fff'
});
Vue.use(NProgress);
Vue.use(Helpers);
Vue.use(Utils);


theme.add('teal_day', {
    primary: '#1976d2',
    secondary: '#000000',
    success: '#4caf50',
    warning: '#fdd835',
    info: '#2196f3',
    error: '#f44336',
    track: '#757575',
    text: {
        primary: '#fff',
        secondary: 'rgba(255, 255, 255, 0.7)',
        alternate: '#0b1622',
        disabled: 'rgba(255, 255, 255, 0.3)',
        hint: 'rgba(255, 255, 255, 0.3)' // 提示文字颜色
    },
    divider: 'rgba(255, 255, 255, 0.3)',
    background: {
        paper: '#424242',
        chip: '#616161',
        default: '#081724'
    }
}, 'light');

theme.add('teal_night', {
    primary: '#1976d2',
    secondary: '#000000',
    success: '#4caf50',
    warning: '#fdd835',
    info: '#2196f3',
    error: '#f44336',
    track: '#757575',
    text: {
        primary: '#fff',
        secondary: 'rgba(255, 255, 255, 0.7)',
        alternate: '#0b1622',
        disabled: 'rgba(255, 255, 255, 0.3)',
        hint: 'rgba(255, 255, 255, 0.3)' // 提示文字颜色
    },
    divider: 'rgba(255, 255, 255, 0.3)',
    background: {
        paper: '#424242',
        chip: '#616161',
        default: '#081724'
    }
}, 'dark');

let theme_str = 'teal_';
if (window.localStorage.getItem('mode')) {

} else {
    window.localStorage.setItem('mode', 'night');//默认模式
}
theme_str += window.localStorage.getItem('mode');
theme.use(theme_str);

if (window.localStorage.getItem('lang')) {

} else {
    window.localStorage.setItem('lang', 'zh');//默认语言
}




import "@/assets/style/common.css";

/**
 * 配置接口地址和socket地址
 */
let [bus_host, socket_api, socket_path] = [
  "https://www.jpex-exchange.com",
  "wss://www.jpex-exchange.com",
  "/socket.io/",
];
 if (process.env.NODE_ENV === 'development') {
 	bus_host = "https://www.jpex-exchange.com"; socket_api = "wss://www.jpex-exchange.com";
 }

Vue.use(new VueSocketIO({
    debug: false,
    connection: socket_api,
    options: {path: socket_path} //Optional options
}))

Vue.filter("numberFixed", function (x, y = 4) {
    return Number(x).toFixed(y)
})


Vue.use(Loading);
window.eventBus = new Vue()

Vue.use(MuseUI);
Vue.use(VueAxios, Axios);
Vue.use(Qs);

// let moreloading = false;
Axios.interceptors.request.use(config => {


    if (config.headers.not_loading === undefined) {
        // if (!moreloading){
        //     moreloading = eventBus.$loading();
        // }

    } else {
        delete config.headers.not_loading;
    }
    if (config.url.indexOf("transaction_in") < 0) {
        // layer.load(1);
    }
    // console.log(config.headers);
    config.headers.lang = window.localStorage.getItem('lang');
    config.url = bus_host + config.url;
    if (config.url.indexOf('?') === -1) {
        config.url = config.url + '?_timespan=' + (new Date()).getTime()
    } else {
        config.url = config.url + '&_timespan=' + (new Date()).getTime()
    }
    // 在发送请求之前做些什么
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})

Axios.interceptors.response.use(response => {
    // if (moreloading !== undefined) {
    //     moreloading.close();
    // }

    if (response.data.type == '999') {
       let lang = window.localStorage.getItem('lang');

        let arr = {'en':'Please login','zh':'请先登录','jp':'まず登録してください','kr':'우선 로그 인 하 세 요','hk':'請先登錄'};
        window.eventBus.$toast.info(arr[lang]);
        localStorage.removeItem('user_id');
        localStorage.removeItem('token');

        setTimeout(() => {
            router.push("/login");
        }, 500);
    }
    return response
})

Vue.config.productionTip = false;

Vue.use(new VueSocketIO({
    debug: false,
    connection: socket_api,
    options: {path: socket_path} //Optional options
}))

if (window.plus) {
    plusReady()
} else {
    document.addEventListener('plusready', plusReady, false)
}

function plusReady() {
    plus.navigator.setStatusBarBackground('#ffffff');
    plus.navigator.setStatusBarStyle('dark');
}

Vue.use(Message, {
    closeIcon: ':icon-guanbi',               // 关闭的图标
    close: true,                      // 是否显示关闭按钮
    successIcon: ':icon-chenggong1',      // 成功信息图标
    infoIcon: ':icon-info',                 // 信息信息图标
    warningIcon: ':icon-jinggao',     // 提醒信息图标
    errorIcon: ':icon-shibai',              // 错误信息图标maxWidth: '80%',
    className: '',                                  // 对话框的样式
    okLabel: 'ok',                                 // 对话框确定按钮文字
    cancelLabel: 'cancel',                             // 对话框取消按钮文字
    transition: 'scale'
});

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title + ' - JPEX'
        document.title="JPEX";
    }
    next()
})

new Vue({
    i18n,
    router,
    store,
    Loading,
    render: h => h(App),
    created() {
        this.$progress.start();
    },
    mounted() {
        this.$progress.done();
    }
}).$mount('#app')
