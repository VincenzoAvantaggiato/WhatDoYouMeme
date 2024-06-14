import {Container, Navbar, Button, Dropdown} from 'react-bootstrap';
import TrollFace from '../assets/Troll-Face.svg';
import {Link, useLocation, useNavigate} from 'react-router-dom';


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
                
                {!props.loggedIn? <Link to="/login" className='btn btn-primary '><i className="bi bi-person"></i> Login</Link>
                                : <Dropdown data-bs-theme="light" className='d-flex align-items-left justify-content-left'>
                                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                        <i className="bi bi-person"></i> {props.user.username}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu align="end">
                                        <Dropdown.Item onClick={()=>{props.reload();navigate('/play')}}>New game</Dropdown.Item>
                                        <Dropdown.Item onClick={()=>navigate('/history')}>Previous games</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item onClick={()=>{props.handleLogout(); navigate('/logout')}} className='d-flex justify-content-between'>Logout <i className='bi bi-box-arrow-right'></i></Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>}
            </Container>
        </Navbar>
    );
}   

export default Header;