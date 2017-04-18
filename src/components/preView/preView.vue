<template>
	<div class="preView" v-if="showPreview">
		<div class="covery"></div>
		<transition-group name='fade' tag="ul" class="imgs-wrapper" mode="out-in">		
			<li v-for="(item,index) in preView" class="common" v-show="index == preViewShowIndex" :key='item'>
				<img :src="item" >
			</li>
		</transition-group>
		<button class="prebtn btn" @click="preClick">上一页</button>
		<button class="backbtn btn" @click="backClick">下一页</button>
		<div class="closeBtn" @click="preViewClose">关闭</div>
	</div>
</template>
<style lang="less">
.preView{
	position:fixed;
	top: 20%;
	left:5%;
	width:70%;
	z-index:100;
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
	left: 63%;
	font-size: 12px;
	background-color: red;
	line-height: 30px;
}
.prebtn{
	left: 5%;
	top: 10%;
}
.backbtn{
	left: 63%;
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
	&.fade-enter-active{
		
		transition: all 1s ease;
		transform: translateX(0);
	}
	&.fade-leave-active{
		
		transition: all 1s ease;
		transform: translateX(-200%);
	}
	&.fade-enter{
  	   opacity:0;
  	   transform: translateX(100%);
	}
	&.fade-leave-to{
		opacity:0;
	}
	&.fade-leave{
		transform: translateX(0);
	}
}
</style>
<script>
	export default{
		data(){
			return{
				preViewShowIndex:0,
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
				if(this.preViewShowIndex>0){
					this.preViewShowIndex--;
				}
				
			},
			backClick:function(){
				if(this.preViewShowIndex<this.preView.length-1){
					this.preViewShowIndex++;
				}
				
			},
			preViewClose:function(){
				this.$emit("preViewClose");
			}
		}

	}
</script>