<template>
  <div class="closeDetail" >
    <x-header slot="header" :left-options="{showBack: false}" :style="{paddingTop: statusH + 'rem',height:statusH + 0.88 +'rem'}" >
      <a @click="goBack()" slot="left" class="backBox" :style="{paddingTop: statusH + 'rem'}">
          <i class="iconfont icon-back"></i>
          </a>
      评论详情
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
          <div>评论人</div>
          <div v-if="userInfo.realname">{{userInfo.realname}}</div>
          <div v-else-if="userInfo.nickname">{{userInfo.nickname}}</div>
          <div v-else-if="userInfo.mobile">{{userInfo.mobile}}</div>
          <div v-else>{{userInfo.uid}}</div>
        </div>
         <div class="close-core">
          <div>订单号</div>
          <div>{{info.orderId}}</div>
        </div>
         <div class="close-core">
          <div>商品</div>
          <div class="closeBox" >{{goodsList.goodsName}}</div>
        </div>
         <div class="close-core">
          <div>评论详情</div>
        </div>
        <div class="close-core1">{{info.info}}</div>
        <!-- <div class="close-core">
          <div>回复信息</div>
        </div>
        <div class="close-core1">滴答滴答</div> -->
        <!-- <div class="close-core">
          <div>评论类型</div>
          <div>郑州市</div>
        </div> -->
        <!-- <div class="close-core">
          <div>支付方式</div>
          <div>支付宝</div>
        </div> -->
        <div class="close-core">
          <div>评论时间</div>
          <div >2019.05.15 15:12:34</div>
        </div>
        <div class="close-core" v-if="info.status == 0">
          <div>操作</div>
          <div class="close-core-right">
            <div @click="transfer('1')">驳回</div>
            <div @click="transfer('2')">通过</div>
          </div>
        </div>
      </div>
    </div>
     <!-- 提示弹窗 -->
      <confirm v-model="showwin"
      title="是否确认驳回操作?"
      @on-confirm="onConfirm">
      </confirm>
      <!-- 提示弹窗 -->
      <confirm v-model="showwin2"
      title="是否确认通过操作?"
      @on-confirm="onConfirm2">
      </confirm>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as apiHttp from '../../../api/index'
import { Confirm, Tab, TabItem, Popup } from 'vux'
export default {
  name: 'reviewAuditDetail',
  components: {TabItem,Tab,TabItem,Popup,MescrollVue,Confirm},
  data () {
    return {
      statusH:'',
      id:this.$route.query.id,
      showwin:false,
      showwin2:false,
      info: [],
      userInfo: [],
      status: [],
      goodsList: []
    }
  },
  created () {
    let size = (document.documentElement.clientWidth / 7.5)
    this.statusH = (api.safeArea.top / size)
  },
  mounted () {
    this.getInit()
  },
  methods: {
    getInit () {
      this.$http.post('', {
          do: 'shop',
          op: 'biscussDetail',
          id: this.id
       }).then(res => {
         if (res.code == 1) {
            this.info = res.data.info
            this.userInfo = res.data.userInfo
            this.goodsList = res.data.goodsList[0]
            this.status = res.data.status
         }
       })
    },
    transfer (index) {
      if (index == 1) {
        this.showwin = true
      } else {
        this.showwin2 = true
      }
    },
    onConfirm () {
      this.$http.post('', {
        do: 'shop',
        op: 'biscussPost',
        id: this.id,
        status: '1'
      }).then(res => {
        if (res.code == 1) {
          this.$vux.toast.text('驳回成功！')
          this.getInit()
        }
      })
    },
    onConfirm2 () {
      this.$http.post('', {
        do: 'shop',
        op: 'biscussPost',
        id: this.id,
        status: '2'
      }).then(res => {
        if (res.code == 1) {
          // this.$vux.toast.text('驳回成功！')
          this.$vux.toast.text('通过成功！')
          this.getInit()  
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
          .close-core-right{
            display: flex;
            justify-content: space-between;
            width: 2.5rem;
            >div{
              width:1rem;
              height:.5rem;
              border-radius:.1rem;
              text-align: center;
              line-height: .55rem;
            }
            >div:nth-child(1){
              border:1px solid rgba(231,28,27,1);
              color: rgba(231,28,27,1);
            }
            >div:nth-child(2){
              border:1px solid rgba(22,155,213,1);
              color: rgba(22,155,213,1);
            }
            
          }
          .closeBox{
            width: 5.5rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .close-core1{
          min-height: 1rem;
          background: #f2f2f2;
          border-radius: .1rem;
          padding: 0 .1rem;
        }
      }
    }
}
</style>
