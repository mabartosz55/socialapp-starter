import React from 'react'
import { List, Image } from 'semantic-ui-react'
import Globe from '../../images/Globe.png'
import { render } from 'react-dom'

function UserItem(props) {
    let pictureSource
    if (props.picture) {
        pictureSource = 'https://socialapp-api.herokuapp.com' + props.picture
    }
    else {
        pictureSource = Globe
    }


    

    return (
        
        <List.Item>

            <Image avatar src={pictureSource} />
            <List.Content>
                <List.Header>
                    COALITION MEMBER:
                {"  "}
                    {props.text}
                </List.Header>
                <List.Description>

                    {props.about}

                </List.Description>
            </List.Content>

        </List.Item>
        

    )
}

export default UserItem