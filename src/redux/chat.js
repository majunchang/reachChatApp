import io from 'socket.io-client'
import axios from 'axios'

const socket = io('ws://localhost:9000')

const msgList = 'msg_list';
const msgRecv = 'msg_recv';
const msgRead = 'msg_read';

const initState = {
    chatmsg: [],
    unread: 0,
    users: {},
}

//  这是reducers
export function chat(state = initState, action) {
    switch (action.type) {
        case msgList:
            return {
                ...state,
                chatmsg: action.payload.msgs,
                users: action.payload.users,
                unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userId).length,
            }
        case msgRecv:
            const n = action.payload.to === action.userId ? 1 : 0;
            return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + n}
        case msgRead:
        default:
            return state
    }
}

// actions
function getmaglist(msgs, users, userId) {
    return {type: msgList, payload: {msgs, users, userId}}
}


// 外部调用函数
export function getMsgList() {
    return (dispatch, getState) => {
        axios.get('/user/getMsgList')
            .then((res) => {
                // console.log(res);
                if (res.data.code === 0) {
                    console.log('getState', getState());
                    const userId = getState().user._id;
                    dispatch(getmaglist(res.data.msgs, res.data.users, userId))
                }
            })
    }
}

function msgRecvfn(msg, userId) {
    return {type: msgRecv, payload: msg, userId}
}

function msgRead({from, to, num}) {
    return {type: msgRead, payload: {from, to, num}}
}

export function readmsg(to) {
    return (dispatch, getState) => {
        axios.post('/user/readmsg', {to})
            .then(res => {
                console.log(getState());
                console.log(res);
                if (res.data.code === 0) {
                    // dispatch(msgRead())
                }
            })
    }
}

export function recvMsg(msg) {
    return (dispatch, getState) => {
        socket.on('receMsg', (data) => {
            // console.log('receMsg', data);
            const userId = getState().user._id;
            dispatch(msgRecvfn(data, userId))
        })
    }
}

export function sendMsg({from, to, msg}) {
    return dispatch => {
        console.log({from, to, msg});
        socket.emit('sendmsg', {from, to, msg})
    }
}

