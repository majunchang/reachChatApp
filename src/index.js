import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
// 我们安装好 react-redux包之后  provider组件在应用的最外层 差传入store 只用一次
import {Provider} from 'react-redux'
// import {counter} from "./actions";
//  因为涉及到了多个recucers  我们进行了合并 并且返回这样
import reducers from './reducers'



// 引入react-router组件
import {BrowserRouter, Route, Link, Redirect, Switch} from 'react-router-dom'
// 引入页面组件 】
import Auth from './Auth'
import Dashboard from './Dashboard'
import './config'
import 'antd-mobile/dist/antd-mobile.css';

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));
// console.log(store);
// console.log(store.getState());


ReactDOM.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                {/*Switch的作用  只渲染命中的第一个路由*/}
                <Switch>
                    {/*router路由中  是采用的正则匹配的模式  /erying 会包含/的内容  使用严格模式以后exact  会解决这中问题 */}
                    <Route path='/auth' component={Auth} exact></Route>
                    <Route path='/dashboard' component={Dashboard}></Route>
                    <Redirect to='/dashboard'></Redirect>
                </Switch>
            </BrowserRouter>
        </Provider>
    ),
    document.getElementById('root')
)


