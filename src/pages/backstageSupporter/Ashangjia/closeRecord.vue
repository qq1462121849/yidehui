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
      结算申请记录
      <!-- <a @click="jumpTo('/experienceDetail')" slot="right">明细</a> -->
    </x-header>
    <div style="margin-top: .88rem;"  :style="{paddingTop: statusH + 'rem'}">
      <div style="height:.2rem;background:#f2f2f2;"></div>
      <div class="record-core-top">
        <div class="core-top-t">
          <div>
            <div>申请类型</div>
            <div class="core-top-le">
              <popup-picker title="请选择" :data="list1" v-model="withType" 
              @on-change="onChange" ></popup-picker>
            </div>
          </div>
          <div>
            <div>选择时间</div>
            <div class="core-top-le">
              <img src="./../../../assets/img/bkSupporter/time1.png" alt="">
              <div>
                <datetime  v-model="time1" @on-change="change1" ></datetime>
                <span>-</span>
                <datetime  v-model="time2" @on-change="change2" ></datetime>
              </div>
            </div>
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
          <div class="core-tit1">申请人</div>
          <div class="core-tit3">电话号码</div>
          <div class="core-tit3">金额</div>
        </div>
        <mescroll-vue class="common-warp mescroll" id="mescroll" ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <div class="warp" id="d26">
            <div class="RecordCore-tit-body">
              <div class="RecordCore-tit RecordCore-title1" v-for="(item,index) in list" :key="index">
                <div class="core-tit1">{{item.cname}}</div>
                <div class="core-tit3">{{item.mobile}}</div>
                <div class="core-tit3">{{item.price}}</div>
                <div class="core-tit1 tit1Box" @click="jumpTo('/closeDetail?id='+item.id)">详情</div>
              </div>
            </div>
          </div>
        </mescroll-vue>
      </div>
    </div>
  </div>
</template>

<script>
import MescrollVue from "mescroll.js/mescroll.vue";
import * as apiHttp from "../../../api/index";
import { Confirm, Tab, TabItem, Popup ,Datetime,PopupPicker} from "vux";
export default {
  name: "closeRecord",
  components: { TabItem, Tab, TabItem, Popup, MescrollVue, Datetime, PopupPicker},
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
      time1:'',
      time2:'',
      withType: ['支付宝'],
      list1 : [['支付宝', '银行卡']],
      wTd:'',
      list:[]
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
      this.$http.post("", {
          page: page.num,
          do: 'shop',
          op: 'withdrawList'
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
      if (this.withType == '支付宝') {
        this.wTd = 1
      } else {
        this.wTd = 2
      }
      if (!this.time1) {
        this.$vux.toast.text('请选择开始时间')
      } else if (!this.time2) {
        this.$vux.toast.text('请选择结束时间')
      } else {
        this.list = []
        this.$http.post("", {
            do: 'shop',
            op: 'withdrawList',
            withType: this.wTd,
            starttime: this.time1 + " 00:00",
            endtime: this.time2 + " 23:59"
        }).then(res => {
          if (res.code == 1) {
            this.list = res.data.list
          }
        })
      }
    },
    // 类型选择
    onChange (val) {
      console.log(this.withType)
    },
    // 选择时间
    change1 (val) {
      console.log(val)
      console.log(this.time1)
    },
    change2 (val) {
      console.log(val)
      console.log(this.time2)
      if (this.time2<this.time1) {
        this.$vux.toast.text('结束时间不能小于开始时间')
        this.time2 = ''
      }
    },
  },
  activated() {}
};
</script>
<style lang="less" >
#mescroll{
    width: 100%;
    position: relative;
    top: 0rem;
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
   #mescroll .mescroll-upwarp.mescroll-hardware{
        visibility: none !important;
        opacity: 0 !important;
    }

</style>
<style scoped lang="less">
.closeRecord{
  .record-core-top{
    height: 2.75rem;
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
    .core-top-b{
      display: flex;
      justify-content: center;
      >div{
        width:2.54rem;
        height:.72rem;
        background:linear-gradient(90deg,rgba(246,86,43,1),rgba(231,27,27,1));
        border-radius: .1rem;
        margin-top: .36rem;
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
      >div{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
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
