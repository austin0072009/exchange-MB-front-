<template>
    <div id="app" style="display: flex;flex-direction: column;">
        <header
                class="mu-appbar mu-inverse mu-elevation-4"
                style="
        background-color:#20232b;
        color: #fff;
        width: 100%;
      "
        >
            <div class="mu-appbar-left">
                <button
                        tabindex="0"
                        type="button"
                        class="mu-button mu-flat-button mu-icon-button"
                        style="user-select: none; outline: none; appearance: none"
                >
                    <div class="mu-button-wrapper" @click="$router.push('/UpStart')">
                        <img src="../assets/ico/back_white.png" class="indexico ico_back1">
                    </div>
                </button>
            </div>
            <div class="mu-appbar-title">Subscription List</div>
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
		<div class="oallheight" style="background: none;">
			<div class="ulbox">
				<div class="li" v-for="(item,index) in list">
					<div class="p">
						<div class="lft">{{$t("diy.认购价格")}}</div>
						<div class="rgt">{{item.price}} USDT</div>
					</div>
					<div class="p">
						<div class="lft">{{$t("diy.认购数量")}}</div>
						<div class="rgt">{{item.amount}} {{item.currency_name}}</div>
					</div>
					<div class="p">
						<div class="lft">{{$t("diy.认购时间")}}</div>
						<div class="rgt">{{item.created_at}}</div>
					</div>
					<div class="p">
						<div class="lft">{{$t("diy.结束时间")}}</div>
						<div class="rgt">{{item.endtime_at}}</div>
					</div>
					<div class="p">
						<div class="lft">{{$t("diy.状态")}}</div>
						<div class="rgt">
							<div class="btn btn-ok" v-if="item.status==3">{{$t("diy.已完成")}}</div>
							<div class="btn btn-info" v-if="item.status==1">{{$t("diy.已锁仓")}}</div>
							<div class="btn btn-err" v-if="item.status==2" @click="jiesuo(item,index)">{{$t("diy.解锁")}}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="btnbox">
				<div class="bn" v-if="ismore" @click="loadContent">{{$t("diy."+moretxt)}}</div>
				<div class="bn" v-else>{{$t("diy."+moretxt)}}</div>
			</div>
		</div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                title: '',
                desc: '',
                content: '',
                bname: '',
                total: '',
                left: '',
                right: '',
				list:[],
				page:1,
				limit:10,
				ismore:true,
				moretxt:"加载更多",
				loading:false
            }
        },
        mounted() {
            
        },
		created(){
			this.loadContent();
		},
        methods: {
			jiesuo:function(data,index){
				const loading = this.$loading()
				let that = this;
				this.$http({
				    method: 'post',
				    url: '/api/user/unlock',
					data:{
						id:data.id,
					},
				    headers: {
				        Authorization: localStorage.getItem("token")
				    }
				}).then(res => {
					loading.close();
				    if(res.data.type=="ok"){
						this.list[index].status=3;
						this.$toast.success(this.$t("diy.解锁成功"));
					}else{
						this.$toast.error(this.$t("diy.解锁失败"));
					}
				})
			},
            loadContent() {
				const loading = this.$loading()
				this.loading=true;
                let that = this;
                this.$http({
                    method: 'post',
                    url: '/api/user/uplists',
					data:{
						page:this.page,
						limit:this.limit
					},
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                }).then(res => {
					loading.close();
                    let newlist=res.data.message.data;
					//console.log(JSON.stringify(newlist))
					if(newlist.length<this.limit){
						this.moretxt="没有更多"
						this.ismore=false;
					}else{
						this.moretxt="加载更多";
						this.page=this.page+1;
						this.ismore=true
						//let list=this.list.concat(newlist);
						
					}
					for(let i=0;i<newlist.length;i++){
							this.list.push(newlist[i])
						}
                });
            },
			
        }
    }
</script>

<style>
.ulbox{text-align: left;padding: 10px 0;}
.ulbox .li{padding:15px 5%;border-bottom: 1px solid #eee;}
.ulbox .li .p{display: flex;flex-direction: row;margin-bottom: 10px;}
.ulbox .li .p .lft{color: #999;}
.ulbox .li .p .rgt{margin-left: auto;}
.ulbox .li .p .btn{color: #fff;border-radius: 3px;padding: 0 16px;height: 32px;line-height: 32px;}
.ulbox .li .p .btn.btn-ok{background:#4caf50;}
.ulbox .li .p .btn.btn-err{background:#f44336;}
.ulbox .li .p .btn.btn-info{background:#999;}
.btnbox{text-align: center;padding: 10px 5%;}
.btnbox .bn{}

    #app {
        font-family: "Microsoft Yahei", Avenir, Helvetica, Arial, sans-serif, iconfont;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        font-size: 14px;
    }

    .mu-appbar {
        height: 56px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    /* .mu-appbar-title{
      font-size: 18px;
      font-weight: 700;
    } */

    .icon-ziyuan1::before {
        content: "\e622";
        font-size: 16px;
        color: black;
        margin: auto;
    }

    .tall {
        text-align: left;
    }
	.oallheight{flex:1;overflow: auto;}
</style>
