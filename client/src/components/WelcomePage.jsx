import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function WelcomePage(props){

    return (
        <>
            {props.loggedIn? 
                <Container fluid className='d-flex flex-column justify-content-center align-items-center'>
                    {/*<h1>Welcome, {props.user.username}!</h1> 
                    <br/>
                    <br/>*/}
                    <Container className='d-flex flex-row justify-content-between w-50 '>
                        <Link to='/play' className='btn btn-success bi bi-joystick fs-1 p-5 rounded-pill w-75 mx-3 d-flex align-items-center justify-content-center'>  Play</Link>
                        <Link to='/history' className='btn btn-danger bi bi-controller fs-1 p-5 rounded-pill w-100 mx-3 d-flex align-items-center justify-content-center'> Previous games</Link>
                    </Container>
                </Container> : 
                <Container fluid className='d-flex flex-column justify-content-center align-items-center'>
                    <h1>Welcome to What do you meme!</h1>
                    <br/>
                    <br/>
                    <Container className='d-flex flex-row justify-content-between w-50 '>
                        <Link to='/play' className='btn btn-success bi bi-joystick fs-1 p-5 rounded-pill w-75 mx-3 d-flex align-items-center justify-content-center'> Play as guest</Link>
                        <Link to='/login' className='btn btn-danger bi bi-person fs-1 p-5 rounded-pill w-75 mx-3 d-flex align-items-center justify-content-center'> Login</Link>
                    </Container>
                </Container>
            }
        </>
    )
}

export default WelcomePage;