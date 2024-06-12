import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { useState, useEffect } from 'react'
import Header from './components/Header'
import { Route, Outlet, Routes, Navigate  } from 'react-router-dom';
import { Container, Row, Alert } from 'react-bootstrap';
import LoginForm from './components/LoginForm';
import API from './API';
import GamePage from './components/GameComponents';
import NotFound from './components/NotFound';
import WelcomePage from './components/WelcomePage';
import PreviousGames from './components/PreviousGames';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await API.getUserInfo();
      setLoggedIn(true);
      setUser(user);
    };
    checkAuth();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setMessage({msg: `Welcome, ${user.username}!`, type: 'success'});
      setUser(user);
    }catch(err) {
      setMessage({msg: err, type: 'danger'});
    }
  };
  const handleLogout = async () => {
    await API.logOut();
    setLoggedIn(false);
    // clean up everything
    setMessage('');
  };

  return (
    <>
      <Routes>
        <Route element={<>
          <Container className='background-image d-flex vh-100 align-center align-items-center p-0 m-0' fluid>
          <Header loggedIn={loggedIn} handleLogout={handleLogout} user={user}/>
          <Container fluid className='d-flex flex-column vh-100 m-0  justify-content-center'>
            {/*message && <Row>
              <Alert variant={message.type} onClose={() => setMessage('')} dismissible>{message.msg}</Alert>
            </Row> */}
            <Outlet/>
            
          </Container>
          </Container>
          </>
        }>
          <Route path='/' element={<WelcomePage loggedIn={loggedIn} user={user}/>}/>
          <Route path='/play' element={<GamePage loggedIn={loggedIn}/>}/>
          <Route path='/login' element={loggedIn ? <Navigate replace to='/' /> :<LoginForm login={handleLogin}/>} />
          <Route path='/games' element={<PreviousGames/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Route> 
      </Routes>
    </>
  )
}

export default App
