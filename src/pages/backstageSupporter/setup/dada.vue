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
      达达运费
    </x-header>
    <div class="dadaBox" :style="{paddingTop: statusH + 'rem'}">
      <div class="dadatit">当前商户运费金额：{{price}}</div>
      <div class="dadatit">最少充值金额：{{limit}}</div>
      <div class="dadatit2" v-html="info"></div>
    </div>
  </div>
</template>

<script>
import MescrollVue from "mescroll.js/mescroll.vue";
import * as apiHttp from "../../../api/index";
import { Confirm, Tab, TabItem, Popup, XSwitch } from "vux";
export default {
  name: "setupindex",
  components: { TabItem, Tab, TabItem, Popup, MescrollVue, XSwitch },
  data() {
    return {
      statusH: "",
      info:'',
      price:'',
      limit:''
    };
  },
  created() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  },
  mounted() {
    this.dadaPic()
  },
  methods: {
    dadaPic () {
      this.$http.post("", {
        do: "shop",
        op: "shopDada"
      })
      .then(res => {
        this.info = res.data.info
        this.price = res.data.price
        this.limit = res.data.limit
      });
    }, 
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
  // background: #ffffff;
  // height: 100%;
  .vux-header {
    background: linear-gradient(
      90deg,
      rgba(246, 86, 43, 1),
      rgba(231, 27, 27, 1)
    ) !important;
    border: none !important;
  }
  .dadaBox {
    margin-top: 0.88rem;
    padding: 0 .3rem;
    overflow: hidden;
    .dadatit{
      height: .9rem;
      line-height: .9rem;
      font-size: .26rem;
      background: #ffffff;
      border-radius: .15rem;
      margin-top: .2rem;
      padding-left: .2rem;
    }
    .dadatit2{
      min-height: .9rem;
      font-size: .26rem;
      background: #ffffff;
      border-radius: .15rem;
      margin-top: .2rem;
      padding-left: .2rem;
    }
  }
}
</style>
