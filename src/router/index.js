import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import homeContent from "../views/HomeContent"
import Login from "../views/Login"
import Register from "@/views/Register";
import Ucenter from "@/views/Ucenter";
import ExChange from "@/views/ExChange";
import KLine from "@/views/KLine";
import Assets from "@/views/Assets";
import Assets2 from "@/views/Assets2";
import My from "@/views/My";
import Trade from "@/views/Trade";
import Trade2 from "@/views/Trade2";
import Recharge from "@/views/Recharge";
import Withdrawal from "@/views/Withdrawal";
import Transfer from "@/views/Transfer";
import Share from "@/views/Share";
import Notice from "@/views/Notice";
import Help from "@/views/Help";
import Feedback from "@/views/Feedback";
import Forget from "@/views/Forget";
import IEPN from "@/views/IEPN";
import BuyUSDT from "@/views/BuyUSDT";
import Detail from "@/views/Detail";
import quotes from "@/views/quotes";
import zichan from "@/views/zichan";
import deposit_record from "@/views/deposit_record";
import withdrawal_record from "@/views/withdrawal_record";
import Upstart from "@/views/Upstart";
import Uplist from "@/views/Uplist";
import onlineServer from "@/views/onlineServer";
import zhiya from "@/views/zhiya";
import zhiyaOrder from "@/views/zhiyaOrder";
import onlineService from "@/views/onlineService";
import imgbn from "@/views/imgbn";
import logs from "@/views/logs";
import ConfirmPage from '@/views/ConfirmPage';
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    children: [
      {
        path: "",
        name: "homeContent",
        component: homeContent,
        meta: {
          title: "Index",
        },
      },
    ],
  },
  {
    path: "/confirmPage",
    name: "confirmPage",
    component: ConfirmPage,
    meta: {
      title: "Vertification",
    },
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/forget",
    name: "Forget",
    component: Forget,
    meta: {
      title: "Forget Password",
    },
  },
  {
    path: "/withdrawal_record",
    name: "withdrawal_record",
    component: withdrawal_record,
    meta: {
      title: "Withdrawal record",
    },
  },
  {
    path: "/deposit_record",
    name: "deposit_record",
    component: deposit_record,
    meta: {
      title: "Deposit and withdrawal records",
    },
  },
  {
    path: "/logs",
    name: "logs",
    component: logs,
    meta: {
      title: "logs",
    },
  },
  {
    path: "/onlineServer",
    name: "onlineServer",
    component: onlineServer,
    meta: {
      title: "online Server",
    },
  },
  {
    path: "/buy",
    name: "Buy",
    component: BuyUSDT,
    meta: {
      title: "Buy USDT",
    },
  },
  {
    path: "/detail",
    name: "Detail",
    component: Detail,
    meta: {
      title: "Detail",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register",
    },
  },
  {
    path: "/ucenter",
    name: "Ucenter",
    component: Ucenter,
    meta: {
      title: "User Center",
    },
  },
  {
    path: "/exchange",
    name: "ExChange",
    component: ExChange,
    meta: {
      title: "Exchange",
    },
  },
  {
    path: "/quotes",
    name: "quotes",
    component: quotes,
    meta: {
      title: "quotes",
    },
  },
  {
    path: "/kline",
    name: "KLine",
    component: KLine,
    meta: {
      title: "Kline",
    },
  },
  {
    path: "/my",
    name: "My",
    component: My,
    meta: {
      title: "My",
    },
  },
  {
    path: "/zichan",
    name: "zichan",
    component: zichan,
    meta: {
      title: "zichan",
    },
  },
  {
    path: "/assets",
    name: "Assets",
    component: Assets,
    meta: {
      title: "My Assets",
    },
  },
  {
    path: "/assets2",
    name: "Assets2",
    component: Assets2,
    meta: {
      title: "My Assets",
    },
  },
  {
    path: "/trade",
    name: "Trade",
    component: Trade,
    meta: {
      title: "Trade",
    },
  },
  {
    path: "/trade2",
    name: "Trade2",
    component: Trade2,
    meta: {
      title: "Trade",
    },
  },
  {
    path: "/recharge",
    name: "Recharge",
    component: Recharge,
    meta: {
      title: "Recharge",
    },
  },
  {
    path: "/withdrawal",
    name: "Withdrawal",
    component: Withdrawal,
    meta: {
      title: "Withdrawal",
    },
  },
  {
    path: "/transfer",
    name: "Transfer",
    component: Transfer,
    meta: {
      title: "Wallet Transfer",
    },
  },
  {
    path: "/share",
    name: "Share",
    component: Share,
    meta: {
      title: "Invite Friends",
    },
  },
  {
    path: "/notice",
    name: "Notice",
    component: Notice,
    meta: {
      title: "Notice",
    },
  },
  {
    path: "/help",
    name: "Help",
    component: Help,
    meta: {
      title: "Help Center",
    },
  },
  {
    path: "/feedback",
    name: "Feedback",
    component: Feedback,
    meta: {
      title: "Feedback",
    },
  },
  /* {
        path: '/upstart',
        name: 'IEPN',
        component: IEPN,
        meta: {
            title: 'UpStart'
        }
    },*/
  {
    path: "/upstart",
    name: "Upstart",
    component: Upstart,
    meta: {
      title: "Upstart",
    },
  },
  {
    path: "/Uplist",
    name: "Uplist",
    component: Uplist,
    meta: {
      title: "SubscriptionList",
    },
  },
  {
    path: "/zhiya",
    name: "zhiya",
    component: zhiya,
    meta: {
      title: "Lock up",
    },
  },
  {
    path: "/zhiyaOrder",
    name: "zhiyaOrder",
    component: zhiyaOrder,
    meta: {
      title: "Lock up Order",
    },
  },
  {
    path: "/onlineService",
    name: "onlineService",
    component: onlineService,
    meta: {
      title: "onlineService",
    },
  },
  {
    path: "/imgbn",
    name: "imgbn",
    component: imgbn,
    meta: {
      title: "bn",
    },
  },
  {
    path: "*",
    redirect: "/",
  }
];

const router = new VueRouter({
  routes,
});

export default router
