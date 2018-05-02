import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

@withRouter

@connect(
    state => state.chat,
)


class FooterNavLink extends React.Component {
    static PropsTypes = {
        data: PropTypes.array.isRequired
    }

    render() {
        const navList = this.props.data.filter((v) => {
            return !v.hide
        })
        const {pathname} = this.props.location;
        return (
            <TabBar>
                {navList.map(v =>
                    (
                        <TabBar.Item
                            badge={v.path === '/msg' ? this.props.unread : 0}
                            key={v.path}
                            title={v.text}
                            icon={{uri: require(`./img/${v.icon}.png`)}}
                            selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
                            selected={pathname === v.path}
                            onPress={() => {
                                this.props.history.push(v.path)
                            }}
                        >

                        </TabBar.Item>
                    )
                )}
            </TabBar>
        )
    }
}

export default FooterNavLink


