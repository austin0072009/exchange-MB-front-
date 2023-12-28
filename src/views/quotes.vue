<template>
	<div class="h100f">
		<div class="h100auto">
			<mu-container data-mu-loading-color="primary" style="height: 100%; overflow: auto" v-loading="loadingall"
			              data-mu-loading-overlay-color="rgba(255, 255,255, .9)"
			              class="demo-loading-wrap">
			  <div class="wrap">
			    <div style="width:100%; height: 5px;" :style="getDayColor('background-color')"></div>
			    <div style="width: 100%;">
			      <mu-container>
			        <mu-tabs v-if="false" :value.sync="active1" :inverse="mode=='day'" :color="mode=='day'?'black':'#303030'"
			                 :indicator-color="mode=='day'?'white':'white'" left>
			          <mu-tab style="font-weight: bold;"><span
			              style="padding: 0 5px; font-size: 16px; font-weight: bold;">{{ $t('market.quotation') }}</span>
			          </mu-tab>
			        </mu-tabs>
			        <div class="bold tall ft16" style="padding-left: 20px; line-height: 50px;">
			          {{ $t('market.quotation') }}
			        </div>
			        <div class="indexqqq">
			          <div class=" flex alcenter bold" style="border-top:1px solid #fafafa; border-width: 0; font-size:13px; padding:10px 20px;">
			      
			            <div class="flex flex-column" style="flex:1; text-align: left;">
			              <span  style="color:#aaa;">{{ $t('home.pair') }}</span>
			            </div>
			            <div class="flex flex-column talc" style="flex:2">
			              <span style="color:#aaa;">{{ $t('home.price') }}</span>
			            </div>
			            <div class="talr talc" style="width: 80px;">
			              <span style="color:#aaa;">{{ $t('home.change') }}</span>
			            </div>
			          </div>
			          <div class="flex alcenter" @click="gotoKline(item.currency_id,item.currency_name)"
			               style="border-top:1px solid #fafafa; padding-top: 10px;padding:6px 20px;"
			               :style="{'border-color':mode=='day'?'#eee':'#39393a'}"
			               v-for="item in showQuotationList">
			            <div class="flex flex-column" style="flex:1; text-align: left; ">
			      		  <span style="font-size: 16px; font-weight: bold; display: flex; flex-direction: row; align-items: center;">{{ item.currency_name }}</span>
			                <!--span :class="item.change>0?'green':'red'">{{ item.change }}%</span-->
			            </div>
			            <div class="flex flex-column flex1" style="text-align: center; flex:2">
			              <span style="font-weight: bold; font-size: 16px;" :class="item.change>0?'green':'red'">{{item.now_price}}</span>
			              <span style="font-size: 10px;font-weight: bold; color:rgb(170,170,170)">Vol {{ item.volume / 1000|numberFixed(2) }} K</span>
			            </div>
			            <div style="width: 80px; display: flex;flex-direction: row;align-items: center;">
			              <span class="zhangdiefufufu" style="text-align: center;" :class="item.color==0?'defColor':item.color<0?'lowColor':'upColor'">{{ item.change }}%</span>
			            </div>
			          </div>
			        </div>
			      </mu-container>
			    </div>
					
			  </div>
			
			</mu-container>
		</div>
		<div class="footer">
		  <Footer active="quotes"></Footer>
		</div>
	</div>
  
</template>

