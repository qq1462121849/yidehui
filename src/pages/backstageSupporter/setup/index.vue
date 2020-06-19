<template>
  <div class="closeDetail">
    <x-header
      slot="header"
      :left-options="{showBack: false}"
      :style="{paddingTop: statusH + 'rem',height:statusH + 0.88 +'rem'}"
    >
      <a @click="goBack()" slot="left" class="backBox" :style="{paddingTop: statusH + 'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      设置
      <!-- <a @click="jumpTo('/experienceDetail')" slot="right">明细</a> -->
    </x-header>
    <div class="closeDetail-coreBox" :style="{paddingTop: statusH + 'rem'}">
      <div style="height:.2rem;background:#f2f2f2;"></div>
      <div class="close-core-body">
        <div class="close-core">
          <div>头像</div>
          <div class="logoBox">
            <!-- <img class="logo" :src="shop.logo" alt /> -->
            <img class="logo" v-if="shop.logo" :src="shop.logo" alt="">
            <img v-else :src="'static/libs/img/touxiang.png'" alt="">
            &nbsp;&nbsp;
            <!-- <img class="left" src="./../../../assets/img/bkSupporter/left.png" alt=""> -->
          </div>
        </div>
        <div class="close-core">
          <div>昵称</div>
          <div>
            {{shop.title}}&nbsp;&nbsp;
            <!-- <img class="left" src="./../../../assets/img/bkSupporter/left.png" alt=""> -->
          </div>
        </div>
        <!-- <div class="close-core">
          <div>付款理由</div>
          <div>1236</div>
        </div>-->
        <div class="close-core" @click="update">
          <div>版本号</div>
          <div>{{wgtVer}}</div>
        </div>
        <div class="close-core" @click="jumpTo('/changePassword')">
          <div>修改密码</div>
          <div>
            <img class="left" src="./../../../assets/img/bkSupporter/left.png" alt />
          </div>
        </div>
        <div class="close-core" @click="jumpTo('/businessHours')">
          <div>营业时间设置</div>
          <div>
            <img class="left" src="./../../../assets/img/bkSupporter/left.png" alt />
          </div>
        </div>
          <div class="close-core" @click="jumpTo('/setdistance')">
          <div>配送距离设置</div>
          <div>
            <img class="left" src="./../../../assets/img/bkSupporter/left.png" alt />
          </div>
        </div>
         <div class="close-core" v-if="isDada=='1'" @click="jumpTo('/dada')">
          <div>达达运费</div>
          <div>
            <img class="left" src="./../../../assets/img/bkSupporter/left.png" alt />
          </div>
        </div>
        <div class="close-core" v-else @click="bangdingdada">
          <div>绑定达达门店</div>
          <div>
            <img class="left" src="./../../../assets/img/bkSupporter/left.png" alt />
          </div>
        </div>
       <div class="close-core" @click="jumpTo('/ConnectPrinter')">
          <div>连接打印机</div>
          <div>
            <img class="left" src="./../../../assets/img/bkSupporter/left.png" alt />
          </div>
        </div>
        <div class="close-core" @click="removeBondToPrinter">
          <div>解除绑定打印机</div>
          <div>
            <img class="left" src="./../../../assets/img/bkSupporter/left.png" alt />
          </div>
        </div>
      </div>
      <div style="height:.2rem;background:#f2f2f2;"></div>
     <div class="close-core-body">
        <x-switch title="自动接单" v-model="value" @on-change="change"></x-switch>
      </div>
      <div style="color:#E71C1B;padding-top:.2rem;text-align:center;background:#f2f2f2;">*开启后一定开启WIFI蓝牙连接打印机，否则不能打印小票</div>
      <div class="submit-box">
        <div class="submit-box-core" @click="layout">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as utils from '../../../utils'
