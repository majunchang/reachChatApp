import io from 'socket.io-client'
import axios from 'axios'
import { stat } from 'fs'

const socket = io('ws://localhost:9000')

const msgList = 'msg_list'
const msgRecv = 'msg_recv'
const msgRead = 'msg_read'

const initState = {
  chatmsg: [],
  unread: 0,
  users: {}
}

//  这是reducers
export function chat (state = initState, action) {
  switch (action.type) {
    case msgList:
      return {
        ...state,
        chatmsg: action.payload.msgs,
        users: action.payload.users,
        unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userId).length
      }
    case msgRecv:
      const n = action.payload.to === action.userId ? 1 : 0
      return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + n}
    case msgRead:
      const {to, num} = action.payload
      return {...state, chatmsg: state.chatmsg.map(v => ({...v, read: v.from === to ? true : v.read})), unread: state.unread - num}
    default:
      return state
  }
}

// actions
function getmaglist (msgs, users, userId) {
  return {type: msgList, payload: {msgs, users, userId}}
}

// 外部调用函数
export function getMsgList () {
  return (dispatch, getState) => {
    axios.get('/user/getMsgList')
      .then((res) => {
        // console.log(res);
        if (res.data.code === 0) {
          const userId = getState().user._id
          dispatch(getmaglist(res.data.msgs, res.data.users, userId))
        }
      })
  }
}

function msgRecvfn (msg, userId) {
  return {type: msgRecv, payload: msg, userId}
}

function msgReadactionsC (from, to, num) {
  return {type: msgRead, payload: {from, to, num}}
}

export function readmsg (to) {
  return (dispatch, getState) => {
    axios.post('/user/readmsg', {to})
      .then(res => {
        var from = getState().user._id
        if (res.data.code === 0) {
          dispatch(msgReadactionsC(from, to, res.data.num))
        }
      })
  }
}

/*
 async+await的改写  await必须在async的内部
 export function readmsg (to) {
  return async (dispatch, getState) => {
    //  await中 等到axios的执行完毕 并将结果返回给res  才会执行下面的代码
    const res = await axios.post('/user/resdmsg',{to})
    const form = getState().user._id
    if(res.data.code === 0){
      dispatch(msgReadactionsC(from, to, res.data.num))
    }
  }
}
*/

export function recvMsg (msg) {
  return (dispatch, getState) => {
    socket.on('receMsg', (data) => {
      // console.log('receMsg', data);
      const userId = getState().user._id
      dispatch(msgRecvfn(data, userId))
    })
  }
}

export function sendMsg ({from, to, msg}) {
  return dispatch => {
    socket.emit('sendmsg', {from, to, msg})
  }
}
