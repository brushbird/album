<template>
	<div class="objectTool" v-if="objectToolShow">
		<button @click="upToCase">上移一层</button>
		<button @click="downToCase">下移一层</button>
		<button @click="upCase">置于顶层</button>
		<button @click="downCase">置于底层</button>
		<div class="text_bar" v-if="itextShow">
		<!-- 更改文字样式 -->
			<div class="text_bar_item" >
				<button id="text_style_show" @click="showStyle()">字体</button>
				<select @change="optionchange"  id="text_style" size="4" v-show="style" >
					<option v-for="option in options_style" :value="option.value">{{ option.text }}</option>
				</select>
			</div>
			<button @click="colorBar">颜色</button>
			<div id="color1"  v-show="colorShow">
				<canvas id="color" width="286px" height="256px"></canvas>
		    	<em id="cur" style="left: 98px; top: 47px; "></em>  
		    	<div class="color_panel">
		    		<span id="color_show"></span> 
		    		<!-- 用vue绑定文字框颜色信息 -->
		    		<input type="text" class="color_input" id="Tcolor" value="0,0,0"> 
		    	</div>
		    </div>
		</div> 
		<button @click="delObj">删除</button>
	</div>
</template>


<style type="text/css">
.objectTool{
	position: fixed;
	top: 50px;
	right: 50px;
}
</style>

<script>
   
   
	export default{

		data(){
			return{
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
		props:{
			objectToolShow:{
				required: true,
				default: {false}
			},
			objectIndex:{
				required:true,
				default:{}
			},
			itextShow:{
				required:true,
				default:{false}
			},
			colorShow:{
				required:true,
				default:{false}
			}
		},
		mounted:function(){
			// canvasTag = new fabric.Canvas('can');
			
		},
		methods:{
			//生成文字画布
			// creatIText:function(){
			// 	this.$emit('creatIText');
			// },
			//选择事件，判断选择项的响应对象
			upCase:function(){
				let that =this;
				this.$emit('upCase',that.objectIndex);
			},
			downCase:function(){
				let that =this;
				this.$emit('downCase',that.objectIndex);
			},
			upToCase:function(){
				let that =this;
				this.$emit('upToCase',that.objectIndex);
			},
			downToCase:function(){
				let that =this;
				this.$emit('downToCase',that.objectIndex);
			},
			delObj:function(){
				let that =this;
				this.$emit('delObj',that.objectIndex);
			},
			optionchange:function(event){
				this.$emit('optionchange',event);
			},
			showStyle:function(){ 
				this.style = !this.style;
				let text_style=document.getElementById('text_style');
			},
			colorBar:function(){
				this.$emit('colorBar');
			}
			
		}

	}
</script>