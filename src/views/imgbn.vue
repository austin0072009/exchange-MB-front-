<template>
  <div id="app" style="display: flex;flex-direction: column;">
	  <div class="newheader" @click="$router.push('/')">
		      <div class="mu-button-wrapper">
		          <i class="mu-icon icon-ziyuan1" style="user-select: none"></i>
		      </div>
		  
		  <div class="txt">{{title}}</div>
		      <div class="mu-button-wrapper">
		          <i class="mu-icon icon-ziyuan12" style="user-select: none;color: #fff;"></i>
		      </div>
		  
	  </div>
     
  	<div class="oallheight">
  		<div class="prolists">
  			<div v-html="content" class="html"></div>
  		</div>
  	</div>
  </div>
</template>
<script>
export default {
  name: "IEPN",
  data() {
    return {
      uid:null,
      pages:{
      		limit:500,
      		page:1  
      },
      list:[],
      orders:[],
      zhiya_qxsxf:0,
	  title:"",
	  content:""
    }
  },
  mounted() {
    
  },
  created() {
  	  clearInterval(this.intervalId8888)
    this.init();
  },
  methods: {
    init:function(){
		let id=this.$route.query.id;
		if(id){
			this.getone(id);
		}else{
			this.$router.push("/")
		}
    	
    },
    getone:function(id){
    		  const loading = this.$loading()
    		  let arg={
    			  id:id
    		  }
    		  this.$http({
    		    url: "/api/news/detail",
    		    data: arg,
    		    method: "post"
    		  }).then(res => {
    		  		loading.close();
					//console.log(JSON.stringify(res))
					let r=res.data.message;
					this.title=r.title;
					this.content=r.content;
    		  });
    },
  }
}
</script>
<style lang="scss">
	.newheader{display: flex;background: #f1f2f3;color: #333;}
	.newheader .mu-button-wrapper{width:40px;height: 40px;}
	.newheader .txt{flex: 1;text-align: center;padding-top: 10px;font-weight: bold;}
	.html{text-align: justify;text-align-last: left;}
	.html img{display: block;max-width: 100%;margin: 5px auto;}
	.html p{text-indent: 2em;}
	.oallheight{background: #fff;}
	.prolists{color:#333;padding:10px 10px;}
	
	.mineCardList{}
	.mineCardList::after{clear: both;display: table;content: "";}
	.mineCard{
	    position: relative;
	    width: 100%;
	    border-radius: 15px;
	    background-color: #fff;
	    padding: 20px;margin-bottom: 10px;
	}
	
	
	.mineCard .topName{font-size: 18px;font-weight: bold;padding:10px 0;}
	
	.mineCard .shuliang{background: rgb(245,245,245);padding:10px 15px;}
	.mineCard .yujisy{font-size: 16px;padding:10px 0;}
	.mineCard .sy .l{font-weight: bold;}
	.mineCard .sy {padding: 10px 0;}
	.mineCard .bizhi{font-weight: bold;font-size: 22px;}
	.mineCard .bizhi .l{color: #00b796;}
	.mineCard .bizhi .l span{padding-left: 15px;font-size: 16px;font-weight: normal;}
	.mineCard .nh{color: #999;padding-bottom: 20px;}
	.ab123::before{content: "{";}
	.ab123::after{content: "}";}
	.btn222{background: #2c63e4;color: #fff;text-align: center;border-radius: 5px;height: 45px;line-height: 45px;cursor: pointer;font-weight: bold;}
	.flex{display: flex;}
	.mlauto{margin-left: auto;}
	.mrauto{margin-right: auto;}
	
	.scjltit{border-bottom: 1px solid rgb(245,245,245);font-weight: bold;padding:15px 0;font-size:18px;}
	
	
	.state{text-align: center;}
	.state.qx{color: #999;}
	.state.over{color: #f00;}
	.state.pendding{color: #090;}
</style>