<template>
  <div class="closeDetail">
    <x-header
      slot="header"
      :left-options="{showBack: false}"
      :style="{paddingTop: statusH + 'rem',height:statusH + 0.88 +'rem'}"
    >
      <a @click="goBack()" slot="left" class="backBox" :style="{paddingTop: statusH + 'rem'}">
        <i class="iconfont icon-back"></i>
      </a>

      修改配送距离
    </x-header>
    <div class="closeDetail-coreBox" :style="{paddingTop: statusH + 'rem'}">
      <div style="height:.2rem;background:#f2f2f2;"></div>
      <div class="close-core-body">
        <div class="close-core">
          <div>配送距离(米)</div>
          <input v-model="oldPass" type="text" placeholder="请输入配送距离" style="padding-left:0.3rem;" />
        </div>
      </div>
      <div class="submit-box">
        <div class="submit-box-core" @click="saveChange">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as apiHttp from "../../../api/index";
import { Confirm, Tab, TabItem, Popup, XSwitch } from "vux";
export default {
  name: "changePassword",
  components: { TabItem, Tab, TabItem, Popup, XSwitch },
  data() {
    return {
      statusH: "",
      value: false,
      countDown: "60",
      showVer: true,
      oldPass: "",
      newPass1: "",
      newPass2: "",
      userPhone: "",
      verCode: "",
      codePic: "",
      hash: ""
    };
  },
  created() {
    let size = document.documentElement.clientWidth / 7.5;
    this.statusH = api.safeArea.top / size;
    this.getTime()
  },
  mounted() {
    this.getCodePic();
  },
  inject: ["reload"],
  methods: {
    getCodePic() {
      this.codeNum = "";
      this.$http.get("", { do: "auth", op: "getVerifyUrl" }, true).then(res => {
        if (res.code == 1) {
          this.codePic = res.data.url;
          this.hash = res.data.hash;
        }
      });
    },
     getTime () {
       this.$http.post("", {
        do:'shop',
        op:'setHours',
      }, true).then(res => {
        if (res.code == 1 ) {
         this.oldPass=res.data.info.businessHours.distance
        }
      })
    },
    saveChange() {
      this.$http
        .post(
          "",
          {
            do: "shop",
            op: "setHours",
            type: "save",
            distance:this.oldPass
          },
          true
        )
        .then(res => {
          if (res.code == 1) {
            this.$vux.toast.text("修改成功");
            
          }
        });
    },
    layout() {
      this.$store.commit("logout");
      this.reload();
      this.$router.replace("/login");
    }
   
  },
  activated() {}
};
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
.vux-x-switch.weui-cell.weui-cell_switch {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.1rem;
  .weui-cell__bd {
    font-size: 0.3rem;
    font-weight: 500;
    color: rgba(27, 27, 27, 1);
  }
}
</style>
<style scoped lang="less">
.closeDetail {
  background: #ffffff;
  .vux-header {
    background: linear-gradient(
      90deg,
      rgba(246, 86, 43, 1),
      rgba(231, 27, 27, 1)
    ) !important;
    border: none !important;
  }
  .closeDetail-coreBox {
    margin-top: 0.88rem;
    .close-core-body {
      padding: 0 0.3rem;
      .close-core {
        display: flex;
        // justify-content: space-between;
        align-items: center;
        height: 1.1rem;
        border-bottom: 1px solid #f2f2f2;
        input {
          width: 50%;
          height: 0.8rem;
          border: none;
          outline: none;
          font-size: 0.3rem;
          color: rgba(102, 102, 102, 1);
        }
        > div:nth-child(1) {
          width: 25%;
          font-size: 0.3rem;
          font-weight: 500;
          color: rgba(27, 27, 27, 1);
        }
        .logoBox {
          display: flex;
          align-items: center;
        }
        > div:nth-child(3) {
          width: 25%;
          font-size: 0.3rem;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          text-align: center;
        }
        .close-core-color {
          color: rgba(231, 28, 27, 1) !important;
        }
        img {
          width: 1.5rem;
          height: 0.8rem;
        }
      }
    }
    .submit-box {
      padding: 0 0.75rem;
      background: #f2f2f2;
      overflow: hidden;
      .submit-box-core {
        width: 100%;
        height: 0.88rem;
        background: linear-gradient(
          90deg,
          rgba(246, 86, 43, 1),
          rgba(231, 27, 27, 1)
        );
        border-radius: 0.1rem;
        line-height: 0.88rem;
        text-align: center;
        font-size: 0.34rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        margin-top: 2.3rem;
      }
    }
  }
}
</style>
