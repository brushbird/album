<template>
  <div class="content">
    <div class="account-center-pretitle">{{title}}</div>
    <div class="account-content-left">
      <div class="changeLeft">
        <input type="text" name="" v-model="content">
        <p>{{content}}</p>
      </div>
    </div>
    <div class="content-right">
      <div class="changeRight">
        <!-- <router-link to="/accountcenter" tag="div" class="back"><span class="logo-back"></span>返回</router-link> -->
        <div class="vipdetail">
        <div class="vipList">
          <div class="vipList-head">
            <span class="vip-label on" @click="onVip">VIP记录</span>
            <span class="vip-label" @click="onDep">支付记录</span>
            <button class="vip-btn">我要开发票</button>
          </div>
          <table class="listTable" v-if="ifVip">
            <tr class="tr-title">
              <th>发送时间</th>
              <th>会员增加时间</th>
              <th>会员到期时间</th>
              <th>备注</th>
            </tr>
            <tr class="trStyle" v-for="item in vipList">
              <td>
                  <span class="pre">{{item.date[0]}}年</span>
                  <span class="nor">{{item.date[1]}}月{{item.date[2]}}日</span>
              </td>
              <td>
                  <span class="pre">{{item.role}}</span>
                  <span class="nor">{{item.changeTime}}天</span>
              </td>
              <td>
                  <span class="pre">{{item.lDate[0]}}年</span>
                  <span class="nor">{{item.lDate[1]}}月{{item.lDate[2]}}日</span>
              </td>
              <td>
                  <span class="pre">{{item.detail}}</span>
              </td>
            </tr>
          </table>
          <table class="listTable" v-else>
            <tr class="tr-title">
              <th>发送时间</th>
              <th>充值单号</th>
              <th>金额（元）</th>
              <th />
            </tr>
            <tr class="trStyle" v-for="item in depositList">
              <td>
                  <span class="pre">{{item.date[0]}}年</span>
                  <span class="nor">{{item.date[1]}}月{{item.date[2]}}日</span>
              </td>
              <td>
                  <span class="pre">{{item.depNum1}}</span>
                  <span class="pre">{{item.depNum2}}</span>
              </td>
              <td>
                  <span class="nor">{{item.money}}</span>
              </td>
              <td>
                  <span class="pre">{{item.detail}}</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
      
      </div>
    </div>
  
  </div>
</template>

<style lang="less">
  @import "test.less";
</style>

<script>


export default {

  data(){
    return {
      content:"",
       title:"测试中心",
       vipList:[
          {date:[2014, 2, 23], role: '+', changeTime: 16, lDate:[2017, 1, 23], detail: '无'},
          {date:[2014, 2, 23], role: '+', changeTime: 16, lDate:[2017, 1, 23], detail: '无'},
          {date:[2014, 2, 23], role: '+', changeTime: 16, lDate:[2017, 1, 23], detail: '无'},
        ],
        depositList:[
          {date:[2014, 2, 23], depNum1: '2014952710021122', depNum2: '2014952710021122', money: '1,000.00', detail: '无'},
          {date:[2014, 2, 23], depNum1: '2014952710021122', depNum2: '2014952710021122', money: '1,000.00', detail: '无'},
          {date:[2014, 2, 23], depNum1: '2014952710021122', depNum2: '2014952710021122', money: '1,000.00', detail: '无'},
        ],
        ifVip:true
    }
  },
  methods: {
    // 接收是否vip参数
    inputResultTotal:function(){

    },
    onDep:function(){
      this.ifVip=false;
      document.getElementsByClassName("vip-label")[0].classList.remove("on");
      document.getElementsByClassName("vip-label")[1].classList.add("on");
    },
    onVip:function(){
      this.ifVip=true;
      document.getElementsByClassName("vip-label")[1].classList.remove("on");
      document.getElementsByClassName("vip-label")[0].classList.add("on");
    }
  },
  beforeMount: function() {
  
    
  },
  mounted: function() {

  },
  components:{  }
}


</script>
