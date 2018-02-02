import React from 'react'
import Logo from '../../component/logo/logo'
import {List, WingBlank, WhiteSpace, Button, InputItem} from 'antd-mobile'
import {connect} from 'react-redux'
import {login} from '../../redux/userRedux'
import {Redirect} from 'react-router-dom'

@connect(
    state => state.user,
    {login}
)


class Login extends React.Component {
    constructor(props) {
        super(props)
        // 在这里初始化 login组件中  所需要的数据
        this.state = {
            user: '',
            pwd: ''
        }
        this.register = this.register.bind(this);
        this.handlelogin = this.handlelogin.bind(this);
    }

    handdleChange(k, v) {
        this.setState({
            [k]: v
        })
    }

    register() {
        // console.log(this.props);
        this.props.history.push('/register');
    }

    handlelogin() {
        this.props.login(this.state)
    }

    render() {
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem onChange={v => this.handdleChange('user', v)}>用户</InputItem>
                        <InputItem
                            onChange={v => this.handdleChange('pwd', v)}
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