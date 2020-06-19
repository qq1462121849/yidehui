<template>
  <div class="closeRecord">
    <x-header
      slot="header"
      :left-options="{showBack: false}"
      :style="{paddingTop: statusH + 'rem',height:statusH + 0.88 +'rem'}"
    >
      <a @click="goBack()" slot="left" class="backBox" :style="{paddingTop: statusH + 'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      管理商品查询
      <!-- <a @click="jumpTo('/experienceDetail')" slot="right">明细</a> -->
    </x-header>
<mescroll-vue :style="{paddingTop: statusH + 'rem'}"  class="common-warp mescroll" id="mescroll" ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
  <div class="warp" id="d26">
    <div >
      <div style="height:.2rem;background:#f2f2f2;"></div>
      <div class="record-core-top">
        <div class="search-box">
          <div>
            <img src="./../../../assets/img/bkSupporter/search2.png" alt="">
            <!-- <span>订单号、手机号、会员编号</span> -->
            <input type="text" v-model="keyword" placeholder="请输入商品或商家名称">
          </div>
        </div>
        <div class="core-top-c">
          <div>
            <!-- <span>支付状态:</span> -->
            <checklist :title="'支付状态:'" :options="status" v-model="statusValue" @on-change="xuanze2"></checklist>  
          </div>
        </div>
        <div class="core-top-b">
          <div @click="searched()">
            <img src="./../../../assets/img/bkSupporter/search1.png" alt="">
            搜索
          </div>
        </div>
      </div>

      <div style="position: relative;" class="RecordCore">
        <div class="RecordCore-tit RecordCore-title">
          <div class="core-tit3">商品名称</div>
          <div class="core-tit3">商家名称</div>
          <div class="core-tit1">商品价格</div>
        </div>
            <div class="RecordCore-tit-body">
              <div class="RecordCore-tit RecordCore-title1" v-for="(item,index) in list" :key="index">
                <div class="core-tit3 suojin">{{item.goodsName}}</div>
                <div class="core-tit3 suojin">{{item.shopInfo.title}}</div>
                <div class="core-tit1">{{item.ex_price}}￥</div>
                <div class="core-tit1 tit1Box" @click="jumpTo('/merGoodsDetailB?id='+item.id)">详情</div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </mescroll-vue>
  </div>
</template>

<script>
import MescrollVue from "mescroll.js/mescroll.vue";
import * as apiHttp from "../../../api/index";
import { Confirm, Tab, TabItem, Popup ,Datetime,PopupPicker,Checklist} from "vux";
export default {
  name: "orderScreen",
  components: { TabItem, Tab, TabItem, Popup, MescrollVue, Datetime, PopupPicker,Checklist},
  data() {
    return {
      statusH: "",
      typetab: 0,
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
        }
      },
      type: 0,
      list:[],
      status: [ '显示', '隐藏'],
      statusValue: [],
      statusValueList: [],
      keyword: ''
    };
  },
  created() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  },
  mounted() {},
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
      this.statusValueList = []
      if (!this.keyword && this.statusValue.length=='0'){
        this.$nextTick(() => {
          mescroll.endSuccess(this.list.length, true);
        });
        return
      }
      if (this.statusValue.length!='0') {
        for (var i=0;i<this.statusValue.length;i++) {
          console.log(this.statusValue[i])
          if (this.statusValue[i]=='显示') {
            this.statusValueList.push('1')
          } else {
            this.statusValueList.push('0')
          }
        }
        console.log(this.statusValueList)
        // this.statusValueList = '"' + this.statusValueList + '"'
        // this.statusValueList =  this.statusValueList
        var ll = ''
        for (var i = 0; i<this.statusValueList.length; i++) {
          if (this.statusValueList.length>1) {
            if (i != this.statusValueList.length-1) {
              ll += this.statusValueList[i] + ','
            } else {
              ll += this.statusValueList[i] 
            }
          } else {
            ll += this.statusValueList[i] 
          }
        }
        console.log(ll)

      } 
      this.$http
        .post("", {
          page: page.num,
          do: 'platform',
          op: 'goodsList',
          keyword: this.keyword,
          status: ll,
        })
        .then(res => {
          if (res.code === 1) {
            let arr = res.data.list === "" ? [] : res.data.list;
            if (page.num === 1) this.list = [];
            this.list = this.list.concat(arr);
            this.$nextTick(() => {
              mescroll.endSuccess(res.data.list.length, true);
            });
          }
        })
        .catch(e => {
          mescroll.endErr();
        });
    },
    // 搜索
    searched () {
      this.list = []
      this.mescrollUp.page.num = 1
      this.upCallback(this.mescrollUp.page, this.mescroll)
    },
    // 类型
    xuanze2 (val) {
      // console.log('change', val)
      // console.log(this.statusValue)
    } 
  },
  activated() {}
};
</script>
<style lang="less" >
#mescroll{
    width: 100%;
    position: absolute;
    top: .88rem;
    bottom: 0;
    height: auto;
}
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
  // 时间选择器
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
  // 选择类型
  .weui-cell.vux-tap-active.weui-cell_access{
    display: flex;
    // height: .9rem;
    align-items: center;
    .weui-cell__hd{
      margin-right: .3rem;
      margin-left: .3rem;
    }
  }
  .vux-cell-box:not(:first-child):before{
    left: 0 !important;
  }
  // 多选
  .weui-cells.weui-cells_checkbox{
    display: flex;
    flex-wrap: wrap;
    font-size: .26rem;
  }
  .weui-cells:before{
    border-top: none !important;
  }
  .weui-cells:after{
    border-bottom: none !important;
  }
  .weui-cell:before{
    border-top: none !important;
  }
  .weui-cells__title{
    padding-left: 0px !important;
  }
  .weui-cell{
    // padding-right:none !important;
    padding: 10px 0 !important;
  }
  #mescroll .mescroll-upwarp.mescroll-hardware{
        visibility: none !important;
        opacity: 0;
    }
