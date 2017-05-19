<template>
  <div v-if="showPreview">
	<div class="preView">
		<div class="covery"></div>
		<!-- <transition-group name='fade' tag="ul" class="imgs-wrapper" mode="out-in">		
			<li v-for="(item,index) in preView" class="common" v-show="index == preViewShowIndex" :key='item' :style="move">
				<img :src="item" >
			</li>
		</transition-group>
		<button class="prebtn btn" @click="preClick">上一页</button>
		<button class="backbtn btn" @click="backClick">下一页</button> -->
		<div class="closeBtn" @click="preViewClose">X</div>
	</div>
	<div class="payAlbum">
		<h2>毕业相册定制版</h2>
		<label>封面类型：</label>
		<div class="albumList">
			<div v-for="(item,index) in albumList" @click="setActiveList(index,item.price)" class="listContain">
				<img class="listStyle" :class="{aciveList : index==aciveListIndex}" :src="item.url">
				<span>{{item.name}}</span>
			</div>
		</div>
		<!-- <label>收货人信息：</label> -->
		<!-- <div class="albumInputList">
			<albumInput inputId="uName" @inputResult="confirmInputState(arguments,'usr')"  placeholder="请输入收货人姓名" name="usr" width="300"></albumInput>
			<albumInput inputId="uPhone" @inputResult="confirmInputState(arguments,'tel')"  placeholder="请输入收货人手机号" name="tel" width="300"></albumInput>
			<albumInput inputId="uAdress" type="textarea" @inputResult="confirmInputState(arguments,'address')" placeholder="请输入收货地址" name="area" width="300"></albumInput>
		</div>
		 -->
		<div class="payList">
			<span class="mark">共计：</span>
			<span class="markPrice">￥{{priceAll}}</span>
		</div>
		<button @click="sendJson" :class="btnClass">一键打印</button>
	</div>
  </div>
</template>
<style lang="less" scoped>
	@import "userCenter.less";
</style>
<script>
	import albumInput from '../input/input.vue'

	export default{
		data(){
			return{
				preViewShowIndex:0,
				move:null,
				albumList:[
					{name:"类型1",url:'',price:48},
					{name:"类型2",url:'',price:58},
					{name:"类型3",url:'',price:68},
				],
				aciveListIndex:0,
				priceAll:40,
				ifUsrInput:false,
				ifTelInput:false,
				ifAdsInput:false,
				btnClass:{
        			printBtn: true,
        			printBtned: false
      			},
      			// u_name:"",
      			// u_phone:'',
      			// u_adress:''
			}
		},
		props:{
			preView:{
				required: true,
				default: {}
			},
			showPreview:{
				required: true,
				default: {}
			}
		},
		mounted:function(){

		},
		methods:{
			// confirmInputState: function(option, val) {
			// 	let that = this;
   //    			var state = option[0].inputResult;
			// 	switch(val) {
   //      			case 'usr' : {that.ifUsrInput = state == 'success' ? true : false;that.u_name = option[0].value};
   //        				break;
   //      			case 'tel' : {that.ifTelInput = state == 'success' ? true : false;that.u_phone = option[0].value};
   //        				break;
   //        			case 'address' : {that.ifAdsInput = state == 'success' ? true : false;that.u_adress = option[0].value};
   //        				break;
   //    			}
   //    			// console.log(option[0]);
   //    			this.inputResultTotal();
   //  		},
   //  		inputResultTotal:function(){
   //    			if(this.ifUsrInput && this.ifTelInput && this.ifAdsInput) {
   //      			this.btnClass.printBtned = true;
   //    			}
   //  		},
			setActiveList:function(index,value){
				this.aciveListIndex = index;
				this.priceAll = value;
			},
			preClick:function(){
				let that = this;
				this.move="{transition: all 1s ease,transform: translateX(-200%)}";
				if(this.preViewShowIndex>0){
					that.preViewShowIndex--;
				}
			},
			backClick:function(){
				let that = this;
				this.move="{transition: all 1s ease,transform: translateX(200%)}";
				if(this.preViewShowIndex<this.preView.length-1){
					that.preViewShowIndex++;
				}
			},
			preViewClose:function(){
				this.move=null;
				this.preViewShowIndex=0;
				this.$emit("preViewClose");
			},
			// sendJson:function(){
			// 	let that = this;
			// 	if(this.btnClass.printBtned == true){
			// 		that.$emit("sendJson",{uName:that.u_name,uPhone:that.u_phone,uAdress:that.u_adress});
			// 		that.btnClass.printBtned = false;
			// 	}
			// }
		},
		components:{albumInput}


	}
</script>