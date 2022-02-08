import React from "react"
import app from './services/firebase'
// reactstrap
import {
    Container,
    Row
} from 'reactstrap'

export default function Home() {
    return(
        <div className="homepage mt-4">
            <Container>
                <Row>
                    <h1>Halo, selamat datang...</h1>
                    <button onClick={() => app.auth().signOut()}>Sign out</button>
                </Row>
            </Container>
            
        </div>
    )
}