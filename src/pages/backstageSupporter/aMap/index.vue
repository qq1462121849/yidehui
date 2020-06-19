
<template>
 <div class="aMap">
   <x-header
      slot="header"
      :left-options="{showBack: false}"
      :style="{paddingTop: statusH + 'rem',height:statusH + 0.88 +'rem'}"
    >
      <a @click="goBack()" slot="left" class="backBox" :style="{paddingTop: statusH + 'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      地图
    </x-header>
    <div class="MapBox" :style="{paddingTop: statusH + 'rem'}">
      <div class="openBox" @click="jumpTo('/aMapaMap')">
        打开高德地图
      </div>
      <div class="openBox" @click="getDist">
        两点之间
      </div>
      <div class="openBox" @click="searchRou">
        搜索路线方案 
      </div>
      <div class="openBox" @click="drawRou">
        绘制显示 searchRoute 搜索到的指定路线
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
  name: 'aMap',
  components: {TabItem,Tab,TabItem,Popup,MescrollVue,formatDate},
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
    getDist () {
      var aMap = api.require('aMap');
      aMap.getDistance({
          start: {
              lon: 106.486654,
              lat: 29.490295
          },
          end: {
              lon: 106.581515,
              lat: 29.615467
          }
      }, function(ret, err) {
          if (ret.status) {
              alert(JSON.stringify(ret));
          } else {
              alert(JSON.stringify(err));
          }
      });
    },
    searchRou () {
      var aMap = api.require('aMap');
      aMap.searchRoute({
          id: 1,
          type: 'drive',
          policy: 'drive_time_first',
          start: {
              lon: 116.403838,
              lat: 39.914437
          },
          end: {
              lon: 116.384852,
              lat: 39.989576
          },
          city: '北京',
          nightflag: false,
          waypoints: []
      }, function(ret, err) {
          if (ret.status) {
              api.alert({ msg: JSON.stringify(ret) });
          }
      });
    },
    drawRou () {
      var aMap = api.require('aMap');
      aMap.searchRoute({
          type: 'drive',
          policy: 'drive_fee_first',
          start: {
              lon: 116.403838,
              lat: 39.914437
          },
          end: {
              lon: 116.384852,
              lat: 39.989576
          }
      }, function(ret, err) {
          if (ret.status) {
              aMap.drawRoute({
                  id: 1,
                  autoresizing: false,
                  index: 0,
                  styles: {
                      walkLine: {
                          width: 3,
                          color: '#698B22',
                          lineDash: false,
                          strokeImg: ''
                      },
                      driveLine: {
                          width: 6,
                          color: '#0000EE',
                          lineDash: false,
                          strokeImg: ''
                      },
                      busLine: {
                          width: 4,
                          color: '#00BFFF',
                          lineDash: false,
                          strokeImg: ''
                      },
                      icons: {
                          start: '',
                          end: '',
                          bus: '',
                          car: '',
                          man: ''
                      }
                  }
              });
          } else {
              api.alert({ msg: JSON.stringify(ret) });
          }
      });
    }
  },
  activated () {

  }
}
</script>

<style scoped lang="less">
.MapBox{
  margin-top: .88rem;
  .openBox{
    height: .88rem;
    line-height: .88rem;
  }
}
</style>
