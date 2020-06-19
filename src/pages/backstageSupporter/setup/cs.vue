<template>
  <div id="cs">
    <h1 @click="getBluetoothPrinters">获取蓝牙打印机列表</h1>
    <h1>*****</h1>
    <h1 @click="createBondToPrinter">绑定蓝牙打印机</h1>
    <h1>*****</h1>
    <h1 @click="printOnSpeci">将打印内容发送到指定地址的打印机</h1>
    <h1>*****</h1>
    <h1 @click="getOrder">获取订单</h1>
    <h1>*****</h1>
    <h1 @click="removeBondToPrinter">解除绑定</h1>
    <h1>*****</h1>
  </div>
</template>

<script>
export default {
  name: 'cs',
  data () {
    return {
      orderPrintList:[]
    }
  },
  created () {
  },
  methods: {
    getBluetoothPrinters(){
      var printModule = api.require('posPrinter');
      var param = {
          'status': 'bonded'
      };
      printModule.getBluetoothPrinters(param, function (ret, err) {
          alert(JSON.stringify(ret));
          console.log(ret.length)
          for (var i = 0;i<ret.length;i++) {
            console.log(ret[i].name)
            console.log(ret[i].address)
          }
      });
    },
    createBondToPrinter () {
       api.showProgress({
            style: 'default',
            animationType: 'fade',
            title: '正在绑定...',
            text: '请稍等...',
            modal: true
        });

        var module = api.require('posPrinter');
        module.createBondToPrinter({
          address:"DC:0D:30:8E:36:0E"
        } , function(ret,err){
            api.hideProgress();
            if(err){
                alert(JSON.stringify(err));
          }
            else if(ret && ret.result == "ok"){
                alert("绑定成功");
            }
        });
    },
    getOrder () {
      this.$http.post("", {
          do: "shop",
          op: "orderPrint",
          orderId :'Shop200601174517684'
        }).then(res => {
          if (res.code == 1) {
            alert(JSON.stringify(res.data));
            this.orderPrintList = res.data
            // this.printOnSpeci(res.data)
          }
        })
    },
    printOnSpeci () {
      var orderInfo;
      orderInfo = "<CA>***"+this.orderPrintList.number+this.orderPrintList.title+"***</CA><BR>";
      orderInfo += "<BR><BR>";
      orderInfo += "<C>"+this.orderPrintList.shopName+"</C><BR><BR>";
      orderInfo += "<B>"+this.orderPrintList.userAddress+"</B><BR>";
      orderInfo += "<B>"+this.orderPrintList.userPhone+"</B><BR>";
      if(this.orderPrintList.payStatus==1){
        orderInfo += "<B><C>--已在线付款--</C></B><BR><BR>";
      } else {
        orderInfo += "<B><C>--未支付--</C></B><BR><BR>";
      }
      orderInfo += "名称　　　　　 单价      数量<BR>";
      orderInfo += "--------------------------------<BR>";
      for (var i = 0;i<this.orderPrintList.list.length;i++) {
        orderInfo += this.orderPrintList.list[i]['goodsName']+"  "+this.orderPrintList.list[i]['price']+"  "+this.orderPrintList.list[i]['count']+"<BR>";
      }
      orderInfo += "--------------------------------<BR>";
      orderInfo += "配送费："+this.orderPrintList.postMoney+"<BR>" ;
      orderInfo += "餐盒费："+this.orderPrintList.boxMoney+"<BR>" ;
      orderInfo += "--------------------------------<BR>";
      orderInfo += "<L>合计：" + this.orderPrintList.totalPay + "元</L><BR>";
      orderInfo += "<BR><BR>";
      orderInfo += "<CA><C>***" + this.orderPrintList.number + "***</C></CA><BR><BR><BR>";
      orderInfo += "<CUT>";

      var printModule = api.require('posPrinter');
      var params = { 
          taskList: [{ 
                  printerAddr: 'DC:0D:30:8E:36:0E', 
                  content: orderInfo, 
                  keepAlive:true,       //蓝牙打印机，建议把keepAlive设为true
                  copyNum: 1 
              }
          ] 
      };
      printModule.printOnSpecifiedPrinters(params);
    },
    removeBondToPrinter () {
      var printModule = api.require('posPrinter');
      var param = {
          'address': 'DC:0D:30:8E:36:0E'
      };
      printModule.removeBondToPrinter(param, function (ret, err) {
          alert(JSON.stringify(ret));
      });
    }
  },
  mounted: function () {

  }
}
</script>

<style scoped lang="less">

</style>

