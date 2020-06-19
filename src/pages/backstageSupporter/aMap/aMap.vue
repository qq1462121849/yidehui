
<template>
  <div class="aMap">
    <x-header slot="header" :left-options="{showBack: false}" :style="{paddingTop: statusH + 'rem',height:statusH + 0.88 +'rem'}">
      <a @click="OFF()" slot="left" class="backBox" :style="{paddingTop: statusH + 'rem',color:'#fff'}">
        <i class="iconfont icon-back"></i>
      </a>
      地图
    </x-header>
  </div>
</template>

<script>
import MescrollVue from "mescroll.js/mescroll.vue";
import * as apiHttp from "../../../api/index";
import { formatDate } from "../../../plugin/data";
import { Confirm, Tab, TabItem, Popup } from "vux";
export default {
  name: "aMap",
  components: { TabItem, Tab, TabItem, Popup, MescrollVue, formatDate },
  data() {
    return {
      statusH: "",
      winH: "",
      orderId: this.$route.query.orderId,
      shopLat:'',
      shopLon:'',
      userLat:'',
      userLon:'',
      dmLat:'',
      dmLon:'',
    };
  },
  created() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
  },
  mounted() {
    // this.openMap()
    this.getLonLat();
    this.getLocation();
  },
  methods: {
    getLonLat() {
      this.$http.post('', {
          do:'shop',
          op: 'dadaOrderInfo',
          orderId: this.orderId
      }).then(res => {
        // alert(JSON.stringify(res.data))
        this.shopLat = res.data.shop.lat
        this.shopLon = res.data.shop.lng
        this.userLat = res.data.user.lat
        this.userLon = res.data.user.lng
        this.dmLat = res.data.dm.lat
        this.dmLon = res.data.dm.lng
      })
    },
    OFF() {
      var aMap = api.require("aMap");
      aMap.close();
      this.goBack();
    },
    getLocation() {
      var that = this
      var aMap = api.require("aMap");
      aMap.getLocation({
        enableLocInForeground:true
      },function(ret, err) {
        
        if (ret.status) {
          // alert(ret.lon)
          // alert(ret.lat)
          aMap.showUserLocation({
              isShow: true,
              imagePath: 'widget://s.png'
          });
          aMap.open({
              rect: {
                x: 0,
                y: api.safeArea.top + 44
                // w: 320,
                // h: 300
              },
              showUserLocation: true,
              showsAccuracyRing: true,
              zoomLevel: 11,
              center: {
                lon: that.dmLon, //经度
                lat: that.dmLat  //纬度
              },
              fixedOn: api.frameName,
              fixed: true
            },
            function(rett, err) {
              if (rett.status) {
                aMap.searchRoute(
                  {
                    type: "ride",
                    policy: "drive_dis_first",
                    start: {
                      lon: that.shopLon,
                      lat: that.shopLat
                    },
                    end: {
                      lon: that.userLon,
                      lat: that.userLat
                    }
                  },
                  function(retd, err) {
                    if (retd.status) {
                      // alert(JSON.stringify(retd))
                      aMap.drawRoute({
                        id: 1,
                        autoresizing: true,
                        index: 0,
                        styles: {
                          rideLine: {
                            width: 3,
                            color: "#0000EE",
                            lineDash: false,
                            strokeImg: "fs://e.png" 
                          },
                          icons: {
                            start: "",
                            end: "",
                            // ride: "fs://s.png",
                          }
                        }
                      });
                    }
                  }
                );
              }
            }
          );
        }
      });
    }
  },
  activated() {}
};
</script>

<style scoped lang="less">
.MapBox {
  margin-top: 0.88rem;
  .openBox {
    height: 0.88rem;
    line-height: 0.88rem;
  }
}
</style>
