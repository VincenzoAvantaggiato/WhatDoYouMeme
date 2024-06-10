import {db} from '../db.mjs';
import {Game} from '../Meme.mjs';

export default function GameDao(){

    this.addGame = function(game){
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO games (user_id, score, correct, wrong) VALUES (?, ?, ?,?)', [game.user_id, game.score, game.correct, game.wrong], function(err){
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
                    const games = rows.map(row => new Game(row.id, row.user_id, row.score, row.correct, row.wrong));
                    resolve(games);
                }
            });
        });
    }
}