import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function WelcomePage(props){

    return (
        <>
            {props.loggedIn? 
                <Container fluid className='d-flex flex-column justify-content-center align-items-center'>
                    <h1>Welcome, {props.user.username}!</h1> 
                    <Link to='/play' className='btn btn-success'>Play</Link>
                    <Link to='/games' className='btn btn-danger'>Previous games</Link>
                </Container> : 
                <Container fluid className='d-flex flex-column justify-content-center align-items-center'>
                    <h1>Welcome to What do you meme!</h1>
                    <br/>
                    <Link to='/play' className='btn btn-success'>Play as guest</Link>
                    or
                    <Link to='/login' className='btn btn-danger'>Login</Link>
                </Container>
            }
        </>
    )
}

export default WelcomePage;