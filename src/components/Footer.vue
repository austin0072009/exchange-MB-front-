<template>
	<div class="footnewbox">
		<div @click="$router.push('/')" class="one" :class="active==='home'?'active':''">
		  <div class="aaa">
			<div class="footicobox">
			  <img src="../assets/footico/index0.png" class="i0">
			  <img src="../assets/footico/index1.png" class="i1">
			</div>
			<div class="bold">{{ $t('header.home') }}</div>
		  </div>
		</div>
		
		<div @click="gotoLegal()" v-if="false"  class="one" :class="active==='market'?'active':''">
		  <div class="aaa">
			<div class="footicobox">
			  <img src="../assets/footico/index0.png" class="i0">
			  <img src="../assets/footico/index1.png" class="i1">
			</div>
			<div class="bold">{{ $t('header.c2c') }}</div>
		  </div>
		</div>
		<div @click="$router.push('/quotes')" class="one" :class="active==='quotes'?'active':''">
		  <div class="aaa">
			<div class="footicobox">
			  <img src="../assets/footico/hang0.png" class="i0">
			  <img src="../assets/footico/hang1.png" class="i1">
			</div>
			<div class="bold">{{ $t('zh.行情') }}</div>
		  </div>
		</div>
		<div @click="$router.push('/exchange')" class="one" :class="active==='exchange'?'active':''">
		  <div class="aaa">
			<div class="footicobox">
			  <img src="../assets/footico/trade0.png" class="i0">
			  <img src="../assets/footico/trade1.png" class="i1">
			</div>
			<div class="bold">{{ $t('account.trade') }}</div>
		  </div>
		</div>
		<div @click="$router.push('/trade?mode=2')" class="one" :class="active==='trade'?'active':''">
		  <div class="aaa">
			<div class="footicobox">
			  <img src="../assets/footico/gang0.png" class="i0">
			  <img src="../assets/footico/gang1.png" class="i1">
			</div>
			<div class="bold">{{ $t('account.lever') }}</div>
		  </div>
		</div>
		<div @click="$router.push('/assets')" class="one" :class="active==='my'?'active':''">
		  <div class="aaa">
			<div class="footicobox">
			  <img src="../assets/footico/my0.png" class="i0">
			  <img src="../assets/footico/my1.png" class="i1">
			</div>
			<div class="bold">{{ $t('header.我的') }}</div>
		  </div>
		</div>
		
	</div>
</template>

<script>
export default {
  name: "Footer",
  props: {
    active: {
      type: String,
      default: 'home'
    }
  },
  methods: {
    gotoLegal(){
      window.location.href='fiat/fiatrad.html';
    },
    getDayColor(attr) {
      // let key = attr+"-color";
      // return {
      //   key:localStorage.getItem('mode') === 'day' ? '#eee' : '#000'
      // };
      let obj = {};
      obj[attr] = localStorage.getItem('mode') === 'day' ? '#eee' : '#39393a';
      return obj;
    }
  }
}
</script>

<style lang="scss" scoped>
/*底部*/
.footer{color: #999;height: 56px;background: #20232b;}
.footicobox{display: block;}
.footicobox img{display: block;width: 24px;height: 24px; margin: auto;margin-bottom:1px;}
.footicobox  img.i1{display: none;}
.footicobox .bold{margin-bottom: auto;}
.active .footicobox img.i0{display: none;}
.active .footicobox img.i1{display: block;}
.footer .bbb{margin: auto; line-height: 18px;display: flex;flex-direction: column;align-items: center;}
/*.footer .flex-column>div:last-child{margin: auto;}*/
</style>