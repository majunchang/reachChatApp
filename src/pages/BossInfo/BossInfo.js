import React from 'react'
import {NavBar, InputItem, TextareaItem} from 'antd-mobile'

import AvatarSelector from '../../component/AvatarSelector/AvatarSelector'


class BossInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            company: '',
            desc: ''
        }
    }

    onChange(key, val) {
        this.setState({
            [key]:val
        })
    }

    render() {
        return (
            <div>
                <NavBar mode="dark">BOSS完善信息页</NavBar>
                <AvatarSelector
                    selectAvatar={(imageName) => {
                        this.setState({
                            avatar: imageName
                        })
                    }}
                ></AvatarSelector>
                <InputItem onChange={(v) => this.onChange('title', v)}>
                    招聘职位
                </InputItem>
                <InputItem onChange={(v) => this.onChange('company', v)}>
                    公司名称
                </InputItem>
                <TextareaItem
                    onChange={(v) => this.onChange('desc', v)}
                    rows={3}
                    autoHeight
                    title='职位要求'
                >

                </TextareaItem>
            </div>
        )
    }
}

export default BossInfo