<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import "//at.alicdn.com/t/font_2302506_dgub43s9y0e.css";
.closebtn{display: block;width:32px;height: 32px;}
.index_kjico{display: block;width: 18px;height: 18px;}
.ico_indexnews{display: block;width: 18px;height: 18px;}
.indexico{display: block;}
.ico_laba{width:16px;height: 16px;}
.ico_kj{width:24px;height: 24px;}
.ico_topuser{width:24px;height: 24px;}
.ico_lanbig{width:24px;height: 24px;}
.ico_lanx{width:18px;height: 18px;}
.ico_back1{width: 24px;height: 24px;}
.footer{color: #999;height: 54px;background: #20232b;border-top: 1px solid #303030;}
.footer .footnewbox{display: flex;flex-direction: row;text-align: center;width:100%;overflow: hidden;height: 100%;}
.footer .one{flex: 1;display: flex;flex-direction: column;align-items: center;}
.footer .one .aaa{margin: auto;}
/*改为白字的*/

div.mu-form-item{color:#ffffff;}
.mu-form-item__focus{color: rgba(255,255,255,0.99);}
.mu-input{color: #ffffff;}
.mu-form-item .mu-text-field-input{color: rgba(255,255,255,0.99);}
input.mu-text-field-input{color: #fff;}
div.mu-item{color: #fff;}
.mu-input-focus-line{background:non;}
div.mu-input-line{background: rgba(255,255,255,.5);}
div.mu-checkbox-label{color: #fff;}
div.mu-input{color: #fff;}
div.mu-select-content,input.mu-select-input{color: #fff;}
div.mu-checkbox{color: #fff;}
div.mu-input-help{color: #999;}
div.mu-popover{background: #333;}
div.mu-option.is-focused,div.mu-option.is-focused a{color: #fff;}
div.mu-option.is-selected div.mu-item{color: #fff;}
.mu-option.is-selected .mu-item .mu-item-title{color: #0081cc;}

div.mu-tabs-inverse{background: #000;color: #888;}
.container .mu-tabs-inverse.mu-tabs{background: #000;color: #888;}
.mu-dialog-body{color:#333;}
.bg000 .mu-dialog{background: #081724;}
.bg000 header.mu-appbar{color: #fff;height: 56px;background: #20232b;}
.bg000 .mu-dialog-body{color:#fff;}
div.mu-item-action{color:#fff;}
button.mu-flat-button{color: rgba(255,255,255,.5);}
.mu-dialog-actions button.mu-flat-button{color:#999;}
button.mu-flat-button.mu-error-text-color{color: #f44336;}
button.mu-flat-button.mu-success-text-color{color: #4caf50;}
button.mu-flat-button.mu-primary-text-color{color: #1976d2;}
div.mu-paper{background:none;background-color: #333;background: #333;color: #999;}
.defColor {
	background: #c5cfd5;
}
.lowColor {
	background: #ff494a;
}
.upColor {
	background: #35b65a;
}
/**/

.zhangdiefufufu{width:80px;margin: auto;border-radius: 3px;height: 26px;line-height: 26px;font-size: 14px;}
.mu-icon {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.card-radius {
  .mu-card-media {
    width: calc(100% - 32px);
    margin: 0 auto;
    overflow: hidden;
    border-radius: 5px;
  }

  .mu-card-media-title {
    padding: 8px 16px !important;

    .mu-card-title {
      font-size: 20px !important;
    }
  }
}


header.mu-appbar {
  background: #fff;
  color: #0b0f10;
  box-shadow: none;

  .mu-appbar-title {
    font-size: 18px;
    font-weight: bold;
    //text-align: left;
  }
}

.currency_color{
  color:#555;
}
.mu-list-dense .mu-item .mu-secondary-text-color{color: #fff;}
.seltab{display: flex;flex-direction: row;}
.seltab.pdb20{padding-bottom: 20px;}
.seltab .li{cursor: pointer;display: block;background: #fff;color:#333;white-space: nowrap;padding:0 10px;height: 36px;line-height: 36px;}
.seltab .li.cur{color: #fff;background: #409eff;}
.seltab .li:first-child{border-top-left-radius: 4px;border-bottom-left-radius: 4px;}
.seltab .li:last-child{border-top-right-radius: 4px;border-bottom-right-radius: 4px;}
</style>
<script>
import 'typeface-roboto'
export default {
  name: "App",
  created() {
  }
}
</script>
<style lang="scss">
html, body {
  position: fixed;
  height: 100%;
  min-height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.container {
  //height: 100%;
  padding: 0 !important;
}

.container-my {
  height: 100%;
  padding: 0 !important;
}

#app {
  font-family: PingFang SC,Avenir, Helvetica, Arial,Microsoft YaHei, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}
.newform{padding: 20px;}
.webhh{text-align: center;line-height: 50px;white-space: nowrap;font-size: 2em;font-weight: bold;padding-top: 20px;padding-bottom: 30px;}
.newform .onerow{margin-bottom: 15px;}
.newform .onerow .label{color: rgba(255,255,255,0.68);line-height: 24px;}
.newform .onerow .newipt{width: 100%;background: none;border:none;border-bottom: 1px solid rgba(255,255,255,.5);outline: none;height: 36px; color: #fff;}
.h100f{display: flex;flex-direction: column;height: 100%;}
.h100auto{flex: 1;overflow: auto;}

.zhiyaallbox{}
.zhiyaallbox .bn{ position: relative;min-height: 80px;}
.zhiyaallbox .bn img{display: block;width: 100%;}
.zhiyaallbox .bn .txts{position: absolute;display: flex;align-items: center;top:0;bottom: 0;left:0;right:0;}
.zhiyaallbox .bn .txts .bs{margin: auto;}
.zhiyaallbox .bn .txts .bs .txt1{position: relative;width: auto;
background: #ffd12d;
color: #000;
font-weight: 700;
padding: 5px 15px;
border-radius: 15px;
font-size: 12px;}
.zhiyaallbox .bn .txts .bs .txt1::after{content: "";
position: absolute;
bottom: -8px;
left: 18px;
border-width: 0 10px 10px;
border-style: solid;
border-color: transparent transparent transparent #ffd12d;}
.zhiyaallbox .bn .txts .bs .txt2{padding-top: 10px;font-size: 18px;color: #fff;}
.bgLan{background: #131f30;}
.ge10{height: 5px;display: block;}
.bgfff{background: #fff;}
.ctlistbox{}

.flex_row{display: flex;flex-direction: row;}




</style>
