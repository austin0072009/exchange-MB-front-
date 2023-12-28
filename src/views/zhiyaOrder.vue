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
                  <div class="mu-button-wrapper" @click="$router.push('/zhiya')">
                      <div class="mu-ripple-wrapper"></div>
                      <i class="mu-icon icon-ziyuan1" style="user-select: none"></i>
                  </div>
              </button>
          </div>
          <div class="mu-appbar-title">{{$t("zhiya.锁仓记录")}}</div>
          <div class="mu-appbar-right">
              <button
                      tabindex="0"
                      type="button"
                      class="mu-button mu-flat-button mu-icon-button"
                      style="user-select: none; outline: none; appearance: none"
              >
                  <div class="mu-button-wrapper">
                      <div class="mu-ripple-wrapper"></div>
                  </div>
              </button>
          </div>
      </header>
  	<div class="oallheight">
  		<div class="prolists">
			<div class="nodata" v-if="orders.length<1">{{$t("zhiya.暂无记录")}}</div>
			<div class="scul">
				<div class="li" v-for="(item,index) in orders">
					<div class="lirow">
						<span class="l">{{$t("zhiya.项目编号")}}</span>
						<span class="r">{{item.id}}</span>
					</div>
					<div class="lirow">
						<span class="l">{{$t("zhiya.币种")}}</span>
						<span class="r">{{item.currency_name}}</span>
					</div>
					<div class="lirow">
						<span class="l">{{$t("zhiya.存币数量")}}</span>
						<span class="r">{{item.buy_num}} {{item.currency_name}}</span>
					</div>
					<div class="lirow">
						<span class="l">{{$t("zhiya.总利息")}}</span>
						<span class="r">{{item.fan_lixi}} {{item.currency_name}}</span>
					</div>
					<div class="lirow">
						<span class="l">{{$t("zhiya.锁仓时间")}}</span>
						<span class="r">{{item.create_time}}</span>
					</div>
					<div class="lirow">
						<span class="l">{{$t("zhiya.到期时间")}}</span>
						<span class="r">{{item.end_time}}</span>
					</div>
					<div class="lirow">
						<span class="l">{{$t("status")}}</span>
						<div class="r state qx" v-if="item.status==3">{{$t("zhiya.已取消")}}</div>
						<div class="r state pendding" v-if="item.status==1">{{$t("zhiya.进行中")}}</div>
						<div class="r state over" v-if="item.status==2">{{$t("zhiya.已结束")}}</div>
					</div>
					<div class="btn btn-err" v-if="item.status==1" @click="qxzhiya(item)">{{$t("zhiya.取消质押")}}</div>
				</div>
			</div>
		</div>
  	</div>
	
	
	<mu-dialog title="Tips" width="600" max-width="80%" :esc-press-close="false"
	           :overlay-close="false" :open.sync="openAlert">
	  {{ tipcon }}
	  <mu-button slot="actions" flat color="primary" @click="openAlert=false">{{ $t('lay.ceil') }}</mu-button>
	  <mu-button slot="actions" flat color="primary" @click="qxtoto">{{$t('lay.sure')}}</mu-button>
	</mu-dialog>
	
  </div>
</template>
<script>
export default {
  name: "IEPN",
  data() {
    return {
      orders:[],
	  uid:null,
	  pages:{
	  		limit:500,
	  		page:1  
	  },
	  zhiya_qxsxf:0,
	  openAlert:false,
	  tipcon:"",
	  qxdata:{
		  id:null
	  }
    }
  },
  created(){
	  let uid=localStorage.getItem("user_id");
	  
	  if(!uid){
	  				 this.$toast.error(this.$t('lay.plogin'));
	      			 this.$router.push("/login");
	      			 //window.location.href="/#/components/login"
	  }else{
		  this.getlist()
		   this.getmyorder()
		}
	 
  },
  mounted() {
    
  },
  methods: {
    
    getmyorder:function(){
    		  let loading = this.$loading();
    		  this.$http({
    		    url: "/api/zhiya/myorder",
    		    data: this.pages,
    		    method: "get",
    		  	headers: {'Authorization': localStorage.getItem('token')}
    		  }).then(res => {
    			  this.orders=res.data;
    			  loading.close();
    		  });
    },
	  qxzhiya:function(data){
		  let zhiya_qxsxf=this.zhiya_qxsxf;
		  let that=this;
		 
		  this.tipcon=this.$t("zhiya.取消订单将扣除")+(data.buy_num*this.zhiya_qxsxf)+data.currency_name+this.$t("zhiya.手续费");
		  this.qxdata=data;
		  this.openAlert=true;
		 /* layer.msg(con, {
		    time: 0 //不自动关闭
		    ,btn: [this.$t('lay.sure'), this.$t('legal.ceil')]
		    ,yes: function(index){
		      layer.close(index);
		      that.goqx(data);
		    }
		  });	*/  
		  
	  },
	  qxtoto:function(){
		  let arg={
			  id:this.qxdata.id
		  }
		  let loading=this.$loading()
		  this.$http({
		    url: "/api/zhiya/quxiao",
		    data: arg,
		    method: "post",
		  	headers: {'Authorization': localStorage.getItem('token')},
		  }).then(res => {
		  		loading.close();
				this.openAlert=false;
				if(res.data.type=="ok"){
					this.getmyorder();
					
					this.$toast.success(this.$t("zhiya.操作成功"));
				}else{
					//this.$toast.error(this.$t("apitip."+res.data.message));
					this.$toast.error(res.data.message);
				}
		  }).catch(error => {
             
        });;
		  
	  },
	  getlist:function(){
	  		  //const loading=this.$loading()
	  		  this.$http({
	  		    url: "/api/zhiya/list",
	  		    data: {},
	  		    method: "get",
	  			//headers: {'Authorization': localStorage.getItem('token')},
	  		  }).then(res => {
	  			  //console.log(JSON.stringify(res))
	  			  //this.list=res.data.list;
	  			  this.zhiya_qxsxf=(res.data.zhiya_qxsxf/100).toFixed(2);
	  		  });
	  },
  }
}
</script>
<style lang="scss">
	.nodata{line-height: 120px;}
	.scul{text-align: left;}
	.scul .li{padding:10px 15px;background: #fff;border-radius: 5px;margin-bottom: 10px;}
	.scul .lirow{display: flex;flex-direction: row;white-space: nowrap;line-height: 24px;}
	.scul .lirow .l{margin-right: auto;color: #999;}
	.scul .lirow .r{margin-left: auto;}
	
	.btn{cursor: default;color: #fff;border-radius: 3px;background: #666;text-align: center;line-height: 32px;height: 32px;margin-top: 10px;}
	.btn.btn-ok{background:#4caf50;}
	.btn.btn-err{background:#f44336;cursor: pointer;}
	
</style>