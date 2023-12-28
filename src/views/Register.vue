<template>
  <div class="wrap flex flex-column" style="">
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
		        </mu-avatar>
		      </mu-list-item-action>
		      <mu-list-item-title :class="{'active':lang==item.lang}">{{ item.text }}</mu-list-item-title>
		    </mu-list-item>
		  </mu-list>
		</mu-popover>
      <div class="flex1 flex" style="padding-right: 15px; justify-content: flex-end;">
		<img src="../assets/ico/close.png" @click="$router.back(-1)" class="indexico ico_back1">
      </div>
    </div>
	<div class="flex1" style="overflow: auto;padding:0 20px;">
		<mu-container>
			<h1>{{$t("regidters")}}</h1>
			<div class="seltab pdb20">
				<div class="li" :class="mode==1?'cur':''" @click="mode=1">{{$t('register.email')}}</div>
				<div class="li" :class="mode==2?'cur':''" @click="mode=2">{{$t('register.phone')}}</div>
			</div>
		  <mu-form ref="form" :model="validateForm" class="mu-demo-form">
			  
			  <mu-form-item :label="$t('register01.country')" prop="area_code" v-show="mode==2">
			    <mu-select color="primary" v-model="validateForm.area_code">
					<mu-option color="primary" v-for="(option,index) in country" :key="index" :label="option.area_code+'  '+option.name_en" :value="option.area_code"></mu-option>
				  </mu-select>
			  </mu-form-item>
			  <mu-form-item :label="mode==1?$t('register.emailnum'):$t('register.phonenum')" prop="email">
			    <mu-text-field v-model="validateForm.email" prop="username"></mu-text-field>
			  </mu-form-item>
			  <mu-form-item :label="$t('register.codenum')" prop="code">
			    <mu-text-field v-model="validateForm.code" prop="username">
					<mu-button color="primary" :disabled="isSending?true:false"  @click="sendCode">{{sendCodeText}}</mu-button>
				</mu-text-field>
			  </mu-form-item>
		    <mu-form-item :label="$t('register.logpwd')" prop="logpwd">
		      <mu-text-field v-model="validateForm.logpwd"
		                     :action-icon="!visibilitylog ? ':icon-bianzubeifenx' : ':icon-kejian'"
		                     :action-click="() => (visibilitylog = !visibilitylog)"
		                     :type="visibilitylog ? 'text':'password'"
		                     prop="logpwd"></mu-text-field>
		    </mu-form-item>
		    <mu-form-item :label="$t('register.repwd')" prop="repwd">
		      <mu-text-field v-model="validateForm.repwd"
		                     :action-icon="!visibilityre ? ':icon-bianzubeifenx' : ':icon-kejian'"
		                     :action-click="() => (visibilityre = !visibilityre)" :type="visibilityre ? 'text' : 'password'"
		                     prop="repwd"></mu-text-field>
		    </mu-form-item>
		    <mu-form-item :label="$t('register.invitecode')" prop="invitecode">
		      <mu-text-field v-model="validateForm.invitecode" prop="invitecode"></mu-text-field>
		    </mu-form-item>
			<mu-form-item prop="isAgree">
			  <mu-checkbox size="12" :label="$t('register.agree')" v-model="validateForm.isAgree"></mu-checkbox>
			  {{ $t('register.mian') }}
			</mu-form-item>
		    <mu-button color="primary"
		               :disabled="validateForm.email.length===0||!validateForm.isAgree"
		               style="width: 100%; height: 40px;" @click="register">{{ $t('regiterStep1') }}
		    </mu-button>
		    <div class="flex" style="height: 50px;">
		      <span @click="$router.push('/login')" class="flex1 flex alcenter">{{ $t('register.gologin') }}</span>
		    </div>
		  </mu-form>
		</mu-container>
	</div>
  </div>
