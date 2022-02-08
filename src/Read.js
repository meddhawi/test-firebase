import React, { Component } from 'react';
import firebase from './services/firebase';

class Post extends Component { 
    constructor(props){
        super(props);
        this.state ={
            isLoading:true,
        };
    }

    componentDidMount(){
        this.fetchLastPost()
    }

    async fetchLastPost(){
        try{
            const snapshot = await firebase.database().ref('posts').once('value')
            this.setState({
                isLoading:false,
                value:snapshot.val()
            })
        }
        catch(err){
            console.log(err);
        }
    }

    createParagraph = text => text.split("\n").map((i, index) =><p key={index}>{i}</p>)
    get Content(){
        const { value } = this.state
        const postIds = Object.keys(value)
        const lastPostIds = postIds[postIds.length - 1]
        const post = value[lastPostIds].text
        return (
            <>
                <h5>Last Post</h5>
                <div className='post'>
                    {this.createParagraph(post)}
                </div>
            </>
        )
    }

    get Loader(){
        return <h3>Loading...</h3>
    }

    render(){
        return(
            <div>
                {this.state.isLoading ? this.Loader : this.Content}
            </div>
        )
    }
}

export default Post