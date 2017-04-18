<template>
  <div class="content">
  	<header>
  		<input type="text" name="mainName" class="mainName" placeholder="点这里，为你的相册添加名称">
  		<div class="toolList">
  			<div class="tool" @click="addJson">
  			<!-- <div class="tool" @click="sendJson"> -->
  				<div class="tool-logo"></div>
  				<span>生成模板</span>
  			</div>
  			<!-- <div class="tool" @click="addJson"> -->
  			<div class="tool" @click="sendJson">
  				<div class="tool-logo"></div>
  				<span>生成图片</span>
  			</div>
  			<!-- <div class="tool" @click="addJson">
  				<div class="tool-logo"></div>
  				<span>下载</span>
  			</div> -->
  			<div class="tool" @click="setPreView">
  				<div class="tool-logo"></div>
  				<span>预览</span>
  			</div>
  			<div class="tool" @click="addCanvas">
  				<div class="tool-logo"></div>
  				<span>新建</span>
  			</div>
  		</div>
  	</header>
	<fileCom :moduleLists="moduleLists" @creatIText="creatIText" @loadModules="loadModules" @drag="drag" @allowDrop="allowDrop"></fileCom>
	<div class="canvasContent" v-for="(item,index) in moduleLists">		
		<div class="main-list" v-if="index == moduleIndex">
			<div v-for="(option,cindex) in canvasList" v-show="isActive == cindex" @drop='drop($event,cindex)' @dragover='allowDrop($event)'>
				<canvas :id="setCid(cindex)" height="3508" width="4961"></canvas>
			</div>
		</div>	
		<div class="left-list" v-if="index == moduleIndex">
			<ul>
				<li v-for="(options,mindex) in canvasList" @click="setActive(mindex)" :class="{cur : isActive == mindex}"  @drop='dropBg($event,mindex)' @dragover='allowDrop($event)'>
				{{mindex+1}}
				</li>
			</ul>
		</div>	
	</div>
	<div class="canvasContent" v-if="moduleIndex == -1">		
		<div class="main-list">
			<div v-for="(option,cindex) in canvasList" v-show="isActive == cindex" @drop='drop($event,cindex)' @dragover='allowDrop($event)'>
				<canvas :id="setCid(cindex)" height="3508" width="4961"></canvas>
			</div>
		</div>	
		<div class="left-list">
			<ul>
				<li v-for="(options,mindex) in canvasList" @click="setActive(mindex)" :class="{cur : isActive == mindex}"  @drop='dropBg($event,mindex)' @dragover='allowDrop($event)'>
				{{mindex+1}}
				</li>
			</ul>
		</div>	
	</div>
	
	<objectTool 
		:itextShow="itextShow"
	 	:objectToolShow="objectToolShow" 
	 	:objectIndex="objectIndex" 
	 	:colorShow="colorShow"
	 	:colorCanvasWidth="colorCanvasWidth"
	 	@delObj="delObj" 
	 	@optionchange="optionchange" 
	 	@upCase="upCase" 
	 	@downCase="downCase" 
	 	@upToCase="upToCase" 
	 	@downToCase="downToCase" 
	 	@colorBar="colorBar"></objectTool>
	
	<preView :showPreview="showPreview" :preView="preView" @preViewClose="preViewClose"></preView>
  </div>
</template>

<style lang="less">
  @import "canvasModule.less";
</style>

