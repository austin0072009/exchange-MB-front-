<template>
	<div class="h100f ctlistbox">
		<div class="myheader"> {{ $t('miscro.recordWithdrawal') }} <div class="back" @click="$router.push('/assets')"><img src="../assets/ico/close.png"></div></div>
		<div class="zctab"><div class="ul"><div class="li" :class="type==1?'cur':''" @click="type=1">{{$t("apitip.充币记录")}}</div><div class="li" :class="type==2?'cur':''" @click="type=2">{{$t("apitip.提币记录")}}</div></div></div>
		<div class="flex1 overYauto">
			<div class="listus" v-show="type==1">
				<div class="li" v-for="(item,index) in list">
					<div class="flex_row">
						<div class="amount l">{{item.amount}}</div>
						<div class="status" :class="'state_'+item.status">{{s2t(item.status,1)}}</div>
					</div>
					<div class="flex_row">
						<div class="name l">{{item.currency_name}}</div>
						<div class="time">{{item.created_at}}</div>
					</div>
					<!-- <div class="info" v-if="item.status==3 && item.remark">{{item.remark}}</div> -->
				</div>
			</div>
			<div class="listus" v-show="type==2">
				<div class="li" v-for="(item,index) in list2">
					<div class="flex_row">
						<div class="amount l">{{item.number}}<em>{{item.currency_name}}</em></div>
						<div class="status" :class="'state_'+item.status">{{s2t(item.status,1)}}</div>
					</div>
					<div class="flex_row">
						<div class="sxf l">{{$t("apitip.手续费")}}:{{item.rate}}</div>
						<div class="time">{{item.create_time}}</div>
					</div>
					<div class="info" v-if="item.status==3 && item.notes">{{item.notes}}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
  data() {
    let user_id = window.localStorage.getItem('user_id');
    return {
		type:1,
		page:1,
		pagesize:10,
		ismore:true,
		list:[],
		list2:[]
    }
  },
  mounted() {
    if (!window.localStorage.getItem('user_id')) {
      this.$router.push('/login');
	  return;
    }
    this.getlist();
	this.getlist2();
  },
  methods: {
	  s2t:function(status,type){
		  let str="";
		if(type==1){
			switch(status){
				case 1:
					str=this.$t("apitip.待确认")
					break
				case 2:
					str=this.$t("apitip.完成")
					break;
				case 3:
					str=this.$t("apitip.退回")
					break;
			}
		}
		if(type==2){
			
		}
		return str;
	  },
    getlist() {
      const loading = this.$loading();
      let that = this;
      this.$http({
        url: '/api/user/deposit_record',
        method: 'get',
		data:{
			page:this.page,
			pagesize:this.pagesize
		},
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        loading.close()
        this.list=res.data;
      });
    },
    getlist2() {
     
      let that = this;
      this.$http({
        url: '/api/user/withdrawal_record',
        method: 'get',
		data:{
			page:this.page,
			pagesize:this.pagesize
		},
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        this.list2=res.data;
      });
    },
  }
}
</script>
<style>
	.ctlistbox .zctab{display: flex;flex-direction: row;white-space: nowrap;}
	.ctlistbox .zctab .li{flex:1;margin-right: 20px;height: 40px;line-height:40px;color: #eee;}
	.ctlistbox .zctab .li.cur{color: #1881d2;position: relative;}
	.ctlistbox .zctab .li.cur::after{position: absolute;left: 0;right: 0;bottom: 0;height: 1px;background: #1881d2;content: "";}
	.ctlistbox .zctab .li:last-child{margin-right: 0;}
	.ctlistbox .zctab .ul{margin: auto;display: flex;flex-direction: row;}
	
	.listus{padding: 10px 0;}
	.listus .li{padding: 10px 15px;border-bottom: 3px solid rgba(0,0,0,.5);}
	.listus .li .l{flex: 1;text-align: left;}
	.listus .li .amount{font-size: 18px;}
	.listus .li .amount em{font-style: normal;padding-left: 5px;font-size: 14px;}
	.listus .li .time{color: rgba(255,255,255,.6);}
	.listus .li .info{text-align: justify;text-align-last: left;color: rgba(255,255,255,.8);font-size: 12px;padding: 5px;margin-top: 5px;background: rgba(255,255,255,.05);}
	.listus .li .status.state_1{color: #007FB9;}
	.listus .li .status.state_2{color: #00FF00;}
	.listus .li .status.state_3{color: #f00;}
	
</style>