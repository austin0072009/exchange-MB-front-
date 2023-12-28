var mixin = {
	data: function(){
		return {
			
		}
	},
	methods: {
		fanyi:function(str=""){
			let ge=" ";
			let txt="";
			if(!str){return "";}
			if(str.indexOf(",扣除保证金")>-1 && str.indexOf("杠杆交易,价格")>-1){
				let m1=str.replace("提交","");
				let bi=m1.split("杠杆交易,价格")[0];
				let m2=m1.split("杠杆交易,价格")[1];
				let num=m2.replace(",扣除保证金","");
				let a=this.$t("apitip.提交")+ge+bi+ge+this.$t("apitip.杠杆交易,价格")+ge+num+ge+this.$t("apitip.,扣除保证金")
				return a;
			}
			if(str.indexOf("提交")>-1 && str.indexOf("杠杆交易,扣除手续费")>-1){
				let m1=str.replace("提交","");
				let m2=m1.replace("杠杆交易,扣除手续费","");
				return this.$t("apitip.提交")+ge+m2+ge+this.$t("apitip.杠杆交易,扣除手续费");
			}
			if(str.indexOf("调节")>-1 && str.indexOf("账户锁定余额:")>-1){
				let m1=str.replace("调节","");
				let bitype=m1.split("账户锁定余额:")[0];//类型
				let note=str.split(":")[1];
				return this.$t("apitip.调节")+ge+this.$t("apitip."+bitype)+ge+this.$t("apitip.账户锁定余额:");
			}
			if(str.indexOf("调节")>-1 && str.indexOf("账户余额:")>-1){
				let m1=str.replace("调节","");
				let bitype=m1.split("账户余额:")[0];//类型
				let note=str.split(":")[1];
				return this.$t("apitip.调节")+ge+this.$t("apitip."+bitype)+ge+this.$t("apitip.账户余额:");
			}
			
			if(str.indexOf("下单扣除")>-1 && str.indexOf("%手续费")>-1){
				let bi=str.split("下单扣除")[0];
				let sxf=(str.split("下单扣除")[1]).replace("%手续费","");
				return this.$t("apitip."+bi)+ge+this.$t("apitip.下单扣除")+ge+sxf+ge+this.$t("apitip.%手续费");
			}
			if(str.indexOf("订单平仓结算,平局结算")>-1){
				let bi=str.split("订单平仓结算,平局")[0];
				return this.$t("apitip."+bi)+ge+this.$t("apitip.订单平仓结算,平局结算");
			}
			if(str.indexOf("订单平仓,盈利结算")>-1){
				let bi=str.split("订单平仓,盈利结")[0];
				return this.$t("apitip."+bi)+ge+this.$t("apitip.订单平仓,盈利结算");
			}
			if(str.indexOf("余额不足,不能小于")>-1 && str.indexOf("(手续费:")>-1){
				let bi=str.split("余额不足,不能小于")[0];
				let price=bi.split("(手续费:")[0];
				let sxf=(str.split("(手续费:")[1]);//.replace(")","")
				//console.log()
				return bi+ge+this.$t("apitip.余额不足,不能小于")+ge+price+ge+this.$t("apitip.(手续费:")+ge+sxf;
			}
			if(str.indexOf("最大下单数量不能超过:")>-1){
				let bi=str.split(":")[1];
				return this.$t("apitip.最大下单数量不能超过:")+ge+bi;
			}
			if(str.indexOf("投资数额 的最小长度为")>-1 && str.indexOf("位")>-1){
				let bi=str.replace("投资数额 的最小长度为","");
				bi=bi.replace("位","");
				bi=bi.replace(" ","");
				return this.$t("apitip.投资数额 的最小长度为")+ge+bi+ge+this.$t("apitip.位");
			}
			if(str.indexOf(" 兑换 BEF ")>-1){
				let arr=str.split(" 兑换 BEF ");
				
				let type=arr[0];
				let bi=arr[1];
				bi=bi.replace("位","");
				bi=bi.replace(" ","");
				return this.$t("apitip."+type+" 兑换 BEF ")+ge+bi;
			}
			/*
			暴仓处理USDT余额(退回保证金:8750.67048000,结算总盈亏:-25312.4847000000000)
			
			*/
			if(str.indexOf("暴仓处理")>-1 && str.indexOf("结算总盈亏")>-1){
				let ttt="";
				let bi=str.split("余额(退回保证金")[0].replace("暴仓处理","");
				let baozj=str.split("余额(退回保证金:")[1].split(",结算总盈亏")[0];//保证金
				let zyk=str.split(",结算总盈亏:")[1].replace(")","");
				ttt=this.$t("apitip.暴仓处理")+bi+this.$t("apitip.余额")+"("+this.$t("apitip.退回保证金")+":"+baozj+","+this.$t("apitip.结算总盈亏")+":"+zyk+")";
				return ttt;
			}
			return this.$t("apitip."+str);
		},
	},
	created: function(){
	    window.nVue = this;  // 挂载当前全局的vue
		//console.log('算是继承的每个公共的create');
		
	},
	watch:{
		'$route': function(){
			//console.log('监听route变化');
		}
	}
}

export default mixin;

