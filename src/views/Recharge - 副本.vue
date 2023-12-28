<template>
  <div style="height: 100%;">
    <mu-container style="height: 100%;">
      <mu-appbar style="width: 100%;" color="#20232b" text-color="#fff">
        {{ $t('account.charging') }}
        <mu-button @click="$router.back(-1)" icon flat slot="left">
          <mu-icon value=":icon-fanhui4"></mu-icon>
        </mu-button>
        <mu-button icon flat slot="right">
          <mu-icon value=":icon-fanhui40"></mu-icon>
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
      <div v-if="charge=='USDT'" class="flex">
        <div class="flex1"></div>
        <div @click="active=index" class="tabbt" :class="active===index?'active':''"
             v-for="(name,index) in Object.keys(charge=='USDT'?usdt_wallet:wallets)">
          {{ name.toUpperCase() }}
        </div>
        <div class="flex1"></div>
      </div>
      <div style="overflow: auto; height: calc(100% - 56px - 48px);">
        <div>
          <div id="qrcode" ref="qrcode">
            <img
                :src="'/api/qrcode?text='+(charge=='USDT'?usdt_wallet:wallets)[Object.keys(charge=='USDT'?usdt_wallet:wallets)[active]]">
          </div>
        </div>
        <p>
          {{
            (charge == 'USDT' ? usdt_wallet : wallets)[Object.keys(charge == 'USDT' ? usdt_wallet : wallets)[active]]
          }}
        </p>
        <mu-button class="copy" flat color="primary"
                   :data-clipboard-text="(charge=='USDT'?usdt_wallet:wallets)[Object.keys(charge=='USDT'?usdt_wallet:wallets)[active]]"
                   @click="copy">{{ $t('account.copy') }}
        </mu-button>
        <div style="padding:0 20px;">
          <mu-text-field v-show="true" style="width: 100%;" :label="$t('account.cgaddress')"
                         v-model="acc"></mu-text-field>
          <mu-text-field style="width: 100%;" :label="$t('withdrawList.hash')" v-show="false"
                         v-model="hash"></mu-text-field>
          <mu-text-field style="width: 100%;" :label="$t('account.amount')"
                         :suffix="charge"
                         v-model="amount"></mu-text-field>
          <mu-text-field v-show="false" readonly="" v-model="pic===''?select:selected" style="width: 100%;"
                         :label="$t('account.picture')">
            <mu-button flat full-width slot="append" color="primary" @click="choosePic">{{ $t('account.choose') }}
            </mu-button>
          </mu-text-field>
          <mu-button full-width @click="openAlert=true" color="primary"
                     style="background: linear-gradient(to right, #218adc , #55c2ff);">
            {{ $t('account.submitRecharge') }}
          </mu-button>
          <p class="tall hide">
            <i class="currency_title">
              {{ $t('account.a10') }}
            </i></p>
          <input id="picture" @change="uploadFile" ref="uploads" type="file" style="display:none;"></input>
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
      charge: 'USDT',
      openFullscreen: true,
      openAlert: false,
      active: 0,
      wallets: [],
      usdt_wallet: [],
      qrccode: false,
      acc: '',
      amount: '',
      hash: 'default',
      pic: 'default',
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
      }
    }
  },
  watch: {
    active(val) {
      // let url = this.wallets[Object.keys(this.wallets)[val]];
      // this.qrcode(url);
    },
    charge(val) {
      this.getWallets();
    }
  },
  mounted() {
    this.getWallets()
    this.select = this.$t('account.select')
    this.selected = this.$t('account.selected')
  },
  methods: {
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
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {

        loading.close();
        if (res.data.type === 'ok') {
          // let wallets1 = res.data.message;
          that.wallets = [res.data.message.address];
          if (this.charge == 'USDT') {
            let usdt = res.data.message.address;
            console.log(usdt);
            let wallets = [];
            if (usdt) {
              let arr = usdt.split(',');
              if (arr.length == 1) {
                let arr0 = arr[0].split(":");
                if (arr0.length == 1) {
                  wallets['erc20'] = arr0[0];
                } else {
                  wallets[arr0[0]] = arr0[1];
                }
              } else {
                arr.forEach(x => {
                  let config = x.split(':');
                  if (config.length > 1)
                    wallets[config[0]] = config[1];
                })
              }
              that.usdt_wallet = wallets;
              console.log(usdt_wallet);

            }
          }

          console.log(wallets);

          console.log(that.wallets);

          let url = that.wallets[Object.keys(that.wallets)[0]];
          // that.qrcode(url)

        }
      })
    },
    copy() {
      let that = this;
      let clipboard = new Clipboard('.copy');
      console.log(clipboard);
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
      let that = this;
      const loading = this.$loading();
      this.$http({
        url: '/api/wallet/charge_req',
        method: 'post',
        data: {
          currency: this.obj[this.charge],
          type: (this.charge == 'USDT' ? this.usdt_wallet : this.wallets)[Object.keys(this.charge == 'USDT' ? this.usdt_wallet : this.wallets)[this.active]],
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
          that.acc = '';
          that.amount = '';
          that.hash = '';
        } else {
          that.$toast.error(res.data.message);
        }
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

</style>