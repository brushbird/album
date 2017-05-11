<template>
  <div id="retrieve-page">
    <div class="retrieve-page-hole">
    <!--找回密码页面-->
    <div class="retrieve-page" :class="{retrievePageIsDisplay: retrievePageDisplay}">
      <div class="go-back">
        <span class="sprite go-back-icon"></span><span><router-link to="/signin">返回</router-link></span>
      </div>
      <div class="retrieve-tab">
        <div class="tel-retrieve-txt" :class="{telRetriTxtIsActive: telRetriTxtActive}" @click="showTelRetri">手机号找回</div>
        <div class="mail-retrieve-txt" :class="{mailRetriTxtIsActive: mailRetriTxtActive}" @click="showMailRetri">邮箱找回</div>
      </div>
      <!--使用手机号找回-->
      <div class="tel-retrieve" :class="{telRetriIsActive: telRetriActive}">
        <div class="input">
          <chuangkitInput
                  @inputResult="checkInputState(arguments,'tel')"
                  placeholder="输入手机号"
                  name="tel"
          >
          </chuangkitInput>
          <chuangkitInput
                  @inputResult="checkInputState(arguments,'firstYzm')"
                  placeholder="输入验证码"
                  name="yzm"
                  width="175"
                  boxWidth="350"
                  maxlength="4"
          >
            <template scoped="chuangkitInput">
              <div class="input-inner">
                <div class="vcode">
                  <div class="text">
                    <span>点击刷新</span>
                  </div>
                  <div class="img">
                    <img :src="vCodeImgUrl" alt="">
                  </div>
                </div>
              </div>
            </template>
          </chuangkitInput>
          <chuangkitInput
                  @inputResult="checkInputState(arguments,'secondYzm')"
                  placeholder="输入验证码"
                  name="yzm"
                  width="200"
                  boxWidth="350"
                  maxlength="4"
          >
            <template>
              <div class="input-inner">
                <div class="get-vcode">
                  <span>获取短信验证码</span>
                </div>
              </div>
            </template>
          </chuangkitInput>
        </div>
        <div class="next-step-button"  :class="btnActive" @click="showTelRePw">
          <button>下一步</button>
        </div>
      </div>
      <!--使用邮箱找回-->
      <div class="mail-retrieve" :class="{mailRetriIsActive: mailRetriActive}">
        <div class="input">
          <chuangkitInput
                  @inputResult="checkInputState(arguments,'mailRetri')"
                  @inputValue="getInputMail"
                  placeholder="输入邮箱账号"
                  name="mail"></chuangkitInput>
          <chuangkitInput
                  @inputResult="checkInputState(arguments,'mailYzm')"
                  placeholder="输入图形验证码"
                  name="yzm"
                  width="250"
                  boxWidth="350"
                  maxlength="4"
          >
            <template scoped="chuangkitInput">
              <div class="input-inner">
                <div class="img">
                  <img :src="vCodeImgUrl" alt="">
                </div>
              </div>
            </template>
          </chuangkitInput>
        </div>
        <div class="next-step-button" :class="mailBtnActive" @click="sendResetPwdEmail">
          <button>下一步</button>
        </div>
      </div>
    </div>
    <!--使用手机号重置密码页-->
    <div class="tel-re-pw-page" v-if="telRePwPageDisplay">
      <div class="go-back" @click="showRetriPage">
        <span class="sprite go-back-icon"></span><span>返回</span>
      </div>
      <div class="header">重置密码</div>
      <div class="input">
        <chuangkitInput
                @inputValue="inputValue"
                @inputResult="checkInputState(arguments,'pwd1')"
                placeholder="输入新密码"
                name="pw"
                type="password"
        >
        </chuangkitInput>
        <chuangkitInput
                @inputResult="checkInputState(arguments,'pwd2')"
                @inputAnotherValue="inputAnotherValue"
                placeholder="确认新密码"
                name="pw"
                type="password"
        >
        </chuangkitInput>
      </div>
      <div class="next-step-button" :class="rePwBtnActive" @click="showRePwSuccess">
        <button>下一步</button>
      </div>
    </div>
    <!--重置密码成功-->
    <div class="re-pw-success" v-if="rePwSucPageDisplay">
      <div class="sprite success-img"></div>
      <div class="success-txt">修改密码成功</div>
      <div class="to-sign-in-button">
        <button><router-link to="/signin">立即登录</router-link></button>
      </div>
    </div>
    <!--使用邮箱，发送验证邮件成功-->
    <div class="mail-retrieve-success" v-if="mailRetriSucDisplay">
      <div class="go-back" @click="showMailRetri">
         <span class="sprite go-back-icon"></span><span>返回</span>
      </div>
      <div class="mail-retrieve-success-content">
        <div class="sprite success-img"></div>
        <div class="success-txt">验证链接已成功发送至<br />
          {{ usrMail }}的邮箱</div>
        <div class="to-verify-mail-button">
            <button>前往邮箱验证</button>
        </div>
        <div class="to-sign-in-button">
          <button><router-link to="/signin">立即登录</router-link></button>
        </div>
      </div>
    </div>
  </div>
    <footer>Copyright©chuangkit@2015-2016&nbsp;&nbsp;&nbsp;&nbsp;京ICP备&nbsp;14056892号-1</footer>
  </div>
