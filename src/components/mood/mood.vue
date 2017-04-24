<template>
  <div class="mood" v-if="showMood">
	<div class="mood-contain">
		<div class="imgContainer">
		</div>
		<span>正在生成相册，请不要关闭界面~~~</span>
	</div>
  </div>
</template>
<style lang="less">
	.mood{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255,255,255,0.9);
		.mood-contain{
			position: absolute;
			left: 50%;
			top: 30%;
			-webkit-transform: translate(-50%,-50%);  
      		-ms-transform: translate(-50%,-50%);  
          	transform: translate(-50%,-50%);
			.imgContainer{
				width: 150px;
				height: 150px;
				border-radius: 150px;
				background: url("../../assets/images/mood.gif") no-repeat;
				background-position: -120px -80px;
    			margin: auto;
			}
		}
	}

</style>
<script>
	export default{
		data(){
			return{
			}
		},
		props:{
			showMood:{
				required: true,
				default: {}
			},
		},
		mounted:function(){

		},
		methods:{
			
		}

	}
</script>