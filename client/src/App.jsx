import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'

import { useState, useEffect } from 'react'
import Header from './components/Header'
import { Route, Outlet, Routes, Navigate, useLocation, useNavigate  } from 'react-router-dom';
import { Container, Row, Alert } from 'react-bootstrap';
import LoginForm from './components/LoginForm';
import API from './API';
import GamePage from './components/GameComponents';
import NotFound from './components/NotFound';
import WelcomePage from './components/WelcomePage';
import ProfilePage from './components/ProfileComponents';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [flag, setFlag] = useState(false); 
  const [waiting, setWaiting] = useState(false); 
  const [saving, setSaving] = useState(false);
  let t;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setWaiting(true);
        const user = await API.getUserInfo();
        setLoggedIn(true);
        setUser(user);
        setWaiting(false);
      }
      catch(err) {
        setWaiting(false);
        
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (message) t=setTimeout(() => setMessage(''), 5000);
    return () => clearTimeout(t);
  }, [message]);

  const handleLogin = async (credentials) => {
    try {
      setWaiting(true);
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setMessage({msg: `Welcome, ${user.username}!`, type: 'success'});
      setUser(user);
      setWaiting(false);
    }catch(err) {
      setMessage({msg: err.message || err, type: 'danger'});
      setWaiting(false);
    }
  };
  const handleLogout = async () => {
    try {
      setWaiting(true);
      await API.logOut();
      setLoggedIn(false);
      // clean up everything
      setMessage({msg: 'Successfully logged out!', type: 'success'});
      setUser(null);
      setWaiting(false);
    }
    catch(err) {
      setMessage({msg: err.message, type: 'danger'});
      setWaiting(false);
    }
    
  };

  return (
    <>
      <Routes>
        <Route element={<>
          <Container className='background-image d-flex vh-100 align-center align-items-center p-0 m-0' fluid>
          <Header loggedIn={loggedIn} handleLogout={handleLogout} user={user} reload={()=>setFlag(oldFlag=>!oldFlag)}/>
          <Container fluid className='d-flex flex-column vh-100 m-0  justify-content-center'>
            <Outlet/>

            {message && <Row>
              <Alert variant={message.type} onClose={() => setMessage('')} dismissible className="my-alert" >{message.msg}</Alert>
            </Row> }
            
          </Container>
          </Container>
          </>
        }>
          <Route path='/' element={waiting?<h1 className='text-center'>Waiting for server response...</h1>:<WelcomePage loggedIn={loggedIn} user={user}/>}/>
          <Route path='/play' element={waiting?<h1 className='text-center'>Waiting for server response...</h1>:<GamePage loggedIn={loggedIn} key={flag} setSaving={setSaving} setMessage={setMessage}/>}/>
          <Route path='/login' element={loggedIn ? <Navigate replace to='/' /> :<LoginForm login={handleLogin} waiting={waiting}/>} />
          <Route path='/logout' element={waiting?<h1 className='text-center'>Logging out..</h1>:<Navigate replace to='/' />}/>
          <Route path='/profile' element={!loggedIn ? <Navigate replace to='/' /> :waiting?<h1 className='text-center'>Waiting for server response...</h1>:<ProfilePage saving={saving} user={user} handleLogout={handleLogout} setMessage={setMessage}/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Route> 
      </Routes>
    </>
  )
}

export default App
