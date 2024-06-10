import { Form, Row, Col, Button, Container} from "react-bootstrap"
import { useState } from "react";
import { Link } from "react-router-dom";

function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const credentials = { username, password };
        
        props.login(credentials);
    };
  
    return (
        <Row>
            <Col/>
            <Col className="bg-light border border-primary rounded p-4">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='username' className='mb-3'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type='text' value={username} onChange={ev => setUsername(ev.target.value)} required={true} />
                    </Form.Group>
        
                    <Form.Group controlId='password' className='mb-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} required={true} minLength={6}/>
                    </Form.Group>
        
                    <Button type='submit'>Login</Button>
                    <Link className='btn btn-danger mx-2 my-2' to={'/'} >Cancel</Link>
                </Form>
            </Col>
            <Col/>
        </Row>
    )
  };

export default LoginForm;