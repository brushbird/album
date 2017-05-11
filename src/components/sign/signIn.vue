<template>
  <div id="sign-in-page">
    <div class="sign-page" v-if="signPageDisplay">
      <div class="tab">
        <div class="sign-in-txt" :class="{dlTxtIsActive: dlTxtActive}"><router-link to="/signin">登录</router-link></div>
        <div class="sign-up-txt" :class="{zcTxtIsActive: zcTxtActive}"><router-link to="/signup">注册</router-link></div>
      </div>

      <div class="sign-in" :class="{dlIsActive: dlActive}">
        <div class="input">
          <chuangkit-input @inputResult="checkInputState(arguments,'usrname')" placeholder="邮箱/手机号" name="usr"></chuangkit-input>
          <chuangkit-input @inputResult="checkInputState(arguments,'pwd')" placeholder="输入密码" name="pw" type="password"></chuangkit-input>
        </div>

        <span class="forget">
          <router-link to="/retrieve">
            <span>忘记密码</span>
            <span class="sprite question-mark"></span>
          </router-link>
        </span>

        <div class="log-in-button" :class="btnActive"  @click="checkLogin">
          <button>登录</button>
        </div>

        <div class="fast-signin-text">使用快捷登录</div>
        <div class="fast-signin-icon">
          <span class="sprite weibo"></span>
          <span class="sprite wechat"></span>
          <span class="sprite qq"></span>
        </div>
      </div>
    </div>
    <footer>Copyright©chuangkit@2015-2016&nbsp;&nbsp;&nbsp;&nbsp;京ICP备&nbsp;14056892号-1</footer>
  </div>
</template>

<script>
  import chuangkitInput from '../../components/input/input.vue'

  export default {
    data(){
      return {
        signPageDisplay: true,
        dlTxtActive: true,
        dlActive: true,
        zcTxtActive: false,
        btnActive: {
          btnActived: false
        },
        ifUsrInput: false,
        ifPwdInput: false
      }
    },
    methods: {
      checkInputState(result,val){
        let state = result[0];

        switch (val){
          case 'usrname': this.ifUsrInput = state !== "error" ? true : false;
            break;
          case 'pwd': this.ifPwdInput =  state == "success" ? true : false;
            break;
        }

        this.inputState();
      },
      inputState(){
        this.btnActive.btnActived = this.ifUsrInput && this.ifPwdInput ? true : false;
      },
      checkLogin() {
        this.$http.get('mock/login/sSOLogin').then(response => {
          let logInResult = response.body.code;
          this.signPageDisplay = logInResult == "1" && this.btnActive.btnActived ? false : true;
          console.log("请求了！");
        }, response => {
          console.log('login error');
        });
      }
    },
    components: {chuangkitInput}
  }
</script>

<style lang="less" scoped>
  @import "../../base/base.less";

  .sign-page {
    width: 550px;
    height: 540px;
    background-color: white;
    margin: 0 auto;
    border-radius: 3px;
    -webkit-box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12);
    -moz-box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12);
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12);
    padding-top: 46px;
  }

  .tab {
    margin-bottom: 73px;
    font-size: 24px;
    color: #cdcdcd;
    text-align: center;

    div {
      display: inline-block;

    &:hover {
       cursor: pointer;
     }
    }

    div:nth-child(1) {
      margin-right: 48px;
    }
  }

  .input {
    margin-left: 98px;
  }

  .log-in-button {
    margin: 24px 100px 48px;
    button {
      width: 350px;
      height: 32px;
      font-size: 14px;
      color: #cdcdcd;
      background-color: #f3f3f3;
      border: 1px solid #e8e8e8;

      &:hover {
         cursor: pointer;
       }
    }
  }


  .btnActived {
    margin: 24px 100px 48px;
    button {
      width: 350px;
      height: 32px;
      font-size: 14px;
      color: #FFFFFF;
      background-color: #07AEFC;
      border: none;
      &:hover {
         cursor: pointer;
       }
    }
  }

  .fast-signin-text {
    font-size: 14px;
    margin: 48px auto 0;
    color: #626262;
  }

  .fast-signin-text {
    width: 84px;
  }

  .fast-signin-icon {
    margin: 24px 0 0 201px;

    span {
      margin-right: 40px;

    &:hover {
       cursor: pointer;
     }
    }
  }

  .forget {
    color: #cdcdcd;
    font-size: 14px;
    margin-left: 98px;

    .question-mark {
      width: 16px;
      height: 16px;
      background-position: -26px -10px;
      position: relative;
      top: 3px;
      left: 8px;
    }
    &:hover {
       cursor: pointer;
       span {
         color: #07AEFC;
       }
      .question-mark {
        background-position: -26px -26px;
      }
    }
  }

  .dlTxtIsActive {
    color: #626262;
  }

  .sprite {
    display: inline-block;
    background: url("./sprite.svg");
  }

  .weibo {
    width: 24px;
    height: 24px;
    background-position: -35px -79px;
  }

  .wechat {
    width: 24px;
    height: 24px;
    background-position: -12px -79px;
  }

  .qq {
    width: 24px;
    height: 24px;
    background-position: -61px -78px;
  }
  #sign-in-page {
    position: relative;
    width: 100%;
    height: 100%;
    .sign-page {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    footer {
      position: absolute;
      bottom: 15px;
      font-size: 12px;
      color: @complementaryColorI;
      text-align: center;
      width: 100%;
    }
  }
</style>
