<template>
  <div class="my-settings myxxbox">
    <div class="home flex flex-column">
		<!-- <div class="myheader">{{$t("header.center")}}</div> -->
		<div class="flex1 overYauto pdlr15">
			<div class="ge102"></div>
			<div class="myinfo bghui by10 tl pdlr20 pdtb20 flex flex-center">
				<img src="../assets/newimg/tx002.png" class="myavatar">
				<div class="txt">
				    <div class="name">{{account_num}}</div>
					<div class="id">ID：{{user_id}}</div>
					<div class="id">{{$t("diy.总资产")}}<em>≈</em><b>${{total.toFixed(2)}}</b></div>
				</div>
			</div>
			<div class="ge102"></div>
			<div class="btngroup bghui by10 pdtb10">
				<div class="li">
					<div class="wpp" @click="$router.push('/recharge')">
						<img src="../assets/user/ico_cb.png">
						<div class="txt">{{ $t('account.charging') }}</div>
					</div>
				</div>
				<div class="li">
					<div class="wpp" @click="$router.push('/withdrawal')">
						<img src="../assets/user/ico_tb.png">
						<div class="txt">{{ $t('account.withdraw') }}</div>
					</div>
				</div>
				<div class="li">
					<div class="wpp" @click="$router.push('/transfer')">
						<img src="../assets/user/ico_hz.png">
						<div class="txt">{{ $t('account.transfer') }}</div>
					</div>
				</div>
				<div class="li">
					<div class="wpp" @click="$router.push('/zichan')">
						<img src="../assets/user/ico_zc.png">
						<div class="txt">{{ $t('miscro.assetCenter') }}</div>
					</div>
				</div>
			</div>
			<div class="ge102"></div>
			<div class="moerlist by10 bghui">
				<div class="li" @click="$router.push({name:'deposit_record'})">
					<!-- openRecords -->
					<img src="../assets/user/ico_jl.png" class="ico">
					<div class="txt">{{ $t('miscro.recordWithdrawal') }}</div>
					<img src="../assets/a5t.png" class="a5t">
				</div>
				<!--商家-->
				<!-- <div class="li" v-if="is_seller" @click="goShop()">
					<img src="../assets/user/ico_shop.png" class="ico">
					<div class="txt">{{ $t('shop.myshop') }}</div>
					<img src="../assets/a5t.png" class="a5t">
				</div> -->
				<!-- <div class="li" @click="goShop()">
					<img src="../assets/user/ico_shop.png" class="ico">
					<div class="txt">{{ $t('apitip.在线出售购买货币') }}</div>
					<img src="../assets/a5t.png" class="a5t">
				</div> -->
				<div class="li" @click="named">
					<img src="../assets/user/ico_sm.png" class="ico">
					<div class="txt">{{ $t('shop.truename') }}</div>
					<img src="../assets/a5t.png" class="a5t" v-if="!review_status">
					<img src="../assets/newimg/asz2.png" class="a5t2" v-if="review_status==1">
					<img src="../assets/newimg/asz.png" class="a5t2" v-if="review_status==2">
				</div>
				<!-- <div class="li" @click="bankd">
					<img src="../assets/user/ico_sfk.png" class="ico">
					<div class="txt">{{ $t('diy.收付款方式') }}</div>
					<img src="../assets/a5t.png" class="a5t">
				</div> -->
				<div class="li" @click="$router.push({name:'Forget'})">
					<img src="../assets/user/ico_mm.png" class="ico">
					<div class="txt">{{ $t('lgpwd.setpwd') }}</div>
					<img src="../assets/a5t.png" class="a5t">
				</div>
			</div>
			
			<div class="ge102"></div>
			<div class="moerlist by10 bghui">
				<div class="li" @click="$router.push('/share')">
					<img src="../assets/user/ico_fx.png" class="ico">
					<div class="txt">{{ $t('sgr.invite') }}</div>
					<img src="../assets/a5t.png" class="a5t">
				</div>
				<div class="li" @click="$router.push('/onlineServer')">
					<img src="../assets/user/ico_kf.png" class="ico">
					<div class="txt">{{ $t('home.kefu') }}</div>
					<img src="../assets/a5t.png" class="a5t">
				</div>
				<div class="li" @click="$router.push('/feedback')">
					<img src="../assets/user/ico_ts.png" class="ico">
					<div class="txt">{{ $t('miscro.complaint') }}</div>
					<img src="../assets/a5t.png" class="a5t">
				</div>
				<!-- <div class="li" @click="gokf">
					<img src="../assets/user/ico_kf.png" class="ico">
					<div class="txt">{{ $t('home.kefu') }}</div>
					<img src="../assets/a5t.png" class="a5t">
				</div> -->
			</div>
			<div class="ge102"></div>
			<div class="moerlist by10 bghui">
				<div class="li" @click="logout">
					<img src="../assets/newimg/ico_tuichu.png" class="ico">
					<div class="txt">{{ $t('header.out') }}</div>
					<img src="../assets/a5t.png" class="a5t">
				</div>
			</div>
			<div class="ge102"></div>
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
	
	<!--实名认证-->
	<mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openName" class="bg000">
	  <mu-appbar color="black" :title="$t('shop.truename')">
	    <mu-button slot="right" icon @click="openName=false">
	      <mu-icon value=":icon-guanbi"></mu-icon>
	    </mu-button>
	  </mu-appbar>
	  <div style="padding: 24px;">
	    <mu-text-field full-width :label="$t('auth.truename')" v-model="truename"></mu-text-field>
	    <mu-text-field full-width :label="$t('auth.truenum')" v-model="idcard"></mu-text-field>
	    <div class="currency_title" style="margin:0;">{{ $t('auth.note') }}</div>
	    <div class="flex alcenter mb15 mt15">
	      <div class="flex1 talc">
	        <mu-icon v-if="pic1===''" size="72" @click="upload1" color="#eee" value=":icon-jia"></mu-icon>
	        <mu-avatar @click="upload1" v-if="pic1!==''" size="72">
	          <img :src="pic1">
	        </mu-avatar>
	        <input type="file" @change="uploadFile1" ref="uploadprev" style="display: none;"></input>
	      </div>
	      <div class="flex1 talc">
	        <mu-icon v-if="pic2===''" ref="uploadback" @click="upload2" size="72" color="#eee"
	                 value=":icon-jia"></mu-icon>
	        <mu-avatar @click="upload2" v-if="pic2!==''" size="72">
	          <img :src="pic2">
	        </mu-avatar>
	        <input type="file" @change="uploadFile2" ref="uploadback" style="display: none;"></input>
	      </div>
	    </div>
	    <div>
	      <mu-button @click="submit" full-width color="primary">{{ $t('auth.up') }}</mu-button>
	    </div>
	  </div>
	</mu-dialog>
	<!--收付款方式-->
	<mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openBank" class="bg000">
		<div class="h100f" style="display: flex;flex-direction: column;">
			<mu-appbar color="primary" :title="$t('diy.收付款方式')" style="width:100%">
			    <mu-button slot="right" icon @click="openBank=false">
			        <mu-icon value=":icon-guanbi"></mu-icon>
			    </mu-button>
			</mu-appbar>
			<div style="padding: 24px;" class="h100auto">
			    <mu-text-field full-width :label="$t('auth.truename')" v-model="bank.real_name"></mu-text-field>
			    <mu-text-field full-width :label="$t('legal.bankName')" v-model="bank.bank_name"></mu-text-field>
			    <mu-text-field full-width :label="$t('legaltrade.enterzhihang')" v-model="bank.bank_branch"></mu-text-field>
			    <mu-text-field full-width :label="$t('legal.cardnum')" v-model="bank.bank_account"></mu-text-field>
			    <mu-text-field full-width :label="$t('diy.支付宝账号')" v-model="bank.alipay_account"></mu-text-field>
			    <mu-text-field full-width :label="$t('diy.微信号')" v-model="bank.wechat_account"></mu-text-field>
			    <mu-text-field full-width :label="$t('diy.微信昵称')" v-model="bank.wechat_nickname"></mu-text-field>
				<div class="uploadbox">
					<div class="upone">
						<div class="bit">{{$t('diy.支付宝收款二维码')}}</div>
						<div class="upimgbox">
							<div class="flex1 talc">
								<img src="../assets/addimg.png" class="qrimg1" v-if="!bank.alipay_qr_code" @click="uploadAl">
							  <img :src="bank.alipay_qr_code" class="qrimg" @click="uploadAl" v-if="bank.alipay_qr_code">
							  <input type="file" @change="uploadFileAl" ref="uploadAl" style="display: none;"></input>
							</div>
						</div>
					</div>
					<div class="upone">
						<div class="bit">{{$t('diy.微信收款二维码')}}</div>
						<div class="upimgbox">
							<div class="flex1 talc">
								 <img src="../assets/addimg.png" class="qrimg1" v-if="!bank.wechat_qr_code" @click="uploadWx">
								<img :src="bank.wechat_qr_code" class="qrimg" @click="uploadWx" v-if="bank.wechat_qr_code">
							  <input type="file" @change="uploadFileWx" ref="uploadWx" style="display: none;"></input>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div>
	            <mu-button @click="banksubmit" full-width color="primary" v-if="bank.bank_account">{{ $t('auth.up') }}</mu-button>
	            <mu-button :disabled="true" full-width color="primary" v-else>{{ $t('auth.up') }}</mu-button>
	        </div>
		</div>
	    
	        
	</mu-dialog>
  </div>
