<template>
  <div class="closeDetail" >
    <x-header slot="header" :left-options="{showBack: false}" :style="{paddingTop: statusH + 'rem',height:statusH + 0.88 +'rem'}" >
      <a @click="goBack()" slot="left" class="backBox" :style="{paddingTop: statusH + 'rem'}">
          <i class="iconfont icon-back"></i>
          </a>
      商家二维码
      <!-- <a @click="jumpTo('/experienceDetail')" slot="right">明细</a> -->
    </x-header>
    <div class="closeDetail-coreBox" :style="{paddingTop: statusH + 'rem'}">
      <div class="close-core-body">
        <div class="core-bodyBox">
          <img :src="url" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as apiHttp from '../../../api/index'
import { Confirm, Tab, TabItem, Popup } from 'vux'
export default {
  name: 'QRCode',
  components: {TabItem,Tab,TabItem,Popup,MescrollVue},
  data () {
    return {
      statusH:'',
      url: ''
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
        do: 'shop',
        op: 'qrcode'
      }).then(res => {
        if (res.code == 1) {
          this.url = res.data.url
        }
      })
    }
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
  // background: #ffffff;
    .vux-header{
      background:linear-gradient(90deg,rgba(246,86,43,1),rgba(231,27,27,1)) !important;
      border: none !important;
    }
    .closeDetail-coreBox{
      margin-top: .88rem;
      overflow: hidden;
      .close-core-body{
        padding: 0 .3rem;
        margin-top: .5rem;
        .core-bodyBox{
          background: url(./../../../assets/img/bkSupporter/OQbg.png) no-repeat 0 0;
          background-size: 100% 10rem;
          height: 10rem;
          display: flex;
          justify-content: center;
          align-items: center;
          >img{
            width: 3rem;
            height: 3rem;
          }
        }
      }
    }
}
</style>
