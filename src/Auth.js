import React from 'react'
import {Redirect} from 'react-router-dom'
import {login,getUserData} from './AuthRedux'
import {connect} from 'react-redux'
import axios from 'axios'

class Auth extends React.Component {
    constructor(props) {
        super(props)
        console.log('majunchang');
        console.log(this.state);
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        this.props.getUserData()
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <h2>我的名字是{this.props.auth.user},我的年龄是{this.props.auth.age}</h2>
                <h2>你没有权限，需要登录才能进入</h2>
                {
                    this.props.auth.isAuth ? <Redirect to='/dashboard'></Redirect> : null
                }
                <h2>Auth，这是Auth页面</h2>
                <button onClick={this.props.login}>授予团长职位</button>
            </div>

        )
    }
}

const AStateToProps = (state) => {
    return {auth: state.authReducer}
}

const actionsCreators = {login,getUserData}

Auth = connect(AStateToProps, actionsCreators)(Auth)

export default Auth;