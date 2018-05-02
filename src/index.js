import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
// 我们安装好 react-redux包之后  provider组件在应用的最外层 差传入store 只用一次
import {Provider} from 'react-redux'
// import {counter} from "./actions";
//  因为涉及到了多个recucers  我们进行了合并 并且返回这样
import reducers from './reducers'
import AuthRoute from './component/authRoute/authRoute'

// 引入react-router组件
import {BrowserRouter, Route, Switch} from 'react-router-dom'
// 引入页面组件 】
import Login from './pages/login/login'
import Register from './pages/register/register'
import BossInfo from './pages/BossInfo/BossInfo'
import GeniusInfo from './pages/GeniusInfo/GeniusInfo'
import Dashboard from './component/Dashboard/Dashboard'
import Chat from './component/Chat/Chat'

// 增加拦截器的功能
import './config'
import './index.css'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hasError: false
    }
  }
  //  捕捉页面错误 类似于try  catch
  componentDidCatch (err, info) {
    console.log(err)
    this.setState({
      hasError: true
    })
  }
  render () {
    console.log('又进入了主页的渲染')
    console.log(this.props)
    return (
      (
        this.state.hasError
          ? <h2>喔喔，页面崩溃了</h2>
          : <div>
            {/* Switch的作用  只渲染命中的第一个路由 */}
            <AuthRoute />
            <Switch>
              {/* router路由中  是采用的正则匹配的模式  /erying 会包含/的内容  使用严格模式以后exact  会解决这中问题 */}
              <Route path='/login' component={Login} exact />
              <Route path='/register' component={Register} />
              <Route path='/bossinfo' component={BossInfo} />
              <Route path='/geniusInfo' component={GeniusInfo} />
              <Route path='/chat/:id' component={Chat} />
              {/* <Route path='/boss' component={Boss}></Route> */}
              {/* <Route path='/genius' component={Genius}></Route> */}
              {/* 在这个项目中  很多页面 会共享一个头部和底部  我们使用dashboard来代替   */}
              <Route component={Dashboard} />
            </Switch>
          </div>
      ))
  }
}

ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ),
  document.getElementById('root'))
