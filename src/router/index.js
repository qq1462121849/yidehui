import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import * as utils from '../utils'

Vue.use(Router)
console.log('*7*7*7*7*7*7**',utils.storage.get('APPClass'))
var homeRouter = ''
if (utils.storage.get('APPClass') == 'shop') {
  homeRouter = '/home'
} else {
  homeRouter = '/home1'
}

let router = new Router({
  routes: [
    {
      // path: '/',
      // name: 'layout',
      // component: resolve => require(['@/pages/layout/'], resolve),
      // redirect: '/login',
      path: '/',
      name: 'layout',
      component: resolve => require(['@/pages/layout/'], resolve),
      redirect: homeRouter,
      children: [
        {
          path: '/login',
          name: 'login',
          component: resolve => require(['@/pages/auth/login'], resolve),
          meta: {title: '登录'}
        },
        {
          path: '/home',
          name: 'home',
          component: resolve => require(['../pages/backstageSupporter/Ashangjia/index'], resolve),
          meta: {title: '商家管理', keepAlive: false, isShowSearch: false, isShowTab1: true, routerZindex: 1}
        },
        {
          path: '/closeDetail',
          name: 'closeDetail',
          component: resolve => require(['../pages/backstageSupporter/Ashangjia/closeDetail'], resolve),
          meta: {title: '商家结算详情', keepAlive: true, isShowSearch: false,  routerZindex: 1}
        },
        {
          path: '/closeRecord',
          name: 'closeRecord',
          component: resolve => require(['../pages/backstageSupporter/Ashangjia/closeRecord'], resolve),
          meta: {title: '结算申请记录', keepAlive: true, isShowSearch: false,  routerZindex: 1}
        },
        {
          path: '/companyData',
          name: 'companyData',
          component: resolve => require(['../pages/backstageSupporter/Ashangjia/companyData'], resolve),
          meta: {title: '商家信息', keepAlive: true, isShowSearch: false,  routerZindex: 1}
        },
        {
          path: '/orderStatistics',
          name: 'orderStatistics',
          component: resolve => require(['../pages/backstageSupporter/Ashangjia/orderStatistics'], resolve),
          meta: {title: '商家订单统计', keepAlive: true, isShowSearch: false,  routerZindex: 1}
        },
        {
          path: '/addBypassAccount',
          name: 'addBypassAccount',
          component: resolve => require(['../pages/backstageSupporter/Ashangjia/addBypassAccount'], resolve),
          meta: {title: '添加子账号', keepAlive: true, isShowSearch: false,  routerZindex: 1}
        },
        {
          path: '/addCloseAccount',
          name: 'addCloseAccount',
          component: resolve => require(['../pages/backstageSupporter/Ashangjia/addCloseAccount'], resolve),
          meta: {title: '添加结算账号', keepAlive: true, isShowSearch: false,  routerZindex: 1}
        },
        {
          path: '/merchantCloseApply',
          name: 'merchantCloseApply',
          component: resolve => require(['../pages/backstageSupporter/Ashangjia/merchantCloseApply'], resolve),
          meta: {title: '商家结算申请', keepAlive: true, isShowSearch: false,  routerZindex: 1}
        },
        {
          path: '/BmerchantIndex',
          name: 'BmerchantIndex',
          component: resolve => require(['../pages/backstageSupporter/Bmerchant/index'], resolve),
          meta: {title: '商品管理', keepAlive: true, isShowSearch: false,isShowTab1: true, routerZindex: 1}
        },
        {
          path: '/merGoodsDetail',
          name: 'merGoodsDetail',
          component: resolve => require(['../pages/backstageSupporter/Bmerchant/merGoodsDetail'], resolve),
          meta: {title: '商品详情', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/orderScreen1B',
          name: 'orderScreen1B',
          component: resolve => require(['../pages/backstageSupporter/Bmerchant/orderScreen1B'], resolve),
          meta: {title: '商品搜索', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/orderScreen2B',
          name: 'orderScreen2B',
          component: resolve => require(['../pages/backstageSupporter/Bmerchant/orderScreen2B'], resolve),
          meta: {title: '商品分类搜索', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/classifyDetail',
          name: 'classifyDetail',
          component: resolve => require(['../pages/backstageSupporter/Bmerchant/classifyDetail'], resolve),
          meta: {title: '商品分类详情', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/CorderManagindex',
          name: 'CorderManagindex',
          component: resolve => require(['../pages/backstageSupporter/CorderManag/index'], resolve),
          meta: {title: '订单管理', keepAlive: true, isShowSearch: false,isShowTab1: true, routerZindex: 1}
        },
        {
          path: '/orderGoodsDetail',
          name: 'orderGoodsDetail',
          component: resolve => require(['../pages/backstageSupporter/CorderManag/orderGoodsDetail'], resolve),
          meta: {title: '订单详情', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/orderGoodsDetailReturn',
          name: 'orderGoodsDetailReturn',
          component: resolve => require(['../pages/backstageSupporter/CorderManag/orderGoodsDetailReturn'], resolve),
          meta: {title: '退货订单详情', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/orderScreen',
          name: 'orderScreen',
          component: resolve => require(['../pages/backstageSupporter/CorderManag/orderScreen'], resolve),
          meta: {title: '订单筛选', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/orderScreenReturn',
          name: 'orderScreenReturn',
          component: resolve => require(['../pages/backstageSupporter/CorderManag/orderScreenReturn'], resolve),
          meta: {title: '退货订单筛选', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/DreviewAuditindex',
          name: 'DreviewAuditindex',
          component: resolve => require(['../pages/backstageSupporter/DreviewAudit/index'], resolve),
          meta: {title: '评论审核', keepAlive: true, isShowSearch: false,isShowTab1: true, routerZindex: 1}
        },
        {
          path: '/reviewAuditDetail',
          name: 'reviewAuditDetail',
          component: resolve => require(['../pages/backstageSupporter/DreviewAudit/reviewAuditDetail'], resolve),
          meta: {title: '评论详情', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/Ereceiptindex',
          name: 'Ereceiptindex',
          component: resolve => require(['../pages/backstageSupporter/Ereceipt/index'], resolve),
          meta: {title: '商家收款', keepAlive: true, isShowSearch: false,isShowTab1: true, routerZindex: 1}
        },
        {
          path: '/receiptGoodsDetail',
          name: 'receiptGoodsDetail',
          component: resolve => require(['../pages/backstageSupporter/Ereceipt/receiptGoodsDetail'], resolve),
          meta: {title: '商家线下付款订单详情', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/QRCode',
          name: 'QRCode',
          component: resolve => require(['../pages/backstageSupporter/Ereceipt/QRCode'], resolve),
          meta: {title: '商家二维码', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/gatheringStatistics',
          name: 'gatheringStatistics',
          component: resolve => require(['../pages/backstageSupporter/Ereceipt/gatheringStatistics'], resolve),
          meta: {title: '商家收款统计', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/paymentSearch',
          name: 'paymentSearch',
          component: resolve => require(['../pages/backstageSupporter/Ereceipt/paymentSearch'], resolve),
          meta: {title: '订单信息', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/payeeGoodsDetail',
          name: 'payeeGoodsDetail',
          component: resolve => require(['../pages/backstageSupporter/Ereceipt/payeeGoodsDetail'], resolve),
          meta: {title: '收款记录详情', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/setupindex',
          name: 'setupindex',
          component: resolve => require(['../pages/backstageSupporter/setup/index'], resolve),
          meta: {title: '设置', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/nickname',
          name: 'nickname',
          component: resolve => require(['../pages/backstageSupporter/setup/nickname'], resolve),
          meta: {title: '昵称设置', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/headPortrait',
          name: 'headPortrait',
          component: resolve => require(['../pages/backstageSupporter/setup/headPortrait'], resolve),
          meta: {title: '头像设置', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/changePassword',
          name: 'changePassword',
          component: resolve => require(['../pages/backstageSupporter/setup/changePassword'], resolve),
          meta: {title: '修改密码', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/setdistance',
          name: 'setdistance',
          component: resolve => require(['../pages/backstageSupporter/setup/setdistance'], resolve),
          meta: {title: '修改配送距离', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/businessHours',
          name: 'businessHours',
          component: resolve => require(['../pages/backstageSupporter/setup/businessHours'], resolve),
          meta: {title: '营业时间设置', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },






        {
          path: '/home1',
          name: 'home1',
          component: resolve => require(['../pages/backstageSupporter2/Ashangjia/index'], resolve),
          meta: {title: '商家管理', keepAlive: true, isShowSearch: false, isShowTab2: true, routerZindex: 1}
        },
        {
          path: '/merGoodsDetail1',
          name: 'merGoodsDetail1',
          component: resolve => require(['../pages/backstageSupporter2/Ashangjia/merGoodsDetail'], resolve),
          meta: {title: '商家详情', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/applyForDetail',
          name: 'applyForDetail',
          component: resolve => require(['../pages/backstageSupporter2/Ashangjia/applyForDetail'], resolve),
          meta: {title: '商家申请详情', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/merchantSearch',
          name: 'merchantSearch',
          component: resolve => require(['../pages/backstageSupporter2/Ashangjia/merchantSearch'], resolve),
          meta: {title: '商家管理搜索', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/applyForsearch',
          name: 'applyForsearch',
          component: resolve => require(['../pages/backstageSupporter2/Ashangjia/applyForsearch'], resolve),
          meta: {title: '商家申请搜索', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/BmerchantIndex1',
          name: 'BmerchantIndex1',
          component: resolve => require(['../pages/backstageSupporter2/Bmerchant/index'], resolve),
          meta: {title: '商品管理', keepAlive: true, isShowSearch: false,isShowTab2: true, routerZindex: 1}
        },
        {
          path: '/merGoodsDetailB',
          name: 'merGoodsDetailB',
          component: resolve => require(['../pages/backstageSupporter2/Bmerchant/merGoodsDetail'], resolve),
          meta: {title: '商家详情', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/applyForDetailB',
          name: 'applyForDetailB',
          component: resolve => require(['../pages/backstageSupporter2/Bmerchant/applyForDetail'], resolve),
          meta: {title: '商家申请详情', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/merchantSearchB',
          name: 'merchantSearchB',
          component: resolve => require(['../pages/backstageSupporter2/Bmerchant/merchantSearch'], resolve),
          meta: {title: '商品管理搜索', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/applyForsearchB',
          name: 'applyForsearchB',
          component: resolve => require(['../pages/backstageSupporter2/Bmerchant/applyForsearch'], resolve),
          meta: {title: '商品申请搜索', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/CorderManagIndex1',
          name: 'CorderManagIndex1',
          component: resolve => require(['../pages/backstageSupporter2/CorderManag/index'], resolve),
          meta: {title: '订单管理', keepAlive: true, isShowSearch: false,isShowTab2: true, routerZindex: 1}
        },
        {
          path: '/merGoodsDetailC',
          name: 'merGoodsDetailC',
          component: resolve => require(['../pages/backstageSupporter2/CorderManag/merGoodsDetail'], resolve),
          meta: {title: '订单详情', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/merchantSearchC',
          name: 'merchantSearchC',
          component: resolve => require(['../pages/backstageSupporter2/CorderManag/merchantSearch'], resolve),
          meta: {title: '订单管理搜索', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/applyForDetailC',
          name: 'applyForDetailC',
          component: resolve => require(['../pages/backstageSupporter2/CorderManag/applyForDetail'], resolve),
          meta: {title: '线下订单详情', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/applyForsearchC',
          name: 'applyForsearchC',
          component: resolve => require(['../pages/backstageSupporter2/CorderManag/applyForsearch'], resolve),
          meta: {title: '线下订单详情', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },

        {
          path: '/setupindex1',
          name: 'setupindex1',
          component: resolve => require(['../pages/backstageSupporter2/setup/index'], resolve),
          meta: {title: '设置', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/nickname1',
          name: 'nickname1',
          component: resolve => require(['../pages/backstageSupporter2/setup/nickname'], resolve),
          meta: {title: '昵称设置', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/headPortrait1',
          name: 'headPortrait1',
          component: resolve => require(['../pages/backstageSupporter2/setup/headPortrait'], resolve),
          meta: {title: '头像设置', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/changePassword1',
          name: 'changePassword1',
          component: resolve => require(['../pages/backstageSupporter2/setup/changePassword'], resolve),
          meta: {title: '修改密码', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        // {
        //   path: '/aMap',
        //   name: 'aMap',
        //   component: resolve => require(['../pages/backstageSupporter/aMap/index'], resolve),
        //   meta: {title: '地图', keepAlive: true, isShowSearch: false, routerZindex: 1}
        // },
        {
          path: '/aMapaMap',
          name: 'aMapaMap',
          component: resolve => require(['../pages/backstageSupporter/aMap/aMap'], resolve),
          meta: {title: '地图', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/dada',
          name: 'dada',
          component: resolve => require(['../pages/backstageSupporter/setup/dada'], resolve),
          meta: {title: '地图', keepAlive: true, isShowSearch: false, routerZindex: 1}
        },
        {
          path: '/ConnectPrinter',
          name: 'ConnectPrinter',
          component: resolve => require(['../pages/backstageSupporter/setup/ConnectPrinter'], resolve),
          meta: {title: '打印机列表', keepAlive: true,isShowSearch: false, isShowHead: false, routerZindex: 1}
        },
        {
          path: '/cs',
          name: 'cs',
          component: resolve => require(['../pages/backstageSupporter/setup/cs'], resolve),
          meta: {title: 'cs', keepAlive: true,isShowSearch: false, isShowHead: true, routerZindex: 1}
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})

const whiteList = ['login', 'about', 'register', 'newIndex', 'forget', 'mobileLogin', 'wechatLogin', 'guide', 'wxbind', 'home', 'sort', 'super', 'my', 'my1', 'my2', 'my3', 'my4','supergoods', 'supergoods2', 'search', 'results', 'list', 'fastrob', 'personSpeak', 'personArticle', 'discounts', 'circle', 'otherclassify', 'classify', 'liveBroadcast', 'dayingList', 'daying', 'comment', 'mallHome', 'mallHomeDetail', 'mallBusiness', 'mallSeller', 'mallUnderShop', 'mallUnderdetail', 'mallProductList', 'mallShopProductList', 'mallCategory', 'mallSecthList', 'mallNews', 'mallSearch', 'mallArticleList', 'mallArticleInfo', 'select']
router.beforeEach(function (to, from, next) {
  var firstPage = ['/home', '/newIndex', '/sort', '/fastrobNew', '/super',  '/my', '/newIndex', '/mall/home', '/mall/business', '/mall/underShop', '/mall/my', '/mall/cart', '/upgradeOperator', '/rightsConter']
  var currentRoute = to.path
  if (firstPage.indexOf(currentRoute) > -1) {
    window.canRightSlipBack = false
  } else {
    window.canRightSlipBack = true
  }
  // 登录拦截
  store.commit('hide')
  if (!config.isMallShop && currentRoute.indexOf('/mall/home') != -1) {
    // 当前往线上商城首页并无权进入时
    alert('此安装包暂无权限进入商城')
    return
  }
  if (!config.isMallUnderShop && currentRoute.indexOf('/mall/underShop') != -1) {
    // 当前往线下商城首页并无权进入时
    alert('此安装包暂无权限进入线下商城')
    return
  }
  if (whiteList.indexOf(to.name) < 0 && !store.state.user.token) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

export default router
