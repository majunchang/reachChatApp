import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile'


class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: 'genius'
        }
    }


    render() {
        const RadioItem = Radio.RadioItem

        return (
            <div>
                <Logo></Logo>
                <h2>我是注册页面</h2>
                <List>
                    <InputItem>用户名</InputItem>
                    <InputItem>密码</InputItem>
                    <InputItem>确认密码</InputItem>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <RadioItem checked={this.state.type == 'genius'}>
                        小跳蛙
                    </RadioItem>
                    <RadioItem checked={this.state.type == 'boss'}>
                        高程
                    </RadioItem>
                </List>
            </div>
        )
    }
}


export default Register