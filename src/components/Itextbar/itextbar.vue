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
		<!--更改文字颜色  -->
			<div class="text_bar_item"><button @click='creatColor'>颜色</button></div>
		</div>
		<div id="color1"  v-show="c">
		    	<canvas id="color" width="286px" height="256px"></canvas>
		    	<!-- <em id="cur" style="left: 98px; top: 47px; "></em>  -->
		    	<div class="color_panel">
		    	 	<div id="color_show"></div>
		    		<label>rgb
		    		 <!-- 用vue绑定文字框颜色信息 -->
		    		<input type="text" class="color_input" v-model="Tcolor" placeholder="0,0,0"> 
		    		</label>
		    	</div>
		</div>
	</div>
</template>


<style type="text/css">
	.canvas{
		position: relative;
		margin: 0px auto;
	}
	#can{
		border: 1px solid black;	
	}
	.text_bar_item{
		display: inline-block;
	}
	#show_color{
		background-color: rgb(207,151,151);
	}
	#color{
		border: 1px solid black;
	}
	#color1{
		width: 286px;
		height: 300px;
		position: fixed;
		right: 0;
		margin: 0px auto;
		border: 1px solid black;
	}
	#color_show{
		margin-top: 5px; 
		width: 20px;
		height: 20px;
		border: 1px solid black;
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
			creatIText:function(){
				this.$emit('creatIText');
			},
			//选择事件，判断选择项的响应对象
			optionchange:function(event){
				this.$emit('optionchange',event);
			},
			creatColor:function(event){
				this.c=!this.c;
				this.$emit('colorBar',event);
			},
		}

	}
</script>