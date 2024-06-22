import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../API";
import Loser from "../assets/pepe-loser.gif";
import { SERVER_URL } from "../API.mjs";


function GamePage(props) {
    const [round, setRound] = useState(0);
    const [memes, setMemes] = useState([]);
    const [roundOver, setRoundOver] = useState(false);
    const [rightCaptions, setRightCaptions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState([null, null, null]);
    const [scores, setScores] = useState([0,0,0]);
    const [waiting, setWaiting] = useState(false);

    const saveGame = async () => {
        try {
            props.setSaving(true)
            await API.createGame({scores: scores, images: memes.map(meme=>meme.image_path)});
            props.setSaving(false);
        } catch (err) {
            props.setMessage({msg: err.message , type: 'danger'});
            props.setSaving(false);
        }
    }
    const nextRound = () => {
        if (props.loggedIn && round >= 3) {
            saveGame();
            return setRound(-1);
        }
        if (!props.loggedIn && round >= 1) {
            return setRound(-1);
        }
        setRound(round=> round + 1);
        setRoundOver(false);
        setRightCaptions([]);
    }

    const incrementScore = () => {
        setScores(scores => scores.map((score, index) => index === round-1 ? score + 5 : score));
    }

    const getMemes = async () => {
        try {
            setWaiting(true);
            const memes = await API.getMemes();
            setMemes(memes);
            setWaiting(false);
            nextRound();
        }
        catch (err) {
            props.setMessage({msg: err.message , type: 'danger'});
            setWaiting(false);
        }
    }

    useEffect(() => {
        
        if (round===0) {
            setScores([0,0,0]);
            setSelectedAnswers([null, null, null]);
        }
    }, [round]);
    
    const submitAnswer = async (caption) => {
        try {
            setRoundOver(true);
            setSelectedAnswers(selectedAnswers => selectedAnswers.map((answer, index) => index === round-1 ? caption : answer));
            setWaiting(true);
            const captions =await API.getRightCaptions(memes[round-1].id);
            const captionsId = captions.map(caption => caption.id);
            setRightCaptions(captionsId);
            if (captionsId.includes(caption.id)) {
                incrementScore();
            }
            setWaiting(false);
        }
        catch (err) {
            props.setMessage({msg: err.message , type: 'danger'});
        }
    }
    return(
        <>
        {round === 0 ? !waiting? <Instructions next={nextRound} loggedIn={props.loggedIn} waiting={waiting} getMemes={getMemes}/> : 
             <Container className='d-flex flex-column align-items-center justify-content-center'><h1>Loading...</h1></Container> :
         round ===-1 ? <Recap loggedIn={props.loggedIn} scores={scores} next={nextRound} selectedAnswers={selectedAnswers} images={memes.map(meme=>meme.image_path)} ></Recap>:
                       <Round round={round} image={memes[round-1].image_path} captions={memes[round-1].captions} score={scores.reduce((a,b)=>a+b)} next={nextRound} roundOver={roundOver} submitAnswer={submitAnswer} 
                              rightCaptions={rightCaptions} selectedAnswer={selectedAnswers[round-1]} waiting={waiting} loggedIn={props.loggedIn} setMessage={props.setMessage}/>}
        </>
    )
}

function Instructions(props){
    return(
        <Container className='d-flex flex-column align-items-center justify-content-center'>
            <h1><i className="bi bi-heart-arrow fs-2 text-primary"></i><i className="bi bi-bullseye fs-2 text-primary"></i> Goal: guess the meme that best fits the image</h1>
            <h4><i className="bi bi-check-circle-fill fs-3 text-success"></i> Correct answer : +5 points</h4>
            <h4><i className="bi bi-x-circle-fill fs-3 text-danger"></i> Wrong answer: 0 points</h4>
            <h4><i className="bi bi-stopwatch-fill fs-3 text-warning" ></i> 30 seconds per round</h4>
            <h4><i className="bi bi-joystick fs-3 text-primary"></i> {props.loggedIn? <>3 rounds</> :<>1 round</>}</h4>
            {!props.loggedIn && <p><i className="bi bi-person"></i> Login to play 3 rounds</p>}
            <hr/>
            <Button className="btn btn-primary" onClick={()=>{props.getMemes();}} disabled={props.waiting}>Start Game</Button>
        </Container>)
}

function Recap(props){
    
    return(
        <Container className='d-flex flex-column align-items-center justify-content-center'>
            <h1>Game Over</h1>
            <h4>Thank you for playing!</h4>
            {props.loggedIn && <>
            <h4><i className="bi bi-check-circle-fill fs-3 text-success"></i> Correct answers: {props.scores.filter(s=>s==5).length}</h4>
            <h4><i className="bi bi-x-circle-fill fs-3 text-danger"></i> Wrong answers: {props.loggedIn? 3-props.scores.filter(s=>s==5).length: 1-props.scores.filter(s=>s==5).length}</h4>
            <h2 className="d-flex justify-content-end"><i className="bi bi-award-fill fs-2 text-primary"></i> Final score: {props.scores.reduce((a,b)=>a+b)}</h2>
            </>}
            <br></br>
            {props.scores.filter(s=>s==5).length>0 && <h4>Memes that you correctly guessed:</h4>}
            <Row>
                {props.loggedIn && props.scores.map((score, index) => {
                    if (score==0) return;
                    return <Col key={index} className="d-flex flex-column  align-items-center">
                        
                        <img src={SERVER_URL+"/api/images/"+props.images[index]} alt="Meme" className="image-recap"/>
                        <p className="text-center">{props.selectedAnswers[index].text}</p>
                    </Col>
                })}
            </Row>
            <br></br>
            <Container className="d-flex flex-row align-items-center justify-content-center">
                <Link to='/' className='btn btn-primary bi bi-house mx-1'> Home</Link>
                {props.loggedIn &&<Link to='/profile' className='btn btn-danger bi bi-controller mx-1'> Previous games</Link>}
                <Link to='/play' className='btn btn-success bi bi-joystick mx-1' onClick={()=>props.next()}> Play again</Link>
            </Container>
            
        </Container>
    )};

function Round(props) {
    return(
        <>
            <Row className="d-flex h-25 justify-content-start  align-items-end">
                <Col className="d-flex justify-content-left">
                    {!props.waiting&&props.roundOver && !props.rightCaptions.includes(props.selectedAnswer.id) && <img src={Loser} alt="Loser" />}
                </Col>
                <Col>
                    <h1 className="d-flex justify-content-center">Round {props.round}</h1>
                    <h6 className="d-flex justify-content-center">Guess the caption that best fits the image</h6>
                </Col>
                <Col>
                    <h2 className="d-flex justify-content-end me-3"><i className="bi bi-award-fill fs-2 text-primary"></i> Score: {props.score}</h2>
                </Col>
            </Row>
            <Row className="m-3 d-flex h-50 justify-content-center align-items-center">
                <Col className="d-flex justify-content-center align-items-center">
                    <img src={SERVER_URL+"/api/images/"+props.image} alt="Meme" className="image-round"/>
                </Col>
                <Col>
                    {props.captions.map(caption => <Row key={caption.id}><Button key={caption.id} className={!props.roundOver?"btn-light border border-primary border-2 rounded m-2": 
                                                                                            props.waiting?"btn-light border border-warning border-2 rounded m-2":
                                                                                            props.selectedAnswer.id===caption.id?
                                                                                            props.rightCaptions.includes(caption.id)?"btn-success border border-success border-2 rounded m-2"
                                                                                                                                    :"btn-danger border border-danger border-2 rounded m-2"
                                                                                            :props.rightCaptions.includes(caption.id)?"btn-light border border-success border-2 rounded m-2"
                                                                                                                                    :"btn-light border border-danger border-2 rounded m-2"} 
                                                    disabled={props.roundOver} onClick={()=>props.submitAnswer(caption)}>{caption.text}</Button></Row>)}
                </Col>
            </Row>
            <Row className="h-25 d-flex align-items-start">
            {!props.roundOver && <Timer time={30} submitAnswer={props.submitAnswer} setMessage={props.setMessage} className='footer'/>}
            {props.roundOver && 
                <Container className='d-flex flex-column align-items-center justify-content-center'>
                    {props.waiting? <h1 className="text-warning text-center">Waiting...</h1>:props.rightCaptions.includes(props.selectedAnswer.id)? <h1 className="text-success text-center">Correct!</h1>:<h1 className="text-danger text-center">Wrong!</h1>}
                    <Button className="btn btn-primary m-3" onClick={()=>props.next()} disabled={props.waiting}>{((props.loggedIn && props.round >= 3)||(!props.loggedIn && props.round >= 1))?"Finish game":"Next Round"}</Button>
                </Container>}
            </Row>
        </>
    )
}

function Timer(props) {
    const [time, setTime] = useState(props.time);
    const [color, setColor] = useState({ r: 0, g: 128, b: 128 });
    const increment = 255 / props.time;

    useEffect(() => {
        const t = setTimeout(() => {
            setTime(prevTime => {
                if (prevTime > 1) {
                    return prevTime - 1;
                } else {
                    clearTimeout(t);
                    return 0;
                }
            });
        }, 1000);

        return () => clearTimeout(t);
    }, [time]);

    useEffect(() => {
        setColor(prevColor => ({
            r: Math.min(prevColor.r + increment, 255),
            g: Math.max(prevColor.g - increment/2, 0),
            b: Math.max(prevColor.b - increment/2, 0),
        }));
        if (time===0) {
            props.submitAnswer({id: undefined, text: 'TIMEOUT'});
            props.setMessage({msg: 'Time is up!', type: 'danger'});
        }
    }, [time]);

    return (
        <Container className='d-flex flex-column align-items-center justify-content-center'>
            <h1 style={{color: `rgb(${color.r}, ${color.g}, ${color.b})`}}>{time}</h1>
            <Container className="progress progress-transparent">
                <Container
                    className="progress-bar progress-bar-striped progress-bar-animated rounded-pill"
                    role="progressbar"
                    style={{ width: `${(time / props.time) * 100}%`, backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`}}
                    aria-valuenow={time}
                    aria-valuemin={0}
                    aria-valuemax={props.time}
                >
                </Container>
            </Container>
        </Container>
    );
}

export default GamePage;