import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem,  WhiteSpace, Button, Radio} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from "../../redux/userRedux";


// @connect(
//     //  传入的参数 是 reducer里面的state  也就是初始化或者改变后的状态  箭头函数的函数体中的对象 的key代表的props里面的key值
//     (state) =>
//         ({
//             'test': state.user
//         })
//     ,
//     {register}
// )
@connect(
    /*
      传入的参数 是 redux里面的state  也就是初始化或者改变后的状态  箭头函数的函数体中的对象 的key代表的props里面的key值
      如果不传key值  将reducer里面的initstate 遍历 然后添加到props中
       */
    (state) => state.user,
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
        // console.log('liuyifei');
        // console.log(this.state);
        // console.log(this.props);
        this.handleRegister = this.handleRegister.bind(this);

    }

    handleRegister() {
        // console.log('李一桐');
        // console.log(this.state);
        // console.log(this.props);
        this.props.register(this.state);
        // setTimeout(() => {
        //     console.log('杨幂');
        //     console.log(this.props);
        // }, 1000)

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
                {/*<h1>{this.props.state}</h1>*/}
                {/*<h1>{this.props.test}</h1>*/}
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
                    <RadioItem checked={this.state.type === 'boss'}
                               onChange={() => this.handleChange('type', 'boss')}>
                        CEO(首席执行官)
                    </RadioItem>
                    <RadioItem checked={this.state.type === 'genius'}
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