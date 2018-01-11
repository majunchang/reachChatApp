import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import App from './App'
// 我们安装好 react-redux包之后  provider组件在应用的最外层 差传入store 只用一次
import {Provider} from 'react-redux'
import {counter} from "./actions";


const store = createStore(counter, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ?  window.devToolsExtension() : f=>f
));


    ReactDOM.render(
        (
            <Provider store={store}>
                <App />
            </Provider>
        ),
        document.getElementById('root')
    )


