<template>
	<div class="flex flex-column assetsbox" style="height: 100%;">
		<div class="myheader">
			{{$t("miscro.assetCenter")}}
			<div class="back" @click="$router.push('/assets')"><img src="../assets/ico/close.png"></div>
		</div>
		<div class="zctab">
			<div class="ul">
				<div class="li" :class="type=='change'?'cur':''" @click="settab('change')">{{ $t('usercenter.change') }}</div>
				<!-- <div class="li" :class="type=='lever'?'cur':''" @click="settab('lever')">{{ $t('usercenter.lever') }}</div> -->
				<div class="li" :class="type=='legal'?'cur':''" @click="settab('legal')">{{ $t('usercenter.legal') }}</div>
				<!-- <div class="li" :class="type=='micro'?'cur':''" @click="settab('micro')">{{ $t('usercenter.second') }}</div> -->
				<div class="li" :class="type=='micro'?'cur':''" @click="settab('micro')">{{ $t('usercenter.lever') }}</div> 
			</div>
		</div>
		<div class="flex1 overYauto pdlr15">
			<div class="ge102"></div>
			<div class="bg262a42 by10 pdtb10 zcbenhe">
				<div class="flex">
					<div class="li">
						<div class="big red">{{(total*1).toFixed(4)}}</div>
						<div class="txt">{{$t("diy.总资产")}}($)</div>
					</div>
					<div class="li" v-if="type=='change'">
						<div class="big blue288">{{(list.change_wallet.usdt_totle*1).toFixed(4)}}</div>
						<div class="txt">{{ $t('usercenter.change') }}{{$t("account.conversion")}}($)</div>
					</div>
					
					<div class="li" v-if="type=='lever'">
						<div class="big blue288">{{(list.lever_wallet.usdt_totle*1).toFixed(4)}}</div>
						<div class="txt">{{ $t('usercenter.lever') }}{{$t("account.conversion")}}($)</div>
					</div>
					<div class="li" v-if="type=='legal'">
						<div class="big blue288">{{(list.legal_wallet.usdt_totle*1).toFixed(4)}}</div>
						<div class="txt">{{ $t('usercenter.legal') }}{{$t("account.conversion")}}($)</div>
					</div>
					<div class="li" v-if="type=='micro'">
						<div class="big blue288">{{(list.micro_wallet.usdt_totle*1).toFixed(4)}}</div>
						<div class="txt">{{ $t('usercenter.second') }}{{$t("account.conversion")}}($)</div>
					</div>
				</div>
			</div>
			<div class="ge102"></div>
			<div class="bibibulbox">
				<div class="li bghui by3 nmb10" @click="$router.push('/logs?currency='+item.currency+'&type=change')" v-if="type=='change'" v-for="(item,index) in list.change_wallet.balance">
					<div class="ifo">
						<div class="name">{{item.currency_name}}</div>
						<img src="../assets/a5t.png">
					</div>
					<div class="alltotal">
						<div class="one">
							<div class="t">{{$t("center.available")}}</div>
							<div class="p">{{item.change_balance*1}}</div>
						</div>
						<div class="one">
							<div class="t">{{$t("account.freezes")}}</div>
							<div class="p">{{item.lock_change_balance*1}}</div>
						</div>
						<div class="one">
							<div class="t">{{$t("account.conversion")}}($)</div>
							<div class="p">{{((item.change_balance*1)*item.usdt_price).toFixed(4)}}</div>
						</div>
					</div>
				</div>
				<div class="li bghui by3 nmb10" @click="$router.push('/logs?currency='+item.currency+'&type=lever')" v-if="type=='lever'" v-for="(item,index) in list.lever_wallet.balance">
					<div class="ifo">
						<div class="name">{{item.currency_name}}</div>
						<img src="../assets/a5t.png">
					</div>
					<div class="alltotal">
						<div class="one">
							<div class="t">{{$t("center.available")}}</div>
							<div class="p">{{item.lever_balance*1}}</div>
						</div>
						<div class="one">
							<div class="t">{{$t("account.freezes")}}</div>
							<div class="p">{{item.lock_lever_balance*1}}</div>
						</div>
						<div class="one">
							<div class="t">{{$t("account.conversion")}}($)</div>
							<div class="p">{{((item.lever_balance*1)*item.usdt_price).toFixed(4)}}</div>
						</div>
					</div>
				</div>
				<div class="li bghui by3 nmb10" @click="$router.push('/logs?currency='+item.currency+'&type=legal')" v-if="type=='legal'" v-for="(item,index) in list.legal_wallet.balance">
					<div class="ifo">
						<div class="name">{{item.currency_name}}</div>
						<img src="../assets/a5t.png">
					</div>
					<div class="alltotal">
						<div class="one">
							<div class="t">{{$t("center.available")}}</div>
							<div class="p">{{item.legal_balance*1}}</div>
						</div>
						<div class="one">
							<div class="t">{{$t("account.freezes")}}</div>
							<div class="p">{{item.lock_legal_balance*1}}</div>
						</div>
						<div class="one">
							<div class="t">{{$t("account.conversion")}}($)</div>
							<div class="p">{{((item.legal_balance*1)*item.usdt_price).toFixed(4)}}</div>
						</div>
					</div>
				</div>
				<div class="li bghui by3 nmb10" @click="$router.push('/logs?currency='+item.currency+'&type=micro')" v-if="type=='micro'" v-for="(item,index) in list.micro_wallet.balance">
					<div class="ifo">
						<div class="name">{{item.currency_name}}</div>
						<img src="../assets/a5t.png">
					</div>
					<div class="alltotal">
						<div class="one">
							<div class="t">{{$t("center.available")}}</div>
							<div class="p">{{item.micro_balance*1}}</div>
						</div>
						<div class="one">
							<div class="t">{{$t("account.freezes")}}</div>
							<div class="p">{{item.lock_micro_balance*1}}</div>
						</div>
						<div class="one">
							<div class="t">{{$t("account.conversion")}}($)</div>
							<div class="p">{{((item.micro_balance*1)*item.usdt_price).toFixed(4)}}</div>
						</div>
					</div>
				</div>
			</div>
			
			
			
			
		</div>
	</div>
</template>

<script>
import BackHeader from "@/components/backHeader";
import Footer from "@/components/Footer";

export default {
  components: {BackHeader, Footer},
  data() {
    let user_id = window.localStorage.getItem('user_id');
    return {
      type: 'change',
      user_id: user_id,
      openFullscreen: false,
      list:{
		  change_wallet:{
			  balance:[],
			  totle:0,
			  usdt_totle:0
		  },
		  legal_wallet:{
			  balance:[],
			  totle:0,
			  usdt_totle:0
		  },
		  lever_wallet:{
			  balance:[],
			  totle:0,
			  usdt_totle:0
		  },
		  micro_wallet:{
			  balance:[],
			  totle:0,
			  usdt_totle:0
		  }
	  },
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
  },
  methods: {
    settab:function(type){
		this.type=type;
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
    }
  }
}
</script>

<style>
</style>
