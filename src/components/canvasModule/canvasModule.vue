<template>
  <div class="content">
  	<header>
  		<input type="text" v-if="islogin" name="mainName" class="mainName" placeholder="点这里，为你的相册添加名称">
  		<div class="logOrreg" v-if="!islogin">
  			注册登录后才可以进行新建、预览、保存或生成相册等更多功能&nbsp;&nbsp;<span @click="showLogReg(0)">登录</span>&nbsp;/&nbsp;<span @click="showLogReg(1)">注册</span>
  		</div>
  		<div class="toolList" v-if="islogin">
  			<div class="tool" @click="addCanvas">
  				<span>新建</span>
  			</div>
  			<div class="tool" @click="addJson">
  				<span>保存</span>
  			</div>
  			<div class="tool" @click="showOrder">
  				<span>订单管理</span>
  			</div>
  			<div class="tool" @click="sendJson">
  				<span>一键生成</span>
  			</div>
  		</div>	
  	</header>
  	<div class="logMood" v-if="showLogin"></div>
	<div class="logFrame" v-if="showLogin">
      <div class="logregCloseBtn" @click="logFrameClose">X</div>
  		<div class="logFrameHead">
  			<div class="logcontain">
  				<span @click="showLogReg(0)" :class="{logregActive: isLog}">登录</span>
  			</div>
  			<div class="logcontain">
  				<span @click="showLogReg(1)" :class="{logregActive: !isLog}">注册</span>
  			</div>
  		</div>
  		<div class="logFrameMain" v-if="isLog">
  			<albumInput inputId="uPhone" @inputResult="confirmInputState(arguments,'ltel')"  placeholder="请输入手机号" name="tel" width="400"></albumInput>
  			<albumInput type="password" inputId="lpassword" @inputResult="confirmInputState(arguments,'lpassword')"  placeholder="请输入密码" name="pw" width="400"></albumInput>
  			<button @click="checklogin" :class="logbtnClass">开启设计</button>
  		</div>
  		<div class="logFrameMain" v-if="!isLog">
        <albumInput inputId="rusr" @inputResult="confirmInputState(arguments,'rname')"  placeholder="请输入用户名" name="usr" width="400"></albumInput>
        <albumInput type="password" inputId="rpassword" @inputResult="confirmInputState(arguments,'rpassword')"  placeholder="请输入密码" name="pw" width="400"></albumInput>
        <albumInput type="password" inputId="repassword" @inputResult="confirmInputState(arguments,'repassword')"  placeholder="请确认密码" name="pw" width="400"></albumInput>
        <albumInput inputId="rphone" @inputResult="confirmInputState(arguments,'rtel')"  placeholder="请输入手机号" name="tel" width="400"></albumInput>
        <albumInput inputId="rcheck" @inputResult="confirmInputState(arguments,'rcheck')"  placeholder="请输入验证码" name="yzm" width="200"><button @click="sendCheck" class="checkbtn">发送验证码</button></albumInput>
        <!-- <br> -->
        <button @click="checkregister" :class="regbtnClass">注册</button>
  		</div>
  	</div>
	<fileCom :moduleLists="moduleLists" @creatIText="creatIText" @loadModules="loadModules" @drag="drag" @allowDrop="allowDrop"></fileCom>
	<div class="canvasContent">	
		
		<div class="main-list">
			<div v-for="(option,cindex) in canvasList" v-show="isActive == cindex" @drop='drop($event,cindex)' @dragover='allowDrop($event)'>
				<canvas :id="setCid(cindex)" v-if="cindex==0" height="3508" width="2479"></canvas>
				<canvas :id="setCid(cindex)" v-if="cindex!=0" height="3508" width="4961"></canvas>
				<div v-if="cindex!=0" class="splitDot"></div>
			</div>
		</div>	
		<div class="left-list">
			<ul>
				<li v-for="(options,mindex) in canvasList" @click="setActive(mindex)" :class="{cur : isActive == mindex}"  @drop='dropBg($event,mindex)' @dragover='allowDrop($event)'>
				<span v-if="mindex==0">封面</span>
				<span v-if="mindex!=0">{{mindex}}</span>
				</li>
			</ul>
		</div>	
	</div>
	<objectTool 
		:itextShow="itextShow"
		:imageShow="imageShow"
	 	:objectToolShow="objectToolShow" 
	 	:objectIndex="objectIndex" 
	 	:colorShow="colorShow"
	 	:itextStyle="itextStyle"
	 	:colorCanvasWidth="colorCanvasWidth"
	 	@delObj="delObj" 
	 	@optionchange="optionchange" 
	 	@upCase="upCase" 
	 	@downCase="downCase" 
	 	@upToCase="upToCase" 
	 	@downToCase="downToCase" 
	 	@colorBar="colorBar"
	 	@showItextStyle="showItextStyle"
	 	@lowSize="lowSize"
	 	@upSize="upSize"></objectTool>
	<mood :showMood="showMood" :moodText="moodText"></mood>
	<modal
      :modalShow="modalShow"
      @modalClose="modalClose"
      :placeHolder="promptText"
      :promptKind="promptKind"
      :modalType="modalType"
    >
    	<table class="listTable" v-if="modalType=='modal3'">
            <tr class="tr-title">
              <th>订单信息</th>
              <th>收货地址</th>
              <th>数量</th>
              <th>共计</th>
              <th>结算</th>
            </tr>
            <tr class="trStyle" v-for="item in orderManagement">
            	<td>{{item.albumDetail}}</td>
            	<td>{{item.address}}</td>
              <td><button @click="countLow(item)">-</button>{{item.count}}<button @click="countUp(item)">+</button></td>
            	<td class="order-no">{{item.count*10}}</td>
            	<td><button @click="bcPay">提交订单</button></td>
            </tr>
        </table>
    </modal>
  </div>
