<template>
  <div class="index" > 
    <x-header slot="header" :left-options="{showBack: false}" :style="{paddingTop: statusH + 'rem',height:statusH + 0.88 +'rem'}" >
      <a @click="goBack()" slot="left" class="backBox">
          <!-- <i class="iconfont icon-back"></i> -->
          </a>
      商家管理
      <!-- <a @click="jumpTo('/experienceDetail')" slot="right">明细</a> -->
    </x-header>
<div>
<mescroll-vue :style="{paddingTop: statusH + 'rem'}" class="common-warp mescroll"  id="mescroll" ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
    <div class="warp"  id="d26">
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
                <div class="index-core-nav">
                    <div class="core-nav-box" @click="jumpNav(index)" v-for="(item,index) in navList" :key="index">
                        <img v-if="index==0" src="./../../../assets/img/bkSupporter/idnexicon1.png" alt="">
                        <img v-if="index==1" src="./../../../assets/img/bkSupporter/idnexicon2.png" alt="">
                        <img v-if="index==2" src="./../../../assets/img/bkSupporter/idnexicon3.png" alt="">
                        <img v-if="index==3" src="./../../../assets/img/bkSupporter/idnexicon4.png" alt="">
                        <img v-if="index==4" src="./../../../assets/img/bkSupporter/idnexicon5.png" alt="">
                        <img v-if="index==5" src="./../../../assets/img/bkSupporter/idnexicon6.png" alt="">
                        <p>{{item.title}}</p>
                    </div>
                </div>
                <!-- tab -->
                <div class="core-nav-tab">
                    <tab :line-width="3" custom-bar-width=".8rem" active-color="#E71C1B" default-color="#333" v-model="typetab" class="resultTab" >
                        <tab-item @on-item-click="resetTab(0)" >{{shopTabList1}}</tab-item>
                        <tab-item @on-item-click="resetTab(1)" >{{shopTabList2}}</tab-item>
                    </tab>
                </div>
                            <!-- list -->
                            <div class="core-tab-list" v-show="listLeft">
                                <div class="tab-list-tit tab-list-tit1">
                                    <div>用户名</div>
                                    <div>角色</div>
                                    <div>添加时间</div>
                                    <div>状态</div>
                                </div>
                                <div class="tab-list-core">
                                    <div class="tab-list-tit tab-list-tit1" v-for="(item,index) in list" :key="index">
                                        <div>{{item.username}}</div>
                                        <div>{{item.role}}</div>
                                        <div>{{item.createtime | formatDate}}</div>
                                        <div style="color:#E71C1B">{{statusInfo[item.status]}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="core-tab-list"  v-show="listRight">
                                <div class="tab-list-tit">
                                    <div>负责人</div>
                                    <div>提现方式</div>
                                    <div>账号信息</div>
                                </div>
                                <div class="tab-list-core">
                                    <div class="tab-list-tit" v-for="(item,index) in list" :key="index">
                                        <div>{{item.cname}}</div>
                                        <div>{{withType[item.withType]}}</div>
                                        <div>{{item.username}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            <!-- <div style="height:1.88rem"></div> -->
                    </mescroll-vue>
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
  name: 'home',
  components: {TabItem,Tab,TabItem,Popup,MescrollVue,formatDate},
  data () {
    return {
      statusH:  utils.storage.get('homestatusH'),
      typetab: 0 ,
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
        //   toTop: {
        //     //回到顶部按钮
        //     src: "./../../../assets/back_top.png",
        //     offset: 1000 
        //   },
          empty: {
            warpId: "d26", 
            icon: "./static/img/auth/kong.png",
            tip: "暂无相关数据~" //提示
          }
      },
      list:[],
      withType:[],
      statusInfo:[],
      type:0,
      navList:[],
      shopTabList:[],
      shopTabList1:'',
      shopTabList2:'',
      shop:[],
      noop:'usersList'
    }
  },
  inject:['reload'],
  filters: {
    formatDate (time) {
      time = time * 1000
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  created () {
    // let size = (document.documentElement.clientWidth / 7.5)
    // this.statusH = (api.safeArea.top / size)
  },
  mounted () {
    //   this.shuaxin()
    //   console.log("********",utils.storage.get('APPClass'))
    //   this.getInit()
    //   this.getH()
    //    alert(3)
  },
  methods: {
    shuaxin () {
        if (utils.storage.get('APPClassid')=='1'){
            this.reload();
            utils.storage.set('APPClassid', '2')
            console.log("********55555********")
        }
    },
    getH () {
        // let size = (document.documentElement.clientWidth / 7.5)
        // this.statusH = (api.safeArea.top / size)
    },
    resetTab (index) {
      if (index == 0) {
          this.listLeft = true
          this.listRight = false
          this.type = index
          this.noop = 'usersList'
          this.reset()
          console.log("左边",index,this.type)
      } else {
          this.listLeft = false
          this.listRight = true
          this.type = index
          this.noop = 'shopBank'
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
        // alert('shangjia')
       this.$http.post('', {
          page: page.num,
          do: 'shop',
          op: this.noop
       }).then(res => {
        if (res.code === 1) {
          if (this.noop == 'shopBank') {
            let arr = res.data.list === '' ? [] : res.data.list
            if (page.num === 1) this.list = []
            this.list = this.list.concat(arr)
            this.withType = res.data.withType
            this.$nextTick(() => {
                mescroll.endSuccess(res.data.list.length, true)
            })
          } else {
            let arr = res.data.list === '' ? [] : res.data.list
            if (page.num === 1) this.list = []
            this.list = this.list.concat(arr)
            this.statusInfo = res.data.statusInfo
            this.$nextTick(() => {
                mescroll.endSuccess(res.data.list.length, true)
            })
          }
        }
      }).catch((e) => {
        mescroll.endErr()
      })
    },
    // 初始化数据
    getInit () {
        this.$http.post('', {
            do: 'shop',
            op: 'index'
        }).then(res => {
            if (res.code == 1) {
                this.navList = res.data.nav 
                this.shopTabList = res.data.shopTab
                this.shopTabList1 = this.shopTabList[0]['title']
                this.shopTabList2 = this.shopTabList[1]['title']
                this.shop = res.data.shop
            }
        }) 
        // let size = (document.documentElement.clientWidth / 7.5)
        // this.statusH = (api.safeArea.top / size)
    },
    // nav
    jumpNav (val) {
        if (val == 0) {
            this.jumpTo('/companyData')
        } else if (val == 1) {
            this.jumpTo('/orderStatistics')
        } else if (val == 2) {
            this.jumpTo('/addBypassAccount')
        } else if (val == 3) {
            this.jumpTo('/addCloseAccount')
        } else if (val == 4) {
            this.jumpTo('/merchantCloseApply')
        } else {
            this.jumpTo('/closeRecord')
        }
    }
  },
  activated () {
    this.shuaxin()
    this.getInit()
    this.getH()
    let size = (document.documentElement.clientWidth / 7.5)
    this.statusH = (api.safeArea.top / size)
    if(utils.storage.get('homestat') == '1'){
        utils.storage.set('homestat','2')
        location.reload()
    }
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
        height: 5rem;
        background:linear-gradient(90deg,rgba(246,86,43,1),rgba(231,27,27,1)) ;
        // margin-top: .88rem;
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
            .index-core-nav{
                height: 2.8rem;
                border-radius: .1rem;
                background: #ffffff;
                box-shadow:0px 2px 18px 0px rgba(153,153,153,0.2);
                display: flex;
                flex-wrap: wrap;
                .core-nav-box{
                    width: 33%;
                    height: 1.4rem;
                    text-align: center;
                    img{
                        width: .55rem;
                        height: .55rem;
                        margin-top: .25rem;
                    }
                }
            }
            .core-nav-tab{
                height: 1rem;
                background: #ffffff;
                position: relative;
                top: .3rem;
                border-radius: .1rem;
                overflow: hidden;
               
            }
            .core-tab-list{
                // min-height: 1rem;
                background: #ffffff;
                border-radius: .1rem;
                margin-top: .6rem;
                padding: 0 .2rem;
                margin-bottom: 1.88rem;
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
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
                .tab-list-tit1{
                    >div{
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    >div:nth-child(1){
                        width: 20%;
                    }
                    >div:nth-child(2){
                        width: 20%;
                    }
                    >div:nth-child(3){
                        width: 40%;
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
                    .tab-list-tit1{
                        >div:nth-child(1){
                            width: 20%;
                        }
                        >div:nth-child(2){
                            width: 20%;
                        }
                        >div:nth-child(3){
                            width: 40%;
                        }
                        >div:nth-child(4){
                            width: 20%;
                        }
                    }
                }
            }
        }
    }
}
</style>
