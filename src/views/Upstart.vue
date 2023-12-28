<template>
    <div id="app">
        <header
                class="mu-appbar mu-inverse mu-elevation-4"
                style="color: #fff;width: 100%;background: #20232b;"
        >
            <div class="mu-appbar-left">
                <button
                        tabindex="0"
                        type="button"
                        class="mu-button mu-flat-button mu-icon-button"
                        style="user-select: none; outline: none; appearance: none"
                >
                    <div class="mu-button-wrapper" @click="backto">
                        <img src="../assets/ico/back_white.png" class="indexico ico_back1">
                    </div>
                </button>
            </div>
            <div class="mu-appbar-title">UpStart</div>
            <div class="mu-appbar-right">
                <button
                        tabindex="0"
                        type="button"
                        class="mu-button mu-flat-button mu-icon-button"
                        style="user-select: none; outline: none; appearance: none" @click="gotolist"
                >
                    <div class="mu-button-wrapper">
                        <div class="mu-ripple-wrapper"><i class="iconfont icon-heyue"></i></div>
                    </div>
                </button>
            </div>
        </header>

        <div style="font-size: 16px">
            {{title}}
        </div>

        <div style="margin-top: 5px">
            {{desc}}
        </div>

        <div style="margin-top: 20px; width: 100%">
            <div style="font-size: 18px; line-height: 45px">
                Planned circulation:{{total}}
            </div>
            <div class="flex alcenter" @click="showbuy">
                <span class="flex1"></span>
                <span style="font-size: 14px;font-weight: bold; color:#FF0000;">Go buy</span>
                <span class="flex1"></span>
            </div>
        </div>

        <div class="chart">
            <div id="myChart" :style="{width: '300px', height: '300px',margin: '0 auto'}"></div>
        </div>

        <div class="tall" style="padding: 0px 16px">
            <div style="font-size: 18px; line-height: 45px">
        <span
                style="
            border-left: 3px solid rgb(255, 201, 12);
            padding-left: 15px;
            font-size: 16px;
          "
        >Popular recommendation</span
        >
            </div>
            <div style="line-height: 1.8; padding-bottom: 20px">
                <div v-html="content"></div>
                <div style="text-align: center;">
                    <a :href="baipishuurl" target="_blank" style="">
                        <button tabindex="0" type="button" class="mu-button mu-raised-button mu-info-color mu-inverse" style="user-select: none; outline: none; appearance: none;display: block;margin: auto;">
                            <div class="mu-button-wrapper">
                                Technical white paper
                            </div>
                        </button>
                    </a>
                </div>
            </div>
        </div>
		
		
		
		<div class="buybox" v-show="isbuyshow">
			<div class="mask" @click="isbuyshow=false"></div>
			<div class="mainbox">
				<img src="../assets/ico/close.png" class="" @click="isbuyshow=false" style="position: absolute;right:10px;top:-26px;width:24px;height: 24px;"/>
				<div class="title">{{$t("diy.认购操作")}}</div>
				<div class="p p2"><input type="number" v-model="amount" :min="0" :placeholder="$t('diy.请输入认购数量')"><span class="txt">{{c_name}}</span></div>
				<div class="p">{{$t("diy.实时价")}}：1{{c_name}} = {{huilv}} USDT</div>
				<div class="p">{{$t("diy.认购价格")}}：1{{c_name}} = {{buymoney}} USDT</div>
				<div class="p">{{$t("diy.申购")}}：{{amount}} {{c_name}}</div>
				<div class="p">{{$t("diy.需要支付")}}：{{(buymoney*amount).toFixed(8)}} USDT</div>
				<div class="p">{{$t("diy.钱包余额")}}：{{balance}} USDT</div>
				<div class="p">{{$t("diy.冻结剩余时间")}}：{{iepn_scz}} {{$t("diy.天")}}</div>
				<div class="diybtn" @click="gobuyto">{{$t("diy.认购")}}</div>
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
				amount:0,
				buymoney:0,
				c_name:"",
				isbuyshow:false,
				balance:0,
				huilv:0,
				iepn_scz:0,
				baipishuurl:"",
				c_id:0,
            }
        },
        mounted() {
			clearInterval(this.intervalId)
			
            this.loadContent();
        },
		created(){
			clearInterval(this.intervalId)
		},
        methods: {
			getprice:function(){
				clearInterval(this.intervalId)
				this.intervalId = setInterval(() => {
					this.getTime();
				}, 1000)
			},
			getTime:function(){
				if(this.c_id){
					this.$http({
						method: 'post',
						headers: {
							Authorization: localStorage.getItem("token")
						},
						url: '/api/bi/price?c_id='+this.c_id
					}).then(res => {
						this.huilv=res.data.message.price;
					});	
				}else{
					clearInterval("intervalId");
					clearInterval(this.intervalId);
				}
				
			},
			gobuyto:function(){
				let that=this;
				let amount=this.amount*1;
				if(!amount || amount<0){
					this.$toast.error(this.$t("diy.请输入认购数量"));
					return;
				}
				const loading = this.$loading()
				this.$http({
				    method: 'post',
				    url: '/api/user/up_order',
				    headers: {
				        Authorization: localStorage.getItem("token")
				    },
					data:{
						amount:amount,
						buymoney:this.buymoney,
						c_id:this.c_id
					}
				}).then(res => {
					loading.close();
				    if (res.data.type === 'ok') {
				       this.$toast.success(this.$t("diy.认购成功"));
					   this.isbuyshow=false;
					   //this.loadContent();
					   this.amount=0;
					   clearInterval(this.intervalId)
					   window.setTimeout(function(){
						   
						   that.$router.push("/Uplist");
					   },500)
					   
				    }else{
						this.$toast.error(this.$t("diy.可用余额不足"));
					}
				});
				
			},
			showbuy:function(){
				this.amount=0;
				this.isbuyshow=true;
				
			},
			gotolist:function(){
				clearInterval(this.intervalId)
				this.$router.push("/Uplist")
			},
			backto:function(){
				clearInterval(this.intervalId)
				this.$router.push("/")
			},
            loadContent() {
                let that = this;
                this.$http({
                    method: 'get',
                    url: '/api/user/upstart',
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                }).then(res => {
                    if (res.data.type === 'ok') {
                        that.title = res.data.message.keyword;
                        that.desc = res.data.message.abstract;
                        that.content = res.data.message.content;
                        that.bname = res.data.message.bname;
                        that.buymoney = res.data.message.buymoney;
						that.c_name=res.data.message.c_name;
                        that.total = res.data.message.total;
                        that.left = res.data.message.left;
                        that.balance = res.data.message.detail.balance;
                        that.iepn_scz = res.data.message.iepn_scz;
						that.baipishuurl=res.data.message.baipishuurl;
                        that.right = res.data.message.right;
						that.c_id=res.data.message.c_id
						that.getprice();
                        this.drawLine();
                    }
                });
            },
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let echarts = require('echarts');
                let myChart = echarts.init(document.getElementById('myChart'));
                // 绘制图表
                var self = this;
                myChart.setOption({
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        top: '5%',
                        left: 'center',
						textStyle:{
							color:"#fff"
						},
                        data: [{
                            value: self.left,
                            name: 'Issued amount',
                        },
                            {
                                value: self.right,
                                name: 'The remaining'
                            },

                        ],
                        formatter: function(name) {
                            var index = 0;
                            var clientlabels = ['Issued amount','The remaining'];
                            var clientcounts = [self.left, self.right];
                            clientlabels.forEach(function(value, i) {
                                if (value == name) {
                                    index = i;
                                }
                            });
                            return name + "  " + clientcounts[index];
                        }
                    },
                    color: ['#0086FF', '#FFC90C'], //环形图颜色
                    series: [{
                        name: self.bname,
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center',
                            formatter: '{b}: {c}'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '12',
                                color: '#f00'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
							{
                                value: self.left,
								name: 'Issued amount',
							},
                            {
                                value: self.right,
                                name: 'The remaining'
                            }
                        ]
                    }]
                });
            }
        }
    }
