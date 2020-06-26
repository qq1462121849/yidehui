<template>
  <div class="closeDetail" >
    <x-header slot="header" :left-options="{showBack: false}" :style="{paddingTop: statusH + 'rem',height:statusH + 0.88 +'rem'}" >
      <a @click="goBack()" slot="left" class="backBox" :style="{paddingTop: statusH + 'rem'}">
          <i class="iconfont icon-back"></i>
          </a>
      商家信息
      <!-- <a @click="jumpTo('/experienceDetail')" slot="right">明细</a> -->
    </x-header>
    <div class="closeDetail-coreBox" :style="{paddingTop: statusH + 'rem'}">
      <div style="height:.2rem;background:#f2f2f2;"></div>
      <div class="close-core-body">
        <div class="close-core">
          <div style="min-width:1rem;">姓名</div>
          <div class="text-overflow_1-xzh">{{info.title}}</div>
        </div>
         <div class="close-core">
          <div>商家logo</div>
          <!-- <div>罗小城</div> -->
          <img :src="info.logo" alt="logo">
        </div>
         <div class="close-core">
          <div>联系人</div>
          <div>{{info.cname}}</div>
        </div>
         <div class="close-core">
          <div>联系电话</div>
          <div>{{info.tel}}</div>
        </div>
         <div class="close-core">
          <div>所属地区</div>
          <div>{{birth.province + birth.city + birth.district}}</div>
        </div>
         <div class="close-core">
          <div>详细地址</div>
          <div>{{info.address}}</div>
        </div>
         <div class="close-core">
          <div>申请时间</div>
          <div>{{info.createtime | formatDate}}</div>
        </div>
         <div class="close-core">
          <div>经纬度</div>
          <div>{{location.lng}}-{{location.lat}}</div>
        </div>
        <div class="close-core">
          <div>线下支付折扣</div>
          <div>{{info.offlinePayDis}}%</div>
        </div>
        <div class="close-core">
          <div>商家推荐UID</div>
          <div>{{info.shopUid}}</div>
        </div>
        <div class="close-core">
          <div>商家下单提示</div>
        </div>
        <div class="close-core2">{{info.singleRemark}}</div>
        <!-- <div class="close-core">
          <div>商家线下自助消费</div>
          <div>{{info.jsOffline}}</div>
        </div> -->
        <div class="close-core">
          <div>商家简介</div>
        </div>
        <div class="close-core2">{{info.description}}</div>
        <!-- <div class="close-core">
          <div>客户须知</div>
        </div>
        <div class="close-core2">{{info.shopCustomerNotice}}</div> -->
        <div style="height:1rem"></div>
      </div>
    </div>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as apiHttp from '../../../api/index'
import {formatDate} from '../../../plugin/data'
import { Confirm, Tab, TabItem, Popup } from 'vux'
export default {
  name: 'companyData',
  components: {TabItem,Tab,TabItem,Popup,MescrollVue,formatDate},
  data () {
    return {
      statusH:'',
      info:[],
      birth:[],
      location:[]
    }
  },
  filters: {
    formatDate (time) {
      time = time * 1000
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
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
            op: 'shopInfo'
        }).then(res => {
            if (res.code == 1) {
              this.info = res.data.info
              this.birth = this.info.birth
              this.location = this.info.location
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
          >div:nth-child(2){
            font-size:.3rem;
            font-weight:400;
            color:rgba(102,102,102,1);
          }
          .close-core-color{
            color: rgba(231,28,27,1) !important;
          }
          >img{
            width: .7rem;
            height: .7rem;
            border-radius: 50%;
          }
        }
        .close-core2{
          background: #f2f2f2;
          border-radius: .1rem;
          min-height: 1rem;
          font-size: .26rem;
          font-weight: 400;
          padding: 0 .2rem ;
        }
      }
    }
}
</style>
