import {db} from '../db.mjs';
import {Game} from '../Meme.mjs';

export default function GameDao(){

    this.addGame = function(game){
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO games (user_id, score_round1, score_round2, score_round3, image_round1, image_round2, image_round3) VALUES (?, ?, ?, ?, ?, ?, ?)', [game.user_id, game.scores[0], game.scores[1], game.scores[2], game.images[0], game.images[1], game.images[2] ], function(err){
                if (err){
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    this.getGamesByUser = function(user_id){
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM games WHERE user_id = ?', [user_id], (err, rows) => {
                if (err){
                    reject(err);
                } else {
                    const games = rows.map(row => new Game(row.id, row.user_id, [row.score_round1, row.score_round2, row.score_round3], [row.image_round1, row.image_round2, row.image_round3]));
                    resolve(games);
                }
            });
        });
    }
}