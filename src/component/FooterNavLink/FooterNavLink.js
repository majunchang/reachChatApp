import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter


class FooterNavLink extends React.Component {
    static PropsTypes = {
        data: PropTypes.array.isRequired
    }

    render() {
        const navList = this.props.data.filter((v) => {
            return !v.hide
        })
        // console.log(navList);
        const {pathname} = this.props.location;
        console.log(pathname);
        console.log(navList);
        return (
            <TabBar>
                {navList.map(v =>
                    (
                        <TabBar.Item
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


