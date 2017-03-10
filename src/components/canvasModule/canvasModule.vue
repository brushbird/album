<template>
  <div class="content">
  	<header>
  		<button @click="addJson">保存</button>
  	</header>
	<fileCom @drag="drag" @allowDrop="allowDrop"></fileCom>
	<div class="canvasContent">		
		<div class="main-list" >
			<div v-for="(item,index) in canvasList" v-show="isActive == index" @drop='drop($event,index)' @dragover='allowDrop($event)'>
				<canvas :id="item.id" height="460px" width="820px"></canvas>
			</div>
			
		</div>
		<div class="left-list">
			<ul>
				<li v-for="(item,index) in canvasList" @click="setActive(index)" :class="{cur : isActive == index}">
					<img :src="item.dataUrl">
				</li>
				<li class="addCanvas" @click="addCanvas">添加</li>
			</ul>
		</div>
		<canvas id="test" height="460px" width="820px"></canvas>
	</div>
	
  </div>
</template>

<style lang="less">
  @import "canvasModule.less";
</style>

<script>
	import fileCom from "../fileModules/fileModules.vue";
	let dom = null,canvas = [];
	export default{
		data(){
			return{
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
					that.canvasJson.push(canvas[i].toJSON());
				}		
				console.log(this.canvasJson[0]);
				// let canvas1 = new fabric.Canvas("test");
				// let json = this.canvasJson[0];
				// canvas1.loadFromJSON(json, canvas1.renderAll.bind(canvas1), function(o, object) {
   	// 				//console.log(o, object);
  		// 		});
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
		},
		beforeMount:function(){
			
		},
		mounted: function(){
			for(let i=0; i<this.canvasList.length; i++)
			{
				let that = this;
				let tag = document.getElementById(this.canvasList[i].id);
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
	components:{fileCom}
	}

</script>