import MescrollVue from "mescroll.js/mescroll.vue";
import * as apiHttp from "../../../api/index";
import { Confirm, Tab, TabItem, Popup, XSwitch } from "vux";
export default {
  name: "setupindex",
  components: { TabItem, Tab, TabItem, Popup, MescrollVue, XSwitch },
  data() {
    return {
      statusH: "",
      wgtVer: (window.api && api.appVersion) || "",
      value: false,
      shop: [],
      list:{},//外卖订单信息
      auto:'',
      autoOrder:'',
      isDada:'',
      lanya: utils.storage.get('LanYa')
    };
  },
  created() {
    console.log(this.arr)
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  },
  mounted() {

    this.getInit();
  },
  inject: ["reload"],
  methods: {
    bangdingdada () {
       this.$http.post("", {
          do: "shop",
          op: "shopDada"
        })
        .then(res => {
          this.$vux.toast.text(res.msg);
          this.getInit()
        });
    },
    getInit() {
      this.$http
        .post("", {
          do: "shop",
          op: "index"
        })
        .then(res => {
          if (res.code == 1) {
            this.shop = res.data.shop;
            this.isDada= res.data.shop.isDada
            this.autoOrder = res.data.shop.autoOrder
            if (res.data.shop.autoOrder== '1') {
              this.value = true
            } else {
              this.value = false
            }
          }
        });
    },
    change(val) {
      console.log(val);
      // if (this.autoOrder !='1'){} 
        if (val) {
          this.auto = '1'
        } else{
          this.auto = '0'
        }
        this.$http
          .post("", {
            do: "shop",
            op: "autoOrder",
            auto: this.auto
          })
          .then(res => {
            if(res.code == 1){
              // this.$vux.toast.text(res.msg);
              this.getInit()
            }
          })
      
    },
    layout() {
      // console.log(timeqishi)
      clearInterval(timeqishi)
      this.$store.commit("logout");
      this.reload();
      this.$router.replace("/login");
    },
    // 更新
    update() {
      // alert((api.systemType === 'android') ? 'android' : 'ios')
      // alert(this.shop.title)
      this.$http
        .post("", {
          do: "api",
          op: "update",
          verion: api.appVersion,
          type: api.systemType === "android" ? "android" : "ios",
          name: this.shop.title
        })
        .then(res => {
          if (res.code == 1) {
            var browser = api.require("webBrowser");
            browser.open({
              url: res.data.url
            });
          } else {
            this.$vux.toast.text("当前已是最新版本");
          }
        });
    },
    removeBondToPrinter () {
      var that = this
      if (that.lanya) {
        var printModule = api.require('posPrinter');
        var param = {
            'address': that.lanya
        };
        printModule.removeBondToPrinter(param, function (ret, err) {
            // alert(JSON.stringify(ret));
            if (ret.result == 'ok') {
              that.$vux.toast.text("解绑成功！");
              utils.storage.set('LanYa', '')
            }
        });
      } else {
         that.$vux.toast.text("您还未绑定打印机！");
      }
    }
  },
  activated() {}
};
</script>
<style lang="less" >
.vux-header {
  background: linear-gradient(
    90deg,
    rgba(246, 86, 43, 1),
    rgba(231, 27, 27, 1)
  ) !important;
  border: none !important;
  .vux-header-title {
    color: #ffffff !important;
  }
  .iconfont.icon-back {
    color: #ffffff !important;
  }
}
.vux-x-switch.weui-cell.weui-cell_switch {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.1rem;
  .weui-cell__bd {
    font-size: 0.3rem;
    font-weight: 500;
    color: rgba(27, 27, 27, 1);
  }
}
</style>
<style scoped lang="less">
.closeDetail {
  background: #ffffff;
  .vux-header {
    background: linear-gradient(
      90deg,
      rgba(246, 86, 43, 1),
      rgba(231, 27, 27, 1)
    ) !important;
    border: none !important;
  }
  .closeDetail-coreBox {
    margin-top: 0.88rem;
    .close-core-body {
      padding: 0 0.3rem;
      .close-core {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.1rem;
        border-bottom: 1px solid #f2f2f2;
        > div:nth-child(1) {
          font-size: 0.3rem;
          font-weight: 500;
          color: rgba(27, 27, 27, 1);
        }
        .logoBox {
          display: flex;
          align-items: center;
        }
        > div:nth-child(2) {
          font-size: 0.3rem;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          .logo {
            width: 0.9rem;
            height: 0.9rem;
            border-radius: 0.45rem;
          }
          .left {
            width: 0.13rem;
            height: 0.24rem;
          }
        }
        .close-core-color {
          color: rgba(231, 28, 27, 1) !important;
        }
      }
    }
    .submit-box {
      padding: 0 0.75rem;
      background: #f2f2f2;
      overflow: hidden;
      .submit-box-core {
        width: 100%;
        height: 0.88rem;
        background: linear-gradient(
          90deg,
          rgba(246, 86, 43, 1),
          rgba(231, 27, 27, 1)
        );
        border-radius: 0.1rem;
        line-height: 0.88rem;
        text-align: center;
        font-size: 0.34rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        margin-top: 2.3rem;
      }
    }
  }
}
</style>
