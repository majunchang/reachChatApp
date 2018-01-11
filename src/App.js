import React from 'react'
// 为了解决这种强耦合的问题  我们统一采用参数传递的方式
// import {plusGunF, minusGunF} from "./actions";

// Connect 负责从外部获取组件需要的参数
import {connect} from 'react-redux'
import {plusGunF, minusGunF, addGunAsync} from "./actions";

class App extends React.Component {
    render() {
        console.log(this.props);
        const num = this.props.num;
        const plusGunF = this.props.plusGunF;
        const minusGunF = this.props.minusGunF;
        const addGunAsync = this.props.addGunAsync;
        return (
            <div>
                <h1>现在有机枪{num}把</h1>
                <button onClick={plusGunF}>申请武器</button>
                <button onClick={minusGunF}>减少武器</button>
                <button onClick={addGunAsync}>拖欠两天再给上交</button>
            </div>
        )
    }
}

// App需要的属性
const marStateToProps = (state) => {
    return {num: state}
}
// App需要的方法的集合
const actionCreators = {plusGunF, minusGunF, addGunAsync}
// connect包裹App
App = connect(marStateToProps, actionCreators)(App)


export default App