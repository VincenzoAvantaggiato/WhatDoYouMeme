

function Caption(id, text){
    this.id=id;
    this.text = text;
}

function Image(id, image_path, captions){
    //if (captions.length < 2)
        //throw "Image must have at least 2 captions";
    this.captions = captions;
    this.id = id;
    this.image_path = image_path;
}

function Game(id, user_id, score, correct, wrong){
    this.id = id;
    this.user_id = user_id;
    this.score = score;
    this.correct = correct;
    this.wrong = wrong;
}

export {Image, Caption, Game};