</template>
<style>
body { background: #000; text-align: left; width: 100%;}
.wrap { height: 100%;text-align: left;}
.mu-form-item .mu-button {margin: 0 !important;}
.mu-option.is-selected .mu-item {color: #0b0f10 !important;}
.mu-form-item-help {color: #9c9c9c8a !important;}
.mu-checkbox-icon {transform: scale(0.8);margin-top: -2px;margin-right: 2px !important;}
.mu-demo-form {width: 100%;max-width: 460px;}
.wrap .mu-form-item{margin-bottom: 5px;}
</style>
<script>
import country from '../lib/country.js'
import getUrlKey from '@/lib/getUrlKey';

export default {
  data() {
    return {
      mode: 2,
      usernameRules: [
        {validate: (val) => !!val, message: '必须填写用户名'},
        {validate: (val) => val.length >= 3, message: '用户名长度大于3'}
      ],
      passwordRules: [
        {validate: (val) => !!val, message: '必须填写密码'},
        {validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10'}
      ],
      argeeRules: [{validate: (val) => !!val, message: '必须同意用户协议'}],
      validateForm: {
        area_code: '+1',
        email: '',
        code: '',
        isAgree: false,
        country: '+1',
        logpwd: '',
        repwd: '',
        invitecode: ''
      },
      isMobile: false,
      loadingSend: false,
      isSending: false,
      seconds: 60,
	  btndis:false,
      country: country,
      canNext: false,
      stepOne: false,
      stepTwo: true,
      visibilitylog: false,
      visibilityre: false,
	  lang:"en",
	  sendCodeText:this.$t("forget.getcode"),
      openLanguage:false,
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
    let code = getUrlKey('code', window.location.href);
    if (code) {
      this.validateForm.invitecode = code;
    }
  },
  methods: {
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
    changeMode(mode) {
      this.mode = mode;
    },
    submit() {
      let that = this;
      let url = "user/check_email";
      let data = {email_code: this.validateForm.code};
      if (this.mode == 2) {
        url = "user/check_mobile";
        data.mobile_code = this.validateForm.code;
        delete data.email_code;
      }
	  
      this.$http({
        url: "/api/" + url,
        method: "post",
        data: data
      }).then(res => {

        if (res.data.type == "ok") {
          
        } else {
			
          that.$toast.info(res.data.message);
        }
      });

    },
    register() {
		//console.log(this.validateForm.area_code)
      if (this.validateForm.invitecode.length < 0) {
        this.$toast.error(this.$t('register.invitecode'));
        return;
      }

      if (this.validateForm.logpwd.length < 0) {
        this.$toast.error(this.$t('register.logpwd'));
        return;
      }

      if (this.validateForm.logpwd !== this.validateForm.repwd) {
        this.$toast.error(this.$t('lay.twopwd'));
        return;
      }


      let that = this;
      let data = {};
	
      data.type = 'email';
      data.country_code = that.validateForm.area_code;
	  if(this.mode==2){
		  data.type="mobile"
	  }else{
		  data.country_code=0;
	  }
      data.user_string = that.validateForm.email;
      data.code = that.validateForm.code;
      data.password = that.validateForm.logpwd;
      data.re_password = that.validateForm.repwd;
      data.extension_code = that.validateForm.invitecode;
		let loading=this.$loading();
      that.$http({
        url: "/api/user/register",
        data: data,
        method: "post"
      }).then(res => {
		  loading.close();
        if (res.data.type === "ok") {
          that.$toast.success("Success");
          that.$router.push("/login");
        } else {
          that.$toast.error(that.$t("apitip."+res.data.message));
        }
      });
    },
    sendCode() {
      let that = this;
      let url = 'sms_mail';
      if (this.mode == 1) {
        let emreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!emreg.test(this.validateForm.email)) {
          this.$toast.error(this.$t('register.emailnum'));
          return;
        }
      } else {
        url = 'sms_send';
      }
      this.loadingSend = true;
      let data = {user_string: this.validateForm.email};
      data.lang = window.localStorage.getItem("lang");
      if (this.mode == 2) {
        data.country_code = this.validateForm.area_code
      }
    that.isSending = true;
      this.$http({
        url: "/api/" + url,
        method: "post",
        data: data,
        headers: {not_loading: true}
      }).then(res => {

        that.loadingSend = false;

        if (res.data.type !== 'error') {

          that.$toast.success(res.data.message);

          that.canNext = true;
          let interval = setInterval(x => {
            that.seconds--;
			that.sendCodeText=that.seconds+" S";
            if (that.seconds === 0) {
              that.seconds = 60;
			  that.sendCodeText=that.$t("forget.getcode");
              clearInterval(interval);
              that.isSending = false;
            }
          }, 1000);
        } else {
          that.isSending = false;
          that.$toast.error(res.data.message);
        }
      });
    }
  }
};
</script>