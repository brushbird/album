<template>
  <div class="content">
	<div class="canvasContent">
		<div class="left-list">
			<ul>
				<li v-for="(item,index) in canvasList" @click="setActive(index)" :class="{cur : isActive == index}">
					<img :src="item.dataUrl">
				</li>
			</ul>
		</div>
		<div class="main-list" >
			<div v-for="(item,index) in canvasList" v-show="isActive == index" @drop='drop($event,index)' @dragover='allowDrop($event)'>
				<canvas :id="item.id" height="500px" width="500px"></canvas>
			</div>
		</div>
	</div>
	<div class="fileContent">
		<div id="images" class="images">
		  <div class="imgContainer" v-for="(item,index) in imageList" @dragstart='drag($event)'>
    		<img draggable="true" :src="item" width="135">
    		<span class="del" @click="delImg(index)">删除</span>
    	  </div>
		</div>
		<div class="fileBtn">上传图片
			<input type="file" name="" value="文件" multiple="true" @change="addPic" id="file">
		</div>
	</div>
  </div>
</template>

<style lang="less">
  @import "canvasModule.less";
</style>

<script>
	let dom = null,canvas = [];
	export default{
		data(){
			return{
				picValue:"",
				isActive:0,
				canvasList:[
					{index: 1, id: "a", rect:{width: 20, height: 20, fill: "red", left: 10, top: 10},circle:{radius: 20, fill: "blue", left: 50, top: 0},dataUrl:"",isShow:false
					},
					{index: 2, id: "b", rect:{width: 20, height: 20, fill: "red", left: 10, top: 10},dataUrl:"",isShow:false}
				],
				imageList:[],
			}
		},
		computed:{

		},
		methods:{
			setActive:function(index){
				this.isActive = index;
			},
			triger:function(){

			},
			addPic:function(e){
				let files = e.target.files || e.dataTransfer.files;
                if (!files.length)return; 
                this.createImage(files);
            },
            delImg:function(index){
            	this.imageList.splice(index,1);
            },
            createImage(file) {
                if(typeof FileReader==='undefined'){
                    alert('您的浏览器不支持图片上传，请升级您的浏览器');
                    return false;
                }
                let image = new Image();         
                let vm = this;
                let leng=file.length;
                for(let i=0;i<leng;i++){
                    let reader = new FileReader();
                    reader.readAsDataURL(file[i]); 
                    reader.onload =function(e){
                    	vm.imageList.push(e.target.result);                              
                    };                 
                }                        
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
       				left: e.layerX,
       				top: e.layerY
   				});
   				canvas[index].add(newImage);
				that.canvasList[index].dataUrl=canvas[index].toDataURL();
   				return false;
            },
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
	}

</script>