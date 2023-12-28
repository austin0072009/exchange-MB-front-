<template>
  <div class="my-settings">

    <mu-container class="card-radius">
      <mu-card :raised="false" style="width: 100%; max-width: 375px; margin: 0 auto; text-align: left;background: none;">
        <mu-card-header left>
          <div slot="default" style="float: right;
               height: 40px;
               display: flex;
               flex-direction: row;
               align-items: center;">
			   <img src="../assets/ico/close.png" @click="$router.push('/assets')" class="indexico ico_back1">
          </div>
        </mu-card-header>
        <mu-card-media :title="account_num" :sub-title="'ID: '+ addPreZero(user_id)" style="width:100%;">
          <img src="@/assets/img_1.png">
        </mu-card-media>
        <mu-card-actions v-if="false">

          <mu-button @click="$router.push('/recharge')" flat>
            <mu-icon left value=":icon-chongzhi"></mu-icon>
            {{ $t('account.charging') }}
          </mu-button>
          <mu-button @click="$router.push('/withdrawal')" flat>
            <mu-icon left value=":icon-tixian"></mu-icon>
            {{ $t('account.withdraw') }}
          </mu-button>
          <mu-button @click="$router.push('/transfer')" flat>
            <mu-icon left value=":icon-huazhuan2"></mu-icon>
            {{ $t('account.transfer') }}
          </mu-button>
        </mu-card-actions>
      </mu-card>
      <mu-list class="my-settings">
        <mu-list-item @click="named" button :ripple="true">
          <mu-list-item-action>
            <mu-icon color="white" value=":icon-icon"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>{{ $t('shop.truename') }}</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon color="white" :value="getNamed()"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
		<mu-list-item @click="bankd" button :ripple="true">
		    <mu-list-item-action>
		        <mu-icon color="white" value=":icon-zhanghu"></mu-icon>
		    </mu-list-item-action>
		    <mu-list-item-title v-if="!bank.account_number">{{ $t('security.gobind') }}{{ $t('diy.收付款方式') }}</mu-list-item-title>
		    <mu-list-item-title v-else>{{ $t('diy.收付款方式') }}</mu-list-item-title>
		</mu-list-item>
        <mu-list-item @click="$router.push('/share')" button :ripple="true">
          <mu-list-item-action>
            <mu-icon color="white" value=":icon-yaoqinghaoyou"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>{{ $t('sgr.invite') }}</mu-list-item-title>
        </mu-list-item>
        <mu-list-item class="hide" @click="openChild" button :ripple="true">
          <mu-list-item-action>
            <mu-icon color="secondary" value=":icon-gengduo1"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>{{ $t('invite.mypromotion') }}</mu-list-item-title>
        </mu-list-item>
        <mu-list-item v-if="false && is_seller" @click="goShop()" button :ripple="true">
          <mu-list-item-action>
            <mu-icon color="white" value=":icon-zichan"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>{{ $t('shop.myshop') }}</mu-list-item-title>
        </mu-list-item>
        <mu-list-item v-if="false && !is_seller" @click="goApply()" button :ripple="true">
          <mu-list-item-action>
            <mu-icon color="white" value=":icon-zhanghu"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>{{ $t('shop.apply') }}</mu-list-item-title>
        </mu-list-item>
        <mu-list-item @click="$router.push('/feedback')" button :ripple="true">
          <mu-list-item-action>
            <mu-icon color="white" value=":icon-info"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>{{ $t('miscro.complaint') }}</mu-list-item-title>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item v-if="false" @click="$router.push('/forget')" button :ripple="true">
          <mu-list-item-action>
            <mu-icon color="white" value=":icon-mima"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>{{ $t('lgpwd.setpwd') }}</mu-list-item-title>
        </mu-list-item>
        <mu-list-item @click="gokefuto" button :ripple="true">
          <mu-list-item-action>
            <mu-icon color="white" value=":icon-mima"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>{{ $t('lgpwd.setpwd') }}</mu-list-item-title>
        </mu-list-item>
       <!-- <mu-list-item href="http://kefu.uu-chain.com/chat?key=14b6e781a8c1e0a1b57da6509a4b781e" button :ripple="true">
          <mu-list-item-action>
            <mu-icon color="white" value=":icon-weibiaoti-"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>{{ $t('home.kefu') }}</mu-list-item-title>
        </mu-list-item>
        <mu-list-item @click="logout" button :ripple="true">
          <mu-list-item-action>
            <mu-icon color="white" value=":icon-tuichudenglu1"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>{{ $t('header.out') }}</mu-list-item-title>
        </mu-list-item> -->
      </mu-list>
    </mu-container>
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

    <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openExtension">
      <mu-appbar color="primary" :title="$t('invite.mypromotion') ">
        <mu-button slot="right" icon @click="openExtension=false">
          <mu-icon value=":icon-guanbi"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div style="box-sizing:border-box; height: calc(100% - 56px); overflow: auto; padding: 10px;">
        <mu-list>
          <mu-list-item style="border-bottom: 1px solid #f5f5f5;" v-for="(item,index) in users" :ripple="false">
            <mu-list-item-action>
              <mu-badge color="lightBlueA700" :content="index+1"></mu-badge>
            </mu-list-item-action>
            <mu-list-item-title style="font-size: 14px;">{{ item.account }}</mu-list-item-title>
            <mu-list-item-action style="min-width: 120px!important;">
              <i class="currency_title">{{ item.create_date }}</i>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </div>
    </mu-dialog>
	
	
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
.my-settings {
  height: 100%;
  overflow: auto;

  .mu-item-action {
    margin-left: 10px;
    min-width: 40px !important;
  }

  .mu-card {
    box-shadow: none !important;
    //border-bottom: 1px solid #eee;
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

export default {
  components: {BackHeader},
  data() {
    let user_id = window.localStorage.getItem('user_id');
    return {
      openName: false,
      openExtension: false,
      truename: '',
      idcard: '',
      user_id: user_id,
      review_status: -1,
      pic1: '',
      pic2: '',
      account_num: window.localStorage.getItem('accountNum'),
      users: [],
      is_seller: false,
      custorm_url: '',
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
	  }
	  
    }
  },
  mounted() {
    this.loadCenter();
    this.getCustrom();
	this.getcash();
  },
  methods: {
	  
	  bankd() {
	      this.openBank = true;
	  },
    goShop() {
      window.location.href = 'fiat/shop_fiatrad.html'
    },
    goApply() {
      window.location.href = this.custorm_url;
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
        }
      });
    },
    openChild() {
      const loading = this.$loading();
      let that = this;
      this.$http({
        method: 'get',
        url: '/api/user/extension',
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        loading.close();
        if (res.data.type === 'ok') {
          that.openExtension = true
          that.users = res.data.message;
        }
      });
    },
	gokefuto:function(){
		this.$toast.error(this.$t("zhiya.请联系在线客服修改密码"))
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
          that.$toast.error(msg.message)
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
          that.$toast.error(msg.message)
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
          that.$toast.error(msg.message)
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
          that.$toast.error(msg.message)
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
          that.$toast.success(res.data.message);
          that.loadCenter();
        } else {
          that.$toast.error(res.data.message);
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
	            that.$toast.success(res.data.message);
	            that.openBank = false;
	            that.loadCenter();
				that.getcash();
	        } else {
	            that.$toast.error(res.data.message);
	        }
	    })
	},
    named() {
      if (this.review_status === 0) {
        this.openName = true;
      }
      if (this.review_status === 2) {
        this.$toast.success(this.$t('auth2.complete'))
        return;

      }
      if (this.review_status === 1) {
        this.$toast.message(this.$t('security.auing'))
      }
    },
    getCustrom() {
      var that = this;
      this.$http({
        url: '/api/custorm?terminal=recharge',
        method: 'get',
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        that.custorm_url = res.data
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
    getNamed() {
      if (this.review_status === 0) {
        return ":icon-weishiming"
      }
      if (this.review_status === 1) {
        return ":icon-dengdai"
      }
      if (this.review_status === 2) {
        return ":icon-renzheng"
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
          that.$toast.info('2');
          that.$router.push('/');
        } else {
        }
      });
    }
  }
}
</script>