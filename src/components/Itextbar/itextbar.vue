<template>
	<div class="body" >
	<!--操作文字的工具栏  -->
		<div class="text_bar">
		<!-- 更改文字样式 -->
			<div class="text_bar_item">
				<button id="text_style_show" @click="showStyle()">字体</button>
				<select @change="optionchange"  id="text_style" size="4" v-show="style" >
					<option v-for="option in options_style" :value="option.value">{{ option.text }}</option>
				</select>
			</div>
		</div> 
	</div>
</template>


<style type="text/css">

	#text_style{
		width: 65px;
		z-index: 999;
		position: absolute;
	}
	
	
</style>

<script>
   
   
	export default{

		data(){
			return{
				strict:true,
				see:false,
				c:false,
				style:false,
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
					},{
						text:'幼圆',
						value:'YouYuan'
					},{
						text:'华文细黑',
						value:'STXihei'
					},{
						text:'华文楷体',
						value:'STKaiti'
					},{
						text:'华文宋体',
						value:'STSong'
					},{
						text:'华文仿宋',
						value:'STFangsong'
					},{
						text:'方正舒体',
						value:'FZShuTi'
					},{
						text:'方正姚体',
						value:'FZYaoti'
					},{
						text:'华文彩云',
						value:'STCaiyun'
					},{
						text:'华文琥珀',
						value:'STHupo'
					},{
						text:'华文隶书',
						value:'STLiti'
					},{
						text:'华文行楷',
						value:'STXingkai'
					},{
						text:'华文新魏',
						value:'STXinwei'
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
			showStyle:function(){ 
				this.style = !this.style;
				let text_style=document.getElementById('text_style');
				
			}

		}

	}
</script>