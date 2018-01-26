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
import {BrowserRouter, Route, Link, Redirect, Switch} from 'react-router-dom'
// 引入页面组件 】
import Login from './pages/login/login'
import Register from './pages/register/register'


const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));


ReactDOM.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    {/*Switch的作用  只渲染命中的第一个路由*/}
                    <AuthRoute></AuthRoute>

                    <Switch>
                        {/*router路由中  是采用的正则匹配的模式  /erying 会包含/的内容  使用严格模式以后exact  会解决这中问题 */}
                        <Route path='/login' component={Login} exact></Route>
                        <Route path='/register' component={Register}></Route>
                    </Switch>

                </div>

            </BrowserRouter>
        </Provider>
    ),
    document.getElementById('root')
)


