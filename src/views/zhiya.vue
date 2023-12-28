<template>
  <div id="app" style="display: flex;flex-direction: column;">
      <header class="mu-appbar mu-inverse mu-elevation-4" style="background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); width: 100%; " >
          <div class="mu-appbar-left">
              <button
                      tabindex="0"
                      type="button"
                      class="mu-button mu-flat-button mu-icon-button"
                      style="user-select: none; outline: none; appearance: none"
              >
                  <div class="mu-button-wrapper" @click="$router.push('/')">
                      <div class="mu-ripple-wrapper"></div>
                      <i class="mu-icon icon-ziyuan1" style="user-select: none"></i>
                  </div>
              </button>
          </div>
          <div class="mu-appbar-title">{{$t("zhiya.锁仓挖矿")}}</div>
          <div class="mu-appbar-right">
              <button
                      tabindex="0"
                      type="button"
                      class="mu-button mu-flat-button mu-icon-button"
                      style="user-select: none; outline: none; appearance: none" @click="$router.push('/zhiyaOrder')"
              >
                  <div class="mu-button-wrapper">
                      <div class="mu-ripple-wrapper"><i class="iconfont icon-heyue"></i></div>
                  </div>
              </button>
          </div>
      </header>
  	<div class="oallheight">
  		<div class="prolists">
  				
  				<div class="mineCardList">
  					<div class="mineCard" v-for="(item,index) in list">
  						<div class="topName">{{item.currency_name}}{{$t("zhiya.锁仓赚币")}}</div>
  						<div class="flex shuliang">
  							<div class="l mrauto">
  								{{$t("zhiya.存币数量")}} {{item.min}}
  							</div>
  							<div class="r mlauto">{{item.currency_name}}</div>
  						</div>
  						<div class="flex yujisy">
  							<div class="l mrauto">
  								{{$t("zhiya.预计总收益")}}
  							</div>
  							<div class="r mlauto"><b>{{item.lixi*item.min/100}}</b> {{item.currency_name}}</div>
  						</div>
  						<div class="flex bizhi">
  							<div class="l mrauto"><b>{{item.lixi}}%</b><span>{{item.currency_name}}</span></div>
  							<div class="r mlauto">{{item.qixian}}{{$t("dep.day")}}</div>
  						</div>
  						<div class="flex nh">
  							<div class="l mrauto">{{$t("zhiya.近3日参考年化")}}<span class="ab123">{{$t("zhiya.总收益")}}</span></div>
  							<div class="r mlauto">{{$t("zhiya.锁仓期限")}}</div>
  						</div>
  						<div class="btn222" @click="buy(item)">{{$t("zhiya.购买")}}</div>
  					</div>
  					<div class="nodata" v-if="list.length<1">{{$t("zhiya.暂无记录")}}</div>
  				</div>
  		</div>
  	</div>
  </div>
</template>
<script>
export default {
  name: "IEPN",
  data() {
    return {
      uid:null,
      pages:{
      		limit:500,
      		page:1  
      },
      list:[],
      orders:[],
      zhiya_qxsxf:0
    }
  },
  mounted() {
    
  },
  created() {
  	  clearInterval(this.intervalId8888)
    this.init();
  },
  methods: {
    init:function(){
    		  this.getlist();
    		 let uid=localStorage.getItem("user_id");
    		 if(!uid){
				 this.$toast.error(this.$t('lay.plogin'));
    			 this.$router.push("/login");
    			 //window.location.href="/#/components/login"
    		 }
    },
    buy:function(data){
    		  //console.log(JSON.stringify(data))
    		  const loading = this.$loading()
    		  let arg={
    			  id:data.id
    		  }
    		  this.$http({
    		    url: "/api/zhiya/buy",
    		    data: arg,
    		    method: "post",
    		  	headers: {'Authorization': localStorage.getItem('token')},
    		  }).then(res => {
    		  				loading.close();
    		  	let r=res.data;
    		  			if(r.type=="ok"){
    		  				this.$toast.success(this.$t("zhiya.操作成功"))
    		  			}else{
    		  				this.$toast.error(r.message)
    		  			}
    		  });
    },
    getlist:function(){
    		  const loading=this.$loading()
    		  this.$http({
    		    url: "/api/zhiya/list",
    		    data: {},
    		    method: "get",
    			//headers: {'Authorization': localStorage.getItem('token')},
    		  }).then(res => {
    			  //console.log(JSON.stringify(res))
				  loading.close();
    			  this.list=res.data.list;
    			  this.zhiya_qxsxf=(res.data.zhiya_qxsxf/100).toFixed(2);
    		  });
    },
  }
}
</script>
<style lang="scss">
	.oallheight{background: #e5ebf5;}
	.prolists{color:#333;padding:10px 10px;}
	.mineCardList{}
	.mineCardList::after{clear: both;display: table;content: "";}
	.mineCard{
	    position: relative;
	    width: 100%;
	    border-radius: 15px;
	    background-color: #fff;
	    padding: 20px;margin-bottom: 10px;
	}
	
	
	.mineCard .topName{font-size: 18px;font-weight: bold;padding:10px 0;}
	
	.mineCard .shuliang{background: rgb(245,245,245);padding:10px 15px;}
	.mineCard .yujisy{font-size: 16px;padding:10px 0;}
	.mineCard .sy .l{font-weight: bold;}
	.mineCard .sy {padding: 10px 0;}
	.mineCard .bizhi{font-weight: bold;font-size: 22px;}
	.mineCard .bizhi .l{color: #00b796;}
	.mineCard .bizhi .l span{padding-left: 15px;font-size: 16px;font-weight: normal;}
	.mineCard .nh{color: #999;padding-bottom: 20px;}
	.ab123::before{content: "{";}
	.ab123::after{content: "}";}
	.btn222{background: #2c63e4;color: #fff;text-align: center;border-radius: 5px;height: 45px;line-height: 45px;cursor: pointer;font-weight: bold;}
	.flex{display: flex;}
	.mlauto{margin-left: auto;}
	.mrauto{margin-right: auto;}
	
	.scjltit{border-bottom: 1px solid rgb(245,245,245);font-weight: bold;padding:15px 0;font-size:18px;}
	
	
	.state{text-align: center;}
	.state.qx{color: #999;}
	.state.over{color: #f00;}
	.state.pendding{color: #090;}
</style>