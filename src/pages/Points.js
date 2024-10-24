import React, {useState, useEffect} from "react"
import { Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import CollectPointCard from "../components/CollectPointCard";
import CollectPointService from "../services/CollectPointService";
import PublicNavbar from "../components/PublicNavbar";

export default function Points()
{
    
    const navigate = useNavigate();
    const [collectPoints, setCollectPoints] = useState([]);
    const collectPointService = new CollectPointService(navigate);


    async function getAllCollectPoints()
    {
        let getall = await collectPointService.getAllPublic();
        if(getall && getall.length !== 0)
        {
            setCollectPoints(getall);
        }
        return;
    }


    useEffect(() => {
        getAllCollectPoints();
    }, [])


    return (
        <>
            <Container fluid="md">
                <PublicNavbar></PublicNavbar>
                <h3>Pontos de Coleta</h3>
                <Row>
                    {collectPoints.map(point => (
                        <CollectPointCard key={point.id} point={point} />
                    ))}
                </Row>
            </Container>
        </>
    )
}