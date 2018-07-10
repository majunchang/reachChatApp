import React from 'react'
// import io from 'socket.io-client'
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {sendMsg, getMsgList, recvMsg, readmsg} from '../../redux/chat'
import {getChatId} from '../../utils'
// import QueueAnim from 'rc-queue-anim'
// const socket = io('ws://localhost:9000')

@connect(
    state => state,
    {sendMsg, getMsgList, recvMsg, readmsg}
)

class Chat extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      msg: [],
      talkself: this.props.user,
      talkObject: this.props.match.params.user
    }
  }

  componentDidMount () {
    /*
        在我们刷新聊天页面的时候   聊天数据 会丢失  所以进行一下
        判断  如果为0  则请求一次   同时减少了并发
        */
    if (!this.props.chat.chatmsg.length && this.props.chat.chatmsg[0] !== this.props.user._id) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
    // socket.on('receMsg', (data) => {
    //     this.setState({
    //         msg: [...this.state.msg, data]
    //     })
    //     console.log(data);
    // })
  }

  componentWillUnmount () {
    console.log('unmount')
    //  新增方法
    // console.log(this.props);
    var toId = this.props.match.params.id
    this.props.readmsg(toId)
  }

  handleSubmit () {
    // 点击发送按钮之后   调用socket.io的emit方法  向后端进行推送
    // socket.emit('sendmsg', {
    //     text: this.state.text,
    //     talkself: this.props.match.params.me,
    //     talkObject: this.props.match.params.user,
    // })
    // this.setState({text: ''}
    const from = this.props.user._id
    const to = this.props.match.params.id
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({text: '', showEmoji: false})
  }

  // 修复跑马灯
  Fixcarousel () {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }

  render () {
    var emoji = '😀 😂 🤣 😎 🤓  😀 😂 🤣 😎 🤓  😀 😂 🤣 😎 🤓 🤗  😓 😎 🤓  😀 😂 🤣 😎 🤓 🤗  😓 😎 🤓  😀 😂 🤣 😎 🤓 🤗  😓'
      .split(' ')
      .filter(v => v)
      .map(v => ({text: v}))
  
    const otherSide = this.props.match.params.id
    const Item = List.Item
    const users = this.props.chat.users
   
    if (!users[otherSide]) {
      return null
    }
    const ChatId = getChatId(this.props.user._id, otherSide)
    const chatMsg = this.props.chat.chatmsg.filter((v) => v.chatId === ChatId)
    const showEmoji = this.state.showEmoji
    // console.log(chatMsg);
    return (
          <div id='chat-page'>
        <NavBar mode='dark'
          icon={<Icon type='left' />}
          onLeftClick={() => {
            this.props.history.goBack()
          }}
          className='fixd-header'
        >{this.props.match.params.user}</NavBar>
        <div style={{marginTop: 45}} />
        {/*<QueueAnim delay={100}>*/}
        {chatMsg.map(v => {
          const avatar = require(`../img/${users[v.from].avatar}.png`)
          return v.from === otherSide ? (
          //   对方发来的
            <List key={v._id}>
              {/* <p key={v.text} */}
                        {/* className={this.props.match.params.me === v.talkself ? 'self' : 'other'}>{v.text}</p> */}

                        <Item
                thumb={avatar}
              >
                {v.content}
              </Item>
                      </List>

          ) : (
          // 我发来的
            <List key={v._id}>
              <Item
                extra={<img src={avatar} />}
                className='chat-me'
              >
                {v.content}
              </Item>
            </List>
          )
        })}
        {/*</QueueAnim>*/}
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
                <div className='emojiBox'>
                  <span style={{marginRight: 15}}
                    onClick={() => {
                      this.setState({showEmoji: !this.state.showEmoji})
                      this.Fixcarousel()
                    }}
                  >
                                       😉
                  </span>

                  <span onClick={() => this.handleSubmit()}>发送</span>
                </div>

              }
            />

                  </List>
                {showEmoji ? <Grid
            data={emoji}
            columnNum={9}
            carouselMaxRow={4}
            isCarousel
            onClick={el => {
              // console.log(el);
              this.setState({
                text: this.state.text + el.text
              })
            }}
          /> : null}
              </div>
      </div>
    )
  }
}

export default Chat
