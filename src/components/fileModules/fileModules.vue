<template>
  <div class="fileModules">
	<div class="navbar">
		<ul>
			<li v-for="(item, index) in mainList" :class="{active: index==activeIndex}" class="base" @click="setActive(index)">
				<div class="logo"></div>
				<span>{{item.name}}</span>
			</li>
			<!-- <li :class="{active: !isActive}" class="base" @click="setActive($event)">模板</li>
			<li :class="{active: !isActive}" class="base" @click="setActive($event)">字体</li> -->
		</ul>
	</div>
	<div class="fileContent" v-show="activeIndex==0">
		<div class="fileBtn">上传图片
			<input type="file" name="" value="文件" multiple="true" @change="addPic" id="file">
		</div>
		<div id="images" class="images">
		  <div class="imgContainer" v-for="(item,index) in imageList" @dragstart='drag($event)'>
    		<img draggable="true" :src="item" style="width:100px">
    		<span class="del" @click="delImg(index)">删除</span>
    	  </div>
		</div>
	</div>
	<div class="moduleContent" v-show="activeIndex==1">
		<!-- <div class="modules" @click="loadModules(index)" v-for="(item,index) in moduleLists">
			
		</div> -->
		<div class="moudulesHead">
			<span @click="showMoudules(0)" :class="{isModule : showMoudulesIndex}">模板</span>
			<span @click="showMoudules(1)" :class="{isModule : !showMoudulesIndex}">热门</span>
		</div>
		<div class="moudulesMain" v-show="showMoudulesIndex">
			<div class="moudulesMain-left-head">
				<span class="modulesBtn" v-for="(item,index) in modulesList" :class="{moduleActive: index==moduleActiveIndex}" @click="setModuleActive(index,item.title)">{{item.name}}</span>
			</div>
			<div class="moudulesMain-left-main">
				<div class="mouduleImages" v-show="proptText=='jinan'" v-for="(item,index) in normalList" @click="loadModules(index)">
					<img :src="item.url">
				</div>
			</div>
		</div>
		<div class="moudulesMain" v-show="!showMoudulesIndex">
			
		</div>
	</div>
	<div class="itextContent" v-show="activeIndex==2">
		<span @click='creatIText' class="addfont">点击创建默认文字</span>
	</div>
  </div>
</template>

<style lang="less">
  @import "fileModules.less";
</style>

<script>
	export default{
		data(){
			return{
				activeIndex:0,
				moduleActiveIndex:0,
				proptText:'',
				showMoudulesIndex:true,
				imageList:[],
				modulesList:[
					{name: "通用",title:"tongyong"},
					{name: "济南大学",title:"jinan"},
					// {name: "二次元"},
					// {name: "水墨"},
					// {name: "古典"},
					// {name: "炫彩"}
				],
				mainList:[
					{name: "图库"},
					{name: "素材"},
					{name: "文字"}
				],
				normalList:[
					{url:"./static/photoList/JNUniversity/p1.png"},
					{url:"./static/photoList/JNUniversity/p2.png"},
					{url:"./static/photoList/JNUniversity/p3.png"},
					{url:"./static/photoList/JNUniversity/p4.png"},
					{url:"./static/photoList/JNUniversity/p5.png"},
					{url:"./static/photoList/JNUniversity/p6.png"},
					{url:"./static/photoList/JNUniversity/p7.png"},
					{url:"./static/photoList/JNUniversity/p8.png"},
					{url:"./static/photoList/JNUniversity/p9.png"},
					{url:"./static/photoList/JNUniversity/p10.png"},
				]
			}
		},
		props:{
			moduleLists:{
				require:true,
				default:{}
			}
		},
		computed:{
			isActive:function(index){
				if(index == this.activeIndex)
					return true;
				return false;
			}
		},
		methods:{
			setActive:function(index){
				this.activeIndex=index;
			},
			setModuleActive:function(index,value){
				this.moduleActiveIndex = index;
				this.proptText=value;
			},
			drag:function(e){
            	this.$emit('drag',e);
            },
            allowDrop:function(e){
            	this.$emit('allowDrop',e);
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
            creatIText:function(){
            	this.$emit("creatIText");
            },
            loadModules:function(index){
            	let mName=this.proptText;
            	let mIndex = index;
            	this.$emit("loadModules",{m_name:mName,m_index:mIndex});
            },
            showMoudules:function(val){
            	this.showMoudulesIndex = val == 0 ? true : false;
            }
		},
		mounted: function(){
		// 	for(let i=0; i<this.canvasList.length; i++)
		// 	{
		// 		let that = this;
		// 		let tag = document.getElementById(this.canvasList[i].id);
		// 		canvas[i] = new fabric.Canvas(tag);
		// 		if(typeof(this.canvasList[i].rect)!="undefined"){
		// 			let rect = new fabric.Rect({
		// 				width: this.canvasList[i].rect.width,
		// 				height: this.canvasList[i].rect.height,
		// 				fill: this.canvasList[i].rect.fill,
		// 				left: this.canvasList[i].rect.left,
		// 				top: this.canvasList[i].rect.top
		// 			});
		// 			canvas[i].add(rect);
		// 		}
		// 		if(typeof(this.canvasList[i].circle)!="undefined"){
		// 			let circle = new fabric.Circle({
		// 				radius: this.canvasList[i].circle.radius,
		// 				fill: this.canvasList[i].circle.fill,
		// 				left: this.canvasList[i].circle.left,
		// 				top: this.canvasList[i].circle.top
		// 			});
		// 			canvas[i].add(circle);
		// 		}
		// 		this.canvasList[i].dataUrl=canvas[i].toDataURL();
		// 		canvas[i].on("object:modified",function(e){ 
		// 			let ev = e.target;
		// 			that.canvasList[i].dataUrl=canvas[i].toDataURL();
		// 		});
		// }
	},
	}

</script>