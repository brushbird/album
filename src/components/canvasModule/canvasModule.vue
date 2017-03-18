<template>
  <div class="content">
  	<header>
  		<button @click="addJson">保存</button>
  	</header>
	<fileCom @drag="drag" @allowDrop="allowDrop"></fileCom>
	<div class="canvasContent">		
		<div class="main-list" >
			<div v-for="(item,index) in canvasList" v-show="isActive == index" @drop='drop($event,index)' @dragover='allowDrop($event)'>
				<canvas :id="setCid(index)" height="460px" width="820px"></canvas>
			</div>
			
		</div>
		<div class="left-list">
			<ul>
				<li v-for="(item,index) in canvasList" @click="setActive(index)" :class="{cur : isActive == index}"  @drop='dropBg($event,index)' @dragover='allowDrop($event)'>
					<img :src="item.dataUrl">
				</li>
				<li class="addCanvas" @click="addCanvas">添加</li>
			</ul>
		</div>
		<canvas id="test" height="460px" width="820px"></canvas>
	</div>
	<div class="text">
		<button @click='creatIText'>文字</button>
		<itextBar  @colorBar="colorBar" @optionchange="optionchange" v-show="showTool"></itextBar>
	</div>
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
				see: true,
				isActive:0,
				canvasList:[
					{index: 1, id: "a", rect:{width: 20, height: 20, fill: "red", left: 10, top: 10},circle:{radius: 20, fill: "blue", left: 50, top: 0},dataUrl:"",isShow:false
					},
					{index: 2, id: "b", rect:{width: 20, height: 20, fill: "red", left: 10, top: 10},dataUrl:"",isShow:false}
				],
				canvasJson:[]
			}
		},
		computed:{
			
		},
		methods:{
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
					console.log(this.isEditing);
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

			},
			setCid:function(index){
					return "a"+index;
			},
			addCanvas:function(){
				let length = this.canvasList.length;
				this.canvasList.push("");
				this.isActive = length;
				console.log(this.isActive);
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
  				// this.$http.get('../photo/insertphoto.s',{_dataType:'json',m_js: this.canvasList}).then(response => {
      //   				if(response == 1)
      //   				{
      //   					console.log("success");
      //   				}

      // 			}, response => {
      //   			console.log('error');
      // 			});
			},
			setActive:function(index){
				this.isActive = index;
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
            },
            colorBar:function(e){
            	let ev = e;
            	let that=this;
            	let cur = document.getElementById('cur');
            	let Tcolor = document.getElementById('Tcolor');
		   		let show = document.getElementById('color_show');//颜色演示
		   		let poscolor;
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
					 		
							console.log(pos.x,pos.y);
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
					  console.log(curposcolor);
					  
					  let rgb = curposcolor.slice(0,3).join();
					  show.style.backgroundColor = 'rgb('+rgb+')';
					  Tcolor.value = rgb;
					  textevent.set({fill:  'rgb('+rgb+')'});
						
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
		},


		beforeMount:function(){
			
		},

		mounted: function(){
			for(let i=0; i<this.canvasList.length; i++)
			{
				let that = this;
				let tag = document.getElementById("a"+i);
				canvas[i] = new fabric.Canvas(tag);
				if(typeof(this.canvasList[i].rect)!="undefined"){
					let rect = new fabric.Rect({
						width: this.canvasList[i].rect.width,
						height: this.canvasList[i].rect.height,
						fill: this.canvasList[i].rect.fill,
						left: this.canvasList[i].rect.left,
						top: this.canvasList[i].rect.top
					});
					canvas[i].add(rect);
				}
				if(typeof(this.canvasList[i].circle)!="undefined"){
					let circle = new fabric.Circle({
						radius: this.canvasList[i].circle.radius,
						fill: this.canvasList[i].circle.fill,
						left: this.canvasList[i].circle.left,
						top: this.canvasList[i].circle.top
					});
					canvas[i].add(circle);
				}
				this.canvasList[i].dataUrl=canvas[i].toDataURL();
				canvas[i].on("object:modified",function(e){ 
					let ev = e.target;
					that.canvasList[i].dataUrl=canvas[i].toDataURL();
				});
		}
	},
	components:{fileCom,itextBar}
	}

</script>