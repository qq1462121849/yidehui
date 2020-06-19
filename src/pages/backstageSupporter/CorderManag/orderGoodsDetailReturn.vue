<template>
  <div class="closeDetail" >
    <x-header slot="header" :left-options="{showBack: false}" :style="{paddingTop: statusH + 'rem',height:statusH + 0.88 +'rem'}" >
      <a @click="goBack()" slot="left" class="backBox" :style="{paddingTop: statusH + 'rem'}">
          <i class="iconfont icon-back"></i>
          </a>
      退货订单详情
      <!-- <a @click="jumpTo('/experienceDetail')" slot="right">明细</a> -->
    </x-header>
    <div class="closeDetail-coreBox" :style="{paddingTop: statusH + 'rem'}">
      <div style="height:.2rem;background:#f2f2f2;"></div>
      <div class="close-core-body">
        <div class="close-core">
          <div>客户编号</div>
          <div>{{info.id}}</div>
        </div>
         <div class="close-core">
          <div>客户姓名</div>
          <div>{{info.username}}</div>
        </div>
         <div class="close-core">
          <div>订单号</div>
          <div>{{info.orderId}}</div>
        </div>
         <div class="close-core">
          <div>订单金额</div>
          <div>{{info.payPrice}}</div>
        </div>
         <div class="close-core">
          <div>退款金额</div>
          <div>{{info.price}}</div>
        </div>
         <div class="close-core">
          <div>退款方式</div>
          <div>{{type[info.type]}}</div>
        </div>
        <div class="close-core">
          <div>退款前状态</div>
          <div>{{orderStatus[info.orderStatus]}}</div>
        </div>
        <div class="close-core">
          <div>退款类型</div>
          <div>{{priceStatus[info.priceStatus]}}</div>
        </div>
        <div class="close-core">
          <div>原因</div>
        </div>
        <div class="close-core1">{{info.info}}</div>
        <div class="close-core">
          <div>物流信息</div>
          <div>{{info.express}}</div>
        </div>
        <div class="close-core">
          <div>申请时间</div>
          <div>{{info.createtime | formatDate}}</div>
        </div>
        <div class="close-core">
          <div>退款时间</div>
          <div v-if="info.updatetime!='0'">{{info.updatetime | formatDate}}</div>
          <div v-else>退款中</div>
        </div>
        <div class="close-core btn">
            <aside @click="refund">拒绝</aside>
           <aside @click="agree">同意</aside>
         
        </div>
      </div>
    </div>
    <!-- 拒单弹窗 -->
     <confirm v-model="show"
      title="确认拒绝接改订单?"
      @on-confirm="onConfirm">
      </confirm>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as apiHttp from '../../../api/index'
import {formatDate} from '../../../plugin/data'
import { Confirm, Tab, TabItem, Popup } from 'vux'
export default {
  name: 'orderGoodsDetailReturn',
  components: {TabItem,Tab,TabItem,Popup,MescrollVue,formatDate,Confirm},
  data () {
    return {
      statusH:'',
      id: this.$route.query.id,
      info: [],
      type: [],
      orderStatus: [],
      priceStatus: [],
      show:false,
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
    this.getOrderD()
  },
  methods: {
    refund(){
      this.show=true
    },
    onConfirm(){
           this.$http.post('', {
          do: 'shop',
          op: 'returnDetailRefuse',
          id: this.id
        }).then(res => {
          if (res.code == 1) {
              this.$vux.toast.text("已拒单！");
          }
        }) 
    },
    agree(){
        this.$http.post('', {
          do: 'shop',
          op: 'returnDetailAgree',
          id: this.id
        }).then(res => {
          if (res.code == 1) {
             this.$vux.toast.text("接单成功！");
          }
        }) 
    },
    getOrderD () {
      this.$http.post('', {
        do: 'shop',
        op: 'returnDetail',
        id: this.id
      }).then(res => {
        if (res.code == 1) {
          this.info = res.data.info
          this.type = res.data.type
          this.orderStatus = res.data.orderStatus
          this.priceStatus = res.data.priceStatus
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
        }
        .close-core1{
          min-height: 1rem;
          background: #f2f2f2;
          border-radius: .1rem;
          padding: 0 .1rem;
        }
      }
    }
    .btn{
      display: flex;
      justify-content: space-around;
      width: 60%;
      margin: auto;
      aside{
        width:80px;
        height: 30px;
        line-height: 30px;
        color: #fff;
        border-radius: 6px;
        text-align: center;
        font-size:.3rem;
          background:rgba(231,28,27,1) ;
     
      }
      aside:first-of-type{
         background:rgba(153,153,153,1);
        
      }
    }
}
</style>
