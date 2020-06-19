<template>
  <div class="closeDetail" >
    <x-header slot="header" :left-options="{showBack: false}" :style="{paddingTop: statusH + 'rem',height:statusH + 0.88 +'rem'}" >
      <a @click="goBack()" slot="left" class="backBox" :style="{paddingTop: statusH + 'rem'}">
          <i class="iconfont icon-back"></i>
          </a>
      商家收款统计
      <!-- <a @click="jumpTo('/experienceDetail')" slot="right">明细</a> -->
    </x-header>
    <div class="closeDetail-coreBox" :style="{paddingTop: statusH + 'rem'}">
      <div class="close-core-body">
        <div class="core-bodyBox">
          <div>商家收款统计</div>
          <div class="bodyBox-cen">
            <div>今日收款总额</div>
            <div><span>￥</span>{{list.price1}}</div>
          </div>
          <div class="bodyBox-btn">
            <div>
              <div>昨日收款总额</div>
              <div><span>￥</span>{{list.price2}}</div>
            </div>
            <div>
              <div>本月收款总额</div>
              <div><span>￥</span>{{list.price3}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as apiHttp from '../../../api/index'
import { Confirm, Tab, TabItem, Popup } from 'vux'
export default {
  name: 'gatheringStatistics',
  components: {TabItem,Tab,TabItem,Popup,MescrollVue},
  data () {
    return {
      statusH:'',
      list: []
    }
  },
  created () {
    let size = (document.documentElement.clientWidth / 7.5)
    this.statusH = (api.safeArea.top / size)
  },
  mounted () {
    this.getStyle()
  },
  methods: {
    getStyle () {
      this.$http.post('', {
        do: 'shop',
        op: 'shopPay'
      }).then(res => {
        if (res.code == 1) {
          this.list = res.data
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
</style>
<style scoped lang="less">
.closeDetail{
  // background: #ffffff;
    .vux-header{
      background:linear-gradient(90deg,rgba(246,86,43,1),rgba(231,27,27,1)) !important;
      border: none !important;
    }
    .closeDetail-coreBox{
      margin-top: .88rem;
      overflow: hidden;
      .close-core-body{
        padding: 0 .3rem;
        margin-top: .5rem;
        .core-bodyBox{
          height: 5.3rem;
          background: #ffffff;
          border-radius: .1rem;
          padding: 0 .32rem;
          >div:nth-child(1){
            height: 1rem;
            line-height: 1rem;
            font-size:.34rem;
            font-weight:500;
            color:rgba(27,27,27,1);
            border-bottom: 1px solid rgba(241,241,241,1);
          }
          .bodyBox-cen{
            height: 2.3rem;
            overflow: hidden;
            >div:nth-child(1){
              font-size:.3rem;
              font-weight:400;
              color:rgba(51,51,51,1);
              margin:.6rem 0 0 0;
              text-align: center;
            }
            >div:nth-child(2){
              font-weight:bold;
              color:rgba(27,27,27,1);
              font-size: .52rem;
              text-align: center;
              border-bottom: 1px solid rgba(241,241,241,1);
              >span{
                font-size: .3rem;
              }
            }
          }
          .bodyBox-btn{
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 1.8rem;
            >div{
              text-align: center;
              >div:nth-child(1){
                font-size:.26rem;
                font-weight:400;
                color:rgba(102,102,102,1);
              }
              >div:nth-child(2){
                font-size:.42rem;
                font-weight:500;
                >span{
                  font-size: .3rem;
                }
              }
            }
          }
        }
      }
    }
}
</style>
