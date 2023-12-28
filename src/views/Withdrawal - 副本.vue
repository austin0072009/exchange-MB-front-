<template>
  <div>
    <mu-container>
      <mu-appbar v-if="false" style="width: 100%;" color="primary">
        <!--        <mu-button icon flat slot="left">-->

        <!--        </mu-button>-->
        {{ $t('account.withdraw') }}
        <mu-button @click="$router.back(-1)" icon flat slot="right">
          <mu-icon value=":icon-guanbi"></mu-icon>
        </mu-button>
      </mu-appbar>

      <mu-appbar style="width: 100%;" color="#20232b" text-color="#fff">
        {{ $t('account.withdraw') }}
        <mu-button @click="$router.back(-1)" icon flat slot="left">
          <mu-icon value=":icon-fanhui4"></mu-icon>
        </mu-button>
        <mu-button icon flat slot="right">
        </mu-button>
      </mu-appbar>

      <mu-list>
        <mu-list-item @click="openFullscreen=true" button :ripple="false">
          <mu-list-item-title>{{ charge }}</mu-list-item-title>
          <mu-list-item-action style="width: 200px;">
            <div class="flex" style="align-items: center">
              <span>{{ $t('account.choosecoin') }}</span>
              <mu-icon value=":icon-xiangqing"></mu-icon>
            </div>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list>

      <div v-if="charge=='USDT'" class="flex mb5">
        <div class="flex1"></div>
        <div @click="active=0" class="tabbt" :class="active===0?'active':''">
          ERC20
        </div>
        <div @click="active=1" class="tabbt" :class="active===1?'active':''">
          TRC20
        </div>
        <div @click="active=2" class="tabbt" :class="active===2?'active':''">
          OMNI
        </div>
        <div class="flex1"></div>
      </div>
      <div style="padding:0 20px;">
        <mu-text-field style="width: 100%;"
                       :label="$t('dep.ti_num')" :suffix="charge" v-model="wallets.change_balance"
                       readonly=""></mu-text-field>
        <mu-text-field style="width: 100%; margin-bottom: 20px!important;" :help-text="$t('wAddress.nospace')"
                       :label="$t('wAddress.enterAddress')" v-model="address"></mu-text-field>
        <mu-text-field style="width: 100%; margin-bottom: 20px!important;"
                       :help-text="$t('lever.rate')+':'+wallets.rate + charge"
                       :label="$t('withdrawList.tibiNum')"
                       :suffix="charge" v-model="number">
          <span class="subtitle" slot="append" color="primary" @click="alltixian"
                style="margin-left: 10px; border-left: 1px solid #888; padding-left: 10px;">{{ $t('lever.all') }}
          </span>
        </mu-text-field>
        <div class="currency_title tall" style="line-height: 30px; margin-left: 0;">{{ $t('account.havenum') }} <b
            style="color:#1976d2">{{number - wallets.rate < 0 ? 0 : number - wallets.rate}}</b> {{ charge }}
        </div>
        <mu-button full-width slot="append" @click="openAlert=true" color="primary"
                   style="background: linear-gradient(to right, #218adc , #55c2ff);">{{ $t('account.withdraw') }}
        </mu-button>
        <p class="tall hide">
          <i class="currency_title">
            {{ $t('account.a10') }}
          </i></p>
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
		  <mu-divider></mu-divider>
          <mu-list-item @click="charge='TRX';openFullscreen=false" button :ripple="true">
            <mu-list-item-title>TRX</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon v-if="charge=='TRX'" color="primary" value=":icon-chenggong1"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
		  <mu-divider></mu-divider>
          <mu-list-item @click="charge='DOGE';openFullscreen=false" button :ripple="true">
            <mu-list-item-title>DOGE</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon v-if="charge=='DOGE'" color="primary" value=":icon-chenggong1"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
		  <mu-divider></mu-divider>
          <mu-list-item @click="charge='BCH';openFullscreen=false" button :ripple="true">
            <mu-list-item-title>BCH</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon v-if="charge=='BCH'" color="primary" value=":icon-chenggong1"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
		  
		  
		  
        </mu-list>
      </div>
    </mu-dialog>
  </div>
</template>

<script>

import Clipboard from "clipboard"

export default {
  name: "Withdrawal",
  data() {
    return {
      openFullscreen: true,
      charge: "USDT",
      openAlert: false,
      active: 0,
      wallets: [],
      qrccode: false,
      address: "",
      number: 0,
      pic: '',
      select: '',
      selected: '',
      loading: false,
      currency: 1,
      obj: {
        'LTC': 6,
        'BTC': 1,
        'USDT': 3,
        'ETH': 2,
        'BCH': 10,
        'XRP': 5,
      },
	allbis:[]
    }
  },
  watch: {
    charge(val) {
      this.currency = this.obj[val];// === 'BTC' ? 1 : 3
      this.number = 0
      this.address = ''
      this.getWallets()
    }
  },
  mounted() {
    this.currency = this.charge === 'BTC' ? 1 : 3
    this.getaiibi()
    this.select = this.$t('account.select')
    this.selected = this.$t('account.selected')
  },
  methods: {
	  //获取所有币种
	getaiibi:function(){
		const loading = this.$loading();
		let that = this;
		this.$http({
		  url: '/api/wallet/list',
		  method: 'post',
		  data: {},
		  headers: {
		    Authorization: localStorage.getItem('token')
		  }
		}).then(res => {
		  loading.close();
		  if (res.data.type === 'ok') {
			  let allbis=res.data.message.change_wallet.balance;
			  for(let i=0;i<allbis.length;i++){
				  let o={
					  id:allbis[i].currency,
					  name:allbis[i].currency_name
				  }
				  this.allbis.push(o)
			  }
		  }
		})
	},
    choosePic() {
      this.$refs.uploads.dispatchEvent(new MouseEvent("click"));
    },
    alltixian() {
      this.number = parseFloat(this.wallets.change_balance)
    },
    getWallets() {
      const loading = this.$loading();
      let that = this;
      this.$http({
        url: '/api/wallet/get_info',
        method: 'post',
        data: {
          currency: this.currency,
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        loading.close();
        if (res.data.type === 'ok') {
          that.wallets = res.data.message;
        }
      })
    },
    submit() {
      let that = this;
      const loading = this.$loading();
      this.$http({
        url: '/api/wallet/out',
        method: 'post',
        data: {
          currency: this.charge === 'BTC' ? 1 : 3,
          address: this.address,
          number: this.number,
          type: this.active,
          rate: this.wallets.rate
        },
        headers: {Authorization: localStorage.getItem('token')}
      }).then(res => {
        loading.close();
        that.openAlert = false;
        if (res.data.type === 'ok') {
          that.$toast.success(res.data.message);
          that.address = '';
          that.number = '';
        } else {
          that.$toast.error(res.data.message);
        }
      })
    },
    copy() {
      let that = this;
      let clipboard = new Clipboard('.copy');
      clipboard.on('success', res => {
        that.$toast.success(that.$t('lay.copys'))
        res.clearSelection();
        clipboard.destroy();
      })

      clipboard.on('error', res => {
        that.$toast.warning(that.$t('lay.fcopy'))
      })
    }
  }
}
</script>

<style lang="scss">
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

.mu-demo-form {
  width: 100%;
  max-width: 460px;
}
</style>