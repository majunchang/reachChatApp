//  合并所有的reducer  并且将其返回

import {combineReducers} from 'redux'
import {user} from './redux/userRedux'
//  访问boss或者牛人的列表时  需要的卡片数据
import {chatuser} from './redux/chatuser.Redux'
//  聊天所需数据
import {chat} from './redux/chat'

export default combineReducers({user, chatuser, chat})
