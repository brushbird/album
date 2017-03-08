<template>
	<div class="body" >
	<!-- 画布主体 -->
		<div class="canvas" style="width: 500px;height: 400px;"> <canvas id="can" width="500px" height="400px" ></canvas></div>
	  
		

	<!--操作文字的工具栏  -->
		<div class="text_bar" v-if="see" >
		<!-- 更改文字样式 -->
			<div class="text_bar_item">
				<select @change="optionchange"  id="text_style">
					<option v-for="option in options_style" :value="option.value">{{ option.text }}</option>
				</select>
			</div>

		<!--更改文字大小  -->
			<!-- <div class="text_bar_item">
				<select @change="optionchange"  id="text_size">
					<option v-for="option in options_size" :value="option.value">{{ option.text }}</option>					
				</select>
			</div> -->

		<!--更改文字颜色  -->
			<div class="text_bar_item"><button>颜色</button></div>

		<!-- 更改文字的排版 -->
			<div class="text_bar_item">
				<select @change="optionchange" id="text_paiban">
				<option v-for="option in options_paiban" :value="option.value">{{ option.text }}</option>
				</select>
			</div>
		</div>

	<!--生成IText的按钮  -->
		<div class="text">
			<button @click='creatIText'>文字</button>
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
</style>

<script>

	export default{

		data(){
			return{
				strict:true,
				see:false,
				options_style:[{text:'黑体' , value:'SimHei '},{text:'宋体' , value:'SimSun'},{text:'新宋体',value:'NSimSun'},{text:'仿宋',value:'FangSong'},{text:'楷体',value:'KaiTi'}],

				// options_size:[{text:'6',value:'6'},{text:'8',value:'8'},{text:'10',value:'10'},{text:'12',value:'12'},{text:'16',value:'16'},{text:'24' ,value:'24'},{text:'32',value:'32'},{text:'72' , value:'72'},{text:'100',value:'100'},{text:'200',value:'200'},{text:'240',value:'240'},{text:'480',value:'480'},],

				options_paiban:[{text:'居左',value:'left'},{text:'居中',value:'center'},{text:'居右',value:'right'},],
			}
		},
		//加载函数
		mounted:function(){
			canvasTag = new fabric.Canvas('can');	
		},

		methods:{
		
			//生成文字画布
			creatIText:function(){
				if(textevent != null)
					textevent.set({stroke: '#fff',strokeWidth: 0});	
				this.see = false;
				textevent=this;
			
				let text = new fabric.IText('请输入文字',{
					left:50,
					top:50,
				    
 				    
				});

				text.on('selected' , function(){
					//这里把全局的变量变成了这个vue的主体
					textevent.see = true;
					textevent = this;
					textevent.set({stroke: '#ff1318',strokeWidth: 1});
				});

				canvasTag.add(text);
			},

			//选择事件，判断选择项的响应对象
			optionchange:function(event){
				let ev  = event.target;
				let tid  = ev.getAttribute('id');
				textevent.set({stroke: '#ff1318',strokeWidth: 1});
				if(tid == "text_style"){
					textevent.set({fontFamily : ev.value});
					canvasTag.renderAll();
				} 
				// else if(tid == "text_size"){
				// 	textevent.set({fontSize : ev.value});
				// }
				else if(tid == "text_paiban"){
					textevent.set({textAlign : ev.value});
					canvasTag.renderAll();
				}
				textevent.set({stroke: '#fff',strokeWidth: 0});

			}
		}

	}
</script>