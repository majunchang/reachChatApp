const pulsGun = 'plusGun'
const minusGun = 'minusGun';

// 这是reducer处理函数 参数是状态和新的action
export function counter(state = 0, action) {
    switch (action.type) {
        case pulsGun:
            return state + 1
        case minusGun:
            return state - 1
        default:
            return 10;
    }
}

export function plusGunF() {
    return {type: pulsGun}
}

export function minusGunF() {
    return {type: minusGun}
}

export function addGunAsync() {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(plusGunF())
        }, 2000)
    }
}




