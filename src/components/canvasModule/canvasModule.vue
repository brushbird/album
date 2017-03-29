<template>
  <div class="content">
  	<header>
  		<input type="text" name="mainName" class="mainName" placeholder="点这里，为你的相册添加名称">
  		<!-- <button @click="addJson">保存</button> -->
  		<div class="toolList">
  			<div class="tool" @click="addJson">
  				<div class="tool-logo"></div>
  				<span>保存</span>
  			</div>
  			<div class="tool" @click="addJson">
  				<div class="tool-logo"></div>
  				<span>下载</span>
  			</div>
  		</div>
  	</header>
	<fileCom @creatIText="creatIText" @drag="drag" @allowDrop="allowDrop"></fileCom>
	<div class="canvasContent">		
		<div class="main-list" v-if="canvasList.length>0">
			<div v-for="(item,index) in canvasList" v-show="isActive == index" @drop='drop($event,index)' @dragover='allowDrop($event)'>
				<canvas :id="setCid(index)" height="460px" width="820px"></canvas>
			</div>
		</div>
		<div class="left-list">
			<ul v-if="canvasList.length>0">
				<li v-for="(item,index) in canvasList" @click="setActive(index)" :class="{cur : isActive == index}"  @drop='dropBg($event,index)' @dragover='allowDrop($event)'>
					<img :src="item.dataUrl">
				</li>
				<li class="addCanvas" @click="addCanvas">添加</li>
			</ul>
		</div>
		<canvas id="test" height="460px" width="820px"></canvas>
	</div>
	
	<div class="preView">
		<div class="preView-title">
			<h2>历史纪录</h2>
		</div>
		<ul>
		<li class="view-list" v-for="(item,index) in preView">
			<span class="del" @click="delObj(index)"></span>
			<div class="operate">
				<div class="text" v-show="judgeItext(index)">
					<itextBar   @optionchange="optionchange"></itextBar>
					<div class="text_bar_item"><button @click='colorBar'>颜色</button></div>
				</div>
			</div>
			<div class="view">
				<img :src="item">
			</div>
		</li>
		</ul>

	</div>
	<div id="color1"  v-show="c">
					<canvas id="color" width="286px" height="256px"></canvas>
		    		
		    		 <em id="cur" style="left: 98px; top: 47px; "></em>  
		    		<div class="color_panel">
		    	 		<span id="color_show"></span> 
		    			
		    			 <!-- 用vue绑定文字框颜色信息 -->
		    			<input type="text" class="color_input" id="Tcolor" value="0,0,0"> 
		    			
		    		</div>
	</div>
			
	
	<!-- <button @click="addSVG">addSVG</button> -->
  </div>
</template>

<style lang="less">
  @import "canvasModule.less";
</style>

