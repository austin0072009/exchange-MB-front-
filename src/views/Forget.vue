<template>
  <div class="wrap" style="padding:20px;">
    <div style="height: 50px;" class="flex alcenter">
      <div class="flex1 flex" style="padding-right: 15px; justify-content: flex-end;">
		<img src="../assets/ico/close.png" @click="$router.back(-1)" class="indexico ico_back1">
      </div>
    </div>
    <mu-container>
      <h1 align="left" class="" style="line-height: 50px; margin:0; margin-bottom: 30px;">{{ $t('login.forget') }}</h1>

      <mu-form ref="form" :model="validateForm" v-if="stepOne" class="mu-demo-form">
		  <div class="seltab pdb20">
		  	<div class="li" :class="mode==1?'cur':''" @click="mode=1">{{$t('login.email')}} {{$t('accounts')}}</div>
		  	<div class="li" :class="mode==2?'cur':''" @click="mode=2">{{$t('login.phone')}} {{$t('accounts')}}</div>
		  </div>
		  <div class="onerow" v-show="mode==2">
		  	<div class="label">{{$t('register01.country')}}</div>
		  	<mu-select color="primary" v-model="validateForm.area_code" style="width: 100%;">
		  		<mu-option color="primary" v-for="(option,index) in country" :key="index" :label="option.area_code+'  '+option.name_en" :value="option.area_code"></mu-option>
		  	  </mu-select>
		  </div>
        <mu-form-item :label="mode==1?$t('register.emailnum'):$t('register.phonenum')" prop="email">
          <mu-text-field v-model="validateForm.email" prop="username"></mu-text-field>
        </mu-form-item>
        <mu-form-item :label="$t('register.codenum')" prop="password">
          <mu-text-field type="number" autoComplete="new-password" v-model="validateForm.code" prop="code">
            <div slot="append">
              <mu-button flat color="primary" :disabled="isSending?true:false" data-mu-loading-size="24"
                         v-loading="loadingSend" @click="setTime">{{getcodetxt}}</mu-button>
            </div>
          </mu-text-field>
        </mu-form-item>
        <mu-button color="primary"
                   :disabled="validateForm.email.length===0||validateForm.code.length===0"
                   style="width: 100%; height: 40px;" @click="submit">{{ $t('lpwd.rpwd') }}
        </mu-button>
        <div class="flex" style="height: 50px;">
          <span @click="$router.push('/login')" class="flex1 flex alcenter">{{ $t('register.gologin') }}</span>
        </div>
      </mu-form>

      <mu-form ref="form" :model="validateForm" v-if="stepTwo" class="mu-demo-form">
        <mu-form-item :label="$t('lpwd.newpwd')" prop="logpwd">
          <mu-text-field v-model="validateForm.logpwd"
                         :action-icon="!visibilitylog ? ':icon-bianzubeifenx' : ':icon-kejian'"
                         :action-click="() => (visibilitylog = !visibilitylog)"
                         :type="visibilitylog ? 'text' : 'password'"
                         prop="logpwd"></mu-text-field>
        </mu-form-item>
        <mu-form-item :label="$t('register.repwd')" prop="repwd">
          <mu-text-field v-model="validateForm.repwd"
                         :action-icon="!visibilityre ? ':icon-bianzubeifenx' : ':icon-kejian'"
                         :action-click="() => (visibilityre = !visibilityre)" :type="visibilityre ? 'text' : 'password'"
                         prop="repwd"></mu-text-field>
        </mu-form-item>
        <mu-button color="primary"
                   :disabled="validateForm.email.length===0||validateForm.code.length===0"
                   style="width: 100%; height: 40px;" @click="reset">{{ $t('lpwd.spwd') }}
        </mu-button>
        <div class="flex" style="height: 50px;">
          <span @click="$router.push('/login')" class="flex1 flex alcenter">{{ $t('register.gologin') }}</span>
        </div>
      </mu-form>

    </mu-container>
  </div>
</template>
<style lang="scss" scoped>
body {
  background: #000;
  text-align: left;
}

.wrap {
  height: 100%;
  text-align: left
}

