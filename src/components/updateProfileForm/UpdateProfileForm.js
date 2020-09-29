import React from "react";
import {Button, Container, Divider, Grid, Header, Image, Menu, 
    Dimmer, Segment, Card, Form,  Input} from 'semantic-ui-react';

function UpdateProfileForm(props) {

    return (

        <Form id="profile-form">
            <hr />
            <div height >

         

                    <label htmlFor="displayname"><strong>  Display Name  </strong></label>
                    <Input fluid icon='icon' placeholder='This is the name that will be appeard in your profile'/>
                    <input
                        type="text"
                        name="displayName"
                        required
                        value={props.formData.displayName}
                        onChange={props.handleChange}
                    />
                

                
            </div>
            <hr />

            <div>
            
                <label htmlFor="about" ><strong>Tell us about yourself:</strong> </label>

                 <Input fluid icon='icon' placeholder='Who exactly are you?'/>
                <input
                    type="text"
                    height='500 px'
                    width='900 px'
                    name="about"
                    value={props.formData.about}
                    onChange={props.handleChange}
                />

 

                
            </div>
            <hr />
    <Segment inverted> 
    <card>    
           <Button inverted color = 'olive' onClick={props.handleUpdateProfile}> Update my Profile 
            </Button>
            </card> 

                       </Segment>      
                       

        </Form>



    )
}


export default UpdateProfileForm;