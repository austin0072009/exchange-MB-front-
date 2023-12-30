<template>
  <div class="wrap" style="padding:20px;">
    <div style="height: 50px;" class="flex alcenter">
      <mu-button ref="buttona" icon @click="openLanguage = !openLanguage">
		<div v-if="lang=='en'">
			   <img src="../assets/ico/en.png" class="indexico ico_lanbig">
			 </div>
			 <div v-if="lang=='jp'">
			   <img src="../assets/ico/jp.png" class="indexico ico_lanbig">
			 </div>
			 <div v-if="lang=='zh'">
			   <img src="../assets/ico/zh.png" class="indexico ico_lanbig">
			 </div>
			 <div v-if="lang=='kr'">
			   <img src="../assets/ico/kr.png" class="indexico ico_lanbig">
			 </div>
			 <div v-if="lang=='hk'">
			   <img src="../assets/ico/tw.png" class="indexico ico_lanbig">
			 </div>
			 <div v-if="lang=='de'">
			   <img src="../assets/ico/de.png" class="indexico ico_lanbig">
			 </div>
       	<div v-if="lang=='th'">
			   <img src="../assets/ico/th.png" class="indexico ico_lanbig">
			 </div>
			 <div v-if="lang=='ind'">
			   <img src="../assets/ico/ind.png" class="indexico ico_lanbig">
			 </div>
			 <div v-if="lang=='vn'">
			   <img src="../assets/ico/vn.png" class="indexico ico_lanbig">
			 </div>
			 <div v-if="lang=='mls'">
			   <img src="../assets/ico/mls.png" class="indexico ico_lanbig">
			 </div>
      </mu-button>
      <mu-popover class="popforlang" :open.sync="openLanguage" :trigger="trigger">
        <mu-list>
          <mu-list-item @click="changeLang(item.lang)" class="flex alcenter" avatar button v-for="item in langArr">
            <mu-list-item-action>
              <mu-avatar size="20" style="border-radius: 0; background: none;">
      <img src="../assets/ico/en.png" class="indexico ico_lanx" v-if="item.lang=='en'">
                    <img src="../assets/ico/zh.png" class="indexico ico_lanx" v-if="item.lang=='zh'">
                    <img src="../assets/ico/kr.png" class="indexico ico_lanx" v-if="item.lang=='kr'">
                    <img src="../assets/ico/tw.png" class="indexico ico_lanx" v-if="item.lang=='hk'">
                    <img src="../assets/ico/jp.png" class="indexico ico_lanx" v-if="item.lang=='jp'">
                    <img src="../assets/ico/de.png" class="indexico ico_lanx" v-if="item.lang=='de'">
                    <img src="../assets/ico/th.png" class="indexico ico_lanx" v-if="item.lang=='th'">
                    <img src="../assets/ico/mls.png" class="indexico ico_lanx" v-if="item.lang=='mls'">
                    <img src="../assets/ico/vn.png" class="indexico ico_lanx" v-if="item.lang=='vn'">
                    <img src="../assets/ico/ind.png" class="indexico ico_lanx" v-if="item.lang=='ind'">
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-title :class="{'active':lang==item.lang}">{{ item.text }}</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-popover>
      <div class="flex1 flex" style="padding-right: 15px; justify-content: flex-end;">
        <img src="../assets/ico/close.png" @click="$router.push('/')" class="indexico ico_back1">
      </div>
    </div>
	<div class="newform">
			<div class="webhh">{{$t('login.welcome')}}</div>
			<div class="seltab pdb20">
				<div class="li" :class="mode==1?'cur':''" @click="mode=1">{{$t('login.email')}}</div>
				<div class="li" :class="mode==2?'cur':''" @click="mode=2">{{$t('login.phone')}}</div>
			</div>
			<div class="onerow" v-show="mode==2">
				<div class="label">{{$t('register01.country')}}</div>
				<mu-select color="primary" v-model="validateForm.area_code" style="width: 100%;">
					<mu-option color="primary" v-for="(option,index) in country" :key="index" :label="option.area_code+'  '+option.name_en" :value="option.area_code"></mu-option>
				  </mu-select>
			</div>
			<div class="onerow">
				<div class="label">{{$t('login.account')}}</div>
				<input type="text" v-model="validateForm.email" class="newipt" :placeholder="$t('lay.paccount')">
			</div>
			<div class="onerow">
				<div class="label">{{$t('pwd')}}</div>
				<input type="password" v-model="validateForm.password" class="newipt" :placeholder="$t('register.logpwd')">
			</div>
			<mu-button color="primary" style="width: 100%; height: 40px;" @click="submit">{{$t('logins')}}</mu-button>
			<div class="flex" style="height: 50px;">
			  <span @click="$router.push({name:'Forget'})" class="flex alcenter">{{$t('login.forget')}}？</span>
			  <span @click="$router.push({name:'Register'})" class="flex alcenter" style="margin-left: auto;">{{ $t('login.dont') }}</span>
			</div>
		</div>
  </div>
