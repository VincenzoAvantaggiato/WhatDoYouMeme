import sqlite from 'sqlite3';

// open the database
export const db = new sqlite.Database('memes.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err);
    throw err;
  } else {
    console.log('Database opened successfully');
  }
});

// create the tables
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS captions (id INTEGER NOT NULL PRIMARY KEY, text TEXT NOT NULL)', (err) => {
    if (err) console.error('Error creating caption table:', err);
    else console.log('Caption table created successfully');
  });

  db.run('CREATE TABLE IF NOT EXISTS images (id INTEGER NOT NULL PRIMARY KEY, image_path TEXT NOT NULL)', (err) => {
    if (err) console.error('Error creating image table:', err);
    else console.log('Image table created successfully');
  });

  db.run('CREATE TABLE IF NOT EXISTS image_caption (image_id INTEGER NOT NULL, caption_id INTEGER NOT NULL, FOREIGN KEY(image_id) REFERENCES image(id), FOREIGN KEY(caption_id) REFERENCES image_caption(id))', (err) => {
    if (err) console.error('Error creating image_caption table:', err);
    else console.log('Image_caption table created successfully');
  });

  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER NOT NULL PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL, salt TEXT)', (err) => {
    if (err) console.error('Error creating users table:', err);
    else console.log('Users table created successfully');
  });
  db.run('CREATE TABLE IF NOT EXISTS games (id INTEGER NOT NULL PRIMARY KEY, user_id INTEGER NOT NULL, score_round1 INTEGER NOT NULL, score_round2 INTEGER NOT NULL, score_round3 INTEGER NOT NULL, image_round1 TEXT NOT NULL, image_round2 TEXT NOT NULL, image_round3 TEXT NOT NULL, FOREIGN KEY(user_id) REFERENCES users(id))', (err) => {
    if (err) console.error('Error creating games table:', err);
    else console.log('Games table created successfully');
  });
});
