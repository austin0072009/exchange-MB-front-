<template>
  <div class="my-settings myxxbox">
    <div class="home flex flex-column">
		<div class="myheader">{{$t("header.center")}}</div>
		<div class="flex1 overYauto pdlr15">
			<div class="ge102"></div>
			<div class="myinfo bghui by10 tl pdlr20 pdtb20 flex flex-center">
				<img src="../assets/newimg/tx002.png" class="myavatar">
				<div class="txt">
				    <div class="name">{{account_num}}</div>
					<!-- <div class="id">ID：{{addPreZero(user_id)}}</div> -->
					<div class="id">{{$t("diy.总资产")}}<em>≈</em><b>${{total.toFixed(2)}}</b></div>
				</div>
			</div>
			<div class="ge102"></div>
			<div class="btngroup bghui by10 pdtb10">
				<div class="li">
					<div class="wpp" @click="$router.push('/recharge')">
						<img src="../assets/newimg/ico_rujin.png">
						<div class="txt">{{ $t('account.charging') }}</div>
					</div>
				</div>
				<div class="li">
					<div class="wpp" @click="$router.push('/withdrawal')">
						<img src="../assets/newimg/ico_chujin.png">
						<div class="txt">{{ $t('account.withdraw') }}</div>
					</div>
				</div>
				<div class="li">
					<div class="wpp" @click="$router.push('/transfer')">
						<img src="../assets/newimg/ico_rujin.png">
						<div class="txt">{{ $t('account.transfer') }}</div>
					</div>
				</div>
				<div class="li">
					<div class="wpp" @click="$router.push('/zichan')">
						<img src="../assets/newimg/ico_rujin.png">
						<div class="txt">{{ $t('miscro.assetCenter') }}</div>
					</div>
				</div>
			</div>
			<div class="ge102"></div>
			<div class="moerlist by10 bghui">
				<div class="li" @click="openRecords">
					<img src="../assets/newimg/ico_liushui.png" class="ico">
					<div class="txt">{{ $t('miscro.recordWithdrawal') }}</div>
					<img src="../assets/a5t.png" class="a5t">
				</div>
				<div class="li" v-if="!is_seller" @click="goShop()">
					<img src="../assets/newimg/ico_liushui.png" class="ico">
					<div class="txt">{{ $t('shop.myshop') }}</div>
					<img src="../assets/a5t.png" class="a5t">
				</div>
				<div class="li" @click="$router.push('/onlineServer')">
					<img src="../assets/newimg/ico_liushui.png" class="ico">
					<div class="txt">{{ $t('shop.truename') }}</div>
					<img src="../assets/a5t.png" class="a5t">
				</div>
				<div class="li" @click="$router.push('/onlineServer')">
					<img src="../assets/newimg/ico_liushui.png" class="ico">
					<div class="txt">{{ $t('diy.收付款方式') }}</div>
					<img src="../assets/a5t.png" class="a5t">
				</div>
				<div class="li" @click="$router.push('/share')">
					<img src="../assets/newimg/ico_liushui.png" class="ico">
					<div class="txt">{{ $t('lgpwd.setpwd') }}</div>
					<img src="../assets/a5t.png" class="a5t">
				</div>
			</div>
			
			<div class="ge102"></div>
			<div class="moerlist by10 bghui">
				<div class="li" @click="$router.push('/share')">
					<img src="../assets/newimg/ico_liushui.png" class="ico">
					<div class="txt">{{ $t('sgr.invite') }}</div>
					<img src="../assets/a5t.png" class="a5t">
				</div>
				<div class="li" @click="$router.push('/onlineServer')">
					<img src="../assets/newimg/ico_liushui.png" class="ico">
					<div class="txt">{{ $t('home.kefu') }}</div>
					<img src="../assets/a5t.png" class="a5t">
				</div>
				<div class="li" @click="$router.push('/feedback')">
					<img src="../assets/newimg/ico_liushui.png" class="ico">
					<div class="txt">{{ $t('miscro.complaint') }}</div>
					<img src="../assets/a5t.png" class="a5t">
				</div>
			</div>
			<div class="ge102"></div>
			<div class="moerlist by10 bghui">
				<div class="li" @click="logout">
					<img src="../assets/newimg/ico_tuichu.png" class="ico">
					<div class="txt">{{ $t('header.out') }}</div>
					<img src="../assets/a5t.png" class="a5t">
				</div>
			</div>
		</div>
		
		
      
      <div class="footer">
        <Footer active="my"></Footer>
      </div>
    </div>

    <mu-dialog width="100%" transition="slide-bottom" fullscreen :open.sync="openFullscreen">
      <mu-appbar color="primary" :title="getTypeName()">
        <mu-button slot="right" icon @click="openFullscreen=false">
          <mu-icon value=":icon-guanbi"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div style="height: calc(100% - 56px); overflow: auto">
        <div style="padding:20px;" v-for="item in (Object.keys(list).length>0?list[type+'_wallet'].balance:[])">
          <mu-card style="width: 100%; background-image: url('./imgs/img_7.png'); background-size: cover; border-radius: 15px; max-width: 375px; margin: 0 auto;">
            <mu-card-title class="mycard" :title="item.currency_name"
                           :sub-title="'≈' + (item[type+'_balance'] * item.usdt_price).toFixed(2) + ' USDT'"></mu-card-title>
            <mu-card-actions>
              <div class="flex">
                <div class="flex1"  style="color: #fff!important;"><i class="currency_title" style="color: #fff!important;">{{ $t('lever.canuse') }}</i><br/>{{
                    item.currency_name == 'USDT' ? Number(item[type + '_balance']).toFixed(2) : item[type + '_balance']
                  }}
                </div>
                <div class="flex1"  style="color: #fff!important;"><i
                    class="currency_title" style="color: #fff!important;">{{ $t('account.freezes') }}</i><br/>{{
                    item.currency_name == 'USDT' ? Number(item['lock_' + type + '_balance']).toFixed(2) : item['lock_' + type + '_balance']
                  }}
                </div>
              </div>
            </mu-card-actions>
          </mu-card>
        </div>
      </div>
    </mu-dialog>

    <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openRecord">
      <mu-appbar color="primary" :title="$t('miscro.recordWithdrawal') ">
        <mu-button slot="right" icon @click="openRecord=false">
          <mu-icon value=":icon-guanbi"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div style="box-sizing:border-box; height: calc(100% - 56px); overflow: auto;">
        <mu-list textline="two-line">
          <mu-list-item v-for="(item,index) in records" :ripple="false"
                        style="padding: 0; margin: 0; border-bottom: 1px solid #f5f5f5;">

            <mu-list-item-action>
              <mu-avatar color="orange500">
                <div class="ft12">{{ item.currency_name }}</div>
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content class="ml10">
              <mu-list-item-title><span :class="item.value>0?'green':'red'">{{ item.value }}</span>
              </mu-list-item-title>
              <mu-list-item-sub-title>
                {{ item.info }}
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action>
              <i class="currency_title">{{ item.transaction_info }}</i>
              <i class="currency_title">{{ item.created_time }}</i>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </div>
    </mu-dialog>
    <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openBuyRecord">
      <mu-appbar color="primary" :title="'购买记录'">
        <mu-button slot="right" icon @click="openBuyRecord=false">
          <mu-icon value=":icon-guanbi"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div style="box-sizing:border-box; height: calc(100% - 56px); overflow: auto;">
        <mu-list textline="two-line">
          <mu-list-item v-for="(item,index) in buyRecords" :ripple="false"
                        style="padding: 0; margin: 0; border-bottom: 1px solid #f5f5f5;">
            <mu-list-item-content  @click="$router.push('/Detail?id='+item.id)"  class="ml10">
              <mu-list-item-title><span :class="item.status === 2?'green':'blue'">{{ item.usdt_amount }}<span class="currency_title">USDT</span></span>
              </mu-list-item-title>
              <mu-list-item-sub-title>
                <svg class="icon" v-if="item.pay_way==='alipay'" aria-hidden="true">
                  <use xlink:href="#icon-umidd17"></use>
                </svg>
                <svg class="icon"  v-if="item.pay_way==='wechat'" aria-hidden="true">
                  <use xlink:href="#icon-weixinzhifu"></use>
                </svg>
                <svg class="icon"  v-if="item.pay_way==='bank'" aria-hidden="true">
                  <use xlink:href="#icon-yinlian"></use>
                </svg> <a class="currency_title">￥{{ item.amount }}</a>
              </mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action>
              <i class="currency_title">{{ getStatus(item.status) }}</i>
              <i class="currency_title">{{ item.created_at }}</i>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </div>
    </mu-dialog>
  </div>
