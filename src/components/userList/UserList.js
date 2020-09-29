import React from 'react'
import Menu from '../../components/menu/Menu'

import UserItem from '../userItem/UserItem'
import { List} from 'semantic-ui-react'
import { displayName } from 'react-spinkit'


class UserList extends React.Component {
    render() {
        return (
            <div className='auto_scroll'>
            <List className='UserList' size='massive' color='green'>{this.props.users.map((userObj, i) => {

                return <UserItem
                    key={i}
                    text={userObj.username}
                    about={userObj.about}
                    createdAt={userObj.createdAt}
                    picture={userObj.pictureLocation}
                />
            })}

        </List>
        </div>
        )
    }
}

export default UserList;


