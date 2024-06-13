import { useEffect, useState } from "react";
import { Col, Container, Offcanvas, Pagination, Row, Table } from "react-bootstrap";
import API from "../API";

function PreviousGames() {
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(0);
    const [numPages, setNumPages] = useState(1);
    const maxRows = 10;
    const [gameDetails, setGameDetails] = useState(null);

    useEffect(() => {
        const getGames = async () => {
            const games = await API.getGames();
            setGames(games);
        }
        getGames();
    }, []);
    useEffect(() => {
        setNumPages(Math.ceil(games.length / maxRows));
    }, [games]);
    return (<>
            <h1 className="w-100 text-center">Previous Games</h1>
            <p className="w-100 text-center">Click on a game to see the details</p>
        <Row>
            {/*!gameDetails && */<Col></Col>}
            <Col >
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th className="text-center py-3">Game</th>
                            <th className="text-center"><i className="bi bi-check-circle-fill fs-3 text-success"></i></th>
                            <th className="text-center"><i className="bi bi-x-circle-fill fs-3 text-danger"></i></th>
                            <th className="text-center"><i className="bi bi-award-fill fs-2 text-primary"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {games.slice(page*maxRows,(page+1)*maxRows).map(game => (
                            <tr key={game.id} onClick={()=>setGameDetails(game)}>
                                <td className="text-center">{game.id}</td>
                                <td className="text-center">{game.scores.filter(s=>s==5).length}</td>
                                <td className="text-center">{game.scores.filter(s=>s==0).length}</td>
                                <td className="text-center">{game.scores.reduce((a,b)=>a+b)}</td>
                            </tr>
                        ))}
                        {Array.from({length: maxRows-games.slice(page*maxRows,(page+1)*maxRows).length}).map((_,i)=> (
                            <tr key={`empty-${i}`}>
                                <td className="text-center">‎</td>
                                <td className="text-center">‎</td>
                                <td className="text-center">‎</td>
                                <td className="text-center">‎</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Container className="d-flex align-items-center justify-content-center">
                    {//(numPages > 1) &&
                            <Pagination>
                                <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 0} />
                                {[...Array(numPages).keys()].map((i) => (
                                    <Pagination.Item key={i} active={i === page} onClick={() => setPage(i)}>
                                        {i + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next onClick={() => setPage(page + 1)} disabled={page === numPages -1} />
                            </Pagination>
                        }  
                </Container>
            </Col>
            
            <Col>
            {gameDetails&& <Details game={gameDetails} closeDetails={()=>setGameDetails(null)}/>}
            </Col>
        </Row>
        
        </>
    );
}

function Details(props) {


    return (
        <Offcanvas show={true} onHide={()=>props.closeDetails()} placement="bottom" className="bg-light" style={{ height: '40vh', maxHeight: '40vh' }}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Game {props.game.id}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Row className="d-flex justify-content-around align-items-center">
                    <Col className="d-flex flex-column justify-content-center align-items-center">
                        <h3 >Round 1</h3>
                        <img src={props.game.images[0]} alt="Round 1" style={{maxWidth: '25vw', maxHeight: '20vh', height: 'auto', width: 'auto', borderWidth: '5px', borderStyle: 'solid'}} className={props.game.scores[0]==5?"border border-success border-5 p-0" : "border border-danger border-5 p-0"}/>
                        <h3 className={props.game.scores[0]==5?"text-success":"text-danger"}>{"Score: "+props.game.scores[0]}</h3>
                    </Col>
                    <Col className="d-flex flex-column justify-content-center align-items-center">
                        <h3>Round 2</h3>
                        <img src={props.game.images[1]} alt="Round 2" style={{maxWidth: '25vw', maxHeight: '20vh', height: 'auto', width: 'auto' }} className={props.game.scores[1]==5?"border border-success border-5 p-0" : "border border-danger border-5 p-0"}/>
                        <h3 className={props.game.scores[1]==5?"text-success":"text-danger"}>{"Score: "+props.game.scores[1]}</h3>
                    </Col>
                    <Col className="d-flex flex-column justify-content-center align-items-center">
                        <h3>Round 3</h3>
                        <img src={props.game.images[2]} alt="Round 3" style={{maxWidth: '25vw', maxHeight: '20vh', height: 'auto', width: 'auto' }} className={props.game.scores[2]==5?"border border-success border-5 p-0" : "border border-danger border-5 p-0"}/>
                        <h3 className={props.game.scores[2]==5?"text-success":"text-danger"}>{"Score: "+props.game.scores[2]}</h3>
                    </Col>
                </Row>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default PreviousGames;