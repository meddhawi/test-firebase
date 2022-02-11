import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom'
import firebase from './services/firebase';
import { AuthContext } from "./services/Auth.js";

// Bootstrap 
import {
    Form,
    Container,
    Row
} from 'react-bootstrap'

class Login extends Component{
    static contextType = AuthContext; 
    constructor(props){
        super(props);

        this.state ={};
    }

    set = name => event => {
        console.log(event.target.value)  
        this.setState({[name]: event.target.value});
    }

    handleSubmit = async(event) => {
        const { email, password}  = this.state;
        const { history } = this.props
        event.preventDefault();

         // Validasi
         if(!email || !password) return alert('Please insert missing credentials!')

         // Register via Firebase
         try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
             history.push('/');
         } catch(error) {
             alert('Failed to Login')
             console.log(error)
         }
    }

    render(){
        const { currentUser } = this.context
        if (!!currentUser) return <Redirect to="/" />
        return(
            <div>
                <Row>
                <Container className='col-4'>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" 
                                placeholder="Enter email"
                                name="email"
                                value={this.state.value}
                                onChange = {this.set('email')} />
                        </Form.Group>    
                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text" 
                                placeholder="Enter password"
                                name="password"
                                value={this.state.value}
                                onChange = {this.set('password')} />
                        </Form.Group>
                        
                        <input type="submit" value="Submit" className=' btn btn-success'/>      
                    </Form>
                </Container>
                
                </Row>
            </div>
        )
    }
}

export default Login;