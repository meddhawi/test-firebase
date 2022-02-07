import React, { Component } from 'react'
import firebase from './services/firebase'

// Firebase Storage
const storage = firebase.storage()

export default class Upload extends Component {
    state = {}

    handleFileChange = e => {
        const file = e.target.files[0]
        this.setState({file})

        const reader = new FileReader()
        reader.addEventListener('load', () => {
            this.setState({ image: reader.result })
        }, false)

        if(file.type.includes('image/')) {
            const dataURL = reader.readAsDataURL(file)
            console.log(dataURL)
        }
            
    }

    handleSubmit = async e => {
        e.preventDefault()
        const { file } = this.state

        try {
            const response = await storage.ref(`files/${file.name}`).put(file)
            console.log(response)
            alert('file uploaded!')
        } catch(err) {
            console.log(err)
            alert('failed to uploade file!')
        }
    }

    render() {
        const { image }  = this.state
        return (
            <div className="uploadpage">
                <h4>Random Uplaoder</h4>
                { !!image && <img src={image} alt="Image Preview" /> }
                <form onSubmit={this.handleSubmit}>
                    <input type="file" onChange={this.handleFileChange} />
                    <button type="submit" value="Upload">Upload</button>
                </form>
            </div>
        )
    }

}