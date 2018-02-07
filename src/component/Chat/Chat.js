import React from 'react'
import io from 'socket.io-client'
import {List, Button, InputItem,NavBar} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList,sendMsg} from '../../redux/chat'
import browserCookie from 'browser-cookies'

const socket = io('ws://localhost:9000')
// socket.on('receMsg',(data)=>{
//     console.log(data);
// })

@connect(
    state => state,
    {getMsgList,sendMsg}
)

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            msg: [],
            talkself: this.props.user,
            talkObject: this.props.match.params.user,
        }
    }

    componentDidMount() {

        // socket.on('receMsg', (data) => {
        //     this.setState({
        //         msg: [...this.state.msg, data]
        //     })
        //     console.log(data);
        // })
        this.props.getMsgList()

    }

    handleSubmit() {
        // 点击发送按钮之后   调用socket.io的emit方法  向后端进行推送
        // socket.emit('sendmsg', {
        //     text: this.state.text,
        //     talkself: this.props.match.params.me,
        //     talkObject: this.props.match.params.user,
        // })
        // this.setState({text: ''})
        console.log(this.props);
        const from = this.props.match.params.me;
        const to = this.props.match.params.id;
        const msg = this.state.text;
        this.props.sendMsg({from,to,msg})
        this.setState({text: ''})
    }

    render() {
        console.log('liuyf');
        console.log(this.state);
        console.log(this.props);
        return (
            <div>
                <NavBar mode="dark" className='fixd-header'>{this.props.match.params.user}</NavBar>
                <div style={{marginTop: 45}}></div>
                {this.state.msg.map(v => {
                    return (<div className='chatDiv'>
                        {/*<p key={v.text}*/}
                           {/*className={this.props.match.params.me === v.talkself ? 'self' : 'other'}>{v.text}</p>*/}
                        <p key={v.text} >{v.text}</p>
                    </div>)

                })}
                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v => {
                                this.setState({
                                    text: v
                                })
                            }}
                            extra={
                                <span onClick={() => this.handleSubmit()}>发送</span>
                            }
                        >
                        </InputItem>

                    </List>
                </div>
            </div>
        )
    }
}

export default Chat