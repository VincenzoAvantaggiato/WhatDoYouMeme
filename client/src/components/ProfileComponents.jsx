import { useEffect, useState } from "react";
import { Button, Col, Container, Offcanvas, Pagination, Row, Table } from "react-bootstrap";
import API from "../API";
import Propic from "../assets/man-user-color-icon.svg";
import { SERVER_URL } from "../API.mjs";

function ProfilePage(props) {
    const [games, setGames] = useState([]);
    const [numPages, setNumPages] = useState(1);
    const maxRows = 6;
    const [gameDetails, setGameDetails] = useState(null);
    const [waiting, setWaiting] = useState(false);

    useEffect(() => {
        const getGames = async () => {
            setWaiting(true);
            const games = await API.getGames();
            setGames(games);
            setWaiting(false);
        }
        getGames().catch(err => {
            setMessage({msg: err.message, type: 'danger'});
            setWaiting(false);
        });
    }, [props.saving]);

    useEffect(() => {
        setNumPages(Math.ceil(games.length / maxRows));
    }, [games]);
    return (<>
            
        <Row className="mx-5">
            <Col className="d-flex">
                <Profile user={props.user} tot_games={games.length} handleLogout={props.handleLogout} correct_guesses={games.length>0?games.flatMap(game=>game.scores).filter(s=>s==5).length/games.flatMap(game=>game.scores).length:0}></Profile>
            </Col>
            {<Col >
                <h1 className="w-100 text-center">Previous Games</h1>
                <p className="w-100 text-center">Click on a game to see the details</p>
                <PreviousGames numPages={numPages} games={games} waiting={waiting} maxRows={maxRows} setGameDetails={setGameDetails}/>
            </Col>}
            
        </Row>
        {gameDetails&& <Details game={gameDetails} closeDetails={()=>setGameDetails(null)}/>}
        
        </>
    );
}

function Details(props) {
    return (
        <Offcanvas show={true} onHide={()=>props.closeDetails()} placement="bottom" className="my-offcanvas bg-light ">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Game {props.game.id}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Row className="d-flex justify-content-around align-items-center">
                    <Col className="d-flex flex-column justify-content-center align-items-center">
                        <h3 >Round 1</h3>
                        <img src={SERVER_URL+"/api/images/"+props.game.images[0]} alt="Round 1" className={props.game.scores[0]==5?"border border-success border-5 p-0 image-offcanvas" : "border border-danger border-5 p-0 image-offcanvas"}/>
                        <h3 className={props.game.scores[0]==5?"text-success":"text-danger"}>{"Score: "+props.game.scores[0]}</h3>
                    </Col>
                    <Col className="d-flex flex-column justify-content-center align-items-center">
                        <h3>Round 2</h3>
                        <img src={SERVER_URL+"/api/images/"+props.game.images[1]} alt="Round 2" className={props.game.scores[1]==5?"border border-success border-5 p-0 image-offcanvas" : "border border-danger border-5 p-0 image-offcanvas"}/>
                        <h3 className={props.game.scores[1]==5?"text-success":"text-danger"}>{"Score: "+props.game.scores[1]}</h3>
                    </Col>
                    <Col className="d-flex flex-column justify-content-center align-items-center">
                        <h3>Round 3</h3>
                        <img src={SERVER_URL+"/api/images/"+props.game.images[2]} alt="Round 3" className={props.game.scores[2]==5?"border border-success border-5 p-0 image-offcanvas" : "border border-danger border-5 p-0 image-offcanvas"}/>
                        <h3 className={props.game.scores[2]==5?"text-success":"text-danger"}>{"Score: "+props.game.scores[2]}</h3>
                    </Col>
                </Row>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

function Profile(props) {
    return (
        <Container className="d-flex flex-column justify-content-center align-items-center">
            <img src={Propic} alt="Profile" className="propic" />
            <h3>@{props.user.username}</h3>
            <h3>Games played: {props.tot_games}</h3>
            <h3>Correctly guessed memes: {(props.correct_guesses*100).toFixed(2)}%</h3>
            <br/>
            <Button onClick={()=>{props.handleLogout(); navigate('/logout')}}>Logout    <i className='bi bi-box-arrow-right'></i></Button>
        
        </Container>
    );
}

function PreviousGames(props){
    const [page, setPage] = useState(0);
    return(<>
        <Table striped bordered hover fixed>
            <thead>
                <tr>
                    <th className="text-center align-middle">Game</th>
                    <th className="text-center align-middle"><i className="bi bi-1-circle-fill fs-3 text-info"></i></th>
                    <th className="text-center align-middle"><i className="bi bi-2-circle-fill fs-3 text-info"></i></th>
                    <th className="text-center align-middle"><i className="bi bi-3-circle-fill fs-3 text-info"></i></th>
                    <th className="text-center align-middle"><i className="bi bi-award-fill fs-2 text-primary"></i></th>
                </tr>
            </thead>
            <tbody>
                {props.waiting && Array.from({length: props.maxRows-props.games.slice(page*props.maxRows,(page+1)*props.maxRows).length}).map((_,i)=> (
                    <tr className="empty-row" key={`empty-${i}`}>
                        <td className="text-center align-middle">Loading...</td>
                        <td className="column-width-20"></td>
                        <td className="column-width-20"></td>
                        <td className="column-width-20"></td>
                        <td className="column-width-20"></td>
                    </tr>
                ))}
                {!props.waiting && props.games.slice(page*props.maxRows,(page+1)*props.maxRows).map(game => (
                    <tr key={game.id} onClick={()=>props.setGameDetails(game)}>
                        <td className="text-center align-middle column-width-20">{game.id}</td>
                        <td className="text-center align-middle column-width-20">
                            <img src={SERVER_URL+"/api/images/"+game.images[0]} alt="Round 1" className={game.scores[0]==5?"border border-success border-2 p-0 image-row" : "border border-danger border-2 p-0 image-row"}/>
                        </td>
                        <td className="text-center align-middle column-width-20">
                            <img src={SERVER_URL+"/api/images/"+game.images[1]} alt="Round 2" className={game.scores[1]==5?"border border-success border-2 p-0 image-row" : "border border-danger border-2 p-0 image-row"} />
                        </td>
                        <td className="text-center align-middle column-width-20">
                            <img src={SERVER_URL+"/api/images/"+game.images[2]} alt="Round 3" className={game.scores[2]==5?"border border-success border-2 p-0 image-row" : "border border-danger border-2 p-0 image-row"} />
                        </td>
                        <td className="text-center align-middle column-width-20">{game.scores.reduce((a,b)=>a+b)}</td>
                    </tr>
                ))}
                {!props.waiting && Array.from({length: props.maxRows-props.games.slice(page*props.maxRows,(page+1)*props.maxRows).length}).map((_,i)=> (
                    <tr className="empty-row" key={`empty-${i}`}>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
        </Table>
        <Container className="d-flex align-items-center justify-content-center">
            {//(numPages > 1) &&
                    <Pagination>
                        <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 0} />
                        {[...Array(props.numPages).keys()].map((i) => (
                            <Pagination.Item key={i} active={i === page} onClick={() => setPage(i)}>
                                {i + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => setPage(page + 1)} disabled={page === props.numPages -1} />
                    </Pagination>
                }  
        </Container>
        </>
    );
}

export default ProfilePage;