import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from "../../redux/userRedux";


@connect(
    state => state.user,
    {register}
)

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: 'genius',
            user: '',
            pwd: '',
            repeatPwd: ''
        }
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister() {
        this.props.register(this.state);
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
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo></Logo>
                <h2>我是注册页面</h2>
                <List>
                    {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                    <InputItem onChange={v => this.handleChange('user', v)}>用户名</InputItem>
                    <InputItem onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
                    <InputItem onChange={v => this.handleChange('repeatPwd', v)}>确认密码</InputItem>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <RadioItem checked={this.state.type == 'boss'}
                               onChange={() => this.handleChange('type', 'boss')}>
                        CEO(首席执行官)
                    </RadioItem>
                    <RadioItem checked={this.state.type == 'genius'}
                               onChange={() => this.handleChange('type', 'genius')}>
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