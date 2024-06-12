import { useEffect, useState } from "react";
import { Col, Container, Pagination, Row, Table } from "react-bootstrap";
import API from "../API";

function PreviousGames() {
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(0);
    const [numPages, setNumPages] = useState(1);
    const maxRows = 5;
    
    
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
        <Container className="d-flex align-items-center justify-content-center">
            <h1>Previous Games</h1>
        </Container>
        <Row>
            <Col></Col>
            <Col>
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
                            <tr key={game.id}>
                                <td className="text-center">{game.id}</td>
                                <td className="text-center">{game.correct}</td>
                                <td className="text-center">{game.wrong}</td>
                                <td className="text-center">{game.score}</td>
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
            </Col>
            <Col></Col>
        </Row>
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
        </>
    );
}

function Overlay(props) {
    return (
        <Container className="position-absolute top-50 start-50 translate-middle">

        </Container>
    );
}

export default PreviousGames;