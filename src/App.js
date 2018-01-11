import React from 'react'
// 为了解决这种强耦合的问题  我们统一采用参数传递的方式
// import {plusGunF, minusGunF} from "./actions";

class App extends React.Component {
    render() {
        console.log(this);
        console.log(this.props);
        const store = this.props.store;
        const num = store.getState();
        const plusGunF = this.props.plusGunF;
        const minusGunF = this.props.minusGunF;
        const addGunAsync = this.props.addGunAsync;
        return (
            <div>
                <h1>现在有机枪{num}把</h1>
                <button onClick={() => store.dispatch(plusGunF())}>申请武器</button>
                <button onClick={()=>store.dispatch(minusGunF())}>减少武器</button>
                <button onClick={()=>store.dispatch(addGunAsync())}>拖欠两天再给上交</button>
            </div>
        )
    }
}

export default  App