</template>

<style lang="less">
  @import "canvasModule.less";
</style>

<script>
	import fileCom from "../fileModules/fileModules.vue";
	import objectTool from "../objectTool/objectTool.vue";
	import mood from "../mood/mood.vue";
	import modal from "../modal/modal.vue";	
	import albumInput from '../input/input.vue';
	let dom = null,canvas = [], mIndex=0, colorTag,chooseC;
	
	export default{
		data(){
			return{
				moduleLists:[
					{},{},{},{}
				],	
				showTool:false,
				colorShow:false,
				itextStyle:false,
				see: true,
				isActive:0,
				start: 0,
				canvasList:[{},{}],
				canvasJson:[],
				photoJson:[],
				objectToolShow:false,
				objectIndex:0,
				itextShow:false,
				imageShow:false,
				showMood:false,
				modalShow:false,
				promptText: '操作成功',
        promptKind: 'success',
        modalType:'',
        moodText:'',
        islogin:false,
        showLogin:false,
        isLog:true,
        logbtnClass:{
        	btn:true,
        	logBtned:false
        },
        regbtnClass:{
        	btn:true,
        	regBtned:false
        },
        loginMessage:{
        	l_phone:'',
        	l_password:'',
        },
        registerMessage:{
        	r_name:'',
        	r_phone:'',
        	r_password:'',
        	r_repassword:'',
        	r_check:'',
          checknum:""
        },
        checkState:{
        	iflTelInput:false,
        	iflPassInput:false,
        	ifrUser:false,
        	ifrPassword:false,
        	ifrePassword:false,
        	ifrTelInput:false,
        	ifrCheck:false,
        },
        userInfo:{
        	uName:'A4硬壳哑光',
        	uPhone:'17862910192',
        	uAdress:'山东济南'
        },
        orderManagement:[
        	
        ],

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
      logFrameClose:function(){
        this.showLogin=false;
      },
			confirmInputState: function(option, val) {
				let that = this;
      	var state = option[0].inputResult;
				switch(val) {
        			case 'rname' : {that.checkState.ifrUser = state == 'success' ? true : false;that.registerMessage.r_name = option[0].value};
          				break;
              case 'rpassword' : {that.checkState.ifrPassword = state == 'success' ? true : false;that.registerMessage.r_password = option[0].value};
                  break;
              case 'repassword' : {that.checkState.ifrePassword = state == 'success' ? true : false;that.registerMessage.r_repassword = option[0].value};
                  break;
              case 'rtel' : {that.checkState.ifrTelInput = state == 'success' ? true : false;that.registerMessage.r_phone = option[0].value};
                  break;
              case 'rcheck' : {that.checkState.ifrCheck = state == 'success' ? true : false;that.registerMessage.r_check = option[0].value};
                  break;
        			case 'ltel' : {that.checkState.iflTelInput = state == 'success' ? true : false;that.loginMessage.l_phone = option[0].value};
          				break;
          	  case 'lpassword' : {that.checkState.iflPassInput = state == 'success' ? true : false;that.loginMessage.l_password = option[0].value};
          				break;
              case 'lpassword' : {that.checkState.iflPassInput = state == 'success' ? true : false;that.loginMessage.l_password = option[0].value};
                  break;
      	}
      	this.inputResultTotal();
    	},
    	inputResultTotal:function(){
      		if(this.checkState.iflTelInput && this.checkState.iflPassInput) {
       			this.logbtnClass.logBtned = true;
      		}else if(this.checkState.ifrUser && this.checkState.ifrPassword && this.checkState.ifrePassword && this.checkState.ifrTelInput && this.checkState.ifrCheck && this.registerMessage.r_password==this.registerMessage.r_repassword && this.registerMessage.r_check == this.registerMessage.checknum){
             this.regbtnClass.regBtned = true;
          }
    	},
			showLogReg:function(val){
				this.showLogin=true;
				if(val == 0){
					this.isLog=true;
				}else if(val == 1){
					this.isLog = false;
				}
			},
      sendCheck:function(){
        let that = this;
        this.$http({
          url:"http://192.168.10.30:8080/guangmu/photologin/send.s",
          method:"post",
          data:{
            u_phone:that.registerMessage.r_phone,
          },
          transformRequest: [
            function(data) {
              let ret = ''
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) +'&'
              }
              return ret
            }
          ]
        }).then(response => {
            console.log(response.data);
            that.registerMessage.checknum = response.data;
        }, response => {
            console.log("error");
            console.log(response);
            this.modalShow = true;
            this.modalType="modal2";
            this.promptText = "注册失败";
            this.promptKind = "notsuccess";
        });
      },
			checklogin:function(){
				let that = this;
				if(this.logbtnClass.logBtned){
				  this.$http({
            url:"http://192.168.10.30:8080/guangmu/photologin/yanzheng.s",
           	method:"post",
           	data:{
           		u_phone:that.loginMessage.l_phone,
           		u_password: that.loginMessage.l_password
           	},
  					transformRequest: [
    					function(data) {
      					let ret = ''
      					for (let it in data) {
        					ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) +'&'
      					}
      					return ret
    					}
  					]
			  }).then(response => {
    			if(response.data == 1)
    			{
    				console.log("success");
     				console.log(response);
     				that.islogin = true;
            that.showLogin =false;
    				this.modalShow = true;
            this.modalType="modal2";
     				this.promptText = "登陆成功";
     				this.promptKind = "success";
         // that.userInfo.uName = response
    			}else{
    				console.log("error");
            console.log(response);
            this.modalShow = true;
            this.modalType="modal2";
            this.promptText = "登陆失败";
            this.promptKind = "notsuccess";
        	}
   			}, response => {
      			console.log("error");
      			console.log(response);
       			this.modalShow = true;
            this.modalType="modal2";
       			this.promptText = "登陆失败";
       			this.promptKind = "notsuccess";
  			});
			}				
			},
      checkregister:function(){
        let that = this;
        if(this.regbtnClass.regBtned){
          this.$http({
            url:"http://192.168.10.30:8080/guangmu/photologin/zhuce.s",
            method:"post",
            data:{
              u_name:that.registerMessage.r_name,
              u_phone:that.registerMessage.r_phone,
              u_password:that.registerMessage.r_password,                    
            },
            transformRequest: [
              function(data) {
                let ret = ''
                for (let it in data) {
                  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) +'&'
                }
                return ret
              }
            ]
          }).then(response => {
              if(response.data == 1)
              {
                console.log("success");
                console.log(response);
                that.islogin=true;
                that.showLogin =false;
                this.modalShow = true;
                this.modalType="modal2";
                this.promptText = "注册成功";
                this.promptKind = "success";
              }else{
                console.log("error");
                console.log(response);
                this.modalShow = true;
                this.modalType="modal2";
                this.promptText = "注册失败";
                this.promptKind = "notsuccess";
              }
          }, response => {
            console.log("error");
            console.log(response);
            this.modalShow = true;
            this.modalType="modal2";
            this.promptText = "注册失败";
            this.promptKind = "notsuccess";
        });
      }
      },
			modalClose:function(){
				this.modalShow = false;
			},
      countUp:function(value){
        console.log(value);
        value.count++;
      },
      countLow:function(value){
        if(value.count>1){
          value.count--;
        }
      },
			promptShow(options) {
        this.modalShow = true;
        this.promptText = options.promptText && options.promptText;
        this.promptKind = options.promptKind && options.promptKind;
      },
			judgeItext:function(){
				let that =this;
				let index = this.objectIndex;
				if(canvas[this.isActive].getObjects()[index].get('type')==='i-text'){
				  	return true;
				}else{
					return false;
				}
			},
			judgeImage:function(){
				let that =this;
				let index = this.objectIndex;
				if(canvas[this.isActive].getObjects()[index].get('type')==='image'){
					return true
				}else{
					return false
				}
			},
			creatIText:function(){
				let index = this.isActive;
				let that = this;
				let text = new fabric.IText('点击更改文字',{
					left:50*that.scalefont,
					top:50*that.scalefont,
					fontSize:(40*that.scalefont/2),
					fontFamily:'SimHei ',
					rotatingPointOffset : 200,
       				borderScaleFactor : 10,
       				cornerSize : 50,
       				padding : 50,
				});
				text.setControlsVisibility({ 
						mt: false, 
						mr: false,
   						mb: false,
   					    ml: false,
   					    tl: false,
   					    tr: false,
   					    bl: false,
   					    border:400,
   					});
				text.on("editing:entered",function(){
					this.hiddenTextarea.focus();
					this.selectAll();
				});
				text.on("deselected",function(){
					that.colorShow=false;
					that.itextShow=false;
					that.itextStyle=false;
				});
				canvas[index].add(text);

				canvas[index].setActiveObject(text);
				// that.$set(that.preView,index,canvas[index].toDataURL());
			},
			setCid:function(index){
					return "a"+index;
			},
			addCanvas:function(){
				let that =this;
				let length = this.canvasList.length;
				if(length<11){
					that.canvasList.push("");
					that.isActive = length;
					that.$nextTick(function(){
						let tag = document.getElementById("a"+length);
						canvas[length] = new fabric.Canvas(tag);
						canvas[length].renderAll();
						canvas[length].on({
    								'object:selected': function(e){
    									that.colorShow=false;
										var index = canvas[length].getObjects().indexOf(e.target);
										that.objectIndex = index;
										if(that.judgeItext()){
					  						that.itextShow=true;
											that.colorShow=false;
										}else{
											that.itextShow=false;
										}
										if(that.judgeImage()){
											that.imageShow=true;
											that.colorShow=false;
										}else{
											that.imageShow=false;
											that.colorShow=false;
										}
										that.objectToolShow = true;
										e.target.rotatingPointOffset=200;
       									e.target.borderScaleFactor=10;
       									e.target.cornerSize=50;
       									e.target.padding=50;
									}
								});
								canvas[length].on({
    								'selection:cleared': function(){
										that.objectToolShow = false;
										that.colorShow = false;
										that.itextStyle = false;
										that.imageShow=false;
									}
								});
								canvas[length].on('object:scaling', (e) => {
									let o = e.target;
									if (!o.strokeWidthUnscaled && o.strokeWidth) {
  										o.strokeWidthUnscaled = o.strokeWidth;
  									}
									if (o.strokeWidthUnscaled) {
  										o.strokeWidth = o.strokeWidthUnscaled / o.scaleX;
  									}
								});
					})
			  	}else{
			  		this.modalShow = true;
        			this.promptText = "最多可以添加11张";
        			this.promptKind = "notsuccess";
			  	}
			},
			showOrder:function(){
				let that=this;
        this.orderManagement=[];
          this.$http({
            url:"http://192.168.10.30:8080/guangmu/photo/selectindent.s",
            method:"post",
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            enctype:'application/x-www-form-urlencoded',
            processData:false,
            contentType:false,
          }).then(response => {
                if(response == 1)
                {
                  console.log("success");
                  console.log(response);
                }
                console.log("success");
                console.log(response);
                for (let i = 0; i<response.data.length; i++) {
                  let list = {albumDetail:response.data[i].d_name,address:response.data[i].d_adress,count:1};
                  that.orderManagement.push(list);
                }
                that.modalShow = true;
                that.modalType = "modal3";
              }, response => {
                console.log("error");
                console.log(response);
                that.showMood=false;
                this.modalShow = true;
                this.promptText = "失败";
                this.promptKind = "notsuccess";
              });
			},
			sendJson:function(){
				let that = this;
				let index = canvas.length;
				if(index == 11){
					let str="",listphote=[];
					let fd = new FormData();
					fd.set('d_name', that.userInfo.uName);
					// fd.set('u_phone', that.userInfo.uPhone);
					fd.set('d_adress', that.userInfo.uAdress);
					this.showMood=true;
					this.moodText="正在生成相册，请稍后~~";
					for(let i = 0; i<index; i++)
					{
						let blob = that.dataURItoBlob(canvas[i].toDataURL());
						fd.append("file2", blob, "image.png");
					}	
					this.$http({
	          url:"http://192.168.10.30:8080/guangmu/photo/savephoto.s",
	          method:"post",
	          data:fd,
	  				headers: {
	            'Content-Type': 'application/x-www-form-urlencoded'
	          },
	          enctype:'application/x-www-form-urlencoded',
    	      processData:false,
    	      contentType:false,
					}).then(response => {
    	   				if(response == 1)
        				{
        					console.log("success");
        					console.log(response);
        				}
        				console.log("success");
        				console.log(response);
        				that.showMood=false;
        				that.moodText="";
        				this.modalShow = true;
        				this.promptText = "成功";
        				this.promptKind = "success";

      				}, response => {
        				console.log("error");
        				console.log(response);
        				that.showMood=false;
        				this.modalShow = true;
        				this.promptText = "失败";
        				this.promptKind = "notsuccess";
      				});
				}else{
					this.modalShow = true;
          this.modalType="modal2";
        	this.promptText = "必须完成11张相册才能生成相册哦";
        	this.promptKind = "notsuccess";
				}
			},
			bcPay:function(){
				 BC.err = function(data) {
            		//注册错误信息接受
            		alert(data["ERROR"]);
        		}
        		/**
        			* 需要支付时调用BC.click接口传入参数
        			*/
        		let app_id = "e95a9ff5-5f11-4d66-9b4b-ba66adf0bbd3";
        		let app_secret = "d21b49a7-902c-453d-b0f2-63fce1db4fd0";
        		let title = "testPay";
        		let amount = "1"; //单位分
        		let out_trade_no = "test1";
        		//2.根据订单参数生成 订单签名 sign
        		let sign = hex_md5(app_id + title + amount + out_trade_no + app_secret);
        		console.log(sign);
        		// let optional = "{\"msg\":\"addtion msg\"}";
        		BC.click({
            		"title":title, //商品名
            		"amount":amount,  //总价（分）
           			"out_trade_no":out_trade_no, //自定义订单号
            		"sign":sign, //商品信息hash值，含义和生成方式见下文
            		"debug":true,
            		"instant_channel":"ali",
            		"return_url" : "http://payservice.beecloud.cn/spay/result.php", //支付成功后跳转的商户页面,可选，默认为http://payservice.beecloud.cn/spay/result.php
            		// "optional" : <%=optional%>//可选，自定义webhook的optional回调参数
        		});
        		/**
       				 * click调用错误返回：默认行为console.log(err)
        		*/
        		BC.err = function(err) {
            		//err 为object, 例 ｛”ERROR“ : "xxxx"｝;
        		}
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
					str+=JSON.stringify(canvas[i].toJSON())+"~";
				}	
				this.showMood=true;
				this.moodText="正在保存操作，请稍后~~";	
				var config = {
  					method: 'post',
  					url: 'http://192.168.10.30:8080/guangmu/photo/inserthistory.s',
  					data: {
  						m_js:str,
              u_name:"wzt",
              u_phone:that.loginMessage.l_phone,
  					},
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
        				mIndex++;
        				console.log(mIndex);
        				that.showMood=false;
        				that.moodText="";
        				this.modalShow = true;
                this.modalType="modal2";
        				this.promptText = "保存成功";
        				this.promptKind = "success";
      			}, response => {
        			that.showMood=false;
        			this.modalShow = true;
                this.modalType="modal2";
        			this.promptText = "失败";
        			this.promptKind = "notsuccess";
      			});
			},
			setActive:function(index){
				let that = this;
				canvas[this.isActive].deactivateAll();
				canvas[this.isActive].renderAll();
				this.objectToolShow=false;
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
       				width: dom.width*that.scalefont,
       				height: dom.height*that.scalefont,
       				left: e.offsetX,
       				top: e.offsetY,
       				strokeWidth:10,
       				stroke:"#07aefc",
       				rotatingPointOffset : 200,
       				borderScaleFactor : 10,
       				cornerSize : 50,
       				padding : 50,

   				});
   				canvas[index].add(newImage);
				canvas[index].setActiveObject(newImage);
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
            	let that=this;
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
            showItextStyle:function(){
            	this.itextStyle=!this.itextStyle;
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
								if(that.judgeImage()){
									canvas[that.isActive].getObjects()[that.objectIndex].set({stroke:  'rgb('+rgb+')'});
								}else{
									canvas[that.isActive].getObjects()[that.objectIndex].set({fill:  'rgb('+rgb+')'});								
								}
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
						if(that.judgeImage()){
							canvas[that.isActive].getObjects()[that.objectIndex].set({stroke:  'rgb('+rgb+')'});
						}else{
							canvas[that.isActive].getObjects()[that.objectIndex].set({fill:  'rgb('+rgb+')'});								
						}
						canvas[that.isActive].renderAll();
					}
					else{
					   	
						let rgb = poscolor.slice(0,3).join();
						show.style.backgroundColor = 'rgb('+rgb+')';
						Tcolor.value = rgb;
						if(that.judgeImage()){
							canvas[that.isActive].getObjects()[that.objectIndex].set({stroke:  'rgb('+rgb+')'});
						}else{
							canvas[that.isActive].getObjects()[that.objectIndex].set({fill:  'rgb('+rgb+')'});								
						}
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
			lowSize:function(){
				let that = this;
				let swidth = canvas[that.isActive].getObjects()[that.objectIndex].strokeWidth;
				if(this.judgeImage()){
					if(swidth>0){
						swidth-=3;
						canvas[that.isActive].getObjects()[that.objectIndex].set({strokeWidth:  swidth});
					}else if(swidth <= 0){
						canvas[that.isActive].getObjects()[that.objectIndex].set({strokeWidth:  0});
					}
				}
				canvas[that.isActive].renderAll();
			},
			upSize:function(){
				let that = this;
				let swidth = canvas[that.isActive].getObjects()[that.objectIndex].strokeWidth;
				if(this.judgeImage()){
					swidth+=3;
					canvas[that.isActive].getObjects()[that.objectIndex].set({strokeWidth:  swidth});
				}
				canvas[that.isActive].renderAll();
			},
			setPreView:function(){
				let that = this;
				this.showPreview=true;
			},
			loadModules:function(options){
				this.showMood=true;
				this.moodText="正在加载模板，请稍后~~";
				let idnum = options.m_index+1;
				let m_name = options.m_name;
				let that = this;
				this.$http.get('http://211.159.165.171/guangmu/photo/selectphoto.s?m_index='+idnum+'&m_name='+m_name+'&m_num='+1).then(response => {
                 	that.$set(that.canvasList,that.isActive,JSON.stringify(response.data));
                 	this.$nextTick(function(){
							canvas[that.isActive].loadFromJSON(that.canvasList[that.isActive]);
							canvas[that.isActive].renderAll();
							canvas[that.isActive].on({
    							'object:selected': function(e){
    								that.colorShow=false;
									var index = canvas[that.isActive].getObjects().indexOf(e.target);
									that.objectIndex = index;
									if(that.judgeItext()){
				  						that.itextShow=true;
										that.colorShow=false;
									}else{
										that.itextShow=false;
										that.colorShow=false;
									}
									if(that.judgeImage()){
										that.imageShow=true;
										that.colorShow=false;
									}else{
										that.imageShow=false;
										that.colorShow=false;
									}
									that.objectToolShow = true;
									e.target.rotatingPointOffset=200;
       								e.target.borderScaleFactor=10;
       								e.target.cornerSize=50;
       								e.target.padding=50;
								}
							});
							canvas[that.isActive].on({
    							'selection:cleared': function(){
									that.objectToolShow = false;
									that.colorShow = false;
									that.itextStyle = false;
									that.imageShow=false;
								}
							});
						let transformScale = document.body.clientWidth*0.56/4961;
						document.getElementsByClassName("main-list")[0].style.cssText="transform:scale("+transformScale+");            transform-origin:left top;";
						that.showMood=false;
						that.moodText="";
        				this.modalShow = true;
                this.modalType="modal2";
        				this.promptText = "成功";
        				this.promptKind = "success";
                 	})
                
            		}, response => {
              			console.log(that.canvasJson[0]);
              			that.showMood=false;
        				this.modalShow = true;
                this.modalType="modal2";
        				this.promptText = "失败";
        				this.promptKind = "error";
            		});
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
									that.objectIndex = index;
									that.colorShow = false;
									that.itextShow=false;
									that.itextStyle = false;
									if(that.judgeItext()){
										that.colorShow=false;
				  						that.itextShow=true;
									}else if(that.judgeImage()){
										that.colorShow=false;
										that.imageShow=true;
									}
									that.objectToolShow = true;
									e.target.rotatingPointOffset=200;
       								e.target.borderScaleFactor=10;
       								e.target.cornerSize=50;
       								e.target.padding=50;
								}
							});
							canvas[i].on({
    							'selection:cleared': function(){
									that.objectToolShow = false;
									that.colorShow = false;
									that.itextStyle = false;
									that.imageShow=false;
								}
							});
							canvas[i].on('object:scaling', (e) => {
								let o = e.target;
								if (!o.strokeWidthUnscaled && o.strokeWidth) {
  									o.strokeWidthUnscaled = o.strokeWidth;
  								}
								if (o.strokeWidthUnscaled) {
  									o.strokeWidth = o.strokeWidthUnscaled / o.scaleX;
  								}
							});
							
						}
						let transformScale = document.body.clientWidth*0.56/4961;
						document.getElementsByClassName("main-list")[0].style.cssText="transform:scale("+transformScale+");            transform-origin:left top;";
                 	})
		},
		components:{fileCom,objectTool,mood,modal,albumInput}
	}

</script>
