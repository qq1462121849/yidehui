<template>
  <div class="closeDetail" >
    <x-header slot="header" :left-options="{showBack: false}" :style="{paddingTop: statusH + 'rem',height:statusH + 0.88 +'rem'}" >
      <a @click="goBack()" slot="left" class="backBox" :style="{paddingTop: statusH + 'rem'}">
          <i class="iconfont icon-back"></i>
          </a>
      头像设置
      <!-- <a @click="jumpTo('/experienceDetail')" slot="right">明细</a> -->
    </x-header>
    <div class="closeDetail-coreBox" :style="{paddingTop: statusH + 'rem'}">
      <div style="height:.2rem;background:#f2f2f2;"></div>
      <div class="close-core-body">
          <img v-show="showLogo" @click="handlePhoto()" src="./../../../assets/img/bkSupporter/add.png" alt="">
          <img v-show="!showLogo" @click="handlePhoto()" :src="urlImg" alt="">
          <p>上传图片</p>
      </div>
        <div class="submit-box"> 
          <div class="submit-box-core" >保存</div>
        </div>
    </div>
    <actionsheet v-model="show" :menus="menus"  show-cancel @on-click-menu="click"></actionsheet>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as apiHttp from '../../../api/index'
import { Confirm, Tab, TabItem, Popup,XSwitch,Actionsheet } from 'vux'
export default {
  name: 'headPortrait',
  components: {TabItem,Tab,TabItem,Popup,MescrollVue,XSwitch,Actionsheet},
  data () {
    return {
      statusH:'',
      value:false,
      menus: {
        menu1: '从相册选择一张',
        menu2: '拍照'
      },
      show: false,
      data: this.$store.state.user.userInfo,
      showLogo:true,
      urlImg:''
    }
  },
  created () {
    let size = (document.documentElement.clientWidth / 7.5)
    this.statusH = (api.safeArea.top / size)
  },
  mounted () {
    console.log("data",this.data)
  },
  methods: {
    handlePhoto () {
      this.show = true
      this.showCode = false
    },
    click (key) {
      console.log(key)
      if (key === 'menu1') {
        this.galleryImg()
      } else if (key === 'menu2') {
        this.captureImage()
      }
    },
    // 从相册中选取图片
    galleryImg () {
      let This = this
      api.getPicture({
        sourceType: 'album',
        mediaValue: 'pic',
        destinationType: 'base64',
        allowEdit: true,
        preview: true
      }, function (ret, err) {
        if (ret) {
          console.log(JSON.stringify(ret))
          // if (!This.showCode) {
          //   if (This.data.avatar) {
          //     This.data.avatar = ret.base64Data
          //   }
          //   This.avatar = ret.base64Data
          // } else {
          //   if (This.data.service_qrcode) {
          //     This.data.service_qrcode = ret.base64Data
          //   }
          //   This.QRCode = ret.base64Data
          // }
          This.urlImg = ret.base64Data
          This.showLogo = false
        } else {
          console.log(JSON.stringify(err))
        }
      })
    },
    // 拍照
    captureImage () {
      let This = this
      api.getPicture({
        sourceType: 'camera',
        mediaValue: 'pic',
        destinationType: 'base64',
        allowEdit: true,
        preview: true
      }, function (ret, err) {
        console.log('拍照' + JSON.stringify(ret))
        if (ret) {
          // if (!This.showCode) {
          //   if (This.data.avatar) {
          //     This.data.avatar = ret.base64Data
          //   }
          //   This.avatar = ret.base64Data
          // } else {
          //   if (This.data.service_qrcode) {
          //     This.data.service_qrcode = ret.base64Data
          //   }
          //   This.QRCode = ret.base64Data
          // }
          This.urlImg = ret.base64Data
          This.showLogo = false
        } else {
          console.log(JSON.stringify(err))
        }
      })
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
  .vux-x-switch.weui-cell.weui-cell_switch {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.1rem;
    .weui-cell__bd{
      font-size:.3rem;
      font-weight:500;
      color:rgba(27,27,27,1);
      
    }
  }
</style>
<style scoped lang="less">
.closeDetail{
    background: #f2f2f2;
    .vux-header{
      background:linear-gradient(90deg,rgba(246,86,43,1),rgba(231,27,27,1)) !important;
      border: none !important;
    }
    .closeDetail-coreBox{
      margin-top: .88rem;
      .close-core-body{
        height: 4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction:column;
        img{
          width: 1.7rem;
          height: 1.7rem;
          border-radius: 50%;
        }
        p{
          margin-top:.2rem;
          font-size:.3rem;
          font-weight:500;
          color:rgba(27,27,27,1);
        }
      }
      .submit-box{
        padding: 0 .75rem;
        background:#f2f2f2;
        overflow: hidden;
        .submit-box-core{
          width: 100%;
          height: .88rem;
          background:linear-gradient(90deg,rgba(246,86,43,1),rgba(231,27,27,1));
          border-radius:.1rem;
          line-height:  .88rem;
          text-align: center;
          font-size: .34rem;
          font-weight:500;
          color:rgba(255,255,255,1);
          margin-top: 2.3rem;
        }
      }
    }
}
</style>