</template>
<style lang="scss">
	
.mu-dialog-body {
  overflow: auto;
  height: 100%;
}
.mycard{
  .mu-card-title,.mu-card-sub-title{
    color:#fff!important;
  }
}
.my-settings {
  height: 100%;
  overflow: auto;

  .mu-item-action {
    margin-left: 10px;
    min-width: 40px !important;
  }

  .mu-card {
    box-shadow: none !important;
    border-bottom: 1px solid #eee;
  }

  .mu-card-actions {
    text-align: center;
  }

  .mu-flat-button {
    min-width: 108px !important;
  }
}

.button-wrapper {
  text-align: center;

  .mu-button {
    margin: 8px;
    vertical-align: top;
  }
}


</style>
<script>
import BackHeader from "@/components/backHeader";
import Footer from "@/components/Footer";

export default {
  components: {BackHeader, Footer},
  data() {
    let user_id = window.localStorage.getItem('user_id');
    return {
		account_num: window.localStorage.getItem('accountNum'),
      type: 'change',
      user_id: user_id,
      openFullscreen: false,
      list: [],
      total: 0,
      account_num: window.localStorage.getItem('accountNum'),
      openRecord: false,
      records: [],
      openBuyRecord: false,
      buyRecords: [],
      is_seller: false,
	  custorm_url:"",//申请 做币商的URL
    }
  },
  mounted() {
    if (!window.localStorage.getItem('user_id')) {
      this.$router.push('/login');
    }
    this.loadAssets();
	this.loadCenter();
  },
  methods: {
	  getid:function(id){
		 let len=10;
		 let idLen=id.length;
		 let str="";
		 for(let i=0;i<len-idLen;i++){
			 str+="0";
		 }
		 return str+id;
	  },
	  goShop() {
	    window.location.href = 'fiat/shop_fiatrad.html'
	  },
	  goApply() {
	    //window.location.href = this.custorm_url;
	  },
    getStatus(status){
      if(status===-1)
      {
        return this.$t('c2c.canceled');
      }
      if(status===0)
      {
        return '等待付款';
      }
      if(status===1)
      {
        return this.$t('c2c.payed');
      }
      if(status===2)
      {
        return this.$t('c2c.completed');
      }
    },
    addPreZero(num, len = 7) {
      let t = (num + '').length,
          s = '';

      for (let i = 0; i < len - t; i++) {
        s += '0';
      }

      return "1" + s + num;
    },
	
	loadCenter() {
	  let that = this;
	  this.$http({
	    method: 'get',
	    url: '/api/user/center',
	    headers: {
	      Authorization: localStorage.getItem("token")
	    }
	  }).then(res => {
	    if (res.data.type === 'ok') {
	     // that.review_status = res.data.message.review_status;
	      that.is_seller = res.data.message.is_seller;
	    }
	  });
	},
    logout() {
      localStorage.removeItem('user_id');
      localStorage.removeItem('accountNum');
      this.$toast.info('退出成功');
      this.$router.push('/');
    },
    openRecords() {
      const loading = this.$loading();
      let that = this;
      this.$http({
        url: '/api/charge_mention/log?limit=1000',
        method: 'get',
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        loading.close()
        if (res.data.type === 'ok') {
          that.openRecord = true;
          that.records = res.data.message.data
        }
      });
    },
    openBuyRecords() {
      const loading = this.$loading();
      let that = this;
      this.$http({
        url: '/api/legal_buy/log?limit=1000',
        method: 'get',
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        loading.close()
        if (res.data.type === 'ok') {
          that.openBuyRecord = true;
          that.buyRecords = res.data.message.data
        }
      });
    },
    loadAssets() {
      let that = this;
      this.$http({
        url: '/api/wallet/list',
        method: 'post',
        headers: {Authorization: localStorage.getItem("token")}
      }).then(res => {
        that.list = res.data.message;
        that.total = that.list.change_wallet.usdt_totle + that.list.lever_wallet.usdt_totle + that.list.legal_wallet.usdt_totle + that.list.micro_wallet.usdt_totle
      })
    },
    getTypeName() {
      switch (this.type) {
        case "lever":
        case "legal":
        case "change":
          return this.$t('usercenter.' + this.type);
          break;
        case "micro":
          return this.$t('account.letransaction');
          break;
      }
    },
    logout() {
      let that = this;
      this.$confirm(this.$t('header.out') + '?', this.$t('auth2.reminder'), {
        type: 'none',
        okLabel: this.$t('lay.sure'),
        cancelLabel: this.$t('lay.ceil')
      }).then(({result}) => {
        if (result) {
          localStorage.removeItem('user_id');
          localStorage.removeItem('accountNum');
          localStorage.removeItem('token');
          that.$toast.info('退出成功');
          that.$router.push('/');
        } else {
        }
      });
    }
  }
}
</script>