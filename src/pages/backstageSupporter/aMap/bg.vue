
<template>
 <div class="aMap">
   <x-header
      slot="header"
      :left-options="{showBack: false}"
      :style="{paddingTop: statusH + 'rem',height:statusH + 0.88 +'rem'}"
    >
      <a @click="OFF()" slot="left" class="backBox" :style="{paddingTop: statusH + 'rem'}">
        <i class="iconfont icon-back"></i>
      </a>
      地图
    </x-header>
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
      winH:''
    }
  },
  created () {
    let size = (document.documentElement.clientWidth / 7.5)
    this.statusH = (api.safeArea.top / size)
  },
  mounted () {
    // this.openMap()
    this.getLocation()
  },
  methods: {
    OFF () {
      var aMap = api.require('aMap');
      aMap.close();
      this.goBack()
    },
    getLocation () {
      var aMap = api.require('aMap');
      aMap.getLocation(function(ret, err) {
          if (ret.status) {
              // alert(ret.lon)
              // alert(ret.lat)
              aMap.open({
              rect: {
                  x: 0,
                  y: api.safeArea.top + 44,
                  // w: 320,
                  // h: 300
              },
              showUserLocation: true,
              showsAccuracyRing: false,
              zoomLevel: 11,
              center: {
                  // lon: ret.lon,
                  // lat: ret.lat
                  lon: 113.720134,
                  lat: 34.777296
              },
              fixedOn: api.frameName,
              fixed: true
          }, function(ret, err) {
              if (ret.status) {
                  // alert(JSON.stringify(ret));
                //   aMap.searchRoute({
                //     id: 1,
                //     type: 'drive',
                //     policy: 'drive_time_first',
                //     start: {
                //         lon: 113.720134,
                //         lat: 34.777296
                //     },
                //     end: {
                //         lon: 113.720134,
                //         lat: 34.878296
                //     },
                //     city: '北京',
                //     nightflag: false,
                //     waypoints: []
                // }, function(ret, err) {
                //     if (ret.status) {
                        // api.alert({ msg: JSON.stringify(ret) });
                      aMap.searchRoute({
                      type: 'drive',
                      policy: 'drive_fee_first',
                      start: {
                          lon: 111.720134,
                          lat: 34.777296
                      },
                      end: {
                          lon: 113.720134,
                          lat: 34.878296
                      }
                  }, function(ret, err) {
                      if (ret.status) {
                          aMap.drawRoute({
                              id: 1,
                              autoresizing: false,
                              index: 0,
                              styles: {
                                  // walkLine: {
                                  //     width: 3,
                                  //     color: '#698B22',
                                  //     lineDash: false,
                                  //     strokeImg: ''
                                  // },
                                   rideLine:{                    
                                      width: 3,                
                                      color:'#698B22',          
                                      lineDash:false,           
                                      strokeImg:'fs://e.png'
                                  },
                                  // driveLine: {
                                  //     width: 6,
                                  //     color: '#0000EE',
                                  //     lineDash: false,
                                  //     strokeImg: ''
                                  // },
                                  // busLine: {
                                  //     width: 4,
                                  //     color: '#00BFFF',
                                  //     lineDash: false,
                                  //     strokeImg: ''
                                  // },
                                  icons: {
                                      start: 'widget://s.png' ,
                                      end: 'fs://e.png',
                                      bus: '',
                                      car: 'widget://s.png',
                                      man: ''
                                  }
                              }
                          });
                      } else {
                          api.alert({ msg: JSON.stringify(ret) });
                      }
                  });

                // }
                // });


              } else {
                  alert(JSON.stringify(err));
              }
          });
          } else {
              alert(JSON.stringify(err));
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