.mu-demo-form {
  width: 100%;
  max-width: 460px;
}
</style>
<script>

import country from "@/lib/country";

export default {
  data() {
    return {
      usernameRules: [
        {validate: (val) => !!val, message: '必须填写用户名'},
        {validate: (val) => val.length >= 3, message: '用户名长度大于3'}
      ],
      passwordRules: [
        {validate: (val) => !!val, message: '必须填写密码'},
        {validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10'}
      ],
      visibility: false,
      argeeRules: [{validate: (val) => !!val, message: '必须同意用户协议'}],
      validateForm: {
		  area_code:"+1",
        email: '',
        code: '',
        logpwd: '',
        repwd: ''
      },
      loadingSend: false,
      isSending: false,
      seconds: 60,
      country: country,
      canNext: false,
      stepOne: true,
      stepTwo: false,
      visibilitylog: false,
      visibilityre: false,
      accountValid: false,
	  mode:1,
	  time:60,
		isclick:false,
	  getcodetxt:this.$t("forget.getcode")
    }
  },
  beforeCreate() {
    // loading = this.$loading();
  },
  mounted() {

  },
  methods: {
    submit() {
      let that = this;
      let url = "user/check_email";
      let data = {email_code: this.validateForm.code};
		if(this.mode==2){
			url = "user/check_mobile";
			data={
				mobile_code: this.validateForm.code
			}
		}
		let loading=this.$loading();
      this.$http({
        url: "/api/" + url,
        method: "post",
        data: data
      }).then(res => {
		loading.close();
        if (res.data.type == "ok") {
          that.stepTwo = true;
          that.stepOne = false;
        } else {
          that.$toast.error(that.$t("apitip."+res.data.message));
        }
      });

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
    reset() {
      const loading = this.$loading();
      let that = this;

      this.$http({
        url: '/api/user/forget',
        method: 'post',
        data: {
			country_code:this.mode==2?this.validateForm.area_code:0,
          account: this.validateForm.email,
          password: this.validateForm.logpwd,
          repassword: this.validateForm.repwd,
          code: this.validateForm.code
        }
      }).then(res => {
        loading.close();
        if (res.data.type === 'ok') {
          that.$toast.success(that.$t('legal.finished'));

          ['token', 'user_id'].forEach(x => {
            localStorage.removeItem(x);
          })

          setTimeout(() => {
            that.$router.push('/login');
          }, 2000)
        } else {
          that.$toast.success(res.data.message);
        }
      });
    },
    setTime() {
		let that = this;
		var reg = /^1[345678]\d{9}$/;
        var url = "sms_send";
        var emreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (this.validateForm.email == "") {
          this.$toast.error(this.$t("apitip.请输入账号"));
          return;
        } 
		if(this.mode==1){
			if (emreg.test(this.validateForm.email)){
				url = "sms_mail";
			}else{
				this.$toast.error(this.$t("apitip.您输入的邮箱或手机号不符合规则"));
				return;
			}
		}
		
        let arg={
        			user_string: this.validateForm.email,
        			type: "forget",
        			 country_code:this.mode==2?this.validateForm.area_code:0,
        			 lang:localStorage.getItem("lang")
        		}
			//console.log(JSON.stringify(this.validateForm.area_code))	
        const loading = this.$loading();
		clearInterval(this.timer);
        this.$http({
          url: "/api/" + url,
          method: "post",
          data: arg
        }).then(res => {
			loading.close();
			if(res.data.type=="ok"){
				this.$toast.success("success");
				this.time = 60;
				this.timer = setInterval(function() {
				  that.getcodetxt=that.time+"S";
				  
				  that.isclick=true;
				  that.isSending=true;
				  //console.log(that.time)
				  if (that.time <= 0) {
				    clearInterval(that.timer);
				    that.getcodetxt=that.$t("forget.getcode");
				    that.isclick=false;
				    return;
				  }
				  that.time=that.time-1;
				}, 1000);
			}else{
				clearInterval(this.timer);
				that.$toast.error(res.data.message);
				  that.isSending=false;
				that.isclick=false;
			}
          
        });
        
    }
  }
};
</script>