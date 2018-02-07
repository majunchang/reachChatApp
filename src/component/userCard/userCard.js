import React from 'react'
import {Card} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

@withRouter
@connect(
    state=>state.user
)

class UserCard extends React.Component {

    componentDidMount() {
       console.log(this.props);
    }

    handleClick(v) {

        this.props.history.push(`/chat/${v.user}/${this.props.user}/${v._id}`)
    }

    render() {
        const Header = Card.Header
        const Body = Card.Body
        return (
            <div>

                {this.props.userlist.map(v => (
                    v.avatar ? (<Card key={v._id} onClick={() => this.handleClick(v)}>
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
                        {v.type === 'boss' ? <div>薪资:{v.money}</div> : null}
                        </Body>
                    </Card>) : null
                ))}
            </div>
        )
    }

}

export default UserCard