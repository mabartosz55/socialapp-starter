import React from 'react';
import FetchService from '../../FetchService';
import "../../pages/MessageFeed";

class UserMessage extends React.Component {
    constructor() {
        super();
        this.client = new FetchService();
        this.state = {
           
            formData: {
                text: "",
            },
            error: "",
            submitted: false
                       
        }
    }
    handleChange = (event) => {
                  const newformData = {...this.state.formData};
                  newformData[event.target.name] = event.target.value;
        
        this.setState({ formData: newformData });

    };

    handlePosMessage = (event) => {
        event.preventDefault();

        this.client.postMessage(this.state.formData)
        .then((resData) =>{
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


         } )
    };


        componentDidUpdate() {
            this.client.getMessages()
        }

     
       
       
        
        
    

    render() {
        return (

            <div className="UserMessage">

                <form id="user_message">

                    <label htmlFor="textarea">
                        Message
                                                
                      <textarea 
                           className= "textarea"
                           name = "text"
                   
                        //    value={this.state.message.textMessage}
                           onChange={this.handleChange} >

                      </textarea>
                  </label>
                         <br/> <br/>


                        <button  onClick={this.handlePosMessage}>
                        Post message
                       </button >


                </form>
            </div>
        )
    }
}
export default UserMessage
