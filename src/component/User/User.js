import React from 'react'
import {connect} from 'react-redux'
import {Result, List,  WhiteSpace, Modal} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {logoutSubmit}  from '../../redux/userRedux'
import {Redirect} from 'react-router-dom'

@connect(
    state => state.user,
    {logoutSubmit}
)


class User extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout() {
        console.log('进入了登出页面');
        const alert = Modal.alert;
        alert('注销', '确认退出登录吗？？？', [
            {text: '取消', onPress: () => console.log('cancel')},
            {
                text: '确认', onPress: () => {
                    browserCookie.erase('userid')
                    //  在这里学习到了一种  使浏览器刷新一次的效果
                    // window.location.href = window.location.href
                    this.props.logoutSubmit();
                }
            }
        ])
    }

    render() {
        const props = this.props;
        const Item = List.Item;
        const Brief = Item.Brief;
        console.log(this.props);
        return props.user ? (
            <div>
                <Result
                    img={<img src={require(`../img/${props.avatar}.png`)} style={{width: 50}} alt=''/>}
                    title={props.user}
                    message={props.type === 'boss' ? props.company : null}
                >

                </Result>

                <List renderHeader={() => props.type === 'boss' ? '招聘需求' : '个人技能简介'}>
                    <Item multipleLine>
                        {props.title}
                        {props.desc.split('\n').map(v => (
                            <Brief key={v}>{v}</Brief>
                        ))}
                        {props.money ? <Brief>薪资:{props.money}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item onClick={this.logout}  className='logout'>退出当前登录</Item>
                </List>
            </div>
        ) : <Redirect to={props.redirectTo}></Redirect>
    }


}

export default User