<script>
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
import "swiper/css/swiper.min.css";
import ChartBox from "@/components/chartBox"
import Loading from "muse-ui-loading";
import Footer from "@/components/Footer";
let instance;
// let loading = false;
export default {
  data() {
    return {
      loadingall: true,
      banners: [],
      notices: [],
      swiperOption: {
        loop: true,
        speed: 600,
        spaceBetween: 10,
        pagination: {
          el: '.swiper-pagination',
          clickable: false
        }
      },
      swiperOptionNotice: {
        autoplay: true,
        direction: 'vertical',
      },
      firstRequest: true,
      active1: 0,
      refreshing: false,
      loading: false,
      quotationsList: [],
      quotationsListChange: [],
      quotationsListPrice: [],
      quotationsListVol: [],
      number: 0,
      showQuotationList: [],
      mode: window.localStorage.getItem('mode'),
      shorts: [
        {
          name: this.$t('header.help'),
          icon: 'icon-bangzhu',
          link: 'help'
        },
        {
          name: this.$t('header.fastrecharge'),
          icon: 'icon-deposit',
          link: 'recharge'
        },
        {
          name: this.$t('home.kefu'),
          icon: 'icon-weibiaoti-',
          link: 'ucenter'
        },
        {
          name: this.$t('sgr.invite'),
          icon: 'icon-yaoqinghaoyou',
          link: 'share'
        }
      ]
    }
  },

  name: "homeContent",
  components: {
    Loading,
	Footer
  },
  beforeCreate() {
    // console.log('大');
  },
  computed: {
    text() {
      return this.notices.length > 0 ? {
        id: this.number,
        val: this.notices.length > 0 ? this.notices[this.number] : {'title': ''}
      } : {id: 0, val: {title: this.$t("welcome")}};
    }
  },
  watch: {
    active1(val) {
      this.showQuotationList = (val === 0 ? this.quotationsListChange : (val === 1 ? this.quotationsListPrice : this.quotationsListVol))
    }
  },
  mounted() {

    instance = this;
    this.loadingall = true;
    this.firstRequest = true;

   // this.getSwiper();
    this.subScribeMarket();
    //this.startMove();
    eventBus.$on('refresh', () => {
      //instance.getSwiper();
      instance.shorts = [
        {
          name: this.$t('header.help'),
          icon: 'icon-bangzhu',
          link: 'help'
        },
        {
          name: this.$t('header.fastrecharge'),
          icon: 'icon-deposit',
          link: 'recharge'
        },
        {
          name: this.$t('home.kefu'),
          icon: 'icon-weibiaoti-',
          link: 'ucenter'
        },
        {
          name: this.$t('sgr.invite'),
          icon: 'icon-yaoqinghaoyou',
          link: 'share'
        }
      ];
    })
  },
  methods: {
    load() {
      return false;
    },
    gotoKline(id,name)
    {
      window.localStorage.setItem("currentCurrencyID",id);
      window.localStorage.setItem("currentCurrency",name.toUpperCase());
      this.$router.push('/kline?from=trade&mode=1')
    },
    gotoCustomer(){
      
    },
    getDayColor(attr) {
      let obj = {};
      obj[attr] = localStorage.getItem('mode') === 'day' ? '#eee' : '#39393a';
      return obj;
    },
    startMove() {
      // eslint-disable-next-line
      let timer = setTimeout(() => {
        if (this.number === instance.banners.length - 1) {
          this.number = 0;
        } else {
          this.number += 1;
        }
        this.startMove();
      }, 5000); // 滚动不需要停顿则将2000改成动画持续时间
    },
    refresh() {
      this.refreshing = true;
      let that = this;
      setTimeout(() => {
        that.refreshing = false
      }, 2000)
    },
    getSwiper() {
      let that = this;
      this.$http.post("/api/news/list", {"c_id": 5, 'lang': localStorage.getItem('locale')}).then(res => {
        if (res.data.type == "ok") {
          let pics = [];
          for (let i = res.data.message.list.length - 1; i >= 0; i--) {
            let item = res.data.message.list[i];
            pics.push({
              sort: item.sorts,
              id: item.id,
              href: '',
              pic: item.thumbnail,
              title: item.title ? item.title : '',
              create_time: item.create_time.substring(5, 10)
            });

          }
          pics = pics.sort((x, y) => {
            return x.sort == y.sort ? x.id - y.id : x.sort - y.sort;
          })
          that.banners = pics;
        }
      });

      this.$http.post("/api/news/list", {"c_id": 4, 'lang': localStorage.getItem('locale')}).then(res => {
        if (res.data.type == "ok") {
          let pics = [];
          for (let i = res.data.message.list.length - 1; i >= 0; i--) {
            let item = res.data.message.list[i];
            pics.push({
              sort: item.sorts,
              id: item.id,
              href: '',
              pic: item.thumbnail,
              title: item.title ? item.title : '',
              create_time: item.create_time.substring(5, 10)
            });

          }
          pics = pics.sort((x, y) => {
            return x.sort == y.sort ? x.id - y.id : x.sort - y.sort;
          })
          that.notices = pics;
        }
      });
    },
    subScribeMarket() {

      let that = instance;


      this.$http({
        url: "/api/" + "currency/quotation_new",
        method: "get",
        data: {}
      }).then(res => {
        if (res.data.type == "ok") {


          let arr = [];
          for (var i = 0; i < res.data.message.length; i++) {
            for (var j = 0; j < res.data.message[i].quotation.length; j++) {
              arr.push(res.data.message[i].quotation[j]);
            }
          }
          that.quotationsList = arr;

          that.showQuotationList = that.quotationsList;
          that.loadingall = false;

          instance.sockets.subscribe('daymarket', msg => {
            if (msg.type == 'daymarket') {

              for (let i = 0; i < that.quotationsList.length; i++) {
                if (that.quotationsList[i].legal_id == msg.legal_id && that.quotationsList[i].currency_id == msg.currency_id) {

                  that.quotationsList[i].now_price = msg.now_price;
                  that.quotationsList[i].change = msg.change;
                  that.quotationsList[i].volume = msg.volume;
                  that.quotationsList[i].high = msg.high;
                  that.quotationsList[i].low = msg.low;
				  that.quotationsList[i].color = msg.open==msg.now_price?0:1 ;
				  that.quotationsList[i].color=that.quotationsList[i].color?msg.open<msg.now_price?1:-1:that.quotationsList[i].color;
                }
              }

              if (instance.firstRequest) {
                instance.firstRequest = false;
                instance.loadingall = false;
              }

              // that.quotationsList.sort((x, y) => {
              //   return x.change - y.change
              // });

              that.quotationsListChange = that.quotationsList;//.reverse();


              let quotationsListPrice = that.quotationsList.slice(0);
              // quotationsListPrice.sort((x, y) => {
              //   return x.now_price - y.now_price
              // }).reverse();
              that.quotationsListPrice = quotationsListPrice;

              let quotationsListVol = that.quotationsList.slice(0);
              // quotationsListVol.sort((x, y) => {
              //   return x.volume - y.volume
              // }).reverse();
              that.quotationsListVol = quotationsListVol;
              if (that.showQuotationList.length <= 0) {
                that.showQuotationList = that.quotationsListChange;
              }
            }
          });

        }

      }).catch(error => {
      });


    }
  }
}
</script>Î
<style lang="scss">

