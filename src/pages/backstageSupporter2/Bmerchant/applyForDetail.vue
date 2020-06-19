<template>
  <div class="closeDetail" >
    <x-header slot="header" :left-options="{showBack: false}" :style="{paddingTop: statusH + 'rem',height:statusH + 0.88 +'rem'}" >
      <a @click="goBack()" slot="left" class="backBox" :style="{paddingTop: statusH + 'rem'}">
          <i class="iconfont icon-back"></i>
          </a>
      商家申请详情
      <!-- <a @click="jumpTo('/experienceDetail')" slot="right">明细</a> -->
    </x-header>
    <div class="closeDetail-coreBox" :style="{paddingTop: statusH + 'rem'}">
      <div style="height:.2rem;background:#f2f2f2;"></div>
      <div class="close-core-body">
        <div class="close-core">
          <div>编号</div>
          <div>001</div>
        </div>
         <div class="close-core">
          <div>负责人</div>
          <div>1122</div>
        </div>
         <div class="close-core">
          <div>电话</div>
          <div>15037126513</div>
        </div>
        <div class="close-core">
          <div>微信</div>
          <div>15037126513</div>
        </div>
         <div class="close-core">
          <div>商家类型</div>
          <div>生活服务</div>
        </div>
         <div class="close-core">
          <div>推荐人</div>
          <div>956</div>
        </div>
         <div class="close-core1">
          <div>上传图片信息</div>
          <div>
            <img src="./../../../assets/img/bkSupporter/addpic.png" alt="">
          </div>
        </div>
        <div class="close-core">
          <div>时间</div>
          <div>已通过</div>
        </div>
        <div class="close-core">
          <div>属性</div>
          <div class="close-core-color">显示</div>
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
  name: 'applyForDetail',
  components: {TabItem,Tab,TabItem,Popup,MescrollVue},
  data () {
    return {
      statusH:'',
    }
  },
  created () {
    let size = (document.documentElement.clientWidth / 7.5)
    this.statusH = (api.safeArea.top / size)
  },
  mounted () {

  },
  methods: {
   
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
  background: #ffffff;
    .vux-header{
      background:linear-gradient(90deg,rgba(246,86,43,1),rgba(231,27,27,1)) !important;
      border: none !important;
    }
    .closeDetail-coreBox{
      margin-top: .88rem;
      .close-core-body{
        padding: 0 .3rem;
        .close-core{
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 1.1rem;
          border-bottom: 1px solid #f2f2f2;
          >div:nth-child(1){
            font-size:.3rem;
            font-weight:500;
            color:rgba(27,27,27,1);
          }
          >div:nth-child(2){
            font-size:.3rem;
            font-weight:400;
            color:rgba(102,102,102,1);
          }
          .close-core-color{
            color: rgba(231,28,27,1) !important;
          }
        }
        .close-core1{
          >div:nth-child(1){
            height: 1.1rem;
            font-size:.3rem;
            font-weight:500;
            color:rgba(27,27,27,1);
            line-height: 1.1rem;
          }
          >div:nth-child(2){
            img{
              width: 1.8rem;
              height: 1.8rem;
            }
          }
        }
      }
    }
}
</style>
