<template>
  <div class="closeDetail" >
    <x-header slot="header" :left-options="{showBack: false}" :style="{paddingTop: statusH + 'rem',height:statusH + 0.88 +'rem'}" >
      <a @click="goBack()" slot="left" class="backBox" :style="{paddingTop: statusH + 'rem'}">
          <i class="iconfont icon-back"></i>
          </a>
      商家订单统计
      <!-- <a @click="jumpTo('/experienceDetail')" slot="right">明细</a> -->
    </x-header>
    <div class="closeDetail-coreBox" :style="{paddingTop: statusH + 'rem'}">
      <div style="height:.2rem;background:#f2f2f2;"></div>
      <div class="orderStatistics-core">
        <!-- <div class="Statistics-core-top">
          <img src="./../../../assets/img/bkSupporter/ostime.png" alt="">
          <span>2019.12.30  12:32:17</span>
        </div> -->
        <!-- 类 -->
        <div class="Statistics-core-list">
          <div class="core-list-box">
            <img src="./../../../assets/img/bkSupporter/osicon1.png" alt="">
            <div class="core-list-box-rig">
              <div>待发货</div>
              <div>{{info.price1}}</div>
            </div>
          </div>
          <div class="core-list-box">
            <img src="./../../../assets/img/bkSupporter/osicon2.png" alt="">
            <div class="core-list-box-rig">
              <div>待退款</div>
              <div>{{info.price2}}</div>
            </div>
          </div>
          <div class="core-list-box">
            <img src="./../../../assets/img/bkSupporter/osicon3.png" alt="">
            <div class="core-list-box-rig">
              <div>已发货</div>
              <div>{{info.price3}}</div>
            </div>
          </div>
          <div class="core-list-box">
            <img src="./../../../assets/img/bkSupporter/osicon4.png" alt="">
            <div class="core-list-box-rig">
              <div>已退款</div>
              <div>{{info.price4}}</div>
            </div>
          </div>
          <div class="core-list-box">
            <img src="./../../../assets/img/bkSupporter/osicon5.png" alt="">
            <div class="core-list-box-rig">
              <div>已完成</div>
              <div>{{info.price5}}</div>
            </div>
          </div>
          <div class="core-list-box">
            <img src="./../../../assets/img/bkSupporter/osicon6.png" alt="">
            <div class="core-list-box-rig">
              <div>已提现</div>
              <div>{{info.price6}}</div>
            </div>
          </div>
          <div class="core-list-box">
            <img src="./../../../assets/img/bkSupporter/osicon7.png" alt="">
            <div class="core-list-box-rig">
              <div>总收入</div>
              <div>{{info.price7}}</div>
            </div>
          </div>
          <div class="core-list-box">
            <img src="./../../../assets/img/bkSupporter/osicon8.png" alt="">
            <div class="core-list-box-rig">
              <div>未提现</div>
              <div>{{info.price8}}</div>
            </div>
          </div>
          <div class="core-list-box">
            <img src="./../../../assets/img/bkSupporter/osicon9.png" alt="">
            <div class="core-list-box-rig">
              <div>提现中</div>
              <div>{{info.price9}}</div>
            </div>
          </div>
          <div class="core-list-box">
            <img src="./../../../assets/img/bkSupporter/osicon10.png" alt="">
            <div class="core-list-box-rig">
              <div>物流费</div>
              <div>{{info.price10}}</div>
            </div>
          </div>
          <!-- <div class="core-list-box">
            <img src="./../../../assets/img/bkSupporter/osicon11.png" alt="">
            <div class="core-list-box-rig">
              <div>保证金</div>
              <div>480</div>
            </div>
          </div> -->
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
  name: 'orderStatistics',
  components: {TabItem,Tab,TabItem,Popup,MescrollVue},
  data () {
    return {
      statusH:'',
      info:[]
    }
  },
  created () {
    let size = (document.documentElement.clientWidth / 7.5)
    this.statusH = (api.safeArea.top / size)
  },
  mounted () {
    this.getInit()
  },
  methods: {
    getInit () {
          this.$http.post('', {
              do: 'shop',
              op: 'count'
          }).then(res => {
              if (res.code == 1) {
                this.info = res.data
              }
          }) 
    },
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
      .orderStatistics-core{
        padding: 0 .3rem;
        .Statistics-core-top{
          height: 1rem;
          display: flex;
          align-items: center;
          >img{
            width: .25rem;
            height: .26rem;
            margin-right: .2rem;
          }
        }
        .Statistics-core-list{
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .core-list-box{
            width:3.34rem;
            height:1.4rem;
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 8px 0px rgba(153,153,153,0.2);
            border-radius: .1rem;
            display: flex;
            align-items: center;
            margin-bottom: .2rem;
            >img{
              width: .76rem;
              height: .76rem;
              margin: 0 .3rem 0 .25rem;
            }
            .core-list-box-rig{
              >div:nth-child(1){
                font-size:.26rem;
                font-weight:500;
                color:rgba(102,102,102,1);
              }
              >div:nth-child(2){
                font-size:.3rem;
                font-weight:bold;
                color:rgba(27,27,27,1);
              }
            }
          }
        }
      }
    }
}
</style>
