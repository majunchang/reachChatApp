import React from 'react'
import axios from 'axios'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.Redux'


@connect(
    state=>state.chatuser,
    {getUserList}
)

class Boss extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
       this.props.getUserList('genius')
    }

    render() {
        console.log(this.state);
        const Header = Card.Header
        const Body = Card.Body
        return (
            <div>
                {this.props.userlist.map(v => (
                    v.avatar ? (<Card key={v._id}>
                        <Header
                            title={v.user}
                            thumb={require(`../img/${v.avatar}.png`)}
                            extra={<span>{v.title}</span>}
                        >

                        </Header>
                        <Body>
                        {v.type === 'boss' ? <div>公司:{v.company}</div> : null}
                        {v.desc.split('\n').map(d => (
                            <div key={d}>{d}</div>
                        ))}
                        {v.type == 'boss' ? <div>薪资:{v.money}</div> : null}
                        </Body>
                    </Card>) : null
                ))}
            </div>
        )
    }

}

export default Boss