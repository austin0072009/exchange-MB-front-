<template>
  <div v-if="loaded" style="height: 100%;">
    <mu-container style="height: 100%;">
      <mu-appbar style="width: 100%;" color="#20232b" text-color="#fff">
        {{ $t('auth.auth') }}
        <mu-button @click="$router.back(-1)" icon flat slot="left">
          <mu-icon value=":icon-fanhui4"></mu-icon>
        </mu-button>
        <mu-button icon flat slot="right" v-if="!showc">
          <mu-icon value=":icon-fanhui40"></mu-icon>
        </mu-button>
        <mu-button icon flat slot="right" @click="showc=false" v-if="showc">
          <mu-icon value=":icon-qiehuan"></mu-icon>
        </mu-button>
      </mu-appbar>

      <div class="myinfo2 bghui by10 tl pdlr20 pdtb20 flex flex-start">
				<div class="txt2">
				    <!-- <div class="name">{{account_num}}</div> -->
					<div class="id">{{$t('auth.idnum')}} : {{card_id}}</div>
					<!-- <div class="id">{{$t("diy.总资产")}}<em>≈</em><b>${{total.toFixed(2)}}</b></div> -->
				</div>
                <div class="imageContainer2">
          <img v-if="front_pic" :src="front_pic" alt="Front Pic" class="image2"/>
          <img v-if="reverse_pic" :src="reverse_pic" alt="Reverse Pic" class="image2"/>
        </div>
        <div class="btnInfo2">

          {{ $t('auth.ised') }}

        </div>

			</div>


    </mu-container>
 
  </div>
</template>




<script>

export default{
data() {
    let user_id = window.localStorage.getItem('user_id');
    let account_num = window.localStorage.getItem('accountNum');
    return {
      user_id: user_id,
      account_num: account_num,
      card_id : '',
      front_pic : '',
      reverse_pic: '',
      loaded: false, // 控制渲染的变量

    }
},
async mounted() {
    try {
       await this.$http({
        url: `/user/real_list/?account=${this.account_num}`,
        method: 'get',
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
            console.log(res);

      this.card_id = res.data.data[0].card_id;
      this.front_pic = res.data.data[0].front_pic;
      this.reverse_pic = res.data.data[0].reverse_pic;
      this.loaded = true; // 数据加载完成，更新控制变量
      
      
      });

    } catch (error) {
      console.error("Data loading error:", error);
      // 处理错误情况
    }
  }

}
</script>

<style>
.txt2{
      font-size: large;

}


.btnInfo2{

      display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin: .4rem auto 0;
    border-radius: .05rem;
    width: 100%;
    background: #1b4bb6;
    color: #fff;
        font-size: x-large;

}


.myinfo2{

  flex-direction: column;
}


.infoContainer2{
    display: flex;
    flex-direction: column;

}

.myheader2{
  display: flex;
  flex-direction:row;
      position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 99;
    font-size: .16rem;
    background: #102030;
    height: .44rem;
}

.title2{
    font-size: .18rem;
}

.btn2{
        display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin: .4rem auto 0;
    height: .35rem;
    border-radius: .05rem;
    width: 100%;
    background: #1b4bb6;
    color: #fff;
    font-size: .15rem;
    font-weight: 600;
}


 .imageContainer2 {
    display: flex;
    justify-content: space-around; /* Adjust as needed */
    /* align-items: center; */
    padding: 10px; /* Adjust as needed */
    flex-direction: row;
  }

  .image2 {
    width: 100px;  /* Adjust as needed */
    height: auto;  /* Adjust as needed */
    border-radius: 5px; /* Optional for rounded corners */
  }
</style>