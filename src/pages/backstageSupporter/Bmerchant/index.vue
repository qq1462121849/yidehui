<template>
  <div class="index" >
    <x-header slot="header" :left-options="{showBack: false}" :style="{paddingTop: statusH + 'rem',height:statusH + 0.88 +'rem'}" >
      <a @click="goBack()" slot="left" class="backBox">
          <!-- <i class="iconfont icon-back"></i> -->
          </a>
      商品管理
      <!-- <a @click="jumpTo('/experienceDetail')" slot="right">明细</a> -->
    </x-header>
<div >
  <mescroll-vue class="common-warp mescroll"  id="mescroll" ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
    <div class="warp"  id="d26">
      <div class="index-core" :style="{paddingTop: statusH + 'rem'}">
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
              <tab-item @on-item-click="resetTab(0)">{{goodsTab0}}</tab-item>
              <tab-item @on-item-click="resetTab(1)">{{goodsTab1}}</tab-item>
            </tab>
          </div>
                <!-- list -->
                <div class="core-tab-list" v-show="listLeft">
                  <div class="search-box">
                    <div @click="jumpTo('/orderScreen1B')">
                      <img src="./../../../assets/img/bkSupporter/search2.png" alt="">
                      <!-- <input type="text" placeholder="输入商品名称进行查询"> -->
                      <span>输入商品名称进行查询</span>
                    </div>
                  </div>
                  <div class="tab-list-tit tab-list-tit1" v-if="list.length!='0'">
                    <div>商品编号</div>
                    <div>商品名称</div>
                    <div>商品价格</div>
                    <div></div>
                  </div>
                  <div class="tab-list-core">
                    <div class="tab-list-tit tab-list-tit1" v-for="(item,index) in list" :key="index">
                      <div>{{item.id}}</div>
                      <div>{{item.goodsName}}</div>
                      <div>{{item.ex_price}}</div>
                      <div><div @click="jumpTo('/merGoodsDetail?id='+item.id)">详情</div></div>
                    </div>
                  </div>
                </div>
                <!--  -->
                <div class="core-tab-list"  v-show="listRight">
                  <!-- <div class="search-box">
                    <div @click="jumpTo('/orderScreen2B')">
                      <img src="./../../../assets/img/bkSupporter/search2.png" alt="">
                      <span>商品类别名称</span>
                    </div>
                  </div> -->
                  <div class="tab-list-tit" v-if="list.length!='0'">
                    <div>分类名称</div>
                    <div>图片</div>
                    <div>属性</div>
                  </div>
                  <div class="tab-list-core">
                    <!-- 去掉详情 -->
                    <!-- <div class="tab-list-tit tab-list-tit-r" v-for="(item,index) in list" :key="index" 
                    @click="jumpTo('/classifyDetail?title='+item.title+'&thumb='+item.thumb+'&status='+item.status)"> -->
                    <div class="tab-list-tit tab-list-tit-r" v-for="(item,index) in list" :key="index" >
                      <div>{{item.title}}</div>
                      <img :imgurl="item.thumb" alt="">
                      <div style="color:#E71C1B;" >{{statusInfo[item.status]}}</div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div style="height:1.88rem"></div>
            </mescroll-vue>
      </div>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as apiHttp from '../../../api/index'
import { Confirm, Tab, TabItem, Popup } from 'vux'
export default {
  name: 'home1',
  components: {TabItem,Tab,TabItem,Popup,MescrollVue},
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
      type:0,
      noop:'goodsList',
      statusInfo:[],
      shop:[],
      goodsTab:[],
      goodsTab0:'',
      goodsTab1:''
    }
  },
  created () {
    let size = (document.documentElement.clientWidth / 7.5)
    this.statusH = (api.safeArea.top / size)
  },
  mounted () {
    console.log(this.shopTitle)
    this.getInit()
  },
  methods: {
    resetTab (index) {
      if (index == 0) {
          this.listLeft = true
          this.listRight = false
          this.type = index
          this.noop = 'goodsList'
          this.reset()
          console.log("左边",index,this.type)
      } else {
          this.listLeft = false
          this.listRight = true
          this.type = index
          this.noop = 'category'
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
          do: 'shop',
          op: this.noop
       }).then(res => {
        if (res.code === 1) {
          let arr = res.data.list === '' ? [] : res.data.list
          if (page.num === 1) this.list = []
          this.list = this.list.concat(arr)
          if (this.noop == 'category') {
            this.statusInfo = res.data.statusInfo
          }
          this.$nextTick(() => {
            mescroll.endSuccess(res.data.list.length, true)
          })
        }
      }).catch((e) => {
        mescroll.endErr()
      })
    },
    getInit () {
        this.$http.post('', {
            do: 'shop',
            op: 'index'
        }).then(res => {
            if (res.code == 1) {
              this.shop = res.data.shop
              this.goodsTab = res.data.goodsTab
              this.goodsTab0 = res.data.goodsTab[0]['title']
              this.goodsTab1 = res.data.goodsTab[1]['title']
            }
        }) 
    },
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
                        width: 20%;
                    }
                    >div:nth-child(2){
                        width: 40%;
                    }
                    >div:nth-child(3){
                        width: 20%;
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
                        width: 1.2rem;
                        height:1.2rem;
                        border-radius: .05rem;
                      }
                    }
                    .tab-list-tit1{
                        >div:nth-child(1){
                            width: 20%;
                        }
                        >div:nth-child(2){
                            width: 40%;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                        >div:nth-child(3){
                            width: 20%;
                        }
                        >div:nth-child(4){
                            width: 20%;
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
}
</style>