.swiper-slide {
  transition: all 0.6s;
}



.mu-linear-progress-determinate {
  height: 1px !important;
  position: fixed !important;
}


.swiper-slide-prev, .swiper-slide-next {
  img {
    transform: scale(0.96) !important;
  }
}

.swiper-slide-active, .swiper-slide-duplicate-prev {
  img {
    transform: scale(1) !important;
  }
}

.swiper-pagination-bullet {
  width: 5px;
  height: 5px;
}

.swiper-pagination-bullet-active {
  background: #fff;
  width: 5px;
  height: 5px;
}

</style>

<style lang="scss" scoped>

.mu-load-more {
  height: 100%;
}

.inner-menu {
  height: 70px;
  line-height: 70px;
  border-top: 1px solid #eee;
  box-sizing: border-box;
  align-items: center;
  display: flex;
  //font-weight: bold;

  .flex-column {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

    > div {
      position: relative;
      height: 100%;

      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    mu-ripple {
      position: relative;
    }

    .iconfont {
      font-size: 18px;
    }

    line-height: 25px;
    flex: 1;
    display: flex;
    flex-direction: column;

    div:last-child {
      font-size: 12px;
    }

  }

}

.wrap {
  height: 100%;
}

.textBox {
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  text-align: center;
}

.text {
  width: 100%;
  position: absolute;
  line-height: 40px;
  margin: 0;
  padding: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.5s linear;
}

.slide-enter {
  transform: translateY(20px) scale(1);
  opacity: 1;
}

.slide-leave-to {
  transform: translateY(-20px) scale(0.8);
  opacity: 0;
}
</style>