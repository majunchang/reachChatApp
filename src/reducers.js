//  合并所有的reducer  并且将其返回

import {combineReducers} from 'redux'
import {user} from './redux/userRedux'


export default combineReducers({user})