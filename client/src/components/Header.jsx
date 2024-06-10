import {Container, Navbar, Button} from 'react-bootstrap';
import TrollFace from '../assets/Troll-Face.svg';
import {Link, useNavigate} from 'react-router-dom';


function Header(props) {
    const navigate = useNavigate();
    return (
        <Navbar bg='primary' data-bs-theme='dark' className='fixed-top'>
            <Container fluid>
                <Link className="navbar-brand d-flex align-items-center" to='/'>
                    <img
                    src={TrollFace}
                    width="30"
                    height="30"
                    alt="Troll Face"
                    className="me-2"
                    />
                    <h4>What do you meme?</h4>
                </Link>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        {props.loggedIn? `${props.user.username}` : ''}
                    </Navbar.Text>
                </Navbar.Collapse>
                
                {!props.loggedIn? <Link to="/login" className='btn btn-primary'><i className="bi bi-person"></i> Login</Link>
                                : <Button className='btn-primary' onClick={()=>{props.handleLogout(); navigate('/')}}><i className="bi bi-person"></i> Logout</Button>}
            </Container>
        </Navbar>
    );
}   

export default Header;