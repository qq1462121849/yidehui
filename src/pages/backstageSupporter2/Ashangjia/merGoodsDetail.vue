<template>
  <div class="closeDetail" >
    <x-header slot="header" :left-options="{showBack: false}" :style="{paddingTop: statusH + 'rem',height:statusH + 0.88 +'rem'}" >
      <a @click="goBack()" slot="left" class="backBox" :style="{paddingTop: statusH + 'rem'}">
          <i class="iconfont icon-back"></i>
          </a>
      商家详情
      <!-- <a @click="jumpTo('/experienceDetail')" slot="right">明细</a> -->
    </x-header>
    <div class="closeDetail-coreBox" :style="{paddingTop: statusH + 'rem'}">
      <div style="height:.2rem;background:#f2f2f2;"></div>
      <div class="close-core-body">
        <div class="close-core">
          <div>序号</div>
          <div>{{info.displayorder}}</div>
        </div>
         <div class="close-core">
          <div>商家ID</div>
          <div>{{info.id}}</div>
        </div>
         <div class="close-core">
          <div>商家账号</div>
          <div>{{info.username}}</div>
        </div>
        <div class="close-core">
          <div>商家名称</div>
          <div>{{info.title}}</div>
        </div>
         <div class="close-core">
          <div>商家行业</div>
          <div>{{category.title}}</div>
        </div>
         <div class="close-core">
          <div>商家地址</div>
          <div>{{info.birth.province + '-' + info.birth.city + '-' + info.birth.district}}</div>
        </div>
         <div class="close-core">
          <div>详细地址</div>
          <div>{{info.address}}</div>
        </div>
        <div class="close-core">
          <div>负责人</div>
          <div>{{info.cname}}</div>
        </div>
        <div class="close-core">
          <div>电话</div>
          <div>{{info.tel}}</div>
        </div>
        <div class="close-core">
          <div>email</div>
          <div>{{info.email}}</div>
        </div>
        <div class="close-core">
          <div>商家管理员UID</div>
          <div>{{info.shopUid}}</div>
        </div>
        <div class="close-core">
          <div>状态</div>
          <div class="close-core-color">{{statusInfo[info.status]}}</div>
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
  name: 'merGoodsDetail1',
  components: {TabItem,Tab,TabItem,Popup,MescrollVue},
  data () {
    return {
      statusH:'',
      id: this.$route.query.id,
      info:[] ,
      category:[],
      statusInfo: []
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
        do: 'platform',
        op: 'shopDetail',
        id: this.id
      }).then(res => {
        if (res.code == 1) {
          this.info = res.data.info
          this.category = res.data.category
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
