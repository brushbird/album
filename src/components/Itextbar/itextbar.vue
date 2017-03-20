<template>
	<div class="body" >
	<!--操作文字的工具栏  -->
		<div class="text_bar">
		<!-- 更改文字样式 -->
			<div class="text_bar_item">
				<select @change="optionchange"  id="text_style">
					<option v-for="option in options_style" :value="option.value">{{ option.text }}</option>
				</select>
			</div>
		</div> 
	</div>
</template>


<style type="text/css">

	.text_bar_item{
		display: inline-block;
	}
	
	
</style>

<script>
    let vueobject;
    let colorTag;//颜色选择器
    let chooseC;//判断是从哪个部分进行的事件响应；
    let colorb = document.getElementById('color1');
	export default{

		data(){
			return{
				strict:true,
				see:false,
				c:false,
				Tcolor:"",
				options_style:[{
						text:'黑体',
						value:'SimHei '
					},{
						text:'宋体' , 
						value:'SimSun'
					},{
						text:'新宋体',
						value:'NSimSun'
					},{
						text:'仿宋',
						value:'FangSong'
					},{
						text:'楷体',
						value:'KaiTi'
					}],
			}
		},
		//加载函数
		mounted:function(){
			// canvasTag = new fabric.Canvas('can');
			
		},
		methods:{
			//生成文字画布
			// creatIText:function(){
			// 	this.$emit('creatIText');
			// },
			//选择事件，判断选择项的响应对象
			optionchange:function(event){
				this.$emit('optionchange',event);
			},

		}

	}
</script>