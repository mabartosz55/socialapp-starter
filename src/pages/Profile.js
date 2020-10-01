import React from "react";
//import React, { Component } from 'react'
import Menu from "../components/menu/Menu";
import FetchService from "../FetchService";
import WebcameCapture from "../components/webcame/WebcameCapture"
import { Segment } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import NoPhoto from "../components/images/Nophoto.png"

import { userIsAuthenticated } from "../redux/HOCs";
import "../index.css";
import NoPicture from "../images/Noimage.png";

//import Webcam from 'webcam-easy';


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

  handleSubmitCameraPhoto = (event) => {
    console.log("HI!!!")
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
  handlechangecamera = (imageSrc) => {
    fetch(imageSrc)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], "File name", { type: "image/png" })
        console.log(file)
        this.setState(
          {
            picture: file

          }
        )


      })



  }


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
            height='200 px'
            width='200 px'
          />
        </div>
      )
    }
    else {
      return (
        <div>

          <img src={NoPhoto}
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
          <h3> {this.state.user.username + "  ||    " + this.state.user.displayName}</h3>

        </Segment>

        <Segment>

          {this.pictureFile()}

          <WebcameCapture
            handleSubmitCameraPhoto={this.handleSubmitCameraPhoto}
            fileUpload={this.fileUpload}
            handlechangecamera={this.handlechangecamera} />



        </Segment>
        <form onSubmit={this.handleSubmitPhoto}>


          <input
            name="picture"
            type="file"
            accept="image/png, image/jpeg, image/gif"
            onChange={this.onFileChange}
          />
         
        </form>

       



          <hr />
         

         

          <Button onClick={this.handleSubmitPhoto} inverted color='orange'   >Save Change</Button>


          <hr />
          <Link to={"/profile/updateprofile/" + this.props.match.params.username}>
            <Segment inverted>

              <Button inverted color='red'> Update My Info</Button>

            </Segment>
          </Link>

          <Segment textAlign="left" >

            <div className="cardClass">
              <p color="red"><strong>Display Name:</strong>   {"  " + this.state.user.displayName}</p>
              <p> <strong>Username:</strong>  {this.state.user.username}</p>
            </div>
            <div className="cardClass">
              <p><strong>About:</strong>   {this.state.user.about}</p>
            </div>
            <div className="cardClass">
              <p> <strong>Profile created:</strong>  {this.state.user.createdAt.toString().replace('T', ' at ').slice(0, 19)}</p>
              <p> <strong> Profile updated:</strong>  {this.state.user.updatedAt.toString().replace('T', ' at ').slice(0, 19)}</p>
            </div>


          </Segment>
          


</div>

    );
  }
}

export default userIsAuthenticated(Profile);

