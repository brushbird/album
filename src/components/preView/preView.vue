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
		<div class="closeBtn" @click="preViewClose">关闭</div>
	</div>
	<div class="payAlbum">
		<div class="item">
			<label for="uName">姓名：</label>
			<input type="text" name="uName" id="uName" placeholder="请输入收货人姓名">
		</div>
		<div class="item">
			<label for="uPhone">联系方式：</label>
			<input type="text" name="uPhone" id="uPhone" placeholder="请输入收货人手机号">
		</div>
		<div class="item">
			<label for="uAdress">收货地址：</label>
			<input type="text" name="uAdress" id="uAdress" placeholder="请输入收货地址">
		</div>
		<button @click="sendJson">一键打印</button>
	</div>
  </div>
</template>
<style lang="less">
.preView{
	position:fixed;
	top: 20%;
	left:0%;
	width:70%;
	z-index:100;
}
.payAlbum{
	position: fixed;
	top: 0;
	right: 0;
	width: 30%;
	z-index: 100;
	background-color: #fff;
	height: 100%;
	.item{
		width: 70%;
		height: 100px;
	}
}
.covery{
	position: fixed;
	width: 100%;
	height: 100%;
	z-index: 99;
	background-color: rgba(0,0,0,0.5);
	left: 0;
	top: 0;
}
.btn{
	position: fixed;
	width: 50px;
	z-index: 100;
	
}
.closeBtn{
	position: fixed;
	width: 30px;
	height: 30px;
	border-radius: 30px;
	z-index: 100;
	top: 20%;
	left: 55%;
	font-size: 12px;
	background-color: red;
	line-height: 30px;
}
.prebtn{
	left: 5%;
	top: 10%;
}
.backbtn{
	left: 52%;
	top: 10%;
}
.common{
	position: fixed;
	width: 60%;
	z-index: 100;
	
	transition:all .4s;
	img{
		width: 80%;
		background-color: #fff;
	}
	// &.fade-enter-active{
		
	// 	transition: all 1s ease;
	// 	transform: translateX(-200%);
	// }
	// &.fade-leave-active{
		
	// 	transition: all 1s ease;
	// 	transform: translateX(200%);
	// }
	&.fade-enter{
  	   opacity:0;
  	   // transform: translateX(100%);
	}
	&.fade-leave-to{
		opacity:0;
	}
	// &.fade-leave{
	// 	transform: translateX(0);
	// }
}
</style>
<script>
	export default{
		data(){
			return{
				preViewShowIndex:0,
				move:null,
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
			preClick:function(){
				this.move="{transition: all 1s ease,transform: translateX(200%)}";
				if(this.preViewShowIndex>0){
					this.preViewShowIndex--;
				}
				
			},
			backClick:function(){
				this.move="{transition: all 1s ease,transform: translateX(-200%)}";
				if(this.preViewShowIndex<this.preView.length-1){
					this.preViewShowIndex++;
				}
				
			},
			preViewClose:function(){
				this.$emit("preViewClose");
			},
			sendJson:function(){
				let u_name = document.getElementById("uName").value;
				let u_phone = document.getElementById("uPhone").value;
				let u_adress = document.getElementById("uAdress").value;
				this.$emit("sendJson",{uName:u_name,uPhone:u_phone,uAdress:u_adress});
			}
		}

	}
</script>