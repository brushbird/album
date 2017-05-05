<template>
  <div
    class="inputs-container"
    :class="{'input-error':isError,focusing:isFocus}"
    :name="name"
    :style="boxStyle"
  >
    <slot></slot>
    <input
      v-if="type!='textarea'"
      :type="type"
      :placeholder="placeholder"
      :style="inputWidth"
      :id="inputId"
      @blur="checkTest"
      @focus="isFocus=true"
    />
    <textarea
      v-if="type == 'textarea'"
      :placeholder="placeholder"
      :style="inputWidth"
      @blur="checkTest"
      @focus="isFocus=true"
      rows="3"></textarea>
    <br>
    <span class="warning">{{ msg }}</span>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: "",
        isError: false,
        inputWidth : {
          width: "350px"
        },
        boxStyle:{
          width: "350px"
        },
        isFocus:false,
      }
    },
    props: {
      type: {
        validator (value) {
          return oneOf(value, ['text', 'textarea', 'password']);
        },
        default: 'text'
      },
      inputId:{
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: 'usr'
      },
      width: {
        type: [String, Number],
        default: 350
      },
      boxWidth:{
        type: [String, Number],
        default: 0
      },
      paddingLeft:{
        type: [String, Number],
        default:0
      }
    },
    beforeMount: function(){
      this.inputWidth = {
        width: this.width + "px"
      };
      this.boxStyle = this.boxWidth==0?this.inputWidth:{
          width: this.boxWidth + "px",
          paddingLeft:this.paddingLeft?this.paddingLeft+'px':"0"
        }
    },
    methods: {
      checkTest: function(event) {
        let result;
        switch(this.name) {
          case 'mail': result=checkMail(this, event);
            break;
          case 'pw': result=checkPW(this, event);
            break;
          case 'usr': result=checkUsr(this, event);
            break;
          case 'yzm': result=checkYzm(this, event);
            break;
          case 'tel': result=checkTel(this, event);
            break;
          case 'area': result=checkAdress(this,event);
            break;
        }
        this.$emit('inputResult', result);
        this.isFocus=false;
      }
    }
  }
  // 判断参数是否是其中之一
  function oneOf(value, validList) {
    for (let i = 0; i < validList.length; i++) {
      if (value === validList[i]) {
        return true;
      }
    }
    return false;
  }

  // 验证
  function checkMail(_this, e) {
    let reg = /^[a-z_0-9.-]{1,64}@([a-z0-9-]{1,200}.){1,5}[a-z]{1,6}$/i;
    if (e.target.value == "") {
      _this.msg = "请输入邮箱！";
      _this.isError = true;
    } else if (!reg.test(e.target.value)) {
      e.target.value = "";
      _this.msg = "请输入正确的邮箱地址！";
      _this.isError = true;
    } else {
      _this.msg = "";
      _this.isError = false;
      return "success";
    }
    return "error";
  }
  function checkTel(_this, e) {
    let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
    if (e.target.value == "") {
      _this.msg = "请输入手机号！";
      _this.isError = true;
    } else if (!reg.test(e.target.value)) {
      e.target.value = "";
      _this.msg = "请输入正确的手机号！";
      _this.isError = true;
    } else {
      _this.msg = "";
      _this.isError = false;
      return "success";
    }
    return "error";
  }
  function checkPW(_this, e) {
    let reg = /^(\w){6,20}$/; //6-20个字母、数字、下划线
    if (!e.target.value) {
      _this.msg = "请输入密码！";
      _this.isError = true;
    } else if (!reg.test(e.target.value)) {
      e.target.value = "";
      _this.msg = "请输入6~20位的字母、数字或下划线！";
      _this.isError = true;
    } else {
      _this.msg = "";
      _this.isError = false;
      return "success";
    }
    return "error";
  }
  function checkUsr(_this, e) {
    if (!e.target.value) {
      _this.msg = "请输入用户名！";
      _this.isError = true;
    } else{
      _this.msg = "";
      return "success";
    }
    return "error";
  }
  function checkAdress(_this,e){
    if (!e.target.value) {
      _this.msg = "请输入收货地址！";
      _this.isError = true;
    } else{
      _this.msg = "";
      return "success";
    }
    return "error";
  }
  function checkYzm(_this, e) {
    let reg = /[a-zA-Z0-9]{4}/; // 4位数字或字母
    if (!e.target.value) {
      _this.msg = "请输入验证码！";
      _this.isError = true;
    } else if (!reg.test(e.target.value)) {
      e.target.value = "";
      _this.msg = "请输入符合要求的验证码！";
      _this.isError = true;
    } else {
      _this.msg = "";
      _this.isError = false;
      return "success";
    }
    return "error";
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  @import "input.less";
</style>
