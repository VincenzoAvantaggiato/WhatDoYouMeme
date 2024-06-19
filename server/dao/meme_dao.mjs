import { db } from "../db.mjs";
import { Image, Caption } from "../Meme.mjs";

export default function MemeDAO() {
    this.getRandomMeme = function(num) {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM images ORDER BY RANDOM() LIMIT ?',[num], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const images = [];
                    const captions=rows.map(row => {
                    
                        let image=new Image(row.id, row.image_path, []);
                        return new Promise((resolve, reject) => {
                            db.all('SELECT C.id, C.text FROM image_caption IC INNER JOIN captions C ON IC.caption_id = C.id WHERE image_id = ? ORDER BY RANDOM() LIMIT 2', [row.id], (err, rows) => {
                                if (err) {
                                    console.error(err);
                                    reject(err);
                                } else {
                                    rows.forEach(row => {
                                        image.captions.push(new Caption(row.id, row.text));
                                    });
                                    const sql =`SELECT id, text
                                                FROM captions
                                                WHERE id NOT IN (SELECT caption_id FROM image_caption WHERE image_id = ?)
                                                ORDER BY RANDOM()
                                                LIMIT 5`;
                                    db.all(sql, [row.id], (err, rows) => {
                                        if (err) {
                                            console.error(err);
                                            reject(err);
                                        } else {
                                            rows.forEach(row => {
                                                image.captions.push(new Caption(row.id, row.text));
                                            });
                                            image.captions.sort(() => Math.random() - 0.5);
                                            images.push(image);
                                            resolve()
                                        }
                                    });
                                }
                            });
                        });
                    });

                    Promise.all(captions)
                    .then(() => resolve(images))
                    .catch(err => reject(err));
                }
            });
        });
    }
    this.getCaptions = function(image_id) {
        return new Promise((resolve, reject) => {
            db.all('SELECT C.id, C.text FROM image_caption IC INNER JOIN captions C ON IC.caption_id = C.id WHERE image_id = ?', [image_id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const captions = rows.map(row => new Caption(row.id, row.text));
                    resolve(captions);
                }
            });
        });
    }
}
