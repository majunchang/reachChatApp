import React from 'react'
import {Redirect} from 'react-router-dom'
import {login} from './AuthRedux'
import {connect} from 'react-redux'

class Auth extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props);
        return (
            <div>
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

const actionsCreators = {login}

Auth = connect(AStateToProps, actionsCreators)(Auth)

export default Auth;