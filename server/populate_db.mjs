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

// populate image table
db.serialize(() => {

  db.run(`INSERT INTO images (image_path) VALUES 
          ("images/meme1.jpg"),
          ("images/meme2.jpg"),
          ("images/meme3.jpg"),
          ("images/meme4.png"),
          ("images/meme5.jpg"),
          ("images/meme6.jpg"),
          ("images/meme7.jpg"),
          ("images/meme8.jpg"),
          ("images/meme9.jpg"),
          ("images/meme10.jpg")`, (err) => {
    if (err) console.error('Error inserting into image table:', err);
    else console.log('Image table populated successfully');
  });

  // populate caption table
  db.run(`INSERT INTO captions (text) VALUES 
          ("I am a caption"),
          ("I am a caption too"),
          ("I am a caption as well"),
          ("I am a caption also"),
          ("I am a caption"),
          ("I am a caption too"),
          ("I am a caption as well"),
          ("I am a caption also"),
          ("I am a caption"),
          ("I am a caption too")`, (err) => {
    if (err) console.error('Error inserting into caption table:', err);
    else console.log('Caption table populated successfully');
  });

  // populate image_caption table
  db.run(`INSERT INTO image_caption (image_id, caption_id) VALUES 
          (1, 1),
          (1, 2),
          (2, 3),
          (2, 4),
          (3, 5),
          (3, 6),
          (4, 7),
          (4, 8),
          (5, 9),
          (5, 10),
          (6, 1),
          (6, 2),
          (7, 3),
          (7, 4),
          (8, 5),
          (8, 6),
          (9, 7),
          (9, 8),
          (10, 9),
          (10, 10),
          (1, 3),
          (2, 5),
          (3, 7),
          (4, 9),
          (5, 2),
          (6, 4),
          (7, 6),
          (8, 8),
          (9, 10),
          (10, 1)`, (err) => {
    if (err) console.error('Error inserting into image_caption table:', err);
    else console.log('Image_caption table populated successfully');
  });

  // populate users table
  db.run(`INSERT INTO users (username, password, salt) VALUES 
          ("nzino", "34b0656d14a28bf80b6fab94f57657991e485be3be5b959fe5237e7626eb7b77", "de97328f5849c53e"),
          ("luigi", "78f3ca8828c15a99ba03b036ae6deb6c2570660fc4fa085819fd61c085af0b78", "aa9995a7880068b8")`, (err) => {
    if (err) console.error('Error inserting into users table:', err);
    else console.log('Users table populated successfully');
  });

  // populate games table
  db.run(`INSERT INTO games (user_id, score, correct, wrong) VALUES 
          (1, 10, 2, 1),
          (2, 15, 3, 0)`, (err) => {
    if (err) console.error('Error inserting into games table:', err);
    else console.log('Games table populated successfully');
  });
});
