import React from "react";
import Spinner from "react-spinkit";
// import { withAsyncAction } from "../../redux/HOCs";
import "./RegisterForm.css";
import { Button } from 'semantic-ui-react';
import FetchService from "../../FetchService"

class RegisterForm extends React.Component {
    constructor(props) {
        super(props)
        this.client = new FetchService()
        console.log(this.client)

        this.state = {
            formData: {
                username: "",
                password: "",
                displayName: ""
            },
            error: "",
            submitted: false
        };
    }

    handleRegister = (event) => {
        event.preventDefault();

        this.client.registerUser(this.state.formData)
            .then((resData) => { //wait asynchronous function

                console.log(resData);

                if (resData.statusCode === 200) {
                    this.setState({
                        submitted: true,
                        error: ""
                    })
                } else {

                    this.setState({
                        error: resData.message
                    })
                }
            })
    };

    handleChange = (event) => {
        const newformData = { ...this.state.formData };
        newformData[event.target.name] = event.target.value;

        this.setState({ formData: newformData });
    };

    render() {
        let result_message = "";

        if (!this.state.submitted && this.state.error !== "") {
            result_message =
                (<div>
                    <p style={{ color: "red" }}>  Your registration data is incorrect. Plase try again.
         <br></br>
         Details: {"Your registration data is incorrect. " + this.state.error}
                    </p>

                </div>)

        } else if (this.state.submitted && this.state.error === "") {
            result_message =
                (
                    <div>
                        <p style={{ color: "blue" }}> Thank you for registration! </p>

                    </div>
                )

        }

        return (
            <div className="RegisterForm">
                {/* //======================= */}
                <form id="register-form">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        autoFocus
                        required
                        onChange={this.handleChange}
                    />

                    <label htmlFor="displayname">Display Name</label>
                    <input
                        type="text"
                        name="displayName"
                        required
                        onChange={this.handleChange}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        onChange={this.handleChange}
                    />
                    <Button secondary type="submit" onClick={this.handleRegister}>
                        Register
          </Button >
                </form>


                {result_message}

            </div>
        );

    }
}

export default RegisterForm;