</template>
<style lang="scss">
	.uploadbox{display: flex;flex-direction: row;text-align: center;font-size: 12px;}
	.uploadbox .upone{flex: 1;}
	.uploadbox .qrimg1{width: 100px;height: 100px;}
	.uploadbox .qrimg{width: 100px;height: 100px;}
	.uploadbox .bit{height: 30px;}
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
		openRecord: false,
		records: [],
		openBuyRecord: false,
		buyRecords: [],
		is_seller: false,
		custorm_url:"",//申请 做币商的URL
		review_status:-1,
		openName: false,
		openExtension: false,
		truename: '',
		idcard: '',
		pic1: '',
		pic2: '',
		users: [],
		openBank:false,
		bank:{
				"bank_id": 0,
				"bank_name": "",
				"bank_branch": "",
				"bank_account": "",
				"real_name": "",
				"alipay_account": "",
				"wechat_nickname": "",
				"wechat_account": "",
				"alipay_qr_code": "",
				"wechat_qr_code": "",
				"account_number": ""
		},
        kf:""
    }
  },
   created(){
      this.$http.get("/api/cfg/kefu").then(res => {
              this.custorm_url=res.data.message.appdown.android
              this.kf=res.data.message.mobile
       });
  },
  mounted() {
    if (!window.localStorage.getItem('user_id')) {
      this.$router.push('/login');
    }
    this.loadAssets();
	this.loadCenter();
	this.getcash();
  },
  methods: {
      gokf(){
          window.location.href=this.kf
      },
	  bankd() {
	      this.openBank = true;
	  },
	  upload1() {
	    this.$refs.uploadprev.dispatchEvent(new MouseEvent("click"));
	  },
	  upload2() {
	    this.$refs.uploadback.dispatchEvent(new MouseEvent("click"));
	  },
	  uploadAl() {
	    this.$refs.uploadAl.dispatchEvent(new MouseEvent("click"));
	  },
	  uploadWx() {
	    this.$refs.uploadWx.dispatchEvent(new MouseEvent("click"));
	  },
	  uploadFileAl(e) {
	    let that = this;
	  
	    const loading = this.$loading();
	  
	    // that.loading = true;
	    let reader = new FileReader();
	    // console.log(window.event.target.files[0]);
	    let file = e.target.files[0];
	  
	    reader.readAsDataURL(file);
	    reader.onload = function (ed) {
	    };
	    let formData = new FormData();
	    formData.append("file", file);
	    this.$http.post("/api/upload", formData, {
	      headers: {
	        "Content-Type": "multipart/form-data"
	      }
	    }).then(res => {
	      loading.close()
	      let msg = res.data;
	      if (msg.type === 'ok') {
	        that.bank.alipay_qr_code = msg.message
	      } else {
	        that.$toast.error(that.$t("apitip."+res.data.message))
	      }
	    });
	  },
	  uploadFileWx(e) {
	    let that = this;
	  
	    const loading = this.$loading();
	  
	    // that.loading = true;
	    let reader = new FileReader();
	    // console.log(window.event.target.files[0]);
	    let file = e.target.files[0];
	  
	    reader.readAsDataURL(file);
	    reader.onload = function (ed) {
	    };
	    let formData = new FormData();
	    formData.append("file", file);
	    this.$http.post("/api/upload", formData, {
	      headers: {
	        "Content-Type": "multipart/form-data"
	      }
	    }).then(res => {
	      loading.close()
	      let msg = res.data;
	      if (msg.type === 'ok') {
	        that.bank.wechat_qr_code = msg.message
	      } else {
	        that.$toast.error(that.$t("apitip."+res.data.message))
	      }
	    });
	  },
	  uploadFile1(e) {
	    let that = this;
	  
	    const loading = this.$loading();
	  
	    // that.loading = true;
	    let reader = new FileReader();
	    // console.log(window.event.target.files[0]);
	    let file = e.target.files[0];
	  
	    reader.readAsDataURL(file);
	    reader.onload = function (ed) {
	    };
	    let formData = new FormData();
	    formData.append("file", file);
	    this.$http.post("/api/upload", formData, {
	      headers: {
	        "Content-Type": "multipart/form-data"
	      }
	    }).then(res => {
	      loading.close()
	      let msg = res.data;
	      if (msg.type === 'ok') {
	        that.pic1 = msg.message
	      } else {
	        that.$toast.error(that.$t("apitip."+res.data.message))
	      }
	    });
	  },
	  uploadFile2(e) {
	    let that = this;
	  
	    const loading = this.$loading();
	  
	    // that.loading = true;
	    let reader = new FileReader();
	    // console.log(window.event.target.files[0]);
	    let file = e.target.files[0];
	  
	    reader.readAsDataURL(file);
	    reader.onload = function (ed) {
	    };
	    let formData = new FormData();
	    formData.append("file", file);
	    this.$http.post("/api/upload", formData, {
	      headers: {
	        "Content-Type": "multipart/form-data"
	      }
	    }).then(res => {
	      loading.close()
	      let msg = res.data;
	      if (msg.type === 'ok') {
	        that.pic2 = msg.message
	      } else {
	        that.$toast.error(that.$t("apitip."+res.data.message))
	      }
	    });
	  },
	  submit() {
	    const loading = this.$loading();
	    let that = this;
	    this.$http({
	      url: '/api/user/real_name',
	      method: 'post',
	      data: {
	        name: this.truename,
	        card_id: this.idcard,
	        front_pic: this.pic1,
	        reverse_pic: this.pic2
	      },
	      headers: {
	        Authorization: localStorage.getItem("token")
	      }
	    }).then(res => {
	      loading.close();
	      if (res.data.type === 'ok') {
			  that.openName=false;
	        that.$toast.success(that.$t("apitip."+res.data.message));
	        that.loadCenter();
	      } else {
	        that.$toast.error(that.$t("apitip."+res.data.message));
	      }
	    })
	  },
	  
	  getcash() {
	    var that = this;
	    this.$http({
	      url: '/api/user/cash_info',
	      method: 'post',
	      headers: {
	        Authorization: localStorage.getItem("token")
	      }
	    }).then(res => {
	  	  //console.log(JSON.stringify(res.data.message))
	  	  if(res.data.message.account_number){
	  		  that.bank = res.data.message
	  	  }
	      
	    })
	  },
	  banksubmit() {
	      const loading = this.$loading();
	      let that = this;
	      this.$http({
	          url: '/api/user/cash_save',
	          method: 'post',
	          data: this.bank,
	          headers: {
	              Authorization: localStorage.getItem("token")
	          }
	      }).then(res => {
	          loading.close();
	          if (res.data.type === 'ok') {
	              that.$toast.success(that.$t("apitip."+res.data.message));
	              that.openBank = false;
	              that.loadCenter();
	  			that.getcash();
	          } else {
	              that.$toast.error(that.$t("apitip."+res.data.message));
	          }
	      })
	  },
	  named() {
	    if (this.review_status === 0) {
	      this.openName = true;
	    }
	    if (this.review_status === 2) {
	      this.$toast.success(this.$t('auth2.complete'))
		  this.$router.push({name:'confirmPage'});
	      return;
	  
	    }
	    if (this.review_status === 1) {
	      this.$toast.error(this.$t('security.auing'))
	    }
	  },
	  upmypass:function(){
		  this.$toast.error(this.$t("zhiya.请联系在线客服修改密码"))
	  },
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
	    //window.location.href = 'fiat/shop_fiatrad.html'
		 window.location.href = 'https://paxful.com/buy-ethereum'
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
	      that.review_status = res.data.message.review_status;
	      that.is_seller = res.data.message.is_seller;
          that.kf=res.data.message.kefu_url.mobile
	    }
	  });
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
          this.$toast.info(this.$t("apitip.退出登录成功"));
          that.$router.push('/');
        } else {
        }
      });
    }
  }
}
</script>