</style>
<style scoped lang="less">
.closeRecord{
  .record-core-top{
    // height: 4.2rem;
    background: #ffffff;
    padding: 0 .3rem;
    .core-top-t{
      display: flex;
      justify-content: space-between;
      >div{
        width: 50%;
        >div:nth-child(1){
          height: .74rem;
          line-height: .74rem;
        }
        .core-top-le{
          width:3.35rem;
          height:.6rem;
          background:rgba(238,238,238,1);
          border-radius: .05rem;
          display: flex;
          align-items: center;
          // justify-content: space-between;
          >input{
            height: .4rem;
            border: none;
            outline: none;
            padding-left: .2rem;
            background: none;
          }
          >img{
            width: .25rem;
            height: .26rem;
            margin: 0 .15rem;
          }
          >div{
              display: flex;
              align-items: center;
              // justify-content: space-between;
          }
        }
      }
    }
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
          font-size: .28rem;
        }
        >span{
          color: #999999;
        }
      }

    }
    .core-top-b{
      display: flex;
      justify-content: center;
      >div{
        width:2.54rem;
        height:.72rem;
        background:linear-gradient(90deg,rgba(246,86,43,1),rgba(231,27,27,1));
        border-radius: .1rem;
        margin-top: .36rem;
        margin-bottom: .15rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        font-size:.3rem;
        font-weight:500;
        >img{
          width: .28rem;
          height: .28rem;
          margin-right: .15rem;
        }
      }
    }
  }
  .RecordCore{
    padding: .2rem .25rem 0 .25rem;
    .RecordCore-tit{
      height: 1rem;
      display: flex;
      align-items: center;
      background: #ffffff;
      padding: 0 .1rem;
      .core-tit1{
        width: 20%;
        text-align: center;
      }
      .core-tit2{
        width: 40%;
        text-align: center;
      }
      .core-tit3{
        width: 30%;
        text-align: center;
      }
      .suojin{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .RecordCore-title{
      border-radius: .1rem .1rem 0 0;
      >div{
        font-size:.3rem;
        font-weight:500;
        color:rgba(27,27,27,1);
      }
    }
    .RecordCore-tit-body{
      border-radius: 0 0 .1rem .1rem ;
      overflow: hidden;
      .RecordCore-title1{
        >div{
          font-size:.26rem;
          font-weight:500;
          color:rgba(102,102,102,1);
        }
        .tit1Box{
          width:1rem;
          height:.5rem;
          background:rgba(255,255,255,1);
          border:1px solid rgba(231,28,27,1);
          border-radius:.1rem;
          text-align: center;
          line-height: .5rem;
          color: rgba(231,28,27,1);
        }
      }
    }
  }
}
</style>
