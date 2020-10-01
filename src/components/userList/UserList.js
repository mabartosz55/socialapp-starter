import React from 'react'
import Menu from '../../components/menu/Menu'

import UserItem from '../userItem/UserItem'
import { List } from 'semantic-ui-react'
import { displayName } from 'react-spinkit'

import InfiniteScroll from 'react-infinite-scroll-component';

class UserList extends React.Component {
    
    render() {
        // console.log("num of members: " + dataLength);
        return (
            <div className='auto_scroll_users'>
               
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


