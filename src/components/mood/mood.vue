<template>
  <div class="mood" v-if="showMood">
	<div class="mood-contain">
		<div class="imgContainer">
		</div>
		<span>{{moodText}}</span>
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
				width: 60px;
				height: 60px;
				border-radius: 60px;
				background: url("../../assets/images/mood.gif") no-repeat;
				background-position: -170px -120px;
    			margin: auto;
    			box-shadow: 0px 0px 10px 15px rgba(255,255,255,0.5);
			}
			span{
				display: block;
				margin-top: 20px;
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
			moodText:{
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