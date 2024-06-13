// imports
import express from 'express';
import morgan from 'morgan'; // logging middleware
import cors from 'cors'; // CORS middleware
import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import MemeDAO from './dao/meme_dao.mjs';
import UserDAO from './dao/user_dao.mjs';
import GameDao from './dao/game_dao.mjs';
import {Game} from './Meme.mjs';

// init express
const app = new express();
app.use(morgan('dev'));
app.use(express.json());
const port = 3001;

const memeDao = new MemeDAO();
const userDao = new UserDAO();
const gameDao = new GameDao();

/** Set up and enable Cross-Origin Resource Sharing (CORS) **/
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
  credentials: true
};
app.use(cors(corsOptions));

app.use('/images', express.static('public/images'));

passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const user = await userDao.getUser(username, password);
  if(!user)
    return cb(null, false, 'Incorrect username or password.');
    
  return cb(null, user);
}));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) { 
  return cb(null, user);
});

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({error: 'Not authorized'});
}

app.use(session({
  secret: "forzaLecce!",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));

// define routes
app.get('/api/memes/random', (req, res) => {
  if (req.isAuthenticated()) {
    memeDao.getRandomMeme(3).then(memes => {
      res.json(memes);
    }).catch(err => {
      console.error(err);
      res.status(500).json({error: 'An error occurred, please try again later'});
    });
  }
  else {
    memeDao.getRandomMeme(1).then(meme => {
      res.json(meme);
    }).catch(err => {
      console.error(err);
      res.status(500).json({error: 'An error occurred, please try again later'});
    });
  }
});

app.get('/api/memes/:id/captions', (req, res) => {
  memeDao.getCaptions(req.params.id).then(captions => {
    res.json(captions);
  }).catch(err => {
    console.error(err);
    res.status(500).json({error: 'An error occurred, please try again later'});
  });
});

app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
      if (!user) {
        // display wrong login messages
        return res.status(401).send(info);
      }
      // success, perform the login
      req.login(user, (err) => {
        if (err)
          return next(err);
        
        // req.user contains the authenticated user, we send all the user info back
        return res.status(201).json(req.user);
      });
  })(req, res, next);
});

app.get('/api/sessions/current', (req, res) => {
  if(req.isAuthenticated()) {
    res.json(req.user);}
  else
    res.status(401).json({error: 'Not authenticated'});
});

app.delete('/api/sessions/current', (req, res) => {
  req.logout(() => {
    res.end();
  });
});

app.post('/api/games',isLoggedIn, (req, res) => {
  const game = new Game(-1,req.user.id, req.body.scores, req.body.images);
  gameDao.addGame(game).then(id => {
    res.status(201).json(id);
  }).catch(err => {
    console.error(err);
    res.status(500).json({error: 'An error occurred, please try again later'});
  });
});

app.get('/api/games',isLoggedIn, (req, res) => {
  gameDao.getGamesByUser(req.user.id).then(games => {
    res.json(games);
  }).catch(err => {
    console.error(err);
    res.status(500).json({error: 'An error occurred, please try again later'});
  });
});



const SERVER=`http://localhost:${port}`;
// activate the server
app.listen(port, () => {
  console.log(`Server listening at ${SERVER}`);
});

export default SERVER;