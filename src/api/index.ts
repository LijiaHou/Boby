import axios from "axios"
import {createBrowserHistory} from 'history'
import {Modal} from 'antd'
import {globalConfig} from '@/globalConfig'

/**
 * 一些js中出现的请求概念
 * 
 * Ajax
 *      全称是Asynchronous JavaScript and XML，是一种将现有技术结合起来的方法。
 *    不需要重载整个网页就能向服务端请求数据，从而更新页面数据。
 * 
 * XMLHttpRequest
 *      是 Ajax 的核心API。
 * 
 * Fetch 
 *      2005年以来实现的获取资源的API，是原生的，相比XMLHttpRequest，接口更灵活，
 *    而且返回Promise。目前浏览器的支持度应该是没有XHR好，但是肯定是要逐步取代Ajax的。
 * 
 * Axios
 *      是一个基于Promise的HTTP库，可以用在浏览器和nodejs中
 * 
 *    特点：
 *      -从浏览器中创建XMLHttpRequests
 *      -从node.js中创建http请求
 *      -支持Promise
 *      -拦截请求和响应
 *      -转换请求数据和响应数据
 *      -取消请求
 *      -自动转换JSON数据
 *      -客户端支持防御XSRF
 * 
 * 
 * http（node.js）
 *      node.js环境下的发送http请求的模块，是node.js环境自带的，但是无法在浏览器环境使用。
 * 
*/

/**
 * node.js和浏览器环境的区别
 * 
 *  -浏览器和node.js都可以看做是JS运行的平台，浏览器一般是客户端运行的环境，nodejs则是服务端
 *  
 *  -JS需要浏览器的JS引擎进行解析执行，但是不同的浏览器的JS引擎不同，存在兼容性的问题。
 *    而node.js是基于Chrome v8引擎的运行环境，可以控制版本运行，没有兼容性问题（而你无法指定客户用什么浏览器）
 * 
 *  -也是由于各家浏览器的兼容性问题，发展也慢一些，用户升级也不统一，因此在浏览器上不得不使用比较旧的js版本，
 *    所以一般使用Babel将开发的代码转换为与ES5兼容的代码，再交付给浏览器。
 *    而node.js的代码则不需要这么做。
 * 
 *  -node.js使用CommonJS模块系统，而浏览器中还在使用ES模块标准
 *    CommonJS和esmodule是目前前端的主要模块化解决方案
 *    CommonJS
 *      -核心变量：exports、module.exports、require等
 *      -缺点commonjs加载是同步的，必须等到相应模块加载完才执行后续代码，在nodejs中没问题，因为文件都是本地的，
 *        但是在浏览器中请求js文件势必会造成一些卡顿。
 *      -webpack会对代码中commonjs进行处理
 *    
 *    esmodule
 *      -核心变量：export、export default、import等
 *      -输入的变量、函数或类时只读的
 *      -from后文件位置，可以使相对、绝对、模块名（可配置）
 *      -...
 * 
 * 
 *  -对于ECMAScript语法来说，二者都能运行。node.js中无法使用DOM和BOM操作（当然也没必要），
 *    相对的，浏览器环境也无法执行node.js中的文件操作等功能
 * 
 *  -浏览器中this指向window对象，node.js中this指向global对象
 * 
 *  -EventLoop 也有一定的区别
 * 
*/

const history = createBrowserHistory()

export const goto = (path) => {
  history.push(path)
}

let API_DOMAIN = '/api/'
if (process.env.NODE_ENV === 'production') {
  API_DOMAIN = 'http://xxx/api/'
}

export const SESSION_LOGIN_INFO = globalConfig.SESSION_LOGIN_INFO

export const API_CODE = {
  // API请求正常
  OK: 200,
  // API请求正常，数据异常
  ERR_DATA: 403,
  // API请求正常，空数据
  ERR_NO_DATA: 301,
  // API请求正常，登录异常
  ERR_LOGOUT: 401,
}

// API请求异常统一报错提示
export const API_FAILED = '网络连接异常，请稍后再试'
export const API_LOGOUT = '您的账号已在其他设备登录，请重新登录'

export const apiReqs = {
  signIn: (config) => {
    axios.post(API_DOMAIN + 'login', config.data)
    .then((res) => {
      let result = res.data
      config.done && config.done(result)
      if (result.code === API_CODE.OK) {
        window.localStorage.setItem(
          SESSION_LOGIN_INFO,
          JSON.stringify({
              uid: result.data.loginUid,
              nickname: result.data.nickname,
              token: result.data.token,
          })
        )
        config.success && config.success(result)
      } else {
        config.fail && config.fail(result)
      }
    })
    .catch(() => {
      config.done && config.done()
      config.fail &&
          config.fail({
              message: API_FAILED,
          })
      Modal.error({
          title: '登录失败',
      })
    })
  }
}
