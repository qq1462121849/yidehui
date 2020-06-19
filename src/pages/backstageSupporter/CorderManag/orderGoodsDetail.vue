<template>
  <div class="closeDetail" >
    <x-header slot="header" :left-options="{showBack: false}" :style="{paddingTop: statusH + 'rem',height:statusH + 0.88 +'rem'}" >
      <a @click="goBack()" slot="left" class="backBox" :style="{paddingTop: statusH + 'rem'}">
          <i class="iconfont icon-back"></i>
          </a>
      订单详情
      <!-- <a @click="jumpTo('/experienceDetail')" slot="right">明细</a> -->
    </x-header>
    <div class="closeDetail-coreBox" :style="{paddingTop: statusH + 'rem'}">
      <div style="height:.2rem;background:#f2f2f2;"></div>
      <div class="close-core-body">
        <div class="close-core">
          <div>序号</div>
          <div>{{info.id}}</div>
        </div>
         <div class="close-core">
          <div>订单号</div>
          <div>{{info.orderId}}</div>
        </div>
         <div class="close-core">
          <div>会员编号</div>
          <div>{{info.uid}}</div>
        </div>
         <div class="close-core">
          <div>姓名</div>
          <div>{{info.username}}</div>
        </div>
         <div class="close-core">
          <div>出厂价</div>
          <div>{{info.ex_price}}</div>
        </div>
         <div class="close-core">
          <div>快递费</div>
          <div>{{info.postagePrice}}</div>
        </div>
        <div class="close-core">
          <div>配送方式</div>
          <div>{{info.express}}</div>
        </div>
        <div class="close-core">
          <div>收货地址</div>
          <!-- <div>{{info.province+'-'+info.city+'-'+info.district}}</div> -->
          <div>{{info.province}}-{{info.city}}-{{info.district}}</div>
        </div>
        <div class="close-core">
          <div>支付方式</div>
          <div>{{payType[info.payType]}}</div>
        </div>
        <div class="close-core">
          <div>支付状态</div>
          <div class="close-core-color">{{payStatus[info.payStatus]}}</div>
        </div>
        <div class="close-core">
          <div>订单状态</div>
          <div class="close-core-color">{{orderStatus[info.orderStatus]}}</div>
        </div>
        <!-- <div class="close-core">
          <div>桌号</div>
          <div>4</div>
        </div> -->
        <div class="close-core" v-if="goodsList">
          <div>商品</div>
          <div class="coreDiv">{{goodsList.goodsName}}</div>
        </div>
        <div class="close-core">
          <div>时间</div>
          <div>{{info.createtime | formatDate}}</div>
        </div>
        <div class="close-core" @click="print(info.orderId)">
          <div style="color:red;">打印当前订单</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as utils from '../../../utils'
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as apiHttp from '../../../api/index'
import {formatDate} from '../../../plugin/data'
import { Confirm, Tab, TabItem, Popup } from 'vux'
export default {
  name: 'orderGoodsDetail',
  components: {TabItem,Tab,TabItem,Popup,MescrollVue,formatDate},
  data () {
    return {
      statusH: '',
      orderId: this.$route.query.orderId,
      info: [],
      goodsList: [],
      payType: [],
      orderStatus: [],
      payStatus: [],

      orderPrintList:{},//外卖订单信息
      lanya: utils.storage.get('LanYa')
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
    getOrderD () {
      this.$http.post('', {
        do: 'shop',
        op: 'orderDetail',
        orderId: this.orderId
      }).then(res => {
        if (res.code == 1) {
          this.info = res.data.info
          this.goodsList = res.data.goodsList[0]
          this.payType = res.data.payType
          this.orderStatus = res.data.orderStatus
          this.payStatus = res.data.payStatus
        }
      }) 
    },
    // 计时器end
    print(orderId){//打印功能
        if (!this.lanya) {
          this.$vux.toast.text("请去设置连接打印机！");
          return
        }
        this.$http.post("", {
          do: "shop",
          op: "orderPrint",
          orderId
        }).then(res => {
          if (res.code == 1) {
            this.orderPrintList = res.data
            var orderInfo;
            orderInfo = "<CA>***"+this.orderPrintList.number+this.orderPrintList.title+"***</CA><BR>";
            orderInfo += "<BR><BR>";
            orderInfo += "<C>"+this.orderPrintList.shopName+"</C><BR><BR>";
            orderInfo += "<B>"+this.orderPrintList.userAddress+"</B><BR>";
            orderInfo += "<B>"+this.orderPrintList.userPhone+"</B><BR>";
            if(this.orderPrintList.payStatus==1){
              orderInfo += "<B><C>--已在线付款--</C></B><BR><BR>";
            } else {
              orderInfo += "<B><C>--未支付--</C></B><BR><BR>";
            }
            orderInfo += "名称　　　　　 单价      数量<BR>";
            orderInfo += "--------------------------------<BR>";
            for (var i = 0;i<this.orderPrintList.list.length;i++) {
              orderInfo += this.orderPrintList.list[i]['goodsName']+"  "+this.orderPrintList.list[i]['price']+"  "+this.orderPrintList.list[i]['count']+"<BR>";
            }
            orderInfo += "--------------------------------<BR>";
            orderInfo += "配送费："+this.orderPrintList.postMoney+"<BR>" ;
            orderInfo += "餐盒费："+this.orderPrintList.boxMoney+"<BR>" ;
            orderInfo += "--------------------------------<BR>";
            orderInfo += "<L>合计：" + this.orderPrintList.totalPay + "元</L><BR>";
            orderInfo += "<BR><BR>";
            orderInfo += "<CA><C>***" + this.orderPrintList.number + "***</C></CA><BR><BR><BR>";
            orderInfo += "<CUT>";
            var that = this
            var printModule = api.require('posPrinter');
            var params = { 
                taskList: [{ 
                        printerAddr: that.lanya, 
                        content: orderInfo, 
                        keepAlive:true,       //蓝牙打印机，建议把keepAlive设为true
                        copyNum: 1 
                    }
                ] 
            };
            printModule.printOnSpecifiedPrinters(params);
          }
        });
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
          .coreDiv{
            width: 5rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            text-align: right;
          }
        }
      }
    }
}
</style>
