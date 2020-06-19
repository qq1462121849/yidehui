<template>
  <div id="cs">
    <x-header slot="header" :left-options="{showBack: false}" :style="{paddingTop: statusH + 'rem',height:statusH + 0.88 +'rem'}" >
      <a @click="goBack()" slot="left" class="backBox" :style="{paddingTop: statusH + 'rem'}">
          <i class="iconfont icon-back"></i>
          </a>
      设备列表
       <a @click="shuxin" :style="{paddingTop: statusH + 'rem'}" slot="right">刷新</a>
    </x-header>
    <div class="connetBox" :style="{paddingTop: statusH + 'rem'}">
      <div class="BoxCore" v-for="(item,index) in lanyaList" :key="index">
        <div class="BoxCoreB">
          <div>
            <div>{{item.name}}</div>
            <div>{{item.address}}</div>
          </div>
          <div class="coreBTN" @click="createBondToPrinter(item.address)">连接</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as utils from '../../../utils'
export default {
  name: 'cs',
  data () {
    return {
      statusH:'',
      orderPrintList:[],
      lanyaList: []
    }
  },
  created () {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  },
  methods: {
    shuxin () {
      this.getBluetoothPrinters()
      this.$vux.toast.text("刷新成功！");
    },
    getBluetoothPrinters(){
      var that = this
      var printModule = api.require('posPrinter');
      var param = {
          'status': 'bonded'
      };
      printModule.getBluetoothPrinters(param, function (ret, err) {
          // alert(JSON.stringify(ret));
          that.lanyaList = ret
          console.log(that.lanyaList)
      });
    },
    createBondToPrinter (val) {
       api.showProgress({
            style: 'default',
            animationType: 'fade',
            title: '正在绑定...',
            text: '请稍等...',
            modal: true
        });
        var module = api.require('posPrinter');
        module.createBondToPrinter({
          address: val
        } , function(ret,err){
            api.hideProgress();
            if(err){
              alert(JSON.stringify(err));
            }
            else if(ret && ret.result == "ok"){
              alert("连接成功");
              utils.storage.set('LanYa', val)
            }
        });
    },
  },
  mounted: function () {
    this.getBluetoothPrinters()
  }
}
</script>
<style lang="less" >
.vux-header {
  background: linear-gradient(
    90deg,
    rgba(246, 86, 43, 1),
    rgba(231, 27, 27, 1)
  ) !important;
  border: none !important;
  .vux-header-title {
    color: #ffffff !important;
  }
  .iconfont.icon-back {
    color: #ffffff !important;
  }
}
</style>
<style scoped lang="less">
.connetBox{
  margin-top: 1.1rem;
  .BoxCore{
    padding: 0 .3rem;
    .BoxCoreB{
      height: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      >div{
        font-size: .28rem;
        color: #000;
      }
      .coreBTN{
        height: .4rem;
        width: 1rem;
        border: 1px solid #666666;
        border-radius: .2rem;
        line-height: .4rem;
        text-align: center;
        font-size: .28rem;
      }
    }
  }
}
</style>

