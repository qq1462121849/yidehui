<template>
  <div class="index" >
    <x-header slot="header" :left-options="{showBack: false}" :style="{paddingTop: statusH + 'rem',height:statusH + 0.88 +'rem'}" >
      <a @click="goBack()" slot="left" class="backBox">
          <!-- <i class="iconfont icon-back"></i> -->
          </a>
      订单管理
      <!-- <a @click="jumpTo('/experienceDetail')" slot="right">明细</a> -->
    </x-header>
<div >
  <mescroll-vue :style="{paddingTop: statusH + 'rem'}" class="common-warp mescroll"  id="mescroll" ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
    <div class="warp"  id="d26" >
      <div class="index-core" >
        <div class="index-core-box">
          <div class="index-core-top">
            <div>
              <img v-if="shop.logo" :src="shop.logo" alt="">
              <img v-else :src="'static/libs/img/touxiang.png'" alt="">
              <span>{{shop.title}}</span>
            </div>
            <img @click="jumpTo('/setupindex')" src="./../../../assets/img/bkSupporter/shezhi.png" alt="">
          </div>
            <!-- tab -->
          <div class="core-nav-tab">
            <tab :line-width="3" custom-bar-width=".8rem" active-color="#E71C1B" default-color="#333" v-model="typetab" class="resultTab" >
              <tab-item @on-item-click="resetTab(0)">{{orderTab0}}</tab-item>
              <tab-item @on-item-click="resetTab(1)">{{orderTab1}}</tab-item>
            </tab>
          </div>
          <!-- <div style="height:.2rem;background:#f2f2f2;"></div> -->
                <!-- list -->
                <div class="core-tab-list" v-show="listLeft">
                  <div class="search-box">
                    <div @click="jumpTo('/orderScreen')">
                      <img src="./../../../assets/img/bkSupporter/search2.png" alt="">
                      <span>订单号、手机号、会员编号</span>
                      <!-- <input type="text" placeholder="订单号、手机号、会员编号"> -->
                    </div>
                  </div>
                  <div class="tab-list-tit tab-list-tit1" v-if="list.length!='0'">
                    <div>订单号</div>
                    <div>客户姓名</div>
                    <div>商品名称</div>
                    <div></div>
                  </div>
                  <div class="tab-list-core">
                    <div class="tabList" v-for="(item,index) in list" :key="index">
                      <div class="list-top ">
                        <div>{{item.orderId}}</div>
                        <div>{{item.username}}</div>
                        <!-- <div>{{item.goodsList[0]['goodsName']}}</div> -->
                        <div  v-if="item.goodsList">
                          <div v-for="(it,ind) in item.goodsList" :key="ind" ><span v-if="ind == '0'">{{it.goodsName}}</span> </div>
                        </div>
                        <div v-else>无</div>
                        <div class="list-bgcol"><div @click="jumpTo('/orderGoodsDetail?orderId='+item.orderId)">详情</div></div>
                      </div>
                      <div class="list-bottom" v-if="item.orderDada== '0'">
                        <div class="status" @click="transfer('1',item.orderId)">接单</div>
                        <div class="status" v-if="isDada=='1'" @click="transfer('0',item.orderId)">转单</div>
                      </div>
                      <div class="list-bottom" v-if="item.orderDada== '1'">
                        <div class="status" @click="jumpTo('/aMapaMap?orderId='+item.orderId)" >骑手位置</div>
                      </div>
                      <div class="list-bottom" v-if="item.orderDada== '20'">
                        <div class="status1" >已接单</div>
                      </div>
                      <div class="list-bottom" v-if="item.orderDada== '2'">
                        <div class="status1">待取货</div>
                        <div class="status" @click="jumpTo('/aMapaMap?orderId='+item.orderId)" >骑手位置</div>
                      </div>
                      <div class="list-bottom" v-if="item.orderDada== '3'">
                        <div class="status1">配送中</div>
                        <div class="status" @click="jumpTo('/aMapaMap?orderId='+item.orderId)">骑手位置</div>
                      </div>
                      <div class="list-bottom" v-if="item.orderDada== '4'">
                        <div class="status1">已完成</div>
                        <div class="status" @click="jumpTo('/aMapaMap?orderId='+item.orderId)">骑手位置</div>
                      </div>
                      <div class="list-bottom" v-if="item.orderDada== '5' || item.orderDada== '7'|| item.orderDada== '10'">
                        <div class="status" @click="transfer('1',item.orderId)">接单</div>
                        <div class="status" v-if="isDada=='1'" @click="transfer('0',item.orderId)">转单</div>
                      </div>
                      <div class="list-bottom" v-if="item.orderDada== '9'">
                        <div class="status" @click="transfer('2',item.orderId)">待收货</div>
                      </div>
                      <!-- <div class="list-bottom" v-if="item.orderDada== '10'">
                        <div class="status1">待转单</div>
                      </div> -->
                      <div class="list-bottom" v-if="item.orderDada== '1000'">
                        <div class="status1">系统故障</div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--  -->
                <div class="core-tab-list"  v-show="listRight">
                  <div class="search-box">
                    <div @click="jumpTo('/orderScreenReturn')">
                      <img src="./../../../assets/img/bkSupporter/search2.png" alt="">
                      <span>订单号、手机号、会员编号</span>
                      <!-- <input type="text" placeholder="商品类别名称"> -->
                    </div>
                  </div>
                  <div class="tab-list-tit tab-list-tit1" v-if="list.length!='0'">
                    <div>订单号</div>
                    <div>订单金额</div>
                    <div>状态</div>
                    <div></div>
                  </div>
                  <div class="tab-list-core">
                    <div class="tabList" v-for="(item,index) in list  " :key="index">
                      <div class="list-top ">
                        <div>{{item.orderId}}</div>
                        <div>{{item.price}}</div>
                        <div>{{status[item.status]}}</div>
                        <div class="list-bgcol"><div @click="jumpTo('/orderGoodsDetailReturn?id='+item.id)">详情</div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        <!-- <div style="height:1.88rem"></div> -->
        </div>
      </mescroll-vue>
      </div>
      <!-- 提示弹窗 -->
      <confirm v-model="show"
      title="是否确认转单操作?"
      @on-confirm="onConfirm">
      </confirm>
       <confirm v-model="show1"
      title="是否确认接单操作?"
      @on-confirm="onConfirm1">
      </confirm>
      <confirm v-model="show2"
      title="是否确认收货操作?"
      @on-confirm="onConfirm2">
      </confirm>
  </div>
