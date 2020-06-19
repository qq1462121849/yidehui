<template>
  <div class="closeDetail" >
    <x-header slot="header" :left-options="{showBack: false}" :style="{paddingTop: statusH + 'rem',height:statusH + 0.88 +'rem'}" >
      <a @click="goBack()" slot="left" class="backBox" :style="{paddingTop: statusH + 'rem'}">
          <i class="iconfont icon-back"></i>
          </a>
      设置
      <!-- <a @click="jumpTo('/experienceDetail')" slot="right">明细</a> -->
    </x-header>
    <div class="closeDetail-coreBox" :style="{paddingTop: statusH + 'rem'}">
      <div style="height:.2rem;background:#f2f2f2;"></div>
      <div class="close-core-body">
         <div class="close-core" >
          <div>开始营业时间</div>
          <div>
             <datetime v-model="minuteListValue1" format="HH:mm" 
              @on-change="change1" 
             ></datetime>
            &nbsp;&nbsp;
            <img class="left" src="./../../../assets/img/bkSupporter/left.png" alt="">
          </div>
        </div>
        <div class="close-core" >
          <div>结束营业时间</div>
          <div>
            <datetime v-model="minuteListValue2" format="HH:mm" 
              @on-change="change2" 
             ></datetime>
            &nbsp;&nbsp;<img class="left" src="./../../../assets/img/bkSupporter/left.png" alt=""></div>
        </div>
      </div>
         <div style="height:.2rem;background:#f2f2f2;"></div>
         <div class="close-core-body">
          <x-switch title="是否开启" v-model="value" @on-change="change"></x-switch>
        </div>
         <div class="submit-box"> 
          <div class="submit-box-core" @click="confirmed">确定</div>
        </div>
    </div>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as apiHttp from '../../../api/index'
import { Confirm, Tab, TabItem, Popup,XSwitch,Datetime } from 'vux'
export default {
  name: 'businessHours',
  components: {TabItem,Tab,TabItem,Popup,MescrollVue,XSwitch,Datetime},
  data () {
    return {
      statusH:'',
      value: true,
      minuteListValue1:'09:00',
      minuteListValue2:'21:00',
      status: ''
    }
  },
  created () {
    let size = (document.documentElement.clientWidth / 7.5)
    this.statusH = (api.safeArea.top / size)
  },
  mounted () {
    this.getTime()
  },
  inject: ['reload'],
  methods: {
    getTime () {
       this.$http.post("", {
        do:'shop',
        op:'setHours',
      }, true).then(res => {
        if (res.code == 1 ) {
          if (Object.keys(res.data.info.businessHours).length){
            this.minuteListValue1 = res.data.info.businessHours.start
            this.minuteListValue2 = res.data.info.businessHours.end
          }
        }
      })
    },
    change1 (val) {
      console.log(val)
    },
    change2 (val) {
      console.log(val)
    },
    change (val) {
      console.log(val)
    },
    confirmed () {
      console.log(this.minuteListValue1,this.minuteListValue2,this.value)
      if (this.minuteListValue1 > this.minuteListValue2){
        this.$vux.toast.text('开始时间不能大于结束时间')
        this.minuteListValue1 = '9:00'
        return
      }
      this.$http.post("", {
        do:'shop',
        op:'setHours',
        type:'save',
        start: this.minuteListValue1,
        end: this.minuteListValue2, 
        status: this.value ? '1' : '0'
      }, true).then(res => {
        if(res.code == 1){
          this.$vux.toast.text('提交成功')
          this.getTime()
        }
      })
    }
  },
  activated () {

  }
}
</script>
<style lang="less" >
.vux-header{
      background:linear-gradient(90deg,rgba(246,86,43,1),rgba(231,27,27,1)) !important;
      border: none !important;
      .vux-header-title{
        color: #ffffff !important;
      }
      .iconfont.icon-back{
        color: #ffffff !important;
      }
  }
  .vux-x-switch.weui-cell.weui-cell_switch {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.1rem;
    .weui-cell__bd{
      font-size:.3rem;
      font-weight:500;
      color:rgba(27,27,27,1);
      
    }
  }
</style>
<style scoped lang="less">
.closeDetail{
  background: #ffffff;
    .vux-header{
      background:linear-gradient(90deg,rgba(246,86,43,1),rgba(231,27,27,1)) !important;
      border: none !important;
    }
    .closeDetail-coreBox{
      margin-top: .88rem;
      .close-core-body{
        padding: 0 .3rem;
        .close-core{
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 1.1rem;
          border-bottom: 1px solid #f2f2f2;
          >div:nth-child(1){
            font-size:.3rem;
            font-weight:500;
            color:rgba(27,27,27,1);
          }
          .logoBox{
            display: flex;
            align-items: center;
          }
          >div:nth-child(2){
            font-size:.3rem;
            font-weight:400;
            color:rgba(102,102,102,1);
            display: flex;
            align-items: center;
            .logo{
              width: .9rem;
              height: .9rem;
              border-radius: .45rem;
            }
            .left{
              width: .13rem;
              height: .24rem;
            }
          }
          .close-core-color{
            color: rgba(231,28,27,1) !important;
          }
        }
      }
      .submit-box{
        padding: 0 .75rem;
        background:#f2f2f2;
        overflow: hidden;
        .submit-box-core{
          width: 100%;
          height: .88rem;
          background:linear-gradient(90deg,rgba(246,86,43,1),rgba(231,27,27,1));
          border-radius:.1rem;
          line-height:  .88rem;
          text-align: center;
          font-size: .34rem;
          font-weight:500;
          color:rgba(255,255,255,1);
          margin-top: 2.3rem;
        }
      }
    }
}
</style>