<script>
	import fileCom from "../fileModules/fileModules.vue";
	import itextBar from "../itextbar/itextbar.vue";
	let dom = null,canvas = [], textevent= null, colorTag,chooseC;
	
	export default{
		data(){
			return{
				showTool:false,
				c:false,
				see: true,
				isActive:0,
				start: 0,
				// canvasList:[],
					// {index: 1, id: "a", rect:{width: 20, height: 20, fill: "red", left: 10, top: 10},circle:{radius: 20, fill: "blue", left: 50, top: 0},dataUrl:"",isShow:false
					// },
					// {index: 2, id: "b", rect:{width: 20, height: 20, fill: "red", left: 10, top: 10},dataUrl:"",isShow:false}
				canvasJson:[],
				preView:[]
			}
		},
		props: {
			canvasList:{
				required: true,
				default: {}
			}
		},
		computed:{
			// // canvasList:function(){
			// // 	return this.canvasList;
			// // }
			// canvasListLg:function(){
			// 	console.log("canvasListLgasdfasdfasdfg");
			// 	return this.canvasList.length;
			// }
		},
		methods:{
			judgeItext:function(index){
				if(canvas[this.isActive].getObjects()[index].get('type')==='i-text')
					return true;
			},
			setTextevent:function(index){
				textevent = canvas[this.isActive].getObjects()[index];
			},
			addSVG:function(){
				var group = [];
				 let that = this;
				 axios.get('http://123.207.169.138/guangmu/photo/insertphoto.s',{m_js:'json'}).then(response => {
        			if(response == 1)
        			{
        				console.log("success");
        			}
      			}, response => {
        			console.log("error");
      			});
				fabric.loadSVGFromURL('static/accountCenter.svg', function(objects, options) {
  					var obj = fabric.util.groupSVGElements(objects, options);
  					canvas[that.isActive].add(obj).renderAll();
				})
			},
			creatIText:function(){
				let index = this.isActive;
				let that = this;
				let text = new fabric.IText('点击更改文字',{
					left:50,
					top:50,
					fontFamily:'SimHei ',
				});
			

				text.on("editing:entered",function(){
					// let ev = e.target;
					// console.log(this.isEditing);
					this.hiddenTextarea.focus();
					this.selectAll();
				});
				text.on("selected",function(){
					that.showTool= true;
					this.setControlsVisibility({ 
						mt: false, 
						mr: false,
   						mb: false,
   					    ml: false,
   					    tl: false,
   					    tr: false,
   					    bl: false,
   					});
   					this.set('transparentCorners', false);
				});
				text.on("deselected",function(){
					that.showTool= false;
					console.log("out");
				})

				canvas[index].add(text);
				canvas[index].setActiveObject(text);

				textevent = text;
				this.canvasList[index].dataUrl=canvas[index].toDataURL();
				// this.preView.push(textevent.toDataURL());
				// console.log(this.preView);
				this.preView=[];
				this.setPreView();
				// console.log(this.preView);
			},
			setCid:function(index){
					return "a"+index;
			},
			addCanvas:function(){
				let length = this.canvasList.length;
				this.canvasList.push("");
				this.isActive = length;
				// console.log(this.isActive);
			},
			addJson:function(){
				let that = this;
				let index = canvas.length;
				for(let i = 0; i<index; i++)
				{
					that.canvasJson.push(JSON.stringify(canvas[i].toJSON()));
				}		
				//console.log(this.canvasJson[0]);
				// canvas[1].loadFromJSON(this.canvasJson[0]);
				// canvas[1].renderAll();
				this.preView=[];
				this.setPreView();
				var config = {
  					method: 'post',
  					url: 'http://123.207.169.138/guangmu/photo/insertphoto.s',
  					data: {m_js:that.canvasJson[0]},
  					transformRequest: [
    					function(data) {
      					let ret = ''
      					for (let it in data) {
        					ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) +'&'
      					}
      					return ret
    					}
  					]
				};	
				this.$http(config).then(response => {
  				// this.$http.post('http://123.207.169.138/guangmu/photo/insertphoto.s',{m_js:'json'}).then(response => {
        				if(response == 1)
        				{
        					console.log("success");
        					console.log(response);
        				}
        				console.log(response);
      			}, response => {
        			console.log(that.canvasJson[0]);
      			});
			},
			setActive:function(index){
				this.isActive = index;
				this.preView=[];
				this.setPreView();
			},
            drag:function(e){
            	dom = e.target;
            },
            allowDrop:function(e){
            	event.preventDefault();
            },
            drop:function(e,index){
				let that = this;
            	if (e.stopPropagation) {
        			e.stopPropagation(); // stops the browser from redirecting.
    			}
   				let newImage = new fabric.Image(dom, {
       				width: dom.width,
       				height: dom.height,
       				left: e.offsetX,
       				top: e.offsetY,
   				});
   				canvas[index].add(newImage);
				that.canvasList[index].dataUrl=canvas[index].toDataURL();
				this.preView=[];
				this.setPreView();
   				return false;
            },
            dropBg:function(e,index){
				let that = this;
            	if (e.stopPropagation) {
        			e.stopPropagation(); // stops the browser from redirecting.
    			}
   				canvas[index].setBackgroundImage(dom.src, canvas[index].renderAll.bind(canvas[index]));
				that.canvasList[index].dataUrl=canvas[index].toDataURL();
				this.isActive=index;
   				return false;
            },
            optionchange:function(event){
            	let that= this;
            	let ev  = event.target;
				textevent.set({fontFamily : ev.value});
				canvas[that.isActive].renderAll();
				this.preView=[];
				this.setPreView();
            },
            delObj:function(index){
            	canvas[this.isActive].getObjects()[index].remove();
            	this.canvasList[this.isActive].dataUrl=canvas[this.isActive].toDataURL();
            	this.preView=[];
            	this.setPreView();
            	this.c = false;
            },
            colorBar:function(e){
            	let ev = e;
            	let that=this;
            	let cur = document.getElementById('cur');
            	let Tcolor = document.getElementById('Tcolor');
		   		let show = document.getElementById('color_show');//颜色演示
		   		let poscolor;
		   		that.c = !that.c;		   		
		    	let canColor;
		    	if(canColor == null)
		    	{
					canColor = new fabric.Canvas('color');	
					colorTag = canColor;
		    	}
			    		    	
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
					
					 poscolor=that.colorSet(o);
					 if(o.e.offsetX>30 &&o.e.offsetX<286 && o.e.offsetY>0 &&o.e.offsetY<256)
					 {
					 	 cur.style.left = o.e.offsetX+'px';
					 	cur.style.top  =  o.e.offsetY + 'px';
					    if(poscolor[0]>256/2 || poscolor[1]>256/2 || poscolor[2]>256/2)
						 {
							cur.style.outlineColor="#000";
						 }
					  else
					       cur.style.outlineColor="#fff";
					 }
					 else if(o.e.offsetX>0 &&o.e.offsetX<20 && o.e.offsetY>0 &&o.e.offsetY<256)
					 {
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
					} 	
					

					 canColor.on("mouse:move",function(option){
						let pos = {
								x: option.e.offsetX,
								y: option.e.offsetY,
							};
					 	if(pos.x>30 && pos.x<286 && pos.y>0 && pos.y<256)
					 	{
					 		
							
							poscolor = that.movecolor(pos);
							cur.style.left = pos.x+'px';
						    cur.style.top  = pos.y + 'px';
						    if(poscolor[0]>256/2 || poscolor[1]>256/2 || poscolor[2]>256/2)
								 {
									cur.style.outlineColor="#000";
								 }
								 else
								  	cur.style.outlineColor="#fff";
								   
								let rgb = poscolor.slice(0,3).join();
								show.style.backgroundColor = 'rgb('+rgb+')';
								Tcolor.value = rgb;	
								textevent.set({fill:  'rgb('+rgb+')'});
								canvas[that.isActive].renderAll();
						 	}
							
					});	

				});

				canColor.on('mouse:up',function(){
					canColor.off('mouse:move');
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
				  
					  let curposcolor = that.curcolorSet();
					  
					  let rgb = curposcolor.slice(0,3).join();
					  show.style.backgroundColor = 'rgb('+rgb+')';
					  

					  Tcolor.value = rgb;
					  canvas[that.isActive].renderAll();
					  
					}
					else if(chooseC == 'no'){

						show.style.backgroundColor = 'rgb(0,0,0)';
						Tcolor.value = '0,0,0';
						textevent.set({fill:  'rgb(0,0,0)'});
						canvas[that.isActive].renderAll();
					}
					else{
					   	
						let rgb = poscolor.slice(0,3).join();
						show.style.backgroundColor = 'rgb('+rgb+')';
						Tcolor.value = rgb;
						textevent.set({fill:  'rgb('+rgb+')'});
						
						canvas[that.isActive].renderAll();
					}	

				});

			},
			movecolor:function(pos){
				var imgData = colorTag.contextContainer.getImageData(pos.x,pos.y,1,1);
				 let data = imgData.data;
				 let dataIndex = 0;
				 return[
				 	data[dataIndex],
				 	data[dataIndex+1],
				 	data[dataIndex+2],
				 	(data[dataIndex+3] / 255).toFixed(2),
				 ];


			},
			curcolorSet:function(){
				 let ex;
				 let ey;
				 if(cur.style.left != null)
				 {
				 	switch(cur.style.left.length)
				 	{
				 		case 3:
				 			ex = cur.style.left.substr(0,1);
				 			break;
				 		case 4:
				 			ex = cur.style.left.substr(0,2);
				 			break;
				 		case 5:
				 		  	ex = cur.style.left.substr(0,3);
				 		  	break;
				 	}  
				 }

				 if(cur.style.top != null)
				 {
				 	switch(cur.style.top.length)
				 	{
				 		case 3:
				 			ey = cur.style.top.substr(0,1);
				 			break;
				 		case 4:
				 			ey = cur.style.top.substr(0,2);
				 			break;
				 		case 5:
				 		  	ey = cur.style.top.substr(0,3);
				 		  	break;
				 	}  

				 }

				 let pos = {
				 	x : ex,
				 	y : ey,
				 }
				 var imgData = colorTag.contextContainer.getImageData(pos.x,pos.y,1,1);
				 let data = imgData.data;
				 let dataIndex = 0;
				 return[
				 	data[dataIndex],
				 	data[dataIndex+1],
				 	data[dataIndex+2],
				 	(data[dataIndex+3] / 255).toFixed(2),
				 ];
			},
			colorSet:function(option){
				
				

				 let pos = {
				 	x : option.e.offsetX ,
				 	y : option.e.offsetY ,
				 }
				 if(pos.x>=0 && pos.x<20 && pos.y>=0 && pos.y<256){
				 	var imgData = colorTag.contextContainer.getImageData(pos.x,pos.y,1,1);
					 	chooseC = true;				 	
					 }
				else if(pos.x>=30 && pos.x<286 && pos.y>=0 && pos.y<256){
				 	var imgData = colorTag.contextContainer.getImageData(pos.x,pos.y,1,1);
					 	chooseC = false;
				}else{
					var imgData = colorTag.contextContainer.getImageData(0,0,1,1)
				  	chooseC = 'no';
				}
				let data = imgData.data;
				let dataIndex = 0;
				return[
				 	data[dataIndex],
				 	data[dataIndex+1],
				 	data[dataIndex+2],
				 	(data[dataIndex+3] / 255).toFixed(2),
				 ];
			},
			setPreView:function(){
				let length = canvas[this.isActive].getObjects().length;
				let that = this;
				let list=[];
				for(let j=0; j<length; j++)
				{
					list.push(canvas[that.isActive].getObjects()[j].toDataURL());
					// console.log(canvas[that.isActive].getObjects()[j]);
				}
				this.preView = list;
				// this.preView.push();
			}
		},
		updated: function(){
			let that =this;
			if(this.canvasList.length>0){
				// console.log(that.canvasList);
				// console.log(val);
				for(let i=0; i<that.canvasList.length; i++)
				{
				// let that = this;
					let tag = document.getElementById("a"+i);
					// console.log("mou"+tag);
					canvas[i] = new fabric.Canvas(tag);
					canvas[i].loadFromJSON(that.canvasList[0]);
					// console.log("ss");
					canvas[i].renderAll();
					that.canvasList[i].dataUrl = canvas[i].toDataURL();
					that.setPreView();
					
				}
			}
			// console.log("created");
			// let that = this;
			// console.log(that.canvasList.length);
			// for(let i=0; i<that.canvasList.length; i++)
			// {
			// 	// let that = this;
			// 	let tag = document.getElementById("a"+i);
			// 	console.log("mou"+tag);
			// 	canvas[i] = new fabric.Canvas(tag);
			// 	canvas[i].loadFromJSON(that.canvasList[0]);
			// 	console.log("ss");
			// 	canvas[i].renderAll();
			// 	that.canvasList[i].dataUrl = canvas[i].toDataURL();
			// 	that.setPreView();
			// }
			
	},
	components:{fileCom,itextBar}
	}

</script>