</template>

<script>
import * as utils from '../../../utils'
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as apiHttp from '../../../api/index'
import { Confirm, Tab, TabItem, Popup } from 'vux'
export default {
  name: 'CorderManagindex',
  components: {TabItem,Tab,TabItem,Popup,MescrollVue,Confirm},
  data () {
    return {
      statusH:'',
      typetab:0,
      listLeft:true,
      listRight:false,
      mescroll: null,
      mescrollDown: {},
      mescrollUp: {
          callback: this.upCallback,
          page: {
            num: 0, 
            size: 2 
          },
          htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
          noMoreSize: 1, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
          // toTop: {
          //   //回到顶部按钮
          //   src: "./../../../assets/back_top.png",
          //   offset: 1000 
          // },
          empty: {
            warpId: "d26", 
            icon: "./static/img/auth/kong.png",
            tip: "暂无相关数据~" //提示
          },
          lazyLoad: {
            use: true, 
            attr: 'imgurl', 
            showClass: 'mescroll-lazy-in', 
            delay: 500, 
            offset: 200 
          },
      },
      list:[],
      status: [],
      type:0,
      show:false,
      show1:false,
      show2:false,
      shop:[],
      orderTab0:'',
      orderTab1:'',
      noop:'orderList',
      orderId:'',
      autoOrder:'',
      isDada:'',

      orderPrintList:{},//外卖订单信息
      lanya: utils.storage.get('LanYa')
    }
  },
  created () {
    let size = (document.documentElement.clientWidth / 7.5)
    this.statusH = (api.safeArea.top / size)
  },
  mounted () {
    this.getInit()
    this.setTimed()
  },
  methods: {
    // 计数器
    setTimed () {
      var that = this
     
     timeqishi = setInterval(function(){
        that.getOrder()
      },10000)
    },
    // 自动打印
    getPOST() {
      this.$http.post('', {
          do:'shop',
          op: 'selectOrderPrint'
      }).then(res => {
        if (res.code === 1) {
          let addlist = res.data.list
          // if (addlist.length == '0') { this.$vux.toast.text('暂无新订单')}
          for (var i=0;i<addlist.length;i++){
            if(addlist[i].shopLoveUid == '0'){
              this.print(addlist[i].orderId)
            }
          }
        }
      })
    },
    // 自动接单
    getOrder () {
      if (this.autoOrder == '1') {
        console.log("自动接单")
        this.$http.post('', {
          do:'shop',
          op: 'selectOrderAuto'
        }).then(res => {
          if (res.code === 1) {
            // transfer('1',item.orderId)
            this.getPOST()
          }
        })
      }
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
            orderInfo = "<CA>**"+this.orderPrintList.number+this.orderPrintList.title+"**</CA><BR>";//这里一直空格到合适
            orderInfo += "<BR><BR>";
            orderInfo += "<CA>"+this.orderPrintList.shopName+"</CA><BR><BR>";
            if(this.orderPrintList.payStatus==1){
              orderInfo += "<L><C>--已在线付款--</C></L><BR><BR>";
            } else {
              orderInfo += "<C>--未支付--</C><BR><BR>";
            }
            orderInfo += "<C>下单时间："+this.orderPrintList.createtime+"</C><BR>" ;
             orderInfo += "--------------------------------<BR>";
             orderInfo +="<A>备注: "+this.orderPrintList.note+"</A><BR>" 
             orderInfo += "--------------------------------<BR>";

            orderInfo += "名称　　　　　     单价  数量<BR>";
            orderInfo += "--------------------------------<BR>";
            for (var i = 0;i<this.orderPrintList.list.length;i++) {
              // switch(this.orderPrintList.list[i].goodsName.length){
              //   case 7:
              //     orderInfo += this.orderPrintList.list[i]['goodsName']+"  "+this.orderPrintList.list[i]['price']+"      "+this.orderPrintList.list[i]['count']+"<BR>";
              //     break;
              //   case 6:
              //     orderInfo += this.orderPrintList.list[i]['goodsName']+"   "+this.orderPrintList.list[i]['price']+"  "+this.orderPrintList.list[i]['count']+"<BR>";
              //   case 5:
              //     orderInfo += this.orderPrintList.list[i]['goodsName']+"   "+this.orderPrintList.list[i]['price']+"  "+this.orderPrintList.list[i]['count']+"<BR>";

              // }
              if(this.orderPrintList.list[i].goodsName.length==7){
                 if(this.orderPrintList.list[i]['price'].length==4){
                   orderInfo += this.orderPrintList.list[i]['goodsName']+"        "+this.orderPrintList.list[i]['price']+"   "+this.orderPrintList.list[i]['count']+"<BR>";
                 }else{
                   orderInfo += this.orderPrintList.list[i]['goodsName']+"       "+this.orderPrintList.list[i]['price']+"   "+this.orderPrintList.list[i]['count']+"<BR>";
                 }
              }else if(this.orderPrintList.list[i].goodsName.length==8){
                    if(this.orderPrintList.list[i]['price'].length==4){
                   orderInfo += this.orderPrintList.list[i]['goodsName']+"      "+this.orderPrintList.list[i]['price']+"   "+this.orderPrintList.list[i]['count']+"<BR>";
                 }else{
                   orderInfo += this.orderPrintList.list[i]['goodsName']+"     "+this.orderPrintList.list[i]['price']+"   "+this.orderPrintList.list[i]['count']+"<BR>";
                 }
              }else if(this.orderPrintList.list[i].goodsName.length==9){
                    if(this.orderPrintList.list[i]['price'].length==4){
                   orderInfo += this.orderPrintList.list[i]['goodsName']+"     "+this.orderPrintList.list[i]['price']+"   "+this.orderPrintList.list[i]['count']+"<BR>";
                 }else{
                   orderInfo += this.orderPrintList.list[i]['goodsName']+"    "+this.orderPrintList.list[i]['price']+"   "+this.orderPrintList.list[i]['count']+"<BR>";
                 }
              }else if(this.orderPrintList.list[i].goodsName.length==10){
                    if(this.orderPrintList.list[i]['price'].length==4){
                   orderInfo += this.orderPrintList.list[i]['goodsName']+"    "+this.orderPrintList.list[i]['price']+"   "+this.orderPrintList.list[i]['count']+"<BR>";
                 }else{
                   orderInfo += this.orderPrintList.list[i]['goodsName']+"   "+this.orderPrintList.list[i]['price']+"   "+this.orderPrintList.list[i]['count']+"<BR>";
                 }
              }
              else if(this.orderPrintList.list[i].goodsName.length==6){
                if(this.orderPrintList.list[i]['price'].length==4){
                   orderInfo += this.orderPrintList.list[i]['goodsName']+"          "+this.orderPrintList.list[i]['price']+"   "+this.orderPrintList.list[i]['count']+"<BR>";
                 }else{
                   orderInfo += this.orderPrintList.list[i]['goodsName']+"         "+this.orderPrintList.list[i]['price']+"   "+this.orderPrintList.list[i]['count']+"<BR>";
                 }
              }else if(this.orderPrintList.list[i].goodsName.length==5){
                if(this.orderPrintList.list[i]['price'].length==4){
                   orderInfo += this.orderPrintList.list[i]['goodsName']+"            "+this.orderPrintList.list[i]['price']+"   "+this.orderPrintList.list[i]['count']+"<BR>";
                 }else{
                   orderInfo += this.orderPrintList.list[i]['goodsName']+"           "+this.orderPrintList.list[i]['price']+"   "+this.orderPrintList.list[i]['count']+"<BR>";
                 }
              }else if(this.orderPrintList.list[i].goodsName.length==4){
                if(this.orderPrintList.list[i]['price'].length==4){
                   orderInfo += this.orderPrintList.list[i]['goodsName']+"              "+this.orderPrintList.list[i]['price']+"   "+this.orderPrintList.list[i]['count']+"<BR>";
                 }else{
                   orderInfo += this.orderPrintList.list[i]['goodsName']+"             "+this.orderPrintList.list[i]['price']+"   "+this.orderPrintList.list[i]['count']+"<BR>";
                 }
              }else if(this.orderPrintList.list[i].goodsName.length==3){
                if(this.orderPrintList.list[i]['price'].length==4){
                   orderInfo += this.orderPrintList.list[i]['goodsName']+"                "+this.orderPrintList.list[i]['price']+"   "+this.orderPrintList.list[i]['count']+"<BR>";
                 }else{
                   orderInfo += this.orderPrintList.list[i]['goodsName']+"               "+this.orderPrintList.list[i]['price']+"   "+this.orderPrintList.list[i]['count']+"<BR>";
                 }
              }else if(this.orderPrintList.list[i].goodsName.length==2){
                if(this.orderPrintList.list[i]['price'].length==4){
                   orderInfo += this.orderPrintList.list[i]['goodsName']+"                  "+this.orderPrintList.list[i]['price']+"   "+this.orderPrintList.list[i]['count']+"<BR>";
                 }else{
                   orderInfo += this.orderPrintList.list[i]['goodsName']+"                 "+this.orderPrintList.list[i]['price']+"   "+this.orderPrintList.list[i]['count']+"<BR>";
                 }
              }else{//长度为10
                 if(this.orderPrintList.list[i]['price'].length==4){
                   orderInfo += this.orderPrintList.list[i]['goodsName'].substr(0,10)+"        "+this.orderPrintList.list[i]['price']+"   "+this.orderPrintList.list[i]['count']+"<BR>";
                   orderInfo += this.orderPrintList.list[i]['goodsName'].substr(10)+"<BR>";
                 }else{
                   orderInfo += this.orderPrintList.list[i]['goodsName'].substr(0,10)+"       "+this.orderPrintList.list[i]['price']+"   "+this.orderPrintList.list[i]['count']+"<BR>";
                    orderInfo += this.orderPrintList.list[i]['goodsName'].substr(10)+"<BR>";
                 }
              }
              
            }
            orderInfo += "--------------------------------<BR>";
            orderInfo += "配送费："+this.orderPrintList.postMoney+"<BR>" ;
            orderInfo += "餐盒费："+this.orderPrintList.boxMoney+"<BR>" ;
            orderInfo += "--------------------------------<BR>";

            

            orderInfo += "<L>合计：" + this.orderPrintList.totalPay + "元</L><BR>";
            orderInfo += "<BR><BR>";
            orderInfo += "--------------------------------<BR>";

            orderInfo += "<BL>"+this.orderPrintList.userAddress+"</BL><BR>";
            orderInfo += "<BL>"+this.orderPrintList.userPhone+"</BL><BR><BR>";

            orderInfo += "<CA><C>***" + this.orderPrintList.number + "***</C></CA><BR>";
            orderInfo += "<C>打印时间："+this.orderPrintList.printtime+"</C><BR>" ;
            orderInfo += "<BR>----------<CUT>----------<BR><BR>";
             
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
    // 打印机end
    resetTab (index) {
      if (index == 0) {
          this.listLeft = true
          this.listRight = false
          this.type = index
          this.noop = 'orderList',
          this.reset()
          console.log("左边",index,this.type)
      } else {
          this.listLeft = false
          this.listRight = true
          this.type = index
          this.noop = 'returnList',
          this.reset()
          console.log("右边",index,this.type)
      }
    },
    reset () {
      this.list = []
      this.mescrollUp.page.num = 1
      this.upCallback(this.mescrollUp.page, this.mescroll)
    },
    mescrollInit (mescroll) {
	  this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
       this.$http.post('', {
          page: page.num,
          do:'shop',
          op: this.noop
       }).then(res => {
        if (res.code === 1) {
          let arr = res.data.list === '' ? [] : res.data.list
          if (page.num === 1) this.list = []
          this.list = this.list.concat(arr)
          if (this.noop == 'returnList') {
            this.status = res.data.status
          }
          this.$nextTick(() => {
            mescroll.endSuccess(res.data.list.length, true)
          })
        }
      }).catch((e) => {
        mescroll.endErr()
      })
    },
    transfer (val,orderId) {
      this.orderId = orderId
      if(val == '0'){
        this.show = true
      } else if (val == '1'){
        this.show1 = true
      } else {
        this.show2 = true
      }
    },
    onConfirm () {
      this.$http.post('', {
        do: 'shop',
        op: 'orderDada',
        type:'dada',
        orderId: this.orderId
      }).then(res => {
        if (res.code == 1) {
          this.$vux.toast.text('转单成功！')
          this.resetTab('0')
        }
      })
    },
    onConfirm1 () {
      this.$http.post('', {
        do: 'shop',
        op: 'orderDada',
        type:'',
        orderId: this.orderId
      }).then(res => {
        if (res.code == 1) {
          this.$vux.toast.text('接单成功！')
          this.resetTab('0')
        }
      })
    },
    onConfirm2 () {
      this.$http.post('', {
        do: 'shop',
        op: 'dadaConfirmOrder',
        orderId: this.orderId
      }).then(res => {
        if (res.code == 1) {
          this.$vux.toast.text('收货成功！')
          this.resetTab('0')
        }
      })
    },
    getInit () {
      this.$http.post('', {
        do: 'shop',
        op: 'index'
      }).then(res => {
        if (res.code == 1) {
          this.shop = res.data.shop
          this.autoOrder = res.data.shop.autoOrder
          this.isDada = res.data.shop.isDada
          this.orderTab0 = res.data.orderTab[0]['title']
          this.orderTab1 = res.data.orderTab[1]['title']
        }
      }) 
    },
  },
  activated () {
    
  }
}
</script>
<style  lang="less" >
 .core-nav-tab{
        // width: 100%;
        height: .9rem;
        // margin-top: .88rem;
        // background: #ffffff;
        // position: fixed;
        // // z-index: 999999;
        // border-bottom: .01rem rgba(255,255,255,1) solid;
        // box-sizing: border-box;
        // /* border-bottom: .01rem red solid; */
    }
    .vux-tab-wrap{
        width: 100%;
        position: absolute;
        top: 0;
        padding-top: 0;
    }
    .vux-tab-container{
        height: .9rem !important;
    }
    .vux-tab-container .vux-tab{
        height: .9rem !important;
        border-radius: .1rem !important;
        overflow: hidden !important;
    }
    .vux-tab .vux-tab-item{
        line-height: .9rem !important;
        font-size: .3rem !important;
        font-weight:500 !important;
        color:rgba(102,102,102,1) !important;
        // color: #fff !important;
    }
    .vux-tab .vux-tab-item.vux-tab-selected{
        font-size: .3rem !important;
        font-weight: bold !important;
        // color:rgba(217,33,33,1) !important;
        color: #1B1B1B !important;
        background: #ffffff !important;
    }
    .vux-tab .vux-tab-item{
        background: none !important;
        // background:rgba(205,205,205,1);
    }
    .nav_tab_cen{
        position: absolute;
        left: 50%;
        top: .3rem;
        width:1px;
        height:50px;
        background:rgba(238,238,238,1);
    }
    /* nav end */
    .vux-header{
        background:linear-gradient(90deg,rgba(246,86,43,1),rgba(231,27,27,1)) !important;
        border: none !important;
        .vux-header-title{
            color: #ffffff !important;
        }
    }
     #mescroll .mescroll-upwarp.mescroll-hardware{
        visibility: none !important;
        opacity: 0 !important;
    }
