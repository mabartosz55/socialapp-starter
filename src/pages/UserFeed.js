import React from 'react'
import Menu from '../components/menu/Menu'
import { userIsAuthenticated } from "../redux/HOCs";
import UserList from '../components/userList/UserList'
import FetchService from '../FetchService'

class UserFeed extends React.Component {
    constructor(props) {
        super(props)
        this.client = new FetchService()
        this.state = {
            users: [],
            usersNum: ""
        }
    }
    componentDidMount() {
        this.client.getUsers(100).then(userData => {
            this.getData()
            
            this.setState({
                users: userData.users,
                usersNum: userData.count
            })
        })

    }

    getData = () => {
        let userNum = 0;
        this.client.getUsers(3).then((userData) => {
            this.setState({
                usersNum: userData.count
            })
            userNum = userData.count
        })
        .then(() => {
            this.client.getUsers(userNum)
            .then((userData) => {
                this.setState({
                    users: userData.users
                })
            })
        })
    }

    render() {
        console.log(this.props.usersNum)
        return (
            <div className="UserFeed">
                <Menu isAuthenticated={this.props.isAuthenticated} />
                <h1 className="MeetMembers">
                    Meet Our Current {this.state.usersNum} Members !
                </h1>
       
                <UserList users={this.state.users} userNum={this.state.usersNum} />

            </div>
        )
    }
}


export default userIsAuthenticated(UserFeed);