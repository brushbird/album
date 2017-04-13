<template>
	<div class="preView" v-if="showPreview">
		<div class="covery"></div>
		<div v-for="item in preView" class="common">
			<img :src="item">
		</div>
	</div>
</template>
<style type="text/css">
.covery{
	position: fixed;
	width: 100%;
	height: 100%;
	z-index: 99;
	background-color: rgba(0,0,0,0.5);
	left: 0;
	top: 0;
}
.common{
	position: fixed;
	width: 60%;
	z-index: 100;
	left: 20%;
	top: 20%;
}
</style>
<script>
	export default{
		data(){
			return{
				
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
			
		}

	}
</script>