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
            // console.log(this.state.value)
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

        // var arrays = []
        // postIds.forEach(function(key){
        //     console.log("Pushing array: " + value[key].text)
        //     arrays.push(value[key].text)
            
        // })
        console.log("Array of keys: " + Object.keys(value))

        return (
            <>
                <h5>Last Post</h5>
                <div className='post'>
                    
                    {this.createParagraph(post)}
                    <h5>All Post</h5>
                    {Object.keys(value).map(function(name, index){
                        return <li key={index}>{value[name].text}</li>
                        /* you can change li to p and 
                        Object.keys(value) is used to navigate object and take the text properties*/
                    })}
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