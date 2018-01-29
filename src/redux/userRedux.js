import axios from 'axios'
const register_success = 'register_success'
const error_msg = 'error_msg'


const initState = {
    isAuth:false,
    msg:'',
    user:'',
    type:''
}

// reducer


//  actions
export function registerSuccess(obj) {
    return {type:register_success,payload:obj}
}

export function errorMsg(msg) {
    return {msg,type:error_msg}
}


export function register({user,pwd,repeatpwd,type}) {
    if(!user || !pwd){
        return errorMsg('用户名密码必须输入')
    }
    if(pwd != repeatpwd){
        return errorMsg('密码和确认密码不同')
    }

    return dispatch=>{
        axios.post('/user/register',{user,type,pwd})
            .then((res)=>{
                if(res.data.code === 0){
                    dispatch(registerSuccess({user,type,pwd}))
                }else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }

}

