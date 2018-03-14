import React from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

@connect(
    state => state
)

class Msg extends React.Component {
  getLast (arr) {
    var userId = this.props.user._id
    var newArr = []
    arr.forEach(v => {
      if (v.to === userId) {
        newArr.push(v)
      }
    })
    return newArr[newArr.length - 1]
  }

  render () {
   
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatId] = msgGroup[v.chatId] || []
      msgGroup[v.chatId].push(v)
    })
    //  取出对象中 所有的value项
    const chatList = Object.values(msgGroup).sort((a, b) => {
      var aLast = this.getLast(a)
      var bLast = this.getLast(b)
      return bLast - aLast
    })
    //  手动定义antd-mobile组件
    const Item = List.Item
    const Brief = Item.Brief
    //  当前登录的用户id
    var userId = this.props.user._id
    const userInfo = this.props.chat.users
    return (
      <div>
        {chatList.map(v => {
          const lastItem = this.getLast(v)
          const targetId = v[0].from === userId ? v[0].to : v[0].from
          const unreadNum = v.filter(v => !v.read && v.to === userId).length
          return (
            lastItem
              ? <List key={lastItem._id}>
                <Item
                  thumb={require(`../img/${userInfo[targetId].avatar}.png`)}
                  extra={<Badge text={unreadNum} />}
                  arrow='horizontal'
                  className='msgCard'
                  onClick={() => {
                    console.log('点击了item 进入路由调整')
                    this.props.history.push(`/chat/${targetId}`)
                  }}
                >
                  {lastItem.content}
                  <Brief>{userInfo[targetId].name}</Brief>
                </Item>
              </List> : null
          )
        })}
      </div>
    )
  }
}

export default Msg
