<template>
  <div class="index" >
      <div class="index-topBox" :style="{paddingTop: statusH + 'rem'}">
        <img @click="goBack" class="leftPic" src="./../../../assets/img/bkSupporter/goback.png" alt="">
        <div>
          <img @click="searched()" src="./../../../assets/img/bkSupporter/search2.png" alt="">
          <input type="text" v-model="keyword1" placeholder="订单号、客户姓名、电话">
        </div>
        <!-- <span>搜索</span> -->
        <img class="rightPic" @click="openWin" src="./../../../assets/img/bkSupporter/orderSearch.png" alt="">
      </div>
      <div class="index-core" >
        <div class="index-core-box">
          <div>
            <mescroll-vue :style="{paddingTop: statusH + 'rem'}" class="common-warp mescroll"  id="mescroll" ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
              <div class="warp"  id="d26">
                <div class="core-tab-list"  v-if="list.length!='0'">
                  <div class="tab-list-tit tab-list-tit1" >
                    <div>姓名</div>
                    <div>客户电话</div>
                    <div>商家名称</div>
                    <div></div>
                  </div>
                  <div class="tab-list-core">
                    <div class="tab-list-tit tab-list-tit1" v-for="(item,index) in list" :key="index">
                      <div>{{item.username}}</div>
                      <div>{{item.mobile}}</div>
                      <div>{{item.shopInfo.title}}</div>
                      <div><div @click="jumpTo('/merGoodsDetailC?id='+item.id)">详情</div></div>
                    </div>
                  </div>
                </div>
              </div>
            </mescroll-vue>
          </div>
        </div>
        <div style="height:1.88rem"></div>
      </div>
      <!-- 弹窗 -->
      <div class="searchWin" v-show="winShow" :style="{paddingTop: statusH + 'rem'}">
        <div class="searchWin-bg"></div>
        <div class="searchWin-core" :style="{marginTop: .2+statusH + 'rem'}"> 
          <div>
            <div class="wincoreBOX">
              <div class="Win-core-top"></div>
              <div class="Win-core-body">
                <div class="Core-top">更多搜索条件</div>
                <div class="Core-cen"> 
                  <div class="Core-cen-tit">商家名称</div>
                  <input type="text" v-model="keyword1" placeholder="请输入商家名称">
                  <div class="jiange"></div>
                  <div class="Core-cen-tit">支付方式</div>
                  <div class="pay-box">
                    <div :class="{'pay-bor-col' : tabval.indexOf(item.type)!=-1}" 
                    v-for="(item,index) in payType" :key="index"
                    @click="payWay(item.type)">{{item.value}}</div>
                  </div>
                  <div class="Core-cen-tit">支付状态</div>
                  <div class="pay-box2">
                    <div :class="{'pay-bor-col':statusVal.indexOf(item.type)!=-1}"
                     v-for="(item,index) in statusValListL" :key="index"
                    @click="paystatus(item.type)">{{item.val}}</div>
                  </div>
                  <div class="Core-cen-tit">下单时间</div>
                  <div class="core-top-le">
                    <img src="./../../../assets/img/bkSupporter/time1.png" alt="">
                    <div>
                      <datetime  v-model="time1" @on-change="change1" ></datetime>
                      <span>-</span>
                      <datetime  v-model="time2" @on-change="change2" ></datetime>
                    </div>
                </div>
                <div class="jiange"></div>
                <div class="Core-cen-btn">
                  <div @click="empty()">清除状态</div>
                  <div @click="searched()">确定</div>
                </div>
              </div>
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
import { Confirm, Tab, TabItem, Popup,Datetime } from 'vux'
export default {
  name: 'applyForsearch',
  components: {TabItem,Tab,TabItem,Popup,MescrollVue,Datetime},
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
          toTop: {
            //回到顶部按钮
            src: "./../../../assets/back_top.png",
            offset: 1000 
          },
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
      type:0,
      winShow: false,
      tabval:[], // 支付方式
      tabvalList:'',
      statusValListL:[{type:'0',val:'未支付'},{type:'1',val:'已支付'}],
      statusVal:[], // 支付状态
      statusValList:'',
      time1:'',
      time2:'',
      starttime:'',
      endtime:'',
      payType: [],
      payStatus: [],
      keyword1:''
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
        do: 'platform',
        op: 'orderList'
       }).then(res => {
          if (res.code == 1) {
            this.payType = res.data.payType
            this.payStatus = res.data.payStatus
          }
       })
    },
    searched () {
      this.list = []
      this.mescrollUp.page.num = 1
      this.upCallback(this.mescrollUp.page, this.mescroll)
    },
    mescrollInit (mescroll) {
	  this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      if (!this.keyword1 && this.tabval.length=='0'&& this.statusVal.length=='0' && !this.time1 && !this.time2){
        this.$nextTick(() => {
          mescroll.endSuccess(this.list.length, true);
        });
        return
      }
      let tabli = '/'+this.tabval
      let reg = new RegExp('/');
      this.tabvalList = tabli.replace(reg,"");

      let statusV = '/'+this.statusVal
      let ree = new RegExp('/');
      this.statusValList = statusV.replace(ree,"");
      if (this.time1) {
        this.starttime = this.time1 + " 00:00"
      }
      if (this.time2) {
        this.endtime = this.time2 + " 23:59"
      }
      this.$http.post('', {
        page: page.num,
        do: 'platform',
        op: 'orderList',
        keyword: this.keyword1,
        starttime: this.starttime,
        endtime: this.endtime,
        payType: this.tabvalList,
        payStatus: this.statusValList
      }).then(res => {
      if (res.code === 1) {
        let arr = res.data.list === '' ? [] : res.data.list
        if (page.num === 1) this.list = []
        this.list = this.list.concat(arr)
        this.winShow = false
        this.$nextTick(() => {
          mescroll.endSuccess(res.data.list.length, true)
        })
      }
      }).catch((e) => {
        mescroll.endErr()
      })
    },
    payWay (val) {
      // this.tabval = val
      // console.log(this.tabval.indexOf(val))
      if (this.tabval.indexOf(val)==-1) {
        this.tabval.push(val)
      } else {
        let index = this.tabval.indexOf(val)
        this.tabval.splice(index,1)
      }
      // console.log(this.tabval)
    },
    paystatus (val) {
      if (this.statusVal.indexOf(val)==-1) {
        this.statusVal.push(val)
      } else {
        let index = this.statusVal.indexOf(val)
        this.statusVal.splice(index,1)
      }
      // console.log(this.statusVal)
    },
    // 选择时间
    change1 (val) {
      // console.log(val)
      // console.log(this.time1)
    },
    change2 (val) {
      // console.log(val)
      // console.log(this.time2)
    },
    empty () {
      this.keyword1 = ''
      this.tabval = []
      this.statusVal = []
      this.time1 = ''
      this.time2 = ''
      this.starttime = ''
      this.endtime = ''
    },
    openWin () {
      this.winShow = !this.winShow 
    }
  },
  activated () {

  }
}
</script>
<style  lang="less" >
 // .core-nav-tab{
    //     width: 100%;
    //     height: .88rem;
    //     // margin-top: .88rem;
    //     background: #ffffff;
    //     position: fixed;
    //     // z-index: 999999;
    //     border-bottom: .01rem rgba(255,255,255,1) solid;
    //     box-sizing: border-box;
    //     /* border-bottom: .01rem red solid; */
    // }
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
    .vux-cell-primary{
    height: .4rem !important;
   width: 1rem !important;
    border: 1px solid rgba(246,86,43,.4);
    border-radius: .1rem;
    font-size: .18rem;
    .vux-cell-value{
      display: flex;
      justify-content: center;
      align-items: center;
      height: .4rem !important;
    }
  }
   #mescroll .mescroll-upwarp.mescroll-hardware{
        visibility: none !important;
        opacity: 0;
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
  overflow: hidden;
  .index-topBox{
    width: 100%;
    height: .88rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background:linear-gradient(90deg,rgba(246,86,43,1),rgba(231,27,27,1)) ;
    // padding: 0 .3rem;
    position: fixed;
    top: 0;
    z-index: 999;
    >div{
      width: 5.2rem;
      height: .7rem;
      display: flex;
      // justify-content: center;
      align-items: center;
      background: #eeeeee;
      border-radius: .35rem;
      >img{
        width: .32rem;
        height: .32rem;
        margin: 0 .3rem ;
      }
      >input{
        height: .5rem;
        border: none;
        outline: none;
        background: none;
        font-size: .28rem;
      }
    }
    >span{
      color: #ffffff;
      font-size:.3rem;
      font-weight:500;
      margin-left: .3rem;
    }
    .leftPic{
      height: .32rem;
      margin-left: .3rem;
    }
    .rightPic{
      width: .42rem;
      height: .42rem;
      margin-right: .5rem;
    }
  }
    .index-core{
        width: 100%;
        // height: 2.2rem;
        margin-top: .2rem;
       .index-core-box{
            padding: 0 .2rem;
            .index-core-top{
                height: 1.4rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
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
            }
            .core-tab-list{
                // min-height: 1rem;
                background: #ffffff;
                border-radius: .1rem;
                margin-top: .2rem;
                padding: 0 .2rem;
                // margin-bottom: .88rem;
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
                        // width: 33%;
                        text-align: center;
                        font-size:.3rem;
                        font-weight:500;
                        color:rgba(27,27,27,1);
                    }
                }
                .tab-list-tit1{
                    >div{
                      width: 25%;
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
                    .tab-list-tit1{
                        >div{
                          overflow: hidden;
                          white-space: nowrap;
                          text-overflow: ellipsis;
                        }
                        >div:nth-child(1){
                            width: 25%;
                        }
                        >div:nth-child(3){
                            width: 25%;
                        }
                        >div:nth-child(2){
                            width: 25%;
                        }
                        >div:nth-child(4){
                            width: 25%;
                            display: flex;
                            justify-content: center;
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
                }
            }
        }
    }
    .searchWin{
      width: 100%;
      height: 100%;
      position: fixed;
      top: .88rem;
      z-index: 555;
      .searchWin-bg{
        background: rgba(0,0,0,.5);
        width: 100%;
        height: 100%;
      }
      .searchWin-core{
        position: fixed;
        top: .88rem;
        z-index: 666;
        width: 100%;
        >div{
          display: flex;
          flex-direction: row-reverse;
          width: 100%;
          .wincoreBOX{
            display: flex;
            flex-direction: column;
            flex-wrap: wrap-reverse;
            .Win-core-top{
              width: 0;
              height: 0;
              border-left: .2rem solid transparent;
              border-right: .2rem solid transparent;
              border-bottom: .3rem solid #FFFFFF;
              margin-right: .55rem;
            }
            .Win-core-body{
              width: 5.5rem;
              min-height: 8.45rem;
              background: #ffffff;
              border-radius: .1rem;
              margin-right: .2rem;
              .Core-top{
                width: 100%;
                height: .77rem;
                line-height: .77rem;
                text-align: center;
                font-size:.26rem;
                font-weight:500;
                border-bottom: 1px solid rgba(238,238,238,1);
              }
              .Core-cen{
                padding: 0 .29rem;
                .Core-cen-tit{
                  height: .72rem;
                  line-height: .72rem;
                  font-size:.24rem;
                  font-weight:500
                }
                >input{
                  width:4.7rem;
                  height:.6rem;
                  background:rgba(238,238,238,1);
                  border-radius:.06rem;
                  border: none;
                  outline: none;
                  font-size: .22rem;
                  font-size: 400;
                  color: #666666;
                  padding-left: .2rem;
                }
                .jiange{
                  width: 100%;
                  height: .2rem;
                  border-bottom: 1px solid rgba(238,238,238,1);
                }
                .pay-box{
                  display: flex;
                  justify-content: space-between;
                  flex-wrap: wrap;
                  >div{
                    width:1.4rem;
                    height:.6rem;
                    background: rgba(238,238,238,1);
                    border: 1px solid rgba(238,238,238,1);
                    border-radius:.06rem;
                    text-align: center;
                    line-height: .6rem;
                    margin-bottom: .2rem;
                  }
                  .pay-bor-col{
                    background:rgba(255,245,245,1);
                    border:1px solid rgba(230,20,11,1);
                    }
                }
                .pay-box2{
                  display: flex;
                  flex-wrap: wrap;
                  >div{
                    width:1.4rem;
                    height:.6rem;
                    background: rgba(238,238,238,1);
                    border: 1px solid rgba(238,238,238,1);
                    border-radius:.06rem;
                    text-align: center;
                    line-height: .6rem;
                    margin-bottom: .2rem;
                    margin-right: .2rem;
                  }
                  .pay-bor-col{
                    background:rgba(255,245,245,1);
                    border:1px solid rgba(230,20,11,1);
                    }
                }
                .core-top-le{
                  width:100%;
                  height:.6rem;
                  background:rgba(238,238,238,1);
                  border-radius: .05rem;
                  display: flex;
                  align-items: center;
                  >img{
                    width: .25rem;
                    height: .26rem;
                    margin: 0 .15rem;
                  }
                  >div{
                      display: flex;
                      align-items: center;
                  }
                }
                .Core-cen-btn{
                  height: 1.4rem;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  >div:nth-child(1){
                    width:2rem;
                    height:.7rem;
                    background:rgba(255,255,255,1);
                    border:1px solid rgba(231,28,27,1);
                    border-radius: .1rem;
                    text-align: center;
                    line-height: .7rem;
                    color: #E71C1B;
                    box-sizing: border-box;
                  }
                  >div:nth-child(2){
                    width:2rem;
                    height:.7rem;
                    background:linear-gradient(-90deg,rgba(246,86,43,1),rgba(231,27,27,1));
                    border-radius: .1rem;
                    text-align: center;
                    line-height: .7rem;
                    color: #ffffff;
                  }
                }
              }
            }
          }
        }
      }
    }
}
</style>
