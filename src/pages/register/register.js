import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile'


class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userType: 'genius',
            user: '',
            pwd: '',
            repeatPwd: ''
        }
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister() {
        console.log(this.props);
        this.props.history.push('/login')
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    render() {
        const RadioItem = Radio.RadioItem

        return (
            <div>
                <Logo></Logo>
                <h2>我是注册页面</h2>
                <List>
                    <InputItem onChange={v => this.handleChange('user', v)}>用户名</InputItem>
                    <InputItem onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
                    <InputItem onChange={v => this.handleChange('repeatPwd', v)}>确认密码</InputItem>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <RadioItem checked={this.state.userType == 'boss'}
                               onChange={() => this.handleChange('userType', 'boss')}>
                        CEO(首席执行官)
                    </RadioItem>
                    <RadioItem checked={this.state.userType == 'genius'}
                               onChange={() => this.handleChange('userType', 'genius')}>
                        hacker(顶级黑客)
                    </RadioItem>
                </List>
                <WhiteSpace></WhiteSpace>
                <Button type='primary' onClick={this.handleRegister}>注册新用户</Button>
            </div>
        )
    }
}


export default Register