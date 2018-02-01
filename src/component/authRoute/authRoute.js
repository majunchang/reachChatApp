import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {loadData} from '../../redux/userRedux'
import {connect} from 'react-redux'

@withRouter
@connect(
    null,
    {loadData}
)


class AuthRoute extends React.Component {
    componentDidMount() {
        axios.get('user/info')
            .then((res) => {
                console.log('李一桐');
                console.log(res);
                console.log(this.props);
                if (res.data.code == 0) {
                    this.props.loadData(res.data.data)
                } else {
                    //  如果没有登录信息
                    this.props.history.push('/login');
                }
            })
    }

    render() {
        return null
    }
}

export default AuthRoute

/*
  这个AuthRoute组件   并不是一个路由组件 直接获取this.props是一个空对象

   为了我们能够在这个组件的方法中 控制路由的跳转    react-router-dom  提供了一个WithRouter的api  让我们可以获取到路由元信息
 */

