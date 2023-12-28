<template>
  <div style="height: 100%;">
    <mu-container style="height: 100%;">
      <mu-appbar style="width: 100%;" color="#20232b" text-color="#fff">
        {{ $t('account.charging') }}
        <mu-button @click="$router.back(-1)" icon flat slot="left">
          <mu-icon value=":icon-fanhui4"></mu-icon>
        </mu-button>
        <mu-button icon flat slot="right" v-if="!showc">
          <mu-icon value=":icon-fanhui40"></mu-icon>
        </mu-button>
        <mu-button icon flat slot="right" @click="showc=false" v-if="showc">
          <mu-icon value=":icon-qiehuan"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div  class="flex flex-column" style="overflow: auto; height: calc(100% - 56px);" v-if="!showc">
          <div class="ctypebox0">
              <div class="ctypebox">
                  <div class="li flex flex-row alcenter" v-for="(item,index) in ads" @click="toshow(index)">
                     <img :src="'/images/currency/'+item.toLowerCase()+'.png'" class="ico"><div class="flex1">{{item}}</div>
                     <img src="../assets/a5t.png" class="r">
                  </div>
              </div>
          </div>
          
      </div>
     <div class="flex flex-column alcenter" style="overflow: auto; height: calc(100% - 56px);" v-if="showc">
     		  <div class="seltabsbox">
     		  			<div class="li" @click="selint(index,item.currency_id,item.currency)" :class="index==selindex?'cur':''" v-for="(item,index) in address" v-if="item.currency==selc">{{item.title}}</div>
     		  	</div>
     		  	
     		  	<div class="qrcodebox">
     		  		  <div class="" v-for="(item,index) in address">
     		  			  <img :src="item.qrcode" v-show="selindex==index" class="qr2img">
     		  			  <div class="center address" v-show="selindex==index">{{item.address}}</div>
     		  			  <div style="text-align: center;"><button class="copy"  flat :data-clipboard-text="item.address"  v-show="selindex==index"  @click="copy">{{ $t('account.copy') }}</button></div>
     		  			  
     		  		  </div>
     		  	</div>
     			<div style="padding:0 20px;">
     			  <mu-text-field  style="width: 100%;" :label="$t('account.cgaddress')" v-show="false"
     			                 v-model="acc"></mu-text-field>
     			  <mu-text-field style="width: 100%;" :label="$t('withdrawList.hash')" v-show="false"
     			                 v-model="hash"></mu-text-field>
     			  <mu-text-field style="width: 100%;" :label="$t('account.amount')"
     			                 :suffix="charge"
     			                 v-model="amount"></mu-text-field>
     			  <mu-text-field   readonly="" v-model="pic===''?select:selected" style="width: 100%;"
     			                 :label="$t('account.picture')">
     			    <mu-button flat full-width slot="append" color="primary" @click="choosePic">{{ $t('account.choose') }}
     			    </mu-button>
     			  </mu-text-field>
     			  <mu-button full-width @click="submit" color="primary"
     			             style="background: linear-gradient(to right, #218adc , #55c2ff);">
     			    {{ $t('account.submitRecharge') }}
     			  </mu-button>
     			  <p class="tall hide">
     			    <i class="currency_title">
     			      {{ $t('account.a10') }}
     			    </i></p>
     			  <input id="picture" @change="uploadFile" ref="uploads" type="file" style="display:none;"></input>
     			  <div class="rtips" v-for="(item,index) in address">
     			  	<div class="tipsboxx" v-show="selindex==index">
     			  							  <div v-html="tihaun(item.tips)"></div>
     			  			  </div>
     			  </div>
     			</div>
     </div>
    </mu-container>
    <mu-dialog title="Tips" width="600" max-width="80%" :esc-press-close="false"
               :overlay-close="false" :open.sync="openAlert">
      {{ $t('lay.confirm') }}
      <mu-button slot="actions" flat color="primary" @click="openAlert=false">{{ $t('lay.ceil') }}</mu-button>
      <mu-button slot="actions" flat color="primary" @click="submit">{{
          $t('lay.sure')
        }}
      </mu-button>
    </mu-dialog>
    <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openFullscreen" class="bg000">
      <mu-appbar color="primary" :title="$t('account.choosecoin')">
        <mu-button slot="left" icon @click="$router.back(-1)">
          <mu-icon value=":icon-fanhui4"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div style="padding: 0px 0;">
        <mu-list>
          <mu-list-item button @click="charge='BTC';active=0;openFullscreen=false" :ripple="true">
            <mu-list-item-title>BTC</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon v-if="charge=='BTC'" color="primary" value=":icon-chenggong1"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
          <mu-divider></mu-divider>
          <mu-list-item @click="charge='USDT';openFullscreen=false" button :ripple="true">
            <mu-list-item-title>USDT</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon v-if="charge=='USDT'" color="primary" value=":icon-chenggong1"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
          <mu-divider></mu-divider>
          <mu-list-item @click="charge='ETH';openFullscreen=false" button :ripple="true">
            <mu-list-item-title>ETH</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon v-if="charge=='ETH'" color="primary" value=":icon-chenggong1"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </div>
    </mu-dialog>
  </div>
</template>

<script>

import QRCode from 'qrcodejs2'
import Clipboard from "clipboard"

