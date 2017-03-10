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
		   

			<div class="text_bar_item"><button @click='creatColor'>颜色</button></div>

		<!-- 更改文字的排版 -->
			<div class="text_bar_item">
				<select @change="optionchange" id="text_paiban">
				<option v-for="option in options_paiban" :value="option.value">{{ option.text }}</option>
				</select>
			</div>

		</div>

		<div id="color1"  v-if="c">
		    	<canvas id="color" width="286px" height="256px"></canvas>
		    	
		    	<em id="cur" style="left: 98px; top: 47px; "></em> 
		    	<div class="color_panel">
		    	 	<div id="color_show"></div>
		    		<label>rgb
		    		 <!-- 用vue绑定文字框颜色信息 -->
		    		<input type="text" class="color_input" v-model="Tcolor" placeholder="0,0,0"> 
		    		</label>
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

	#show_color{
		background-color: rgb(207,151,151);
	}

	#color{
		
		border: 1px solid black;
	}

	#color1{
		width: 286px;
		height: 300px;
		position: relative;
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
	let textevent;
    let canvasTag;
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

			},

			creatColor:function(){
				this.c=true;
				vueobject =this;
				this.colorBar();
				
			},

		   colorBar:function(){
		   			 let cur = document.getElementById('cur');
		   			 let show = document.getElementById('color_show');//颜色演示
		    		let canColor = new fabric.Canvas('color');	
		    		colorTag = canColor;
					let gradientBar = new fabric.Rect({
						left:0,
						top:0,
						width:20,
						height:256,
					});

					gradientBar.setGradient('fill',{
						 x1: 0,
						 y1: 0,
						 x2: 0,
						 y2: 256,
						 colorStops: {
						    0: '#000',
						    0.15: '#f0f',
						    0.3: '#00f',
						    0.45: '#0ff',
						    0.6: '#0f0',
						    0.8: '#ff0',
						    1: '#f00',
						  }
					});

					let gradientBar1 = new fabric.Rect({
						left:30,
						top:0,
						width:256,
						height:256,
					});

					gradientBar1.setGradient('fill',{
						 x1: 30,
						 y1: 0,
						 x2: 286,
						 y2: 256,
						 colorStops: {
						    0: '#000',						
						    1: '#f00',
						  }
					});

					canColor.add(gradientBar,gradientBar1);
					canColor.item(0).selectable = false;
					canColor.item(1).selectable = false;

					canColor.on('mouse:down',function(option){
							let o = option;
							let poscolor=vueobject.colorSet(o);
							if(chooseC){
								gradientBar1.setGradient('fill',{
								 x1: 30,
								 y1: 0,
								 x2: 286,
								 y2: 256,
								 colorStops: {
								    0: 'rgba(255,255,255,1)',						
								    1: 'rgba('+poscolor+')',
						  			}
					
								});

								 // cur.style.left = o.e.clientX+'px';
								 // cur.style.top = o.e.clientY + 'px';
								 // cur.style.border = '1px solid black';
								
								

							}
							else{
								 cur.style.left = o.e.clientX+'px';
								 cur.style.top = o.e.clientY + 'px';
								
								  // cur.style.border = '1px solid black';
								let rgb = poscolor.slice(0,3).join();
								show.style.backgroundColor = 'rgb('+rgb+')';
								vueobject.Tcolor = rgb;
								textevent.set({fill:  'rgb('+rgb+')'});
								canvasTag.renderAll();

							}

						});

				},

			
			colorSet:function(option){
				 let pos = {
				 	x : option.e.offsetX,
				 	y : option.e.offsetY,
				 }
				 if(pos.x>=0 && pos.x<20 && pos.y>=0 && pos.y<256){
				 	var imgData = colorTag.contextContainer.getImageData(pos.x,pos.y,20,256);
				 	chooseC = true;				 	
				 }
				 else if(pos.x>=30 && pos.x<286 && pos.y>=0 && pos.y<256){
				 	var imgData = colorTag.contextContainer.getImageData(30,0,256,256);
				 	chooseC = false;
				 }
				 let data = imgData.data;
				 let dataIndex = (pos.y*imgData.width + pos.x)*4;
				 return[

				 	data[dataIndex],
				 	data[dataIndex+1],
				 	data[dataIndex+2],
				 	(data[dataIndex+3] / 255).toFixed(2),
				 ];

			}
		}

	}
</script>