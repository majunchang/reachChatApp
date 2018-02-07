import io from 'socket.io-client'
import axios from 'axios'

const socket = io('ws://localhost:9000')

const msgList = 'msg_list';
const msgRecv = 'msg_recv';
const msgRead = 'msg_read';

const initState = {
    chatmsg: [],
    unread: 0
}

//  这是reducers
export function chat(state = initState, action) {
    switch (action.type) {
        case msgList:
            return {...state, chatmsg: action.payload, unread: action.payload.filter(v => !v.read).length}
        case msgRecv:
        case msgRead:
        default:
            return state
    }
}

// actions
function getmaglist(data) {
    return {type: msgList, payload: data}
}


// 外部调用函数
export function getMsgList() {
    return dispatch => {
        axios.get('/user/getMsgList')
            .then((res) => {
                console.log(res);
                if (res.data.code === 0) {
                    dispatch(getmaglist(res.data.msgs))
                }
            })
    }
}


export function sendMsg({from,to,msg}) {
    return dispatch=>{
        console.log({from,to,msg});
        socket.emit('sendmsg',{from,to,msg})
    }
}

