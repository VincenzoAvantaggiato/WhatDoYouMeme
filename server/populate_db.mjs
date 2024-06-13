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
  db.run(`DELETE FROM images`, (err) => {
    if (err) console.error('Error deleting from image table:', err);
    else console.log('Image table deleted successfully');
  });
  db.run(`DELETE FROM captions`, (err) => {
    if (err) console.error('Error deleting from caption table:', err);
    else console.log('Caption table deleted successfully');
  });
  db.run(`DELETE FROM image_caption`, (err) => {
    if (err) console.error('Error deleting from image_caption table:', err);
    else console.log('Image_caption table deleted successfully');
  });
  db.run(`DELETE FROM users`, (err) => {
    if (err) console.error('Error deleting from users table:', err);
    else console.log('Users table deleted successfully');
  });
  db.run(`DELETE FROM games`, (err) => {
    if (err) console.error('Error deleting from games table:', err);
    else console.log('Games table deleted successfully');
  });

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
          ("images/meme10.jpg"),
          ("images/meme11.gif"),
          ("images/meme12.jpg")`, (err) => {
    if (err) console.error('Error inserting into image table:', err);
    else console.log('Image table populated successfully');
  });

  // populate caption table
  db.run(`INSERT INTO captions (text) VALUES 
          ("Lezione alle 8:30"),
          ("Esami a fine luglio"),
          ("30L // My project"),
          ("Your password // Hacked profile"),
          ("Io durante la sessione"),
          ("Io a Torino a Luglio // I miei amici al mare in Puglia"),
          ("React+bootstrap // HTML+CSS"),
          ("Ingegneria informatica // Ingegneria elettronica"),
          ("Studiare durante tutto il semestre // Studiare 2 giorni prima dell'esame"),
          ("Studiare per gli esami // Andare a mare"),
          ("Io che aspetto i voti del secondo appello"),
          ("Io che aspetto il mio amico che si doveva laureare quest'anno"),
          ("C'è un modo per passare l'esame senza studiare"),
          ("C'è un AI che fa i meme per te"),
          ("Io che mi preparo a dare 4 esami in 10 giorni"),
          ("Lezione a metà giugno senza aria condizionata"),
          ("Studia durante tutto il semestre // Quel collega"),
          ("Rifiuta un 18 // Quel collega"),
          ("Average python fan // Average C enjoyer"),
          ("Average front-end developer // Average back-end developer")
          `, (err) => {
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
          (6, 11),
          (6, 12),
          (7, 13),
          (7, 14),
          (8, 15),
          (8, 16),
          (9, 17),
          (9, 18),
          (10, 11),
          (10, 12),
          (11, 19),
          (11, 20),
          (12, 5),
          (12,1)
          `, (err) => {
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
  /*db.run(`INSERT INTO games (user_id, score, correct, wrong) VALUES 
          (1, 10, 2, 1),
          (2, 15, 3, 0)`, (err) => {
    if (err) console.error('Error inserting into games table:', err);
    else console.log('Games table populated successfully');
  });*/
});
