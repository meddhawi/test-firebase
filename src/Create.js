import React, { Component } from 'react';
import firebase from './services/firebase';
import { AuthContext } from "./services/Auth.js";
import { withRouter } from 'react-router'
// Bootstrap 
import {
    Form,
    Container,
    Row
} from 'react-bootstrap'

class PostForm extends Component { 
    static contextType = AuthContext; 
    constructor(props){
        super(props);
        this.state ={};
    }

    set = name => event => {
        console.log(event.target.value)  
        this.setState({[name]: event.target.value});
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {currentUser} = this.context;
        const { history } = this.props
        const { value } = this.state

        if (!value) return alert("Please write something!");
        if (!currentUser) return history.push('/login')

        try{
            await firebase
                    .database()
                    .ref(`posts/${Date.now()}`).set({text: value})
            alert('Posted!')            
        }
        catch(err){
            console.log(err);
            alert('Failed!')
        }
    }
    render(){
        return(
            <div>
                <Row>
                <Container className='col-4'>
                    <h5>Write your Story here!</h5>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Control type="text" 
                                as="textarea"
                                placeholder="Enter your story here"
                                name="email"
                                value={this.state.value}
                                onChange = {this.set('value')} />
                        </Form.Group>    
                        <input type="submit" value="Submit" className=' btn btn-success'/>      
                    </Form>
                </Container>
                
                </Row>
            </div>
        )
    }
}

export default PostForm