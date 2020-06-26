<template>
  <div class="closeDetail" >
    <x-header slot="header" :left-options="{showBack: false}" :style="{paddingTop: statusH + 'rem',height:statusH + 0.88 +'rem'}" >
      <a @click="goBack()" slot="left" class="backBox" :style="{paddingTop: statusH + 'rem'}">
          <i class="iconfont icon-back"></i>
          </a>
      商家结算申请
      <!-- <a @click="jumpTo('/experienceDetail')" slot="right">明细</a> -->
    </x-header>
    <div class="closeDetail-coreBox" :style="{paddingTop: statusH + 'rem'}">
      <div style="height:.2rem;background:#f2f2f2;"></div>
      <div class="close-core-body">
        <div class="close-core">
          <div>商家负责人</div>
          <input type="text" v-model="cname" placeholder="请输入商家负责人">
        </div>
        <div class="close-core">
          <div>联系方式</div>
          <input type="number" v-model="mobile" placeholder="请输入联系方式">
        </div>
        <div class="close-core">
          <div>选择提现方式</div>
          <div class="close-core-color" >
            <popup-picker  :data="list1" v-model="withType" 
            @on-change="onChange" ></popup-picker>
          </div>
        </div>
        <div class="close-core"  v-if="withType!='微信企业付款'">
          <div>账号</div>
          <input type="text" v-model="username" placeholder="请输入账号">
        </div>
        <div class="close-core" v-if="withType=='银行卡'">
          <div>开户行</div>
          <input type="text" v-model="cardType" placeholder="请输入账号">
        </div>
        <div class="close-core"  v-if="withType!='微信企业付款'">
          <div>账号姓名</div>
          <input type="text" v-model="uname" placeholder="请输入账号姓名">
        </div>
        <div class="close-core">
          <div>金额</div>
          <input type="number" v-model="price" placeholder="请输入金额">
        </div>
      </div>
      <div class="submit-box"> 
        <div class="submit-box-core" @click="addCloseApply">提交</div>
      </div>

    </div>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as apiHttp from '../../../api/index'
import { Confirm, Tab, TabItem, Popup,XSwitch,PopupPicker} from 'vux'
export default {
  name: 'merchantCloseApply',
  components: {TabItem,Tab,TabItem,Popup,MescrollVue,XSwitch,PopupPicker},
  data () {
    return {
      statusH:'',
      value:false,
     // list1 : [['支付宝', '银行卡']],
     list1 : [[]],
      cname:'',
      mobile:'',
      withType: ['支付宝'],
      username:'',
      cardType:'',
      uname:'',
      price:'',
      wTd:''
    }
  },
  created () {
    let size = (document.documentElement.clientWidth / 7.5)
    this.statusH = (api.safeArea.top / size)
    this.getlist()
  },
  mounted () {
   
  },
  methods: {
    getlist(){
         this.$http.post('', {
          do: 'shop',
          op: 'withdrawList',
        
        }).then(res => {
         if(res.code==1){
         
           for(let k in res.data.withType){
             this.list1[0].push(res.data.withType[k])
           }
           console.log(this.list1)
         }
        }) 
    },
    addCloseApply () {
      if (!this.cname) {
        this.$vux.toast.text('请输入商家负责人')
      } else if (!this.mobile) {
        this.$vux.toast.text('请输入联系电话')
      }  else if (!this.price) {
        this.$vux.toast.text('请输入提现金额')
      } else if (this.withType == '银行卡' && !this.cardType) {
        this.$vux.toast.text('请输入开户行')
      } else {
        if (this.withType == '支付宝') {
          this.wTd = 1
         } else if(this.withType=='银行卡') {
          this.wTd = 2
        }else {
          this.wTd = 3
        }  
        this.$http.post('', {
          do: 'shop',
          op: 'withdrawPost',
          cname: this.cname,
          mobile: this.mobile,
          withType: this.wTd,
          username: this.username,
          cardType: this.cardType,
          uname: this.uname,
          price: this.price,
          status: this.status
        }).then(res => {
          this.$vux.toast.text(res.msg)
        }) 
      }
    },
   // 类型选择
    onChange (val) {
      // this.withType = val
      // console.log(val)
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
          input{
            height: .8rem;
            width: 5rem;
            border: none;
            outline: none;
            font-size: .3rem;
            font-weight: 500;
          }
         .close-core-color{
           
            color: rgba(231,28,27,1) !important;
            width: 3rem!important;
            
          }
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
