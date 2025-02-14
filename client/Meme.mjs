
export function Caption(id, text){
    this.id=id;
    this.text = text;
}

export function Image(id, image_path, captions){
    if (captions.length < 2)
        throw "Image must have at least 2 captions";
    this.captions = captions;
    this.id = id;
    this.image_path = image_path;
}

export function Game(id, user_id, scores, images){
    this.id = id;
    this.user_id = user_id;
    this.scores = scores;
    this.images = images;
}
