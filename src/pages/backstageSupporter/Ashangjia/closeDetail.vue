<template>
  <div class="closeDetail" >
    <x-header slot="header" :left-options="{showBack: false}" :style="{paddingTop: statusH + 'rem',height:statusH + 0.88 +'rem'}" >
      <a @click="goBack()" slot="left" class="backBox" :style="{paddingTop: statusH + 'rem'}">
          <i class="iconfont icon-back"></i>
          </a>
      商家结算详情
      <!-- <a @click="jumpTo('/experienceDetail')" slot="right">明细</a> -->
    </x-header>
    <div class="closeDetail-coreBox" :style="{paddingTop: statusH + 'rem'}">
      <div style="height:.2rem;background:#f2f2f2;"></div>
      <div class="close-core-body">
        <div class="close-core">
          <div>序号</div>
          <div>{{info.id}}</div>
        </div>
         <div class="close-core">
          <div>负责人</div>
          <div>{{info.cname}}</div>
        </div>
         <div class="close-core">
          <div>电话</div>
          <div>{{info.mobile}}</div>
        </div>
         <div class="close-core">
          <div>提现方式</div>
          <div>{{withType[info.withType]}}</div>
        </div>
         <div class="close-core">
          <div>账号信息</div>
          <div>{{info.alipay}}</div>
        </div>
         <div class="close-core">
          <div>金额</div>
          <div>{{info.price}}</div>
        </div>
         <div class="close-core">
          <div>申请时间</div>
          <div>{{info.createtime | formatDate}}</div>
        </div>
        <div class="close-core">
          <div>状态</div>
          <div class="close-core-color">{{statusInfo[info.status]}}</div>
        </div>
        <div class="close-core">
          <div>发放凭证</div>
          <!-- <div class="close-core-color">已发放</div> -->
        </div>
        <div>
          <img style="width: 100%;height: auto;" :src="info.thumb" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as apiHttp from '../../../api/index'
import {formatDate} from '../../../plugin/data'
import { Confirm, Tab, TabItem, Popup } from 'vux'
export default {
  name: 'closeDetail',
  components: {TabItem,Tab,TabItem,Popup,MescrollVue,formatDate},
  data () {
    return {
      statusH:'',
      id: this.$route.query.id,
      info: [],
      withType: [],
      statusInfo: []
    }
  },
   filters: {
    formatDate (time) {
      time = time * 1000
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  created () {
    let size = (document.documentElement.clientWidth / 7.5)
    this.statusH = (api.safeArea.top / size)
  },
  mounted () {
    console.log(this.id)
    this.getInit()
  },
  methods: {
    getInit () {
      this.$http.post("", {
          do: 'shop',
          op: 'withdrawDetail',
          id: this.id
        })
        .then(res => {
          if (res.code == 1) {
            this.info = res.data.info
            this.withType = res.data.withType
            this.statusInfo = res.data.statusInfo
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
      }
    }
}
</style>
