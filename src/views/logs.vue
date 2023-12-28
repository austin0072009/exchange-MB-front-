<template>
	<div class="flex flex-column assetsbox" style="height: 100%;">
		<div class="myheader">{{pagetitle}}
			<div class="back" @click="$router.back(-1)"><img src="../assets/ico/close.png"></div>
		</div>
		<div class="ge10"></div>
		<div class="flex1 overYauto pdlr15">
			<div v-if="list.length<1" class="nodata">{{$t("td.nodata")}}</div>
			<div class="bilogul">
				<div class="li" v-for="item in list">
					<div class="tp">
						<div class="time">{{item.created_time}}</div>
						<div class="price" :class="item.value>0?'red':'green'">{{item.value*1}}</div>
					</div>
					<div class="txt">{{fanyi(item.info)}}</div>
				</div>
			</div>
			<div class="ismore" v-if="ismore" @click="nextpage">{{$t("more")}}</div>
			<div class="ismore no" v-else>{{$t("nomore")}}</div>
		</div>
	</div>
</template>

<script>
import mixin from "@/mixin";
export default {
	mixins: [mixin],
  data() {
    let user_id = window.localStorage.getItem('user_id');
    return {
      user_id: user_id,
	  page:0,
	  type:-1,
	  currency:-1,
	  pagetitle:"",
	  list:[],
	  ismore:true,
    }
  },
  mounted() {
    if (!window.localStorage.getItem('user_id')) {
      this.$router.push('/login');
    }
    
  },
  created(){
	  this.currency=this.$route.query.currency;
	  let typename=this.$route.query.type;
	  let ttt="";
	  if(typename=="legal"){
		  this.type=1;
		  ttt=this.$t("usercenter.legal");
	  }
	  if(typename=="change"){
	  		  this.type=2;
			  ttt=this.$t("usercenter.change");
	  }
	  if(typename=="lever"){
	  		  this.type=3;
			  ttt=this.$t("usercenter.lever");
	  }
	  if(typename=="micro"){
	  		  this.type=4;
			  ttt=this.$t("usercenter.second");
	  }
	  this.pagetitle=ttt+" "+this.$t("account.record");
	  this.getlist(1);
  },
  methods: {
	  nextpage:function(){
		  this.getlist(this.page+1);
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
    getlist:function(page){
		if(!page){page=1;}
		this.page=page;
		if(page==1){
			this.list=[]
		}
		let that = this;
		let loading=this.$loading();
		this.$http({
		  url: '/api/wallet/legal_log',
		  method: 'post',
		  headers: {Authorization: localStorage.getItem("token")},
		  data:{
			  page:page,
			  type:this.type,
			  currency:this.currency
		  }
		}).then(res => {
			loading.close();
			//console.log(JSON.stringify(res.data.message.list))
			let list=this.list;
			let dt=res.data.message.list;
			if(dt.length<10){
				this.ismore=false;
			}
			for(let i=0;i<dt.length;i++){
				list.push(dt[i]);
			}
			
			this.list=list;
		})
	}
  }
}
</script>

<style>
</style>
