export const storage = {
  set: function (key, data) {
    try {
      if (window.api) {
        // 有全局api对象时原生也存储一下
        api.setPrefs({key: key, value: JSON.stringify(data)})
      }
      return window.localStorage.setItem(key, window.JSON.stringify(data))
    } catch (err) {
      if (window.api) {
        // 有全局api对象时原生也存储一下
        api.setPrefs({key: key, value: data})
      }
      return window.localStorage.setItem(key, data)
    }
  },
  get: function (key) {
    if (window.api) {
      // 有全局api对象时用原生存储
      try {
        return JSON.parse(api.getPrefs({sync: true, key: key}))
      } catch (err) {
        return api.getPrefs({sync: true, key: key})
      }
    } else {
      // 没有全局api对象时
      try {
        return window.JSON.parse(window.localStorage.getItem(key))
      } catch (err) {
        return window.localStorage.getItem(key)
      }
    }
  },
  remove: function (key) {
    if (window.api) {
      api.removePrefs({key: key})
      window.localStorage.removeItem(key)
    } else {
      return window.localStorage.removeItem(key)
    }
  }
}
export function copyText (text) {
  return new Promise(function (resolve, reject) {
    // 复制链接
    var input = document.createElement('input')
    input.value = text
    document.body.appendChild(input)
    input.select()
    input.setSelectionRange(0, input.value.length)
    document.execCommand('Copy')
    document.body.removeChild(input)
    resolve()
  })
}
/*
* 使用inShare模块,在targetsdkversion 26版本上运行良好
* @param imgArr: 要分享的图片数组
* @param targetApp: 要分享的目标app
* */
export function useInShare (imgArr, targetApp) {
  return new Promise(function (resolve, reject) {
    var inShare = api.require('inShare')
    inShare.shareImgsTo({
      imgPaths: imgArr.join(','),
      sendPattern: 'ONLY',
      app: targetApp
    })
  })
}
// 拖拽移动 传参接收一个dom对象。
export function drag (div1) {
  var maxW = document.body.clientWidth - div1.offsetWidth
  var maxH = document.body.clientHeight - div1.offsetHeight
  var isDrop = false
  var oL, oT, oLeft, oTop
  // 手指触摸开始，记录div的初始位置
  div1.addEventListener('touchstart', function (e) {
    var ev = e || window.event
    var touch = ev.targetTouches[0]
    oL = touch.clientX - div1.offsetLeft
    oT = touch.clientY - div1.offsetTop
    document.addEventListener('touchmove', defaultEvent, false)
  })
  // 触摸中的，位置记录
  div1.addEventListener('touchmove', function (e) {
    isDrop = true
    var ev = e || window.event
    var touch = ev.targetTouches[0]
    oLeft = touch.clientX - oL
    oTop = touch.clientY - oT
    if (oLeft < 0) {
      oLeft = 0
    } else if (oLeft >= maxW) {
      oLeft = maxW
    }
    if (oTop < 0) {
      oTop = 0
    } else if (oTop >= maxH) {
      oTop = maxH
    }
    div1.style.left = oLeft + 'px'
    div1.style.top = oTop + 'px'
  })
  // 触摸结束时的处理
  div1.addEventListener('touchend', function () {
    if (isDrop) {
      if (oLeft - (maxW / 2) > 0) {
        div1.style.left = maxW - 5 + 'px'
      } else {
        div1.style.left = '5px'
      }
      document.removeEventListener('touchmove', defaultEvent)
      isDrop = false
    }
  })
  // 阻止默认事件
  function defaultEvent (e) {
    e.preventDefault()
  }
}