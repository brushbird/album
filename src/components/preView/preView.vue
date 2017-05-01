<template>
  <div v-if="showPreview">
	<div class="preView">
		<div class="covery"></div>
		<transition-group name='fade' tag="ul" class="imgs-wrapper" mode="out-in">		
			<li v-for="(item,index) in preView" class="common" v-show="index == preViewShowIndex" :key='item' :style="move">
				<img :src="item" >
			</li>
		</transition-group>
		<button class="prebtn btn" @click="preClick">上一页</button>
		<button class="backbtn btn" @click="backClick">下一页</button>
		<div class="closeBtn" @click="preViewClose">X</div>
	</div>
	<div class="payAlbum">
		<div class="albumList">
			<div v-for="(item,index) in albumList" @click="setActiveList(index,item.price)" class="listContain">
				<img class="listStyle" :class="{aciveList : index==aciveListIndex}" :src="item.url">
				<span>{{item.name}}</span>
			</div>
		</div>
		<div class="albumInputList">
			<albumInput @inputResult="confirmInputState(arguments,'usr')"  placeholder="请输入收货人姓名" name="usr"></albumInput>
			<albumInput @inputResult="confirmInputState(arguments,'tel')"  placeholder="请输入收货人手机号" name="tel"></albumInput>
			<albumInput type="textarea" @inputResult="confirmInputState(arguments,'address')"  placeholder="请输入收货地址" name="area"></albumInput>
		</div>
		<!-- <div class="item">
			<label for="uName">姓名：</label>
			<input type="text" name="uName" id="uName" placeholder="请输入收货人姓名">
		</div>
		<div class="item">
			<label for="uPhone">联系方式：</label>
			<input type="text" name="uPhone" id="uPhone" placeholder="请输入收货人手机号">
		</div>
		<div class="item">
			<label for="uAdress">收货地址：</label>
			<textarea id="uAdress" placeholder="请输入收货地址" rows="4" cols="22"></textarea>
		</div> -->
		<button @click="sendJson" :class="btnClass">一键打印</button>
	</div>
  </div>
</template>
<style lang="less">
	@import "preView.less";
</style>
<script>
	import albumInput from '../input/input.vue'

	export default{
		data(){
			return{
				preViewShowIndex:0,
				move:null,
				albumList:[
					{name:"类型1",url:'',price:40},
					{name:"类型2",url:'',price:50},
					{name:"类型3",url:'',price:60},
				],
				aciveListIndex:0,
				priceAll:0,
				ifUsrInput:false,
				ifTelInput:false,
				btnClass:{
        			printBtn: true,
        			printBtned: false
      			},
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
			confirmInputState: function(result, val) {
      			var state = result[0];
				switch(val) {
        			case 'usr' : this.ifUsrInput = state == 'success' ? true : false;
          				break;
        			case 'tel' : this.ifTelInput = state == 'success' ? true : false;
          				break;
      			}
      			this.inputResultTotal();
    		},
    		inputResultTotal:function(){
      			if(this.ifUsrInput && this.ifTelInput) {
        			this.btnClass.printBtned = true;
      			}
    		},
			setActiveList:function(index,value){
				this.aciveListIndex = index;
				this.priceAll = value;
			},
			preClick:function(){
				let that = this;
				this.move="{transition: all 1s ease,transform: translateX(-200%)}";
				if(this.preViewShowIndex>0){
					this.preViewShowIndex--;
				}
			},
			backClick:function(){
				let that = this;
				this.move="{transition: all 1s ease,transform: translateX(200%)}";
				if(this.preViewShowIndex<this.preView.length-1){
					this.preViewShowIndex++;
				}
			},
			preViewClose:function(){
				this.move=null;
				this.$emit("preViewClose");
			},
			sendJson:function(){
				if(this.btnClass.printBtned == true){
					let u_name = document.getElementById("uName").value;
					let u_phone = document.getElementById("uPhone").value;
					let u_adress = document.getElementById("uAdress").value;
					this.$emit("sendJson",{uName:u_name,uPhone:u_phone,uAdress:u_adress});
				}
			}
		},
		components:{albumInput}


	}
</script>