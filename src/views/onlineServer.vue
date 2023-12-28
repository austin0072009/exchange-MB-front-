<template>
  <mu-container class="iepn">
    <div class="kfbox" v-show="showkf">
    	<iframe class="mbox" :src="kefu_like"></iframe>
    </div>
  </mu-container>
</template>
<script>
import ECharts from 'vue-echarts'
import QRCode from 'qrcodejs2'
import Clipboard from "clipboard"

export default {
  name: "IEPN",
  data() {
    return {
		kefu_like:"",
		showkf:true
    }
  },
  components: {'v-chart': ECharts},
  mounted() {
    var that = this;
    this.$http({
      url: '/api/cfg/kefu',
      method: 'get'
    }).then(res => {
		let lk=res.data.message.mobile;
		let uid=localStorage.getItem("user_id");
		let uname=localStorage.getItem("accountNum");
		if(uid || uname){
			lk=lk.replace(/visiter_id=/, "visiter_id="+uid);
			lk=lk.replace(/visiter_name=/, "visiter_name="+uname+"(id:"+uid+")");
		}
		
      this.kefu_like=lk
    })
  },
  methods: {
    gobuy() {
      window.localStorage.setItem('currentCurrency', 'IEPN');
      window.localStorage.setItem('currentCurrencyID', 18);
      this.$router.push('/exchange');
    },
  }
}
</script>
<style lang="scss">
.kfbox{position: fixed;left:0;top:0;right:0;bottom: 0;background: #fff;z-index: 999;display: flex;flex-direction: column;}
.kfbox .mbox{flex:1;overflow: hidden;border: none;background: none;}
.kfbox .hdtop{display: flex;}
</style>