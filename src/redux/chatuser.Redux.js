import axios from 'axios'

const user_list = 'user_list'
const initState = {
    userlist: []
}

export function chatuser(state = initState, action) {
    switch (action.type) {
        case user_list:
            return {...state, userlist: action.payload}
        default:
            return state
    }
}

function userList(data) {
    return {type: user_list, payload: data}
}

export function getUserList(type) {
    return dispatch => {
        axios.get('/user/List?type=genius')
            .then((res) => {
                if (res.data.code == 0) {
                    dispatch(userList(res.data.data))
                }
            })
    }
}