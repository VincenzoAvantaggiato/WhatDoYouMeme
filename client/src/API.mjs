const SERVER_URL = 'http://localhost:3001';

const logIn = async (credentials) => {
    const response = await fetch(SERVER_URL + '/api/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    if(response.ok) {
      const user = await response.json();
      return user;
    }
    else {
      const errDetails = await response.text();
      throw errDetails;
    }
};

const logOut = async() => {
    const response = await fetch(SERVER_URL + '/api/sessions/current', {
      method: 'DELETE',
      credentials: 'include'
    });
    if (response.ok)
      return null;
  }

const getMemes = async () => {
  const response = await fetch(SERVER_URL + '/api/memes/random', {
    method: 'GET',
    credentials: 'include',
  }
  );
  if(response.ok) {
    const memes = await response.json();
    return memes;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

const getRightCaptions = async (image_id) => {
  const response = await fetch(SERVER_URL + '/api/memes/'+image_id+'/captions', {
    method: 'GET',
    credentials: 'include',
  }
  );
  if(response.ok) {
    const captions = await response.json();
    return captions;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

const getGames = async () => {
  const response = await fetch(SERVER_URL + '/api/games', {
    method: 'GET',
    credentials: 'include',
  }
  );
  if(response.ok) {
    const games = await response.json();
    return games;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

const createGame = async (game) => {
  const response = await fetch(SERVER_URL + '/api/games', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(game)
  }
  );
  if(response.ok) {
    const game = await response.json();
    return game;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

const getUserInfo = async () => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    credentials: 'include',
  });
  const user = await response.json();
  if (response.ok) {
    return user;
  } else {
    throw user;  
  }
};

const API = {logIn, logOut, getMemes, getRightCaptions, getUserInfo, getGames, createGame};
export default API;