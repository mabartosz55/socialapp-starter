import React from "react";
//import React, { Component } from 'react'
import Menu from "../components/menu/Menu";
import FetchService from "../FetchService";
// import Noimage from "../components/images/Noimage"

import { Segment } from 'semantic-ui-react'
import { Card } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { userIsAuthenticated } from "../redux/HOCs";


class Profile extends React.Component {
  constructor(props) {

    super(props);
    this.client = new FetchService();
    this.state = {
      "user": {
        "pictureLocation": null,
        "username": "",
        "displayName": "",
        "about": "",
        "googleId": null,
        "createdAt": "",
        "updatedAt": ""
      },
      "statusCode": "",
      picture: null

    }

  }
  componentDidMount() {
    this.client.getUser(this.props.match.params.username)
      .then((userData) => {
        this.setState({
          user: userData.user,
          statusCode: userData.statusCode,

        })
      })
  }

  handleSubmitPhoto = (event) => {
    event.preventDefault()
    let formData = this.fileUpload(this.state.picture)
    this.client.setUserPicture(this.state.user.username, formData).then(() => {
      this.client.getUser(this.props.match.params.username).then((userData) => {
        this.setState({
          user: userData.user,
          statusCode: userData.statusCode,
          pictureLocation: userData.user.pictureLocation

        })
      })
    })
  }

  //On file select (button Choose File)
  onFileChange = (event) => {
    let pictureFile;
    console.log(event.target.files)
    if (event.target.files !== undefined) {
      pictureFile = event.target.files[0]
    }
    this.setState({
      picture: pictureFile
    })
    this.fileUpload()
  };


  fileUpload(file) {

    let formData = new FormData()
    formData.append("picture", file)
    console.log(formData);
    return formData
  }

  pictureFile = () => {
    if (this.state.user.pictureLocation !== null) {
      return (
        <div>
          <img src={'https://socialapp-api.herokuapp.com' + this.state.user.pictureLocation}
            height='350 px'
            width='350 px'
          />
        </div>
      )
    } else {
      return (
        <div>
          <img src={'../components/images/Noimage.png'}
            height='200 px'
            width='200 px'
          />
        </div>
      )

    }
  }



  render() {
    return (
      <div className="Profile">
        <Menu isAuthenticated={this.props.isAuthenticated} />


        <Segment textAlign="center">
          <h2>My Current Profile</h2>
          <h3> {this.state.user.username + "  |  @" + this.state.user.displayName}</h3>


          <Segment>

            {this.pictureFile()}

          </Segment>


          <form onSubmit={this.handleSubmitPhoto}>

            <Button color= 'blue'>

            <input
           

              name="picture"
              type="file"
              accept="image/png, image/jpeg, image/gif"
              onChange={this.onFileChange}

              
            />
</Button>
            <Button onClick={this.handleSubmitPhoto} inverted color='orange'   >Save Change</Button>


          </form>



          {/* <Button color="orange" content='Change Photo' primary /> */}




          {/* <Button >

          <input type="file" accept="image/*" id="file-input" /> 

        </Button> */}
          <hr />
          <Link to={"/profile/updateprofile/" + this.props.match.params.username}>
            <Segment inverted>



              <Button inverted color='red'> Update My Info</Button>

            </Segment>

          </Link>
          <Segment textAlign="center"  >
            <Card>
              <p><strong>Display Name:</strong>   {"@" + this.state.user.displayName}</p>
              <p> <strong>Username:</strong>  {this.state.user.username}</p>
            </Card>
            <Card>
              <p><strong>About:</strong>   {this.state.user.about}</p>

            </Card>

            <Card>
              <p> <strong>Profile created:</strong>  {this.state.user.createdAt}</p>
              <p> <strong> Profile updated:</strong>  {this.state.user.updatedAt}</p>

            </Card>

          </Segment>

        </Segment>
      </div>
    );
  }
}

export default userIsAuthenticated(Profile);

