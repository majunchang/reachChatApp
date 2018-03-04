import React from 'react'
import Logo from '../../component/logo/logo'
import {List, WingBlank, WhiteSpace, Button, InputItem} from 'antd-mobile'
import {connect} from 'react-redux'
import {login} from '../../redux/userRedux'
import {Redirect} from 'react-router-dom'
import HocForm from '../../component/hoc-form/hoc-form'

// 高阶组件 思想
// function hello() {
//     console.log('我喜欢慕课网');
// }
//
// function WrapperHello(fn) {
//     return function () {
//         console.log('before hello');
//         fn()
//         console.log('after hello');
//     }
// }
//
// var hello = WrapperHello(hello);
// hello()

//  属性代理
// class Hello extends React.Component {
//     render() {
//         return <h2>hello imooc I love React&&Redux</h2>
//     }
// }

// function wrapperHello(Comp) {
//     class WrapComp extends React.Component {
//         render() {
//             return (<div>
//                 <p>这是hoc高阶组件特有的元素</p>
//                 <Comp  {...this.props}></Comp>
//             </div>)
//         }
//     }
//     return WrapComp
// }
//  反向继承
// function wrapperHello(Comp) {
//     class WrapComp extends Comp{
//         componentDidMount(){
//             console.log('高阶组件新增的生命周期，加载完成');
//         }
//         render(){
//             return <Comp></Comp>
//         }
//     }
//     return WrapComp
// }
//
//
// Hello = wrapperHello(Hello);

@connect(
    state => state.user,
    {login}
)

@HocForm


class Login extends React.Component {
    constructor(props) {
        super(props)
        // 在这里初始化 login组件中  所需要的数据
        this.register = this.register.bind(this);
        this.handlelogin = this.handlelogin.bind(this);
    }

    register() {
        // console.log(this.props);
        console.log('点击了注册按钮')
        this.props.history.push('/register');
    }

    handlelogin() {
        this.props.login(this.props.state)
    }

    render() {
        return (
            <div>
                {/*<Hello></Hello>*/}
                {this.props.redirectTo && this.props.redirectTo !== '/login' ?
                    <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem onChange={v => this.props.handleChange('user', v)}>用户</InputItem>
                        <InputItem
                            onChange={v => this.props.handleChange('pwd', v)}
                        >密码</InputItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary' onClick={this.handlelogin}>登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary' onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login
