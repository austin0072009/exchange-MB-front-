<template>
  <mu-container class="help" style="height: 100%;">
    <div style="" style="width:24px; height:24px;top:20px;right:20px;z-index:1;position: fixed">
	  <img src="../assets/ico/close.png" @click="$router.back(-1)" class="indexico ico_back1">
    </div>
    <mu-card :raised="false" style="width: 100%; max-width: 100%; margin: 0 auto; text-align: left">

      <mu-card-media :title="$t('header.help')">
        <img src="@/assets/img_5.png">
      </mu-card-media>
    </mu-card>
    <div style="height: calc(100% - 156px); overflow: auto">
      <mu-container>
        <mu-list textline="two-line">
          <div class="mt20" v-if="notices.length<=0">
            <svg color="gray" class="icon" font-size="40px" aria-hidden="true">
              <use xlink:href="#icon-empty1"></use>
            </svg>
            <p class="subtitle">{{ $t('tpc.nodata') }}</p>
          </div>
          <mu-list-item @click="showDetail(item.id)" v-for="(item,index) in notices" avatar button :ripple="true">
            <mu-list-item-action>
              <mu-avatar :color="index%2==0?'primary':'amber500'">
                <mu-icon value=":icon-gonggao5"></mu-icon>
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content style="padding: 0 10px;">
              <mu-list-item-title>{{ item.title }}</mu-list-item-title>
              <mu-list-item-sub-title style="color:#aaa">{{ item.create_time }}</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action>
              <mu-button icon>
                <mu-icon value=":icon-xiangqing"></mu-icon>
              </mu-button>
            </mu-list-item-action>
          </mu-list-item>
          <mu-list-item v-if="false" :href="customer_url" avatar button :ripple="true">
            <mu-list-item-action>
              <mu-avatar :color="'primary'">
                <mu-icon value=":icon-kefu"></mu-icon>
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content style="padding: 0 10px;">
              <mu-list-item-title>{{ $t('home.kefu') }}</mu-list-item-title>
              <mu-list-item-sub-title>{{ $t('home.kefu') }}</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action>
              <mu-button icon>
                <mu-icon value=":icon-xiangqing"></mu-icon>
              </mu-button>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </mu-container>
    </div>
    <mu-dialog width="100%" style="height: 100%;" transition="slide-bottom" fullscreen :open.sync="openAlert">
      <mu-appbar color="primary" :title="showInfo.title">
        <mu-button slot="right" icon @click="openAlert=false">
          <mu-icon value=":icon-guanbi"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div v-html="showInfo.content" style="padding: 24px;height: calc(100% - 56px); overflow: auto">

      </div>

    </mu-dialog>
  </mu-container>
</template>
<script>

export default {
  name: "Help",
  data() {
    return {
      openAlert: false,
      notices: [],
      showInfo: false,
      customer_url:'#'
    }
  },
  mounted() {
    this.loadNews(21);
    this.loadNews(19);
    this.loadNews(3);
    this.getCustorm();
  },
  methods: {
    getCustorm() {
      let that = this;
      this.$http({
        url: '/api/custorm?terminal=mobile',
        method: 'get',
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        that.customer_url = res.data.replace('{id}',localStorage.getItem('user_id',1)).replace('{name}',localStorage.getItem('accountNum'));
      })
    },
    loadNews(cid) {
      let loading = this.$loading();
      let that = this;
      this.$http.post("/api/news/list", {"c_id": cid, limit: 100, 'lang': localStorage.getItem('locale')}).then(res => {
        if (res.data.type == "ok") {

          loading && loading.close();
          let pics = [];
          for (let i = res.data.message.list.length - 1; i >= 0; i--) {
            let item = res.data.message.list[i];
            pics.push({
              sort: item.sorts,
              id: item.id,
              href: '',
              pic: item.thumbnail,
              title: item.title ? item.title : '',
              create_time: item.create_time.substring(0, 10)
            });

          }
          pics = pics.sort((x, y) => {
            return x.sort == y.sort ? x.id - y.id : x.sort - y.sort;
          })
          that.notices = that.notices.concat(pics);
        }
      });
    },
    showDetail(id) {
      let loading = this.$loading();
      let that = this;
      this.$http.post("/api/news/detail", {"id": id}).then(res => {
        if (res.data.type === "ok") {
          loading.close();

          this.openAlert = true;

          that.showInfo = res.data.message;

          that.showInfo.content += `<div class="talr" style="line-height: 40px; color:#555;"><br/>
          ${that.showInfo.create_time.substring(0,10)}
        </div>`;
        }
      });
    },
  }
}
</script>
<style lang="scss">
.help {
  .mu-dialog-body {

    height: calc(100% - 56px);
    overflow: auto;
  }
}
</style>