<script>
	import fileCom from "../fileModules/fileModules.vue";
	import objectTool from "../objectTool/objectTool.vue";
	import preView from "../preView/preView.vue";
	let dom = null,canvas = [], textevent= null, colorTag,chooseC;
	
	export default{
		data(){
			return{
				moduleLists:[
					{},{},{},{}
				],	
				moduleIndex:-1,			
				showTool:false,
				colorShow:false,
				see: true,
				isActive:0,
				start: 0,
				canvasList:[{}],
				canvasJson:[],
				preView:[],
				photoJson:[],
				objectToolShow:false,
				objectIndex:0,
				itextShow:false,
				showPreview:false,
			}
		},
		props:{
			scalefont:{
				require:true,
				default:{}
			},
			colorCanvasWidth:{
				require:true,
				default:{}
			}
		},
		methods:{
			judgeItext:function(){
				let that =this;
				let index = this.objectIndex;
				if(canvas[this.isActive].getObjects()[index].get('type')==='i-text'){
				  let text = canvas[this.isActive].getObjects()[index];
				  text.on("selected",function(){
					// textevent = this;
					that.showTool= true;
					this.setControlsVisibility({ 
						mt: false, 
						mr: false,
   						mb: false,
   					    ml: false,
   					    tl: false,
   					    tr: false,
   					    bl: false,
   					    border:400,
   					});
   					
				  });
					that.itextShow=true;
				}else{
					that.itextShow=false;
				}
			},
			creatIText:function(){
				let index = this.isActive;
				let that = this;
				let scalefont = 4961/1366;
				let text = new fabric.IText('点击更改文字',{
					left:50,
					top:50,
					fontSize:(40*scalefont),
					fontFamily:'SimHei ',
				});
				text.on("editing:entered",function(){
					this.hiddenTextarea.focus();
					this.selectAll();
				});
				canvas[index].add(text);
				canvas[index].setActiveObject(text);
			},
			setCid:function(index){
					return "a"+index;
			},
			addCanvas:function(){
				let that =this;
				let length = this.canvasList.length;
				this.canvasList.push("");
				this.isActive = length;
				this.$nextTick(function(){
					let tag = document.getElementById("a"+length);
					canvas[length] = new fabric.Canvas(tag);
					canvas[length].renderAll();
					canvas[length].on({
    					'object:selected': function(e){
							var index = canvas[length].getObjects().indexOf(e.target);
							console.log("selected"+index);
							that.objectIndex = index;
							that.judgeItext();
							that.objectToolShow = true;
						}
					});
					canvas[length].on({
    					'selection:cleared': function(){
							that.objectToolShow = false;
						}
					});
				})
			},
			sendJson:function(){
				let that = this;
				let index = canvas.length;
				let str="",listphote=[];
				// var dataurl = canvas[0].toDataURL();
				// var blob = this.dataURItoBlob(dataurl);
				//使用ajax发送
				let fd = new FormData();
				// fd.append("file2", blob, "image.png");
				for(let i = 0; i<index; i++)
				{
					let blob = that.dataURItoBlob(canvas[i].toDataURL());
					fd.append("file2", blob, "image.png");
				}	
				listphote = str.split("$");
				
				// var xhr = new XMLHttpRequest();
				// xhr.open('POST', 'http://172.16.91.27:8080/zsxcy/photo/savephoto.s', true);
				// xhr.send(fd);
				this.$http({
                	url:"http://172.16.91.27:8080/zsxcy/photo/savephoto.s",
                	method:"post",
                	data:fd,
       //          	transformRequest: [
    			// 		function(data) {
      	// 				let ret = ''
      	// 				for (let it in data) {
       //  					ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) +'&'
      	// 				}
      	// 				return ret
    			// 		}
  					// ],
  					headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      },
                	processData:false,
                	contentType:false,
                	success:function(data){
                	    console.log("over..");
                	}
				});
				// var config = {
  		// 			method: 'post',
  		// 			url: 'http://192.168.10.30:8080/guangmu/photo/savephoto.s',
  		// 			data: {m_js:str},
  		// 			transformRequest: [
    // 					function(data) {
    //   					let ret = ''
    //   					for (let it in data) {
    //     					ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) +'&'
    //   					}
    //   					return ret
    // 					}
  		// 			]
				// };	
				// this.$http(config).then(response => {
    //     				if(response == 1)
    //     				{
    //     					console.log("success");
    //     					console.log(response);
    //     				}
    //   			}, response => {
    //     			console.log(that.canvasJson[0]);
    //   			});	
			},
			dataURItoBlob:function(dataURI)
			{
    			var byteString = atob(dataURI.split(',')[1]);
    			var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    			var ab = new ArrayBuffer(byteString.length);
    			var ia = new Uint8Array(ab);
    			for (var i = 0; i < byteString.length; i++)
    			{
        			ia[i] = byteString.charCodeAt(i);
    			}
    			var bb = new Blob([ab], { "type": mimeString });
    			return bb;
			},
			addJson:function(){
				let that = this;
				let index = canvas.length;
				let str="";
				for(let i = 0; i<index; i++)
				{
					str+=JSON.stringify(canvas[i].toJSON())+"$";
				}		
				var config = {
  					method: 'post',
  					url: 'http://123.207.169.138/guangmu/photo/insertphoto.s',
  					data: {m_js:str},
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
        				if(response == 1)
        				{
        					console.log("success");
        					console.log(response);
        				}
      			}, response => {
        			console.log(that.canvasJson[0]);
      			});
			},
			setActive:function(index){
				canvas[this.isActive].deactivateAll();
				canvas[this.isActive].renderAll();
				this.objectToolShow=false;
				this.isActive = index;
			},
            drag:function(e){
            	dom = e.target;
            	console.log(dom);
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
       				width: dom.width*that.scalefont,
       				height: dom.height*that.scalefont,
       				left: e.offsetX,
       				top: e.offsetY,
   				});
   				canvas[index].add(newImage);
   				return false;
            },
            dropBg:function(e,index){
				let that = this;
            	if (e.stopPropagation) {
        			e.stopPropagation(); // stops the browser from redirecting.
    			}
   				canvas[index].setBackgroundImage(dom.src, canvas[index].renderAll.bind(canvas[index]));
				this.isActive=index;
   				return false;
            },
            optionchange:function(event){
            	let that= this;
            	let ev  = event.target;
            	let index = this.objectIndex;
				canvas[this.isActive].getObjects()[index].set({fontFamily : ev.value});
				canvas[that.isActive].renderAll();
            },
            delObj:function(index){
            	canvas[this.isActive].getObjects()[index].remove();
            },
            upToCase:function(index){
            	let that = this;
				canvas[this.isActive].bringForward(canvas[that.isActive].getObjects()[index]);
            },
            downToCase:function(index){
            	let that = this;
				canvas[this.isActive].sendBackwards(canvas[that.isActive].getObjects()[index]);
            },
            upCase:function(index){
            	let that = this;
				canvas[this.isActive].bringToFront(canvas[that.isActive].getObjects()[index]);
            },
            downCase:function(index){
            	let that = this;
				canvas[this.isActive].sendToBack(canvas[that.isActive].getObjects()[index]);
            },
            preViewClose:function(){
            	this.showPreview=false;
            },
            colorBar:function(){
            	let that=this;
            	let cur = document.getElementById('cur');
            	let Tcolor = document.getElementById('Tcolor');
		   		let show = document.getElementById('color_show');//颜色演示
		   		let poscolor;
		   		that.colorShow = !that.colorShow;		   		
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
					height:that.colorCanvasWidth,
				});
				gradientBar.setGradient('fill',{
					x1: 0,
					y1: 0,
					x2: 0,
					y2: that.colorCanvasWidth,
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
					width:that.colorCanvasWidth,
					height:that.colorCanvasWidth,
				});
				gradientBar1.setGradient('fill',{
					 x1: 30,
					 y1: 0,
					 x2: that.colorCanvasWidth,
					 y2: that.colorCanvasWidth,
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
					 if(o.e.offsetX>30 &&o.e.offsetX<that.colorCanvasWidth && o.e.offsetY>0 &&o.e.offsetY<that.colorCanvasWidth)
					 {
					 	cur.style.left = o.e.offsetX+'px';
					 	cur.style.top  =  o.e.offsetY + 'px';
					    if(poscolor[0]>that.colorCanvasWidth/2 || poscolor[1]>that.colorCanvasWidth/2 || poscolor[2]>that.colorCanvasWidth/2)
						 {
							cur.style.outlineColor="#000";
						 }
					  else
					       cur.style.outlineColor="#fff";
					 }
					 else if(o.e.offsetX>0 &&o.e.offsetX<20 && o.e.offsetY>0 &&o.e.offsetY<that.colorCanvasWidth)
					 {
					 	gradientBar1.setGradient('fill',{
						 x1: 30,
						 y1: 0,
						 x2: that.colorCanvasWidth,
						 y2: that.colorCanvasWidth,
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
					 	if(pos.x>30 && pos.x<that.colorCanvasWidth && pos.y>0 && pos.y<that.colorCanvasWidth)
					 	{
							poscolor = that.movecolor(pos);
							cur.style.left = pos.x+'px';
						    cur.style.top  = pos.y + 'px';
						    if(poscolor[0]>that.colorCanvasWidth/2 || poscolor[1]>that.colorCanvasWidth/2 || poscolor[2]>that.colorCanvasWidth/2)
								 {
									cur.style.outlineColor="#000";
								 }
								 else
								  	cur.style.outlineColor="#fff";
								   
								let rgb = poscolor.slice(0,3).join();
								show.style.backgroundColor = 'rgb('+rgb+')';
								Tcolor.value = rgb;	
								canvas[that.isActive].getObjects()[that.objectIndex].set({fill:  'rgb('+rgb+')'});
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
						 x2: that.colorCanvasWidth,
						 y2: that.colorCanvasWidth,
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
						canvas[that.isActive].getObjects()[that.objectIndex].set({fill:  'rgb(0,0,0)'});
						canvas[that.isActive].renderAll();
					}
					else{
					   	
						let rgb = poscolor.slice(0,3).join();
						show.style.backgroundColor = 'rgb('+rgb+')';
						Tcolor.value = rgb;
						canvas[that.isActive].getObjects()[that.objectIndex].set({fill:  'rgb('+rgb+')'});
						canvas[that.isActive].renderAll();
					}	

				});

			},
			movecolor:function(pos){
				let that = this;
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
				let that = this;
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
				let that = this;
				 let pos = {
				 	x : option.e.offsetX ,
				 	y : option.e.offsetY ,
				 }
				 if(pos.x>=0 && pos.x<20 && pos.y>=0 && pos.y<that.colorCanvasWidth){
				 	var imgData = colorTag.contextContainer.getImageData(pos.x,pos.y,1,1);
					 	chooseC = true;				 	
					 }
				else if(pos.x>=30 && pos.x<that.colorCanvasWidth && pos.y>=0 && pos.y<that.colorCanvasWidth){
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
				let that = this;
				let list = [];
				for(var i=0; i<canvas.length; i++){
					list.push(canvas[i].toDataURL());
				}
				this.preView = list;
				this.showPreview=true;
			},
			loadModules:function(mindex){
			  if(this.moduleIndex != mindex){
				this.moduleIndex = mindex;
				let idnum = mindex+1;
				let that = this;
				this.$http.get('http://192.168.10.30:8080/guangmu/photo/selectphoto.s?m_id='+idnum).then(response => {
                	if(response == 1)
                	{
                  		console.log("success");
                  		console.log(response);
                	}
                	var list =[];
                 	list = response.data.split("~");
                 	that.canvasList = list;
                 	this.$nextTick(function(){
                 		for(let i=0; i<that.canvasList.length; i++)
						{
							let tag = document.getElementById("a"+i);
							canvas[i] = new fabric.Canvas(tag);
							canvas[i].loadFromJSON(that.canvasList[i]);
							canvas[i].renderAll();
							canvas[i].on({
    							'object:selected': function(e){
									var index = canvas[i].getObjects().indexOf(e.target);
									console.log("selected"+index);
									that.objectIndex = index;
									that.judgeItext();
									that.objectToolShow = true;
								}
							});
							canvas[i].on({
    							'selection:cleared': function(){
									that.objectToolShow = false;
								}
							});
						}
                 	})
                
            		}, response => {
              			console.log(that.canvasJson[0]);
            		});
			}
		  },
		},
		mounted(){
			let that =this;
			this.$nextTick(function(){
                 		for(let i=0; i<that.canvasList.length; i++)
						{
							let tag = document.getElementById("a"+i);
							canvas[i] = new fabric.Canvas(tag);
							canvas[i].loadFromJSON(that.canvasList[i]);
							canvas[i].renderAll();
							canvas[i].on({
    							'object:selected': function(e){
									var index = canvas[i].getObjects().indexOf(e.target);
									console.log("selected"+index);
									that.objectIndex = index;
									that.judgeItext();
									that.objectToolShow = true;
								}
							});
							canvas[i].on({
    							'selection:cleared': function(){
									that.objectToolShow = false;
								}
							});
						}
                 	})
		},
		components:{fileCom,objectTool,preView}
	}

</script>