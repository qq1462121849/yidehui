<template>
  <div class="closeDetail" >
    <x-header slot="header" :left-options="{showBack: false}" :style="{paddingTop: statusH + 'rem',height:statusH + 0.88 +'rem'}" >
      <a @click="goBack()" slot="left" class="backBox" :style="{paddingTop: statusH + 'rem'}">
          <i class="iconfont icon-back"></i>
          </a>
      添加子账号
      <!-- <a @click="jumpTo('/experienceDetail')" slot="right">明细</a> -->
    </x-header>
    <div class="closeDetail-coreBox" :style="{paddingTop: statusH + 'rem'}">
      <div style="height:.2rem;background:#f2f2f2;"></div>
      <div class="close-core-body">
        <div class="close-core">
          <div>用户名</div>
          <input type="text" v-model="username" placeholder="请输入用户名">
        </div>
        <div class="close-core">
          <div>密码</div>
          <input type="text" v-model="password1" placeholder="请输入密码">
        </div>
        <div class="close-core">
          <div>确认密码</div>
          <input type="text" v-model="password2" placeholder="请再次输入密码">
        </div>
      </div>
      <div style="height:.2rem;background:#f2f2f2;"></div>
      <div class="close-core-body">
        <x-switch title="是否启用" v-model="value" @on-change="change"></x-switch>
      </div>
      <div class="submit-box"> 
        <div class="submit-box-core" @click="addpass">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as apiHttp from '../../../api/index'
import { Confirm, Tab, TabItem, Popup,XSwitch  } from 'vux'
export default {
  name: 'addBypassAccount',
  components: {TabItem,Tab,TabItem,Popup,MescrollVue,XSwitch },
  data () {
    return {
      statusH:'',
      value:true,
      username:'',
      password1:'',
      password2:'',
      status:'1'
    }
  },
  created () {
    let size = (document.documentElement.clientWidth / 7.5)
    this.statusH = (api.safeArea.top / size)
  },
  mounted () {

  },
  methods: {
    change (val) {
      if (val) {
        this.status = 1
      } else {
        this.status = 0
      }
    },
    addpass () {
      if (!this.username) {
        this.$vux.toast.text('请输入用户名')
      } else if (!this.password1) {
        this.$vux.toast.text('请输入密码')
      } else if (!this.password2) {
        this.$vux.toast.text('请再次输入密码')
      } else if (this.password1 != this.password2) {
        this.$vux.toast.text('请确保密码一致')
      } else {
        this.$http.post('', {
          do: 'shop',
          op: 'usersAdd',
          username: this.username,
          password: this.password1,
          status: this.status
        }).then(res => {
            if (res.code == 1) {
               this.$vux.toast.text('添加成功！')
            } else {
               this.$vux.toast.text(res.msg)
            }
        }) 
      }
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
