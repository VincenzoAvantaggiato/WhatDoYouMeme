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
  db.run('CREATE TABLE IF NOT EXISTS captions (id INTEGER PRIMARY KEY, text TEXT)', (err) => {
    if (err) console.error('Error creating caption table:', err);
    else console.log('Caption table created successfully');
  });

  db.run('CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY, image_path TEXT)', (err) => {
    if (err) console.error('Error creating image table:', err);
    else console.log('Image table created successfully');
  });

  db.run('CREATE TABLE IF NOT EXISTS image_caption (image_id INTEGER, caption_id INTEGER, FOREIGN KEY(image_id) REFERENCES image(id), FOREIGN KEY(caption_id) REFERENCES image_caption(id))', (err) => {
    if (err) console.error('Error creating image_caption table:', err);
    else console.log('Image_caption table created successfully');
  });

  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, salt TEXT)', (err) => {
    if (err) console.error('Error creating users table:', err);
    else console.log('Users table created successfully');
  });
  db.run('CREATE TABLE IF NOT EXISTS games (id INTEGER PRIMARY KEY, user_id INTEGER, score INTEGER, correct INTEGER, wrong INTEGER, FOREIGN KEY(user_id) REFERENCES users(id))', (err) => {
    if (err) console.error('Error creating games table:', err);
    else console.log('Games table created successfully');
  });
});
