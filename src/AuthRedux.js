import axios from 'axios'

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const USERDATA = 'USERDATA'

const initState = {
    isAuth: false,
    user: '李云龙',
    age: 20
}

export function authReducer(state = initState, action) {
    console.log('刘亦菲');
    console.log(state);
    console.log(action);
    switch (action.type) {
        case LOGIN:
            return {...state, isAuth: true}
        case LOGOUT:
            return {...state, isAuth: false}
        case USERDATA:
            return {...state, ...action.payload}
        default:
            return state
    }
}

export function getUserData() {
    // disPatch  用来通知修改
    return (dispatch=>{
        axios.get('/data')
            .then((res) => {
                if (res.status === 200) {
                    dispatch(setUserData(res.data))
                }
            })
    })
}

export function setUserData(data) {
    return {type:USERDATA,payload:data}
}

// reducers  两个状态
export function login() {
    return {type: LOGIN}
}

export function logout() {
    return {type: LOGOUT}
}