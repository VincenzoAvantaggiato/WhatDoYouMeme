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
          ("meme1.jpg"),
          ("meme2.jpg"),
          ("meme3.jpg"),
          ("meme4.png"),
          ("meme5.jpg"),
          ("meme6.jpg"),
          ("meme7.jpg"),
          ("meme8.jpg"),
          ("meme9.jpg"),
          ("meme10.jpg"),
          ("meme11.gif"),
          ("meme12.jpg")`, (err) => {
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
          ("Average front-end developer // Average back-end developer"),
          ("Io al primo esame // Io all'ultimo esame"),
          ("Procrastinare // Studiare"),
          ("Avere un piano di studio // Seguirlo"),
          ("La mia motivazione a inizio semestre // La mia motivazione alla fine del semestre"),
          ("Avere un buon portatile // Avere una buona connessione internet"),
          ("Ultimo giorno per iscriversi agli esami // Server del portale"),
          ("Sessione estiva // Sessione invernale"),
          ("Scrivere codice senza errori // Trovare tutti i bug"),
          ("Quando ti dicono che l'esame è solo a crocette // Quando ti dicono che c'è anche un orale"),
          ("Iniziare il progetto subito // Fare tutto l'ultimo giorno"),
          ("Quando capisci l'argomento // Quando non capisci nulla"),
          ("Ascoltare le lezioni registrate // Ascoltare le lezioni in diretta"),
          ("Quando il wifi smette di funzionare durante l'esame online"),
          ("Capire la teoria // Saper risolvere i problemi"),
          ("Essere preparati per l'esame // Sperare in un miracolo"),
          ("Andare in Erasmus // Rimanere a casa"),
          ("Lezione su Zoom // Lezione in presenza"),
          ("Quando dimentichi di spegnere il microfono su Zoom"),
          ("Quando ti rendi conto che l'esame è domani"),
          ("La faccia che fai quando vedi il compito in classe"),
          ("Quando il server del portale va giù all'iscrizione agli esami"),
          ("La mia faccia dopo aver visto il voto"),
          ("Quando speri in un 18 e prendi 30"),
          ("Quando tutti capiscono tranne te"),
          ("Quando capisci che il semestre sta per finire"),
          ("Aspettando l'esito dell'esame"),
          ("Quando ti svegli in ritardo per l'esame"),
          ("Quando l'esame viene spostato di una settimana"),
          ("Quando il tuo laptop decide di aggiornarsi proprio durante l'esame online"),
          ("Quando il tuo compagno di studio non smette di parlare")
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
          (12,1),
          (4,31),
          (4,30),
          (10,46),
          (6,46),
          (8,33),
          (4,36),
          (12,46),
          (12,47),
          (8,38),
          (1,39),
          (1,50)
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
