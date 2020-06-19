<template>
  <div class="closeDetail" >
    <x-header slot="header" :left-options="{showBack: false}" :style="{paddingTop: statusH + 'rem',height:statusH + 0.88 +'rem'}" >
      <a @click="goBack()" slot="left" class="backBox" :style="{paddingTop: statusH + 'rem'}">
          <i class="iconfont icon-back"></i>
          </a>
      商品详情
      <!-- <a @click="jumpTo('/experienceDetail')" slot="right">明细</a> -->
    </x-header>
    <div class="closeDetail-coreBox" :style="{paddingTop: statusH + 'rem'}">
      <div style="height:.2rem;background:#f2f2f2;"></div>
      <div class="close-core-body">
        <div class="close-core">
          <div>显示顺序</div>
          <div>{{info.displayorder}}</div>
        </div>
         <div class="close-core">
          <div>商品编号</div>
          <div>{{info.id}}</div>
        </div>
         <div class="close-core">
          <div>商品名称</div>
          <div>{{info.goodsName}}</div>
        </div>
        <div class="close-core">
          <div>商家名称</div>
          <div>{{shops.title}}</div>
        </div>
         <div class="close-core">
          <div>商品价格</div>
          <div>{{info.ex_price}}</div>
        </div>
         <div class="close-core">
          <div>商品库存</div>
          <div>{{info.total}}</div>
        </div>
         <div class="close-core">
          <div>销售数量</div>
          <div>{{info.sales}}</div>
        </div>
        <div class="close-core">
          <div>分销</div>
          <div>(特价-出厂价)*总拨比*分销拨比*每级分销比例)</div>
        </div>
        <div class="close-core">
          <div>负责人</div>
          <div>{{shops.cname}}</div>
        </div>
        <div class="close-core">
          <div>审核状态</div>
          <div class="close-core-color">{{isPass[info.isPass]}}</div>
        </div>
        <div class="close-core">
          <div>属性</div>
          <div class="close-core-color">{{status[info.status]}}</div>
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
      info: [],
      shops: [],
      isPass: [],
      status: []
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
          op: 'goodsDetail',
          id: this.id
        }).then(res => {
          if (res.code == 1) {
            this.info = res.data.info
            this.shops = res.data.shops
            this.isPass = res.data.isPass
            this.status = res.data.status
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
