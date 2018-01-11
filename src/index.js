import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import App from './App'
import {counter, plusGunF, minusGunF, addGunAsync} from "./actions";


const store = createStore(counter, applyMiddleware(thunk))

function render() {
    ReactDOM.render(
        <App store={store} plusGunF={plusGunF} minusGunF={minusGunF} addGunAsync={addGunAsync}/>,
        document.getElementById('root')
    )
}


store.subscribe(render)
render()