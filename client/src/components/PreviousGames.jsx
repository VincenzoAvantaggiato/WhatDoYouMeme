import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import API from "../API";

function PreviousGames() {
    const [games, setGames] = useState([]);
    
    useEffect(() => {
        const getGames = async () => {
            const games = await API.getGames();
            setGames(games);
        }
        getGames();
    }, []);
    return (
        <Row>
            <Col></Col>
            <Col>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className="text-center py-3">Game</th>
                            <th className="text-center"><i className="bi bi-check-circle-fill fs-3 text-success"></i></th>
                            <th className="text-center"><i className="bi bi-x-circle-fill fs-3 text-danger"></i></th>
                            <th className="text-center"><i className="bi bi-award-fill fs-2 text-primary"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {games.map(game => (
                            <tr key={game.id}>
                                <td className="text-center">{game.id}</td>
                                <td className="text-center">{game.correct}</td>
                                <td className="text-center">{game.wrong}</td>
                                <td className="text-center">{game.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
            <Col></Col>
        </Row>
    );
}

function Overlay(props) {
    return (
        <Container className="position-absolute top-50 start-50 translate-middle">

        </Container>
    );
}

export default PreviousGames;