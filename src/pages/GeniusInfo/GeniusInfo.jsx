import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'

import AvatarSelector from '../../component/AvatarSelector/AvatarSelector'
import { saveInfo } from '../../redux/userRedux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

@connect(
  state => state.user,
  { saveInfo }
)
class BossInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      company: '',
      desc: ''
    }
  }

  onChange (key, val) {
    this.setState({
      [key]: val
    })
  }

  render () {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect && redirect !== path ? (
          <Redirect to={this.props.redirectTo} />
        ) : null}
        <NavBar mode='dark'>求职人完善信息页</NavBar>
        <AvatarSelector
          selectAvatar={imageName => {
            this.setState({
              avatar: imageName
            })
          }}
        />
        <InputItem onChange={v => this.onChange('title', v)}>
          求职意向
        </InputItem>
        <TextareaItem
          onChange={v => this.onChange('desc', v)}
          rows={3}
          autoHeight
          title='个人简介'
        />
        <Button
          type='primary'
          onClick={() => {
            this.props.saveInfo(this.state)
          }}
        >
          保存
        </Button>
      </div>
    )
  }
}

export default BossInfo