</template>

<script>
  import chuangkitInput from '../../components/input/input.vue'
  import img1 from './yzm.png'

  export default {
    data(){
      return {
        "vCodeImgUrl":img1,
        retrievePageDisplay: true,
        telRePwPageDisplay: false,
        rePwSucPageDisplay: false,
        mailRetriSucDisplay: false,
        telRetriActive: true,
        telRetriTxtActive: true,
        mailRetriTxtActive: false,
        mailRetriActive: false,
        btnActive: {
          btnActived: false
        },
        rePwBtnActive: {
          rePwBtnActived: false
        },
        telFilled: false,
        firstYzmFilled: false,
        secondYzmFilled: false,
        pwd1: false,
        pwd2: false,
        mailBtnActive: {
          mailBtnActived: false
        },
        usrMail: ""
      }
    },
    methods: {
      showTelRetri(){
        this.mailRetriActive = false;
        this.telRetriActive = true;
        this.telRetriTxtActive = true;
        this.mailRetriTxtActive = false;
      },
      showRetriPage(){
        this.telRePwPageDisplay = false;
        this.retrievePageDisplay = true;
      },
      showMailRetriSuc(){
        this.retrievePageDisplay = !this.mailBtnActive.mailBtnActived;
        this.mailRetriSucDisplay = this.mailBtnActive.mailBtnActived;
      },
      showMailRetri(){
        this.retrievePageDisplay = true;
        this.mailRetriTxtActive = true;
        this.mailRetriActive = true;
        this.mailRetriSucDisplay = false;
        this.telRetriActive = false;
        this.telRetriTxtActive = false;
        this.telRetriTxtActive = false;
      },
      getInputMail(val){
        this.usrMail = val;
      },
      inputValue(val){
        if(val){
          this.firstPwd = val;
          this.uniPwd = false;
          this.uniPwd = this.firstPwd === this.secPwd ? true : false;
          this.inputState();
        }
      },
      inputAnotherValue(val){
        if(val){
          this.secPwd = val;
          this.uniPwd = false;
          this.uniPwd = this.firstPwd === this.secPwd ? true : false;
          this.inputState();
        }
      },
      checkInputState(result,val){
        let state = result[0];

        switch (val){
          case 'tel': this.telFilled = state == "success" ? true : false;
            break;
          case 'firstYzm': this.firstYzmFilled =  state == "success" ? true : false;
            break;
          case 'secondYzm': this.secondYzmFilled = state == "success" ? true : false;
            break;
          case 'pwd1': this.pwd1 = state == "success" ? true : false;
            break;
          case 'pwd2': this.pwd2 = state == "success" ? true : false;
            break;
          case 'mailRetri': this.mailRetriFilled = state == "success" ? true : false;
            break;
          case 'mailYzm': this.mailYzmFilled = state == "success" ? true : false;
        }

        this.inputState();
      },
      inputState(){

        // 如果手机号和两个验证码都填入，按钮点亮
        this.btnActive.btnActived = this.telFilled && this.firstYzmFilled && this.secondYzmFilled ? true : false;
        if(this.pwd1 && this.pwd2){ // 两个密码不为空

          this.rePwBtnActive.rePwBtnActived = this.uniPwd; // this.uniPwd 当且仅当两个密码一致时为 true
        }else {
          this.rePwBtnActive.rePwBtnActived = false;
        }
        // 邮箱找回界面 邮箱和验证码都填入时点亮按钮
        this.mailBtnActive.mailBtnActived = this.mailRetriFilled && this.mailYzmFilled ? true : false;
      },
      sendResetPwdEmail(){
        this.$http.get('mock/user/sendResetPwdEmail').then(response => {
          let sendResult = response.body.body.code;
          this.mailRetriSucDisplay = sendResult == "1" ? true : false;
          this.retrievePageDisplay = false;
          console.log("请求了！");
        }, response => {
          console.log('Signup error');
        });
      },
      showTelRePw(){
        this.$http.get('mock/user/sendResetPwdEmail').then(response => {
          let sendResult = response.body.body.code;
          this.telRePwPageDisplay = sendResult == "1" ? true : false;
          this.retrievePageDisplay = false;
          console.log("请求了！");
        }, response => {
          console.log('Signup error');
        });
      },
      showRePwSuccess(){
        this.$http.get('mock/user/sendResetPwdEmail').then(response => {
          let sendResult = response.body.body.code;
          this.rePwSucPageDisplay = sendResult == "1" ? true : false;
          this.telRePwPageDisplay = false;
          console.log("请求了！");
        }, response => {
          console.log('Signup error');
        });
      },
    },
    components: {chuangkitInput}
  }
</script>

<style lang="less" scoped>
  @import "retrieve.less";
</style>