</script>

<style lang="scss" scoped> 
.buybox{position: fixed;z-index: 88;background: rgba(255,255,255,.5);left:0;right:0;top:0;bottom: 0;display: flex;flex-direction: column;align-items: center;}
.buybox .mask{position: absolute;z-index: 1;top:0;right:0;bottom: 0;left: 0;}
.buybox .mainbox{margin: auto;background:#000;border-radius:5px;width: 80%;padding: 15px 5%;text-align: left;position: relative;z-index: 99;}
.buybox .mainbox .title{font-size: 16px;font-weight: bold;}
.buybox .mainbox .p{padding:2px 0; position: relative;}
.buybox .mainbox .p .close{position: absolute;right:0;top:0;}
.buybox .mainbox .p.p2{padding: 5px 0;display: flex;flex-direction: row;align-items: center;}
.buybox .mainbox .p.p2 input{width: 100%;height:36px;color: #333;padding: 0 15px;flex: 1;background: #fff;border: 1px solid #bbb;border-radius: 4px;outline: none;}
.buybox .mainbox .p.p2 .txt{color: #888;margin-left: 10px;}
.buybox .mainbox .diybtn{background:linear-gradient(90deg,#f0b90b,#fbda3c);color: #212833;padding: 10px 0;text-align: center;width: 100%;margin-top: 15px;border-radius: 3px;}




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
</style>
