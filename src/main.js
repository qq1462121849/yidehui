// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import plugin from './plugin'
import http from './api/http'
import Vuex from 'vuex'
import Clipboard from 'v-clipboard'
import VueLazyload from 'vue-lazyload'
import {
	XHeader,
	ToastPlugin,
	ConfirmPlugin,
	LoadingPlugin,
	DatetimePlugin
} from 'vux'
import '../static/libs/iconfont/iconfont.css'
import VueScroller from 'vue-scroller'
import 'swiper/dist/css/swiper.css'
import * as utils from './utils'

require('./api/mock.js')
Vue.use(Clipboard).use(Vuex).use(ToastPlugin, {
	position: 'bottom'
}).use(ConfirmPlugin).use(DatetimePlugin).use(LoadingPlugin).use(VueScroller)
Vue.prototype.$http = http
Vue.prototype.$utils = utils
Vue.prototype.$img = utils.storage.get('defaultImg') ? utils.storage.get('defaultImg') : require('@/assets/img/bg.png')
Vue.use(VueLazyload, {
	loading: utils.storage.get('defaultImg') ? utils.storage.get('defaultImg') : require('@/assets/img/bg.png'),
	preLoad: 2,
	error: utils.storage.get('errorImg') ? utils.storage.get('errorImg') : require('@/assets/img/error.png'),
	adapter: 1
})
Vue.prototype.$logo = utils.storage.get('appLoginLogo') ? utils.storage.get('appLoginLogo') : '',
	Vue.prototype.ToLink = function(path) {
		console.log(JSON.stringify(path))
		this.$router.replace(path);

	}

// 右滑相关代码 —————————————start—————————————————
window.canRightSlipBack = true
Vue.prototype.rightSlip = function() {
	if (window.canRightSlipBack) {
		if (api.pageParam.backToWin) {
			// 当界面有别的window可返回，不做拦截，通过原生的右滑返回来处理
		} else {
			router.go(-1)
		}
	}
}
Vue.prototype.forbidRightSlip = function() {
	window.canRightSlipBack = false
}
Vue.prototype.allowRightSlip = function() {
	setTimeout(() => {
		window.canRightSlipBack = true
	}, 3000)
}



Vue.directive('swiperight', {
	bind: function(el, binding) {
		// new vueTouch(el, binding, 'swiperight')
	}
})
// 右滑相关代码 —————————————end—————————————————

Vue.component('x-header', XHeader)

Vue.use(plugin, {
	router: router
})	

Vue.config.productionTip = false
// Vue.prototype.link = 'http://liny.yoyotao6688.com/api/' + config.bizId
Vue.prototype.link = 'http://shop.yidehui.net/bshop/261/api.php' 
Vue.prototype.$color = '#fc3357'
// 控制线下的内容是否开启
Vue.prototype.$isMallUnderShop = config.isMallUnderShop
// 支付宝支付模块
Vue.prototype.$aliPay = config.aliPay
Vue.prototype.$bizId = config.bizId
// 控制线上的内容是否开启
Vue.prototype.$isMallShop = config.isMallShop
// 阿里百川模块跳转淘宝的返回小把手需要传的值
Vue.prototype.$urlScheme = config.urlScheme

Vue.prototype.$Time = null

window.vueObj = new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})