</style>
<style scoped lang="less">
#mescroll{
    width: 100%;
    position: absolute;
    top: .88rem;
    bottom: 0;
    height: auto;
}
.index{
    .index-core{
        width: 100%;
        height: 2.2rem;
        background:linear-gradient(90deg,rgba(246,86,43,1),rgba(231,27,27,1)) ;
        // margin-top: .88rem;
       .index-core-box{
            padding: 0 .2rem;
            .index-core-top{
                height: 1.4rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                // padding: 0 .2rem;
                >div{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    // height: 1.4rem;
                    img{
                        width: .88rem;
                        height: .88rem;
                        border-radius:50%;
                        overflow: hidden;
                        margin-left: .3rem;
                        margin-right: .2rem;
                    }
                    span{
                        font-size: .32rem;
                        font-weight:bold;
                        color: #ffffff;
                    }
                }
                >img{
                    width: .42rem;
                    height: auto;
                }
            }
            .core-nav-tab{
                height: 1rem;
                background: #ffffff;
                position: relative;
                top: .3rem;
                border-radius: .1rem ;
                overflow: hidden;
                // margin: 0 .2rem;
            }
            .core-tab-list{
                // min-height: 1rem;
                background: #ffffff;
                border-radius: .1rem;
                margin-top: .6rem;
                padding: 0 .2rem;
                margin-bottom: 1.88rem;
                .search-box{
                  height: 1.1rem;
                  overflow: hidden;
                  >div{
                    margin-top: .2rem;
                    height: .7rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #eeeeee;
                    border-radius: .35rem;
                    >img{
                      width: .32rem;
                      height: .32rem;
                      margin-right: .15rem;
                    }
                    >input{
                      height: .5rem;
                      border: none;
                      outline: none;
                      background: none;
                    }
                    >span{
                      color: #999999;
                    }
                  }

                }
                >.tab-list-tit{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 1rem;
                    // border-bottom: 1px solid #eeeeee;
                    >div{
                        width: 33%;
                        text-align: center;
                        font-size:.3rem;
                        font-weight:500;
                        color:rgba(27,27,27,1);
                    }
                }
                .tab-list-tit1{
                    >div:nth-child(1){
                        width: 30%;
                    }
                    >div:nth-child(2){
                        width: 20%;
                    }
                    >div:nth-child(3){
                        width: 30%;
                    }
                    >div:nth-child(4){
                        width: 20%;
                    }
                }
                .tab-list-core{
                    // min-height: 5.5rem;
                    .tab-list-tit{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        height: 1rem;
                        border-bottom: 1px solid #eeeeee;
                        >div{
                            width: 33%;
                            text-align: center;
                            font-size: .26rem;
                            font-weight:500;
                            color:rgba(102,102,102,1);
                        }
                    }
                    .tab-list-tit.tab-list-tit-r{
                      height: 1.7rem;
                      >img:nth-child(2){
                        width:2rem;
                        height:1.2rem;
                        border-radius: .05rem;
                      }
                    }
                    .tabList{
                      border-bottom: 1px solid #eeeeee;
                      .list-top{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        height: 1rem;
                        text-align: center;
                        font-size: .26rem;
                        color:rgba(102,102,102,1);
                        >div{
                          overflow: hidden;
                          white-space: nowrap;
                          text-overflow: ellipsis;
                        }
                        >div:nth-child(1){
                          width: 30%;
                        }
                        >div:nth-child(2){
                            width: 20%;
                        }
                        >div:nth-child(3){
                            width: 30%;
                        }
                        >div:nth-child(4),
                        .list-bgcol{
                            width: 20%;
                            display: flex;
                            justify-content: flex-end;
                            >div{
                              color:#E71C1B;
                              width:.8rem;
                              height:.5rem;
                              border:1px solid rgba(231,28,27,1);
                              border-radius:.1rem;
                              line-height: .5rem;
                              text-align: center;
                            }
                        }
                      }
                      .list-bottom{
                        height: .9rem;
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        >div{
                          margin-left: .3rem;
                          // width:.88rem;
                          padding: 0 .1rem;
                          height:.44rem;
                          border-radius:.1rem;
                          line-height: .44rem;
                          text-align: center;
                          color: #ffffff;
                        }
                        .status {
                          background:rgba(231,28,27,1);
                        }
                        .status1 {
                          background:rgba(153,153,153,1);
                        }
                      }
                    }
                }
            }
        }
    }
}
</style>
