//  合并所有的reducer  并且将其返回

import {combineReducers} from 'redux'

import {counter} from './actions'
import {authReducer} from './AuthRedux'



export default combineReducers({counter, authReducer})