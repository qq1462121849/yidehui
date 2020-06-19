<template>
  <div id="login">
    <!-- <x-header :left-options="{showBack: false}" :style="{paddingTop: statusH + 'rem',height:statusH + 0.88 +'rem'}">
      {{$route.meta.title}}
    </x-header> -->
    <div class="login_img">
      <img :src="logo" alt="">
    </div>
    <div class="login_title">欢迎来到易得惠</div>
    <div class="input_list login_input">
      <div class="label1">
        <input type="tel" placeholder="请输入用户名" v-model="mobile">
      </div>
      <div class="label2">
        <input type="password" placeholder="请输入密码" v-model="password" @keyup.enter="login">
      </div>
      <div class="label3">
        <input type="number" placeholder="请输入验证码" v-model="codeNum">
        <img :src="codePic" alt="">
      </div>
    </div>
    <div style="text-align: right;margin-right: .7rem;color: #999999;" @click="getCodePic">看不清！</div>
    <div class="edit_button btn_login">
      <button class="btn_bright_red" style="background: linear-gradient(90deg,rgba(246,86,43,1),rgba(231,27,27,1))" @click="login">登录</button>
    </div>
    <div class="loginBotBox">
      <div :class="{boxColor:pingTaiTab=='shop'}" @click="PtQieH('shop')">{{shop.title}}</div>
      <div :class="{boxColor:pingTaiTab=='platform'}" @click="PtQieH('platform')">{{platform.title}}</div>
    </div>
  </div>
</template>

<script>
import * as utils from '../../utils'
export default {
  name: 'wechat_login',
  data () {
    return {
      // mobile: '李晋测试商家',
      // password: 'qq123123',
      mobile: '',
      password: '',
      isRegister: true, // 判断是否可以注册
      isRegisterText: '',
      statusH:'',
      hash:'',
      codePic:'',
      codeNum:'',
      logo:'',
      loginInfo:[],
      platform:[],
      shop:[],
      pingTaiTab:'shop'
    }
  },
  inject: ['reload'],
  created () {
    let size = (document.documentElement.clientWidth / 7.5)
    this.statusH = (api.safeArea.top / size)
  },
  methods: {
    PtQieH (val) {
      this.pingTaiTab = val
    },
    login () {
      if ( this.pingTaiTab == 'shop') {
        this.$http.post('', {
          do:'auth',
          op:'login',
          username: this.mobile,
          password: this.password,
          verify:this.codeNum,
          verifyHash: this.hash,
          type:'shop'
        }, true).then(res => {
          let size = (document.documentElement.clientWidth / 7.5)
          this.statusH = (api.safeArea.top / size)
          utils.storage.set('homestatusH', this.statusH)
          utils.storage.set('homestat', '1')
          this.$store.commit('setToken', res.data.token)
          this.$router.push(this.$store.state.global.firstNav)
          this.reload()
          utils.storage.set('APPClass', 'shop')
          utils.storage.set('APPClassid', '1')

        })
      } else {
        this.$http.post('', {
          do:'auth',
          op:'login',
          username: this.mobile,
          password: this.password,
          verify:this.codeNum,
          verifyHash: this.hash,
          type:'platform'
        }, true).then(res => {
          let size = (document.documentElement.clientWidth / 7.5)
          this.statusH = (api.safeArea.top / size)
          utils.storage.set('homestatusH', this.statusH)
          this.$store.commit('setToken', res.data.token)
          this.$router.push(this.$store.state.global.secondNav)
          this.reload()
          utils.storage.set('APPClass', 'platform')
        })
      }
    },
    getCodePic () {
      this.codeNum = ''
      this.$http.get('', {do:'auth',op:'getVerifyUrl'}, true).then(res => {
        if (res.code == 1) {
          this.codePic = res.data.url
          this.hash = res.data.hash
          this.getInfoed()
        }
      })
      let size = (document.documentElement.clientWidth / 7.5)
      this.statusH = (api.safeArea.top / size)
    },
    getInfoed () {
       this.$http.get('', {do:'api',op:'init'}, true).then(res => {
         if (res.code == 1){
            this.logo = res.data.logo
            this.loginInfo = res.data.loginInfo
            this.shop = this.loginInfo.shop
            this.platform = this.loginInfo.platform
         }
       })
    }
  },
  mounted: function () {
    this.getCodePic()
    this.getInfoed()
  }
}
</script>

<style scoped lang="less">
  #login{
    overflow-x: hidden;
    height: 100%;
    background: #fff;
    overflow-y: auto;
  }
  .vux-header{
    position: relative !important;
  }
  .loginBotBox{
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 1.1rem;
    padding: 0 1rem;
    >div{
      font-size: .34rem;
      font-weight: 500;
      color: #666666;
    }
    .boxColor{
      color: rgb(246, 86, 43);
    }
  }
</style>