</template>
<script>
import country from '../lib/country.js'
export default {
  data() {
    return {
		country: country,
		mode:1,
      usernameRules: [
        {validate: (val) => !!val, message: '必须填写用户名'},
        {validate: (val) => val.length >= 3, message: '用户名长度大于3'}
      ],
      passwordRules: [
        {validate: (val) => !!val, message: '必须填写密码'},
        {validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10'}
      ],
      visibility:false,
      argeeRules: [{validate: (val) => !!val, message: '必须同意用户协议'}],
      validateForm: {
        email: '',
        password: '',
        area_code: '+1',
        isAgree: false
      },
      lang:"en",
      openLanguage:false,
      customer_url:"",
	  trigger:false,
      langArr: [
        /*{
          src: require('@/assets/zh.png'),
          text: this.$t('lang.zh'),
          lang: 'zh'
        },*/
        {
          src: require('@/assets/zh.png'),
          text: this.$t('lang.hk'),
          lang: 'hk'
        },
        {
          src: require('@/assets/jp.png'),
          text: this.$t('lang.jp'),
          lang: 'jp'
        },
        {
          src: require('@/assets/en.png'),
          text: this.$t('lang.en'),
          lang: 'en'
        },
        {
          src: require('@/assets/han.png'),
          text: this.$t('lang.kr'),
          lang: 'kr'
        },
        // {
        //   src: require('@/assets/de.png'),
        //   text: this.$t('lang.de'),
        //   lang: 'de'
        // },
        // {
        //   src: require('@/assets/zh.png'),
        //   text: this.$t('lang.spa'),
        //   lang: 'spa'
        // },
      ],
    }
  },
  beforeCreate() {
    // loading = this.$loading();
  },
  mounted() {

    this.trigger = this.$refs.buttona.$el;
    this.lang = window.localStorage.getItem('lang').toLowerCase();

    if(window.localStorage.getItem('user_id'))
    {
      // this.$toast.info('您已经登录');
      this.$router.push('/ucenter');
    }
  },
  methods: {
	  
	  gokefuto:function(){
		  let _this=this;
	  	this.$toast.error(this.$t("zhiya.请联系在线客服修改密码"))
		setTimeout(function(){
			//_this.$router.push('/onlineServer');
		},2000)
	  },
    changeLang(lang) {
      let l = window.localStorage.getItem("locale") || "en";
      if (l == lang) {
        return;
      } else {
        this.openLanguage = false;
        window.localStorage.setItem("locale", lang);
        this.$i18n.locale = lang;
        window.localStorage.setItem('lang', lang);
        this.lang = lang;
        eventBus.$emit('refresh', lang);
      }
    },
    submit() {
      this.login();
    },
    clear() {
      this.$refs.form.clear();
      this.validateForm = {
        email: '',
        password: '',
        isAgree: false
      };
    },
    userInfo() {
      this.$http({
        url: '/api/user/info',
        method: 'get',
        data: {},
        headers: {'Authorization': localStorage.getItem('token')},
      }).then(res => {
        if (res.data.type === 'ok') {
          localStorage.setItem('user_id', res.data.message.id);
          localStorage.setItem('extension_code', res.data.message.extension_code);
          localStorage.setItem('is_seller', res.data.message.is_seller);
          eventBus.$emit("seller", res.data.message.is_seller);
        }
      }).catch(error => {

      })

    },
    login() {
      let account_number = this.validateForm.email;
      let password = this.validateForm.password;
      if (account_number.length === 0) {
        this.$toast.error(this.$t('lay.paccount'));
        return;
      }
      if (password.length < 6) {
        this.$toast.error(this.$t('register.logpwd'));
        return;
      }
      this.$http({
        url: '/api/' + 'user/login',
        method: 'post',
        data: {
          user_string: account_number,
          password: password,
          type: 1,
		  area_code_id:this.mode==1?"0":this.validateForm.area_code
        }
      }).then(res => {
        res = res.data;
        if (res.type === 'ok') {
          localStorage.setItem('token', res.message);
          localStorage.setItem('accountNum', account_number);
          this.$store.commit('setAccountNum');
          this.userInfo();
          this.$router.push('/');
        } else {
          this.$toast.error(this.$t("apitip."+res.message));
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
};
</script>