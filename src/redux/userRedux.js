import axios from 'axios'
import {getRedirectPath} from '../utils'

const register_success = 'register_success'
const login_success = 'login_success'
const auth_success = 'auth_success'
const error_msg = 'error_msg'
const load_data = 'load_data'


const initState = {
    redirectTo: '',
    isAuth: false,
    msg: '',
    user: '',
    type: ''
}

// reducer
export function user(state = initState, action) {
    switch (action.type) {
        case register_success:
            return {...state, msg: '', isAuth: true, redirectTo: getRedirectPath(action.payload), ...action.payload}
        case error_msg:
            return {...state, isAuth: false, msg: action.msg}
        case auth_success:
            return {...state, redirectTo: getRedirectPath(action.payload), ...action.payload}
        case login_success:
            return {...state, isAuth: true, redirectTo: getRedirectPath(action), ...action.payload}
        case load_data:
            return {...state, ...action.payload}
        default:
            return state
    }
}

//  actions
function registerSuccess(obj) {
    return {type: register_success, payload: obj}
}

function errorMsg(msg) {
    return {msg, type: error_msg}
}

function loginSuccess(obj) {
    return {type: login_success, payload: obj}
}

function authSuccess(obj) {
    return {type: auth_success, payload: obj}
}

export function loadData(userInfo) {
    console.log(userInfo);
    return {type: load_data, payload: userInfo}
}

export function saveInfo(data) {
    return dispatch => {
        axios.post('user/saveInfo', data)
            .then((res) => {
                if (res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export function login({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg('用户名密码必须输入')
    }
    return dispatch => {
        axios.post('/user/login', {user, pwd})
            .then((res) => {
                console.log(res);
                if (res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export function register({user, pwd, repeatPwd, type}) {

    if (!user || !pwd) {
        return errorMsg('用户名密码必须输入')
    }
    if (pwd != repeatPwd) {
        return errorMsg('密码和确认密码不同')
    }

    console.log('进入了注册函数 ');
    return dispatch => {
        axios.post('/user/register', {user, type, pwd})
            .then((res) => {
                console.log(res);
                if (res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }

}

