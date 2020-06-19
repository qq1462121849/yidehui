<template>
  <div class="closeDetail" >
    <x-header slot="header" :left-options="{showBack: false}" :style="{paddingTop: statusH + 'rem',height:statusH + 0.88 +'rem'}" >
      <a @click="goBack()" slot="left" class="backBox" :style="{paddingTop: statusH + 'rem'}">
          <i class="iconfont icon-back"></i>
          </a>
      修改密码
      <!-- <a @click="jumpTo('/experienceDetail')" slot="right">明细</a> -->
    </x-header>
    <div class="closeDetail-coreBox" :style="{paddingTop: statusH + 'rem'}">
      <div style="height:.2rem;background:#f2f2f2;"></div>
      <div class="close-core-body">
         <div class="close-core">
            <div>原密码</div>
            <input v-model="oldPass" type="text" placeholder="请输入原密码">
        </div>
        <div class="close-core">
            <div>新密码</div>
            <input v-model="newPass1" type="text" placeholder="请输入新密码">
        </div>
        <div class="close-core">
            <div>新密码</div>
            <input v-model="newPass2" type="text" placeholder="请再次输入新密码">
        </div>
        <div class="close-core">
            <div></div>
            <!-- <input v-model="userPhone" type="number" placeholder="请输入手机号"> -->
            <img :src="codePic" alt="">
            <div style="color:#E71B1B;" @click="getCodePic" >看不清！</div>
        </div>
        <div class="close-core">
            <div>验证码</div>
            <input v-model="verCode" type="text" placeholder="请输入验证码">
        </div>
      </div>
        <div class="submit-box"> 
          <div class="submit-box-core" @click="saveChange">保存</div>
        </div>
    </div>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as apiHttp from '../../../api/index'
import { Confirm, Tab, TabItem, Popup,XSwitch } from 'vux'
export default {
  name: 'changePassword',
  components: {TabItem,Tab,TabItem,Popup,MescrollVue,XSwitch},
  data () {
    return {
      statusH:'',
      value:false,
      countDown: '60',
      showVer: true,
      oldPass:'',
      newPass1:'',
      newPass2:'',
      userPhone:'',
      verCode:'',
      codePic: '',
      hash: ''
    }
  },
  created () {
    let size = (document.documentElement.clientWidth / 7.5)
    this.statusH = (api.safeArea.top / size)
  },
  mounted () {
    this.getCodePic()
  },
  inject: ['reload'],
  methods: {
    getCodePic () {
      this.codeNum = ''
      this.$http.get('', {do:'auth',op:'getVerifyUrl'}, true).then(res => {
        if (res.code == 1) {
          this.codePic = res.data.url
          this.hash = res.data.hash
        }
      })
    },
    saveChange () {
      if (!this.oldPass) {
        this.$vux.toast.text('请输入原密码')
      } else if (!this.newPass1) {
        this.$vux.toast.text('请输入新密码')
      } else if (!this.newPass2) {
        this.$vux.toast.text('请再次输入新密码')
      }  else if (this.newPass1!=this.newPass2) {
        this.$vux.toast.text('您输入的新密码不一致')
      } else if (!this.verCode) {
        this.$vux.toast.text('请输入您的验证码')
      } else{
        let info = {
          do:'shop',
          op:'password',
          password: this.oldPass,
          newPassword: this.newPass1,
          verify: this.verCode,
          verifyHash: this.hash,
        }
        this.$http.post("", info, true).then(res => {
          if(res.code == 1){
            this.$vux.toast.text('提交成功')
            this.layout()
          }
        })
      }
    },
    layout () {
      this.$store.commit('logout')
      this.reload()
      this.$router.replace('/login')
    }
    // // 获取验证码
    // getVerNum () {
    //     var regexs = /^[1][0-9]{10}$/;
    //     if (!regexs.test(this.userPhone)) {
    //       this.$vux.toast.text('手机号不正确')
    //     } else {
    //       this.$http.post("/amoy/auth/sms-verifycode", {mobile:this.userPhone,type:"bind"}, true).then(res => {
    //         if (res.code == 0) {
    //           this.showVer = false
    //           var tt = setInterval(() => {
    //               this.countDown --
    //               if (this.countDown <=0) {
    //                   clearInterval(tt)
    //                   this.showVer = true
    //               }
    //           }, 1000);
    //         }
    //       })
    //     }
    // },
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
          // justify-content: space-between;
          align-items: center;
          height: 1.1rem;
          border-bottom: 1px solid #f2f2f2;
          input{
            width: 50%;
            height: .8rem;
            border: none;
            outline: none;
            font-size: .3rem;
            color:rgba(102,102,102,1);
          }
          >div:nth-child(1){
            width: 25%;
            font-size:.3rem;
            font-weight:500;
            color:rgba(27,27,27,1);
          }
          .logoBox{
            display: flex;
            align-items: center;
          }
          >div:nth-child(3){
            width: 25%;
            font-size:.3rem;
            font-weight:400;
            color:rgba(102,102,102,1);
            text-align: center;
          }
          .close-core-color{
            color: rgba(231,28,27,1) !important;
          }
          img{
            width: 1.5rem;
            height: .8rem;
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
