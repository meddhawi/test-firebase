import React, { Component } from 'react'
import firebase from './services/firebase';

// Bootstrap 
import {
    Form,
    Container,
    Row
} from 'react-bootstrap'

class Login extends Component{

    constructor(props){
        super(props);

        this.state ={}
    }

    set = name => event => {
        console.log(event.target.value)  
        this.setState({[name]: event.target.value});
    }

    handleSubmit = async(event) => {
        const { email, password}  = this.state;
        event.preventDefault();

         // Validasi
         if(!email || !password) return alert('Please insert missing credentials!')

         // Register via Firebase
         try {
            const login = await firebase.auth().signInWithEmailAndPassword(email, password)
            console.log("LOGIN DARI FIREBASE: " + JSON.stringify(login))
             alert('Success Login!')
             this.setState({
                 email: '',
                 password: ''
             })
         } catch(error) {
             alert('Failed to Login')
             console.log(error)
         }

    }
    render(){
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

export default Login