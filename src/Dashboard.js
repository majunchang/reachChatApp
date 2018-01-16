import React from 'react'
import {Route, Link, Redirect} from 'react-router-dom'
import App from './App'
import {connect} from 'react-redux'
import {logout} from "./AuthRedux";

function Qibinglian() {
    return <h2>骑兵连</h2>
}

class Erying extends React.Component {
    render() {
        console.log(this.props);
        return <h2>二营</h2>
    }
}


class DashBoard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const redirectToLoin = <Redirect to='/auth'></Redirect>
        const app = (
            <div>
                <h1>独立团 </h1>
                {this.props.auth.isAuth ? <button onClick={this.props.logout}>撤销李云龙职务</button> : null}
                <ul>
                    <li>
                        <Link to='/dashboard/'>一营</Link>
                    </li>
                    <li>
                        <Link to='/dashboard/erying'>二营</Link>
                    </li>
                    <li>
                        <Link to='/dashboard/qibinglian'>骑兵连</Link>
                    </li>
                </ul>
                <Route path='/dashboard/' exact component={App}></Route>
                <Route path='/dashboard/erying' component={Erying}></Route>
                <Route path='/dashboard/qibinglian' component={Qibinglian}></Route>
            </div>
        )

        return this.props.auth.isAuth ? app : redirectToLoin;
    }
}

const StateToProps = (state) => {
    console.log(state);
    return {auth: state.authReducer}
}

const actionsCreators = {logout}

DashBoard = connect(StateToProps, actionsCreators)(DashBoard)


export default DashBoard;