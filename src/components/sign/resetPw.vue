<template>
  <div class="resetPW">
    <!--使用邮箱方式重设密码-->
    <div class="mail-re-pw-page" :class="{mailRePwPageIsDisplay: mailRePwPageDisplay}">
      <div class="header">重置密码</div>
      <div class="input">
        <chuangkitInput placeholder="输入新密码" name="pw"></chuangkitInput>
        <chuangkitInput placeholder="确认新密码" name="pw"></chuangkitInput>
      </div>
      <div class="next-step-button" @click="showRePwSuccess">
        <button>下一步</button>
      </div>
    </div>
    <!--重置密码成功-->
    <div class="re-pw-success" :class="{rePwSucPageIsDisplay: rePwSucPageDisplay}" >
      <div class="sprite success-img"></div>
      <div class="success-txt">修改密码成功</div>
      <div class="to-sign-in-button">
        <button><router-link to="/signin">立即登录</router-link></button>
      </div>
    </div>
  </div>
</template>

<script>
  import chuangkitInput from '../../components/input/input.vue'
  export default {
    data() {
      return {
        mailRePwPageDisplay: true,
        rePwSucPageDisplay: false
      }
    },
    methods: {
      showRePwSuccess(){
        this.mailRePwPageDisplay = false;
        this.rePwSucPageDisplay = true;
      }
    },
    components: {chuangkitInput}
  }
</script>

<style lang="less">
  .mail-re-pw-page,
  .re-pw-success
  {
    width: 550px;
    height: 540px;
    background-color: white;
    margin: 0 auto;
    border-radius: 3px;
    -webkit-box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12);
    -moz-box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12);
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12);
    margin-top: 64px;
    padding-top: 46px;
  }
  .mail-re-pw-page,
  .re-pw-success
  {
    //display: none;
  }
  .mailRePwPageIsDisplay,
  .rePwSucPageIsDisplay
  {
    display: block;
  }
  .header {
    margin: 10px 227px 73px;
    font-size: 24px;
    color: #626262;
  }
  .input {
    margin-left: 98px;
  }
  .next-step-button {
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

  .next-step-button {
    margin: 8px 0 16px 100px;
  }
  .sprite {
    display: inline-block;
    background: url("./sprite.svg");
  }
  .re-pw-success {
    text-align: center;
    .success-img {
      width: 104px;
      height: 104px;
      background-position: -13px -114px;
      margin-top: 44px;
      margin-bottom: 32px;
    }
    .success-txt {
      line-height: 24px;
      color: #626262;
      font-size: 14px;
      margin-bottom: 32px;
    }
    .to-sign-in-button{
      button {
        width: 200px;
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
  }
</style>