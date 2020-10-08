import React from 'react'
import { List, Image } from 'semantic-ui-react'
// import Globe from '../../images/Globe.png'
import Globe from "../images/Globe01icon.png"
import { render } from 'react-dom'
import moment from 'moment'


function UserItem(props) {
    let pictureSource
    if (props.picture) {
        pictureSource = 'https://socialapp-api.herokuapp.com' + props.picture
    }
    else {
        pictureSource = Globe
    }




    return (

        <List.Item >

            <Image avatar src={pictureSource} />
            <List.Content>
                <List.Header className="Coalition">
                    Coalition Member: Username:{" "}
                    {"  "}
                    {props.text}
{/* 
                    Coalition Member:  {props.text} */}
                </List.Header>

                <List.Description>

                About: {props.about}

                </List.Description>


                <List.Description>

                   Member from: {moment(props.createdAt).format('MMMM Do YYYY, h:mm:ss a')}

                </List.Description>

            </List.Content>

        </List.Item>



    )
}

export default UserItem

// PM: remove unused import and comments