export default {
  name: "Recharge",
  data() {
    return {
		userchongbi_type:"",
        selc:"USDT",
        showc:false,
        ads:[],
      charge: 'USDT',
      openFullscreen: false,
      openAlert: false,
      active: 0,
      wallets: [],
      usdt_wallet: [],
      qrccode: false,
      acc: 'default',
      amount: '',
      hash: 'default',
      pic: '',
      select: '',
      selected: '',
      loading: false,
      fullLoading: false,
      obj: {
        'LTC': 6,
        'BTC': 1,
        'USDT': 3,
        'ETH': 2,
        'BCH': 10,
        'XRP': 5,
      },
	  address:[],
	  currency:"USDT",
	  autoin_tips:"",
	  selindex:0,
	  address2:""
    }
  },
  watch: {
    active(val) {
      // let url = this.wallets[Object.keys(this.wallets)[val]];
      // this.qrcode(url);
    },
    charge(val) {
      //this.getWallets();
    }
  },
  mounted() {
    this.getWallets()
    this.select = this.$t('account.select')
    this.selected = this.$t('account.selected')
  },
  methods: {
      toshow:function(index){
          this.selc=this.ads[index];
          for(let i=0;i<this.address.length;i++){
              if(this.address[i].currency==this.selc){
                  this.selint(i,this.address[i].currency_id,this.address[i].currency);
                this.showc=true;
                  break;
              }
          }
          
      },
	  selint:function(index, currency_id,currency){
	  	this.currency_id=currency_id;
	  	this.selindex=index;
	  	this.charge=currency;
        console.log(this.charge)
	  },
	  tihaun:function(str){
	  		  let bi=this.currency;
	  		  return str.replace("<币种名称>",bi);
	  },
    choosePic() {
      this.$refs.uploads.dispatchEvent(new MouseEvent("click"));
    },
    uploadFile(e) {
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
        if (msg.type == 'ok') {
          that.pic = msg.message
        } else {
          that.$toast.error(msg.message)
        }
      });
    },
    getWallets() {
      const loading = this.$loading();

      let that = this;
      this.$http({
        url: '/api/wallet/cbaddress',
        method: 'post',
		contentType: false,
        data: {
			currency: this.obj[this.charge],
			lang:localStorage.getItem("lang")?localStorage.getItem("lang"):"en"
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {

        loading.close();
        if (res.data.type === 'ok') {
          let userchongbi_type=res.data.message.userchongbi_type;
          that.userchongbi_type=userchongbi_type;
          that.address =res.data.message.address;
          that.ads=res.data.message.ads
          if(userchongbi_type==2){
          	that.autoin_tips=res.data.message.tips;
          }else{
        	  this.currency_id=this.address[0].currency_id;
        	  this.selindex=0;
        	  this.charge=this.address[0].currency;
          }
        }
      })
    },
    copy() {
      let that = this;
      let clipboard = new Clipboard('.copy');
      //console.log(clipboard);
      clipboard.on('success', res => {
        that.$toast.success(that.$t('lay.copys'))
        res.clearSelection();
        clipboard.destroy();
      })

      clipboard.on('error', res => {
        that.$toast.warning(that.$t('lay.fcopy'))
      })
    },
    qrcode(url) {
      this.$refs.qrcode.innerHTML = ''
      this.qrccode = new QRCode('qrcode', {
        width: 150,
        height: 150,
        text: url, // 二维码地址
      })
    },
    submit() {
		//console.log(this.currency_id)
		let type="";
		this.acc=this.address[this.selindex].title;
		//return;
		if(!this.amount*1 || !this.pic){
			 this.$toast.error(this.$t("apitip.参数错误"));
			return;
		}
      let that = this;
      const loading = this.$loading();
      this.$http({
        url: '/api/wallet/charge_req',
        method: 'post',
        data: {
          currency: this.currency_id,
          type:type,
          acc: this.acc,
          amount: this.amount,
          pic: this.pic,
          hash: this.hash
        },
        headers: {Authorization: localStorage.getItem('token')}
      }).then(res => {
        loading.close();
        that.openAlert = false;
        if (res.data.type === 'ok') {
          that.$toast.success(res.data.message);
          that.pic = '';
          //that.acc = '-';
          that.amount = '';
          //that.hash = '';
        } else {
          that.$toast.error(res.data.message);
        }
      })
    }
  }
}
</script>

<style lang="scss">
    .ctypebox0{padding: 15px;}
    .ctypebox{background: #fff;border-radius: 6px;overflow: hidden;}
    .ctypebox .li{padding:8px 15px;border-bottom: 1px solid #f3f4f5;}
    .ctypebox .li .ico{display: block;width: 36px;height: 36px;border-radius: 50%;background: #f1fff1;}
    .ctypebox .li .r{width:9px;height: 15px;}
    .ctypebox .li .flex1{color: #333;text-align: left;padding-left: 10px;font-size: 16px;}
    
#qrcode {
  margin: 20px;

  canvas {
    display: none;
  }

  img {
    margin: 0 auto;
    width: 50%;
  }
}
.qr2img{display: block;margin:15px auto;padding:4px;border: 1px solid #e4e4e4;border-radius: 4px;width: 240px;height: 240px;}
.tabbt {
  padding: 4px 20px;
  border: 1px solid #eee;
  margin: 0 5px;
  border-radius: 5px;

  &.active {
    border-color: #0081cc;
  }
}

.mu-demo-form {
  width: 100%;
  max-width: 460px;
}
.tipsboxx{text-align: justify;text-align-last: left;padding:10px 20px;}
.tipsboxx .br{margin:3px 0;height: 1px;display: block;}
.seltabsbox{padding:10px 15px 0 15px;}
.seltabsbox .li{background: #eee;white-space: nowrap;border-radius: 3px;padding:0 10px;line-height: 30px;color: #888;display: inline-block;margin: 5px;}
.seltabsbox .li.cur{background: #007AFF;color:#fff;}
.seltabsbox .li:first-child{margin-left: auto;}
.seltabsbox .li:last-child{margin-right: auto;}
</style>