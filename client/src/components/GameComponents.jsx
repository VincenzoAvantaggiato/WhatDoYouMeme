import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../API";
import Loser from "../assets/pepe-loser.gif";
import {Game}  from "../../Meme.mjs";


function GamePage(props) {
    const [round, setRound] = useState(0);
    const [memes, setMemes] = useState([]);
    const [roundOver, setRoundOver] = useState(false);
    const [rightCaptions, setRightCaptions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState([null, null, null]);
    const [scores, setScores] = useState([0,0,0]);
    const saveGame = async () => {
        try {
            await API.createGame(new Game(-1,-1, scores, memes.map(meme=>meme.image_path)));
        } catch (err) {
            console.error(err);
        }
    }
    const nextRound = () => {
        if (props.loggedIn && round >= 3) {
            saveGame();
            return setRound(-1);
        }
        if (!props.loggedIn && round >= 1) {
            saveGame();
            return setRound(-1);
        }
        setRound(round=> round + 1);
        setRoundOver(false);
        setRightCaptions([]);
    }

    const incrementScore = () => {
        setScores(scores => scores.map((score, index) => index === round-1 ? score + 5 : score));
    }

    useEffect(() => {
        const getMemes = async () => {
            const memes = await API.getMemes();
            setMemes(memes);
        }
        if (round===0) {
            getMemes();
            setScores([0,0,0]);
            setSelectedAnswers([null, null, null]);
        }
    }, [round]);
    
    const submitAnswer = async (caption) => {
        try {
            setRoundOver(true);
            setSelectedAnswers(selectedAnswers => selectedAnswers.map((answer, index) => index === round-1 ? caption : answer));
            const captions =await API.getRightCaptions(memes[round-1].id);
            const captionsId = captions.map(caption => caption.id);
            setRightCaptions(captionsId);
            if (captionsId.includes(caption.id)) {
                incrementScore();
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    return(
        <>
        {round === 0 ? <Instructions next={nextRound} loggedIn={props.loggedIn}/> : 
         round ===-1 ? <Recap loggedIn={props.loggedIn} scores={scores} next={nextRound} selectedAnswers={selectedAnswers} images={memes.map(meme=>meme.image_path)}></Recap>:
                       <Round round={round} image={memes[round-1].image_path} captions={memes[round-1].captions} score={scores.reduce((a,b)=>a+b)} next={nextRound} roundOver={roundOver} submitAnswer={submitAnswer} rightCaptions={rightCaptions} selectedAnswer={selectedAnswers[round-1]}/>}
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
            <Button className="btn btn-primary" onClick={()=>props.next()}>Start Game</Button>
        </Container>)
}

function Recap(props){
    
    return(
        <Container className='d-flex flex-column align-items-center justify-content-center'>
            <h1>Game Over</h1>
            <h4>Thank you for playing!</h4>
            <h4><i className="bi bi-check-circle-fill fs-3 text-success"></i> Correct answers: {props.scores.filter(s=>s==5).length}</h4>
            <h4><i className="bi bi-x-circle-fill fs-3 text-danger"></i> Wrong answers: {props.scores.filter(s=>s==0).length}</h4>
            <h2 className="d-flex justify-content-end"><i className="bi bi-award-fill fs-2 text-primary"></i> Final score: {props.scores.reduce((a,b)=>a+b)}</h2>
            
            <br></br>
            {props.scores.filter(s=>s==5).length>0 && <h4>Memes that you correctly guessed:</h4>}
            <Row>
                {props.loggedIn && props.scores.map((score, index) => {
                    if (score==0) return;
                    return <Col className="d-flex flex-column  align-items-center">
                        
                        <img src={props.images[index]} alt="Meme" style={{maxWidth: '15vw', maxHeight: '15vh', height: 'auto', width: 'auto' }}/>
                        <p className="text-center">{props.selectedAnswers[index].text}</p>
                    </Col>
                })}
            </Row>
            <br></br>
            <Row>
                <Col className="d-flex justify-content-center align-items-center"><Link to='/' className='btn btn-primary bi bi-house'> Home</Link></Col>
                {props.loggedIn &&<Col className="d-flex justify-content-center align-items-center"><Link to='/games' className='btn btn-danger bi bi-controller '> Previous games</Link></Col>}
                <Col className="d-flex justify-content-center align-items-center"><Link to='/play' className='btn btn-success bi bi-joystick' onClick={()=>props.next()}> Play again</Link></Col>
            </Row>
            
        </Container>
    )};

function Round(props) {
    return(
        <>
            <Row className="d-flex h-25 justify-content-start  align-items-end">
                <Col className="d-flex justify-content-left">
                    {props.roundOver && !props.rightCaptions.includes(props.selectedAnswer) && <img src={Loser} alt="Loser" style={{overlay: 'true'}}/>}
                </Col>
                <Col>
                    <h1 className="d-flex justify-content-center">Round {props.round}</h1>
                    <h6 className="d-flex justify-content-center">Guess the caption that best fits the image</h6>
                </Col>
                <Col>
                    <h2 className="d-flex justify-content-end"><i className="bi bi-award-fill fs-2 text-primary"></i> Score: {props.score}</h2>
                </Col>
            </Row>
            <Row className="m-3 d-flex h-50 justify-content-center align-items-center">
                <Col className="d-flex justify-content-center align-items-center">
                    <img src={props.image} alt="Meme" style={{maxWidth: '45vw', maxHeight: '40vh', height: 'auto', width: 'auto' }}/>
                </Col>
                <Col>
                    {props.captions.map(caption => <Row><Button key={caption.id} className={!props.roundOver?"btn-light border border-primary border-2 rounded m-2": 
                                                                                            props.selectedAnswer.id===caption.id?
                                                                                            props.rightCaptions.includes(caption.id)?"btn-success border border-success border-2 rounded m-2"
                                                                                                                                    :"btn-danger border border-danger border-2 rounded m-2"
                                                                                            :props.rightCaptions.includes(caption.id)?"btn-light border border-success border-2 rounded m-2"
                                                                                                                                    :"btn-light border border-danger border-2 rounded m-2"} 
                                                    disabled={props.roundOver} onClick={()=>props.submitAnswer(caption)}>{caption.text}</Button></Row>)}
                </Col>
            </Row>
            <Row className="h-25">
            {!props.roundOver && <Timer time={30} submitAnswer={props.submitAnswer} className='footer'/>}
            {props.roundOver && <Container className='d-flex flex-column align-items-center justify-content-center'>
                <Button className="btn btn-primary" onClick={()=>props.next()}>Next Round</Button>
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
        const interval = setInterval(() => {
            setTime(prevTime => {
                if (prevTime > 1) {
                    return prevTime - 1;
                } else {
                    clearInterval(interval);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setColor(prevColor => ({
            r: Math.min(prevColor.r + increment, 255),
            g: Math.max(prevColor.g - increment/2, 0),
            b: Math.max(prevColor.b - increment/2, 0),
        }));
        if (time===0) {
            props.submitAnswer(undefined);
        }
    }, [time]);

    return (
        <Container className='d-flex flex-column align-items-center justify-content-center'>
            <h1 style={{color: `rgb(${color.r}, ${color.g}, ${color.b})`}}>{time}</h1>
            <Container className="progress" style={{ backgroundColor: 'transparent' }}>
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