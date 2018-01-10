// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
//
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }
//
// export default App;


import React from 'react'
// 按需加载antd-mobile组件
import {Button,List} from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'

class App extends React.Component {
    render() {
        const boss = '李云龙'
        return (
            <div>
                <h2>独立团现在的团长是{boss}</h2>
                <One lao='张大彪'></One>
                <Qi lao='孙德胜'></Qi>
            </div>
        )
    }
}

function Qi(props) {
    return <h2>骑兵连连长{props.lao},冲啊</h2>
}

class One extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            soliders: ['小虎', '小柱', '王根生']
        }
        //  1 在构造函数中 bind  this
          this.addSolider = this.addSolider.bind(this)
    }

    addSolider() {
        this.setState({
            soliders:[...this.state.soliders,'新兵蛋子'+Math.random()]
        })
    }
    //  3 直接用箭头函数生命
    // addSolider = (() => {
    //     console.log(this)
    // })

    render() {
        console.log(this);
        console.log(this.props);
        return (
            <div>
                <h2>一营营长是{this.props.lao}</h2>
                <Button type='primary' onClick={this.addSolider}>新兵入伍，抓壮丁</Button>
                {/*  2 直接用箭头函数绑定 */}
                {/*<button onClick={()=>this.addSolider()}>新兵入伍，抓壮丁</button>*/}
                <List
                    renderHeader={()=>'士兵列表'}
                >
                    {this.state.soliders.map((v) => {
                        return <List.Item key={v} arrow='horizontal'>
                            {v}
                            </List.Item>
                    })}
                </List>
                {/*<ul>*/}
                    {/*{this.state.soliders.map((v) => {*/}
                        {/*return <li key={v}>{v}</li>*/}
                    {/*})}*/}
                {/*</ul>*/}
            </div>
        )
    }
}

export default App;