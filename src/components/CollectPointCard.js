import React, { useState } from 'react';
import { Modal, Button, Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OpenStreetMapSearch from './Address';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WastesCollectService from '../services/WastesCollectService';
import WorkHoursService from "../services/WorkHours";
import { FaStar } from "react-icons/fa";
import {faBuilding, faClock, faMapMarkerAlt, faRecycle, faPhone, faMapMarkedAlt, faEye, faFileAlt} from "@fortawesome/free-solid-svg-icons"
import CollectUserService from '../services/CollectUserService';

const CollectPointCard = ({ point }) => {
  const [showModal, setShowModal] = useState(false);
  const [workHour, setWorkHour] = useState({});
  const [collectUserData, setCollectUserData] = useState(null);
  const [wastes, setWastes] = useState([]);
  const navigate = useNavigate();
  const collectUserService = new CollectUserService(navigate);
  const wastesCollectService = new WastesCollectService(navigate);
  const workHoursService = new WorkHoursService(navigate);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const randomReviews = Math.floor(Math.random() * 6);
  let coordenadas = [
    point.latitude,
    point.longitude
  ]

  function goToLocation()
  {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        const destinationLat = point.latitude; 
        const destinationLng = point.longitude;
        
        const link = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destinationLat},${destinationLng}`;
        console.log(link)
        
        const newWindow = window.open(link, "_blank", "width=1000,height=600");
        if (newWindow) {
          newWindow.focus();
        }
      },
      (error) => {
        console.error('Erro ao obter localização:', error);
      }
    );
    
  }

  function SetViewOnClick({ center }) {
    const map = useMap();
    map.setView(center, 30);
    return null;
  }

  useEffect(() => {
    if (!point?.id || !point?.workHours_id) return;
  
    const getAllWastes = async () => {
      try {
        const resp = await wastesCollectService.insert(point.id);
        setWastes(resp);
        console.log(`Resíduos do Ponto de Coleta ${point.id}`, resp);
      } catch (error) {
        console.error('Erro ao buscar os resíduos:', error);
      }
    };
  
    const getWorkHour = async () => {
      try {
        const resp = await workHoursService.getOneById(point.workHours_id);
        setWorkHour(resp);
        console.log(`Horário de Funcionamento do Ponto de Coleta ${point.id}`, resp);
      } catch (error) {
        console.error("Erro ao buscar horário de funcionamento:", error);
      }
    };
    const getCollectUser = async () => {
      try {
        const resp2 = await collectUserService.getOne(point.collectUser_id);
        setCollectUserData(resp2[0]);
        console.log(`USUÁRIO DE COLETA DO PONTO DE COLETA ${point.id}`, collectUserData);
      } catch (error) {
        console.error("Erro ao buscar horário de funcionamento:", error);
      }
    };

    
  
    getAllWastes();
    getCollectUser();
    getWorkHour();
  }, [point?.id, point?.workHours_id, point?.collectUser_id]);
  
  return (
    <>
      <div className="col-md-4 mb-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{point.name}</h5>
            <p className="card-text">{point.description || 'Sem descrição disponível.'}</p>
            <strong className="card-text"><FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />&nbsp;Endereço</strong>
            <p className="card-text">
              <i className="fa-solid fa-location-dot"></i> {point.street}, {point.address_number}. {point.city} - {point.state}
            </p>
            {wastes.length > 0 ?  <strong className="card-text"> <FontAwesomeIcon icon={faRecycle} size="lg" />&nbsp; Materiais Aceitos</strong> : (
            <>
              <p className='card-text'><strong> <FontAwesomeIcon icon={faRecycle} size="lg" />&nbsp;Materiais Aceitos</strong></p><i>Não foi informado os resíduos aceitos neste ponto de coleta.</i>
            </>)}
           
            <Container className="d-flex justify-content-left my-2">
              <Row className="gap-1">
                  {wastes.map(waste => (
                    waste[0] && (
                      <Col xs="auto"><Button variant='secondary' key={waste[0].id} title={waste[0].description}>{waste[0].type}</Button> </Col>
                    )
                  ))}
              </Row>
            </Container>
            <p className="card-text">
              {workHour ? ( 
                  <>
                  <p className='card-text'><FontAwesomeIcon icon={faClock} size="lg" />&nbsp;<strong> Horário de Funcionamento </strong></p>
                  </>
              ) : (
                  <>
                  <p className='card-text'><FontAwesomeIcon icon={faClock} size="lg" />&nbsp;<strong> Horário de Funcionamento </strong></p>
                  <i>Horário de Funcionamento não foi especificado.</i>
                  </>
              )}
              {workHour && workHour.AMD_first && workHour.AMD_second ? ( 
                  <>
                  <a>Início as {workHour.AMD_first}, Pausa as {workHour.AMD_second}.</a><br/>
                  </>
                  ) : ("")}
              {workHour && workHour.BMD_first && workHour.BMD_second ? ( 
                <>
                <a>Retorno as {workHour.BMD_first} e Finalização as {workHour.BMD_second}.</a><br/>
                </>
                ) : ("")}
            </p>
            {/* <p className="card-text">Avaliações</p> */}
            {/* <p className="card-text">
            {randomReviews === 0 ? (
              <i>No momento não há avaliações disponíveis.</i>
            ) : (
                Array.from({ length: randomReviews }, (_, index) => (
                  <FaStar key={index} color="gold" size="20px" />
                )) 
                )}
                <i> {randomReviews}.0</i>
            </p> */}
            <hr />
            <Row>
              <Button variant="primary" title="Visualizar informações adicionais sobre este ponto de coleta." onClick={handleShow}>
              <FontAwesomeIcon icon={faEye} size="lg" />&nbsp; Ver mais
              </Button>

              <Button variant="danger" title="Buscar trajetos mais próximos para chegar ao ponto de coleta." onClick={goToLocation}>
              <FontAwesomeIcon icon={faMapMarkedAlt} size="lg" />&nbsp; Traçar Rota
              </Button>
            </Row>
            
          </div>
        </div>
      </div>

      {/* Modal com conteúdo dinâmico */}
      <Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Detalhes do Ponto de Coleta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p className='card-text'><FontAwesomeIcon icon={faFileAlt} size="lg" />&nbsp;<strong>Descrição</strong></p>
        <p className="card-text">{point.description || 'Sem descrição disponível.'}</p>
        <p className='card-text'><FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />&nbsp;<strong className="card-text">Endereço</strong></p>
        <p className="card-text">
          <i className="fa-solid fa-location-dot"></i> {point.street}, {point.address_number}. {point.city} - {point.state}
        </p>
        <MapContainer center={coordenadas} zoom={13} scrollWheelZoom={false} className="leaflet-container mt-3">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={coordenadas} />
            <SetViewOnClick center={coordenadas} />
          </MapContainer>
          {wastes.length > 0 ?  <strong className="card-text"><FontAwesomeIcon icon={faRecycle} size="lg" />&nbsp; Materiais Aceitos</strong> : (
            <>
              <p className='card-text'><strong><FontAwesomeIcon icon={faRecycle} size="lg" />&nbsp;Materiais Aceitos</strong></p><i>Não foi informado os resíduos aceitos neste ponto de coleta.</i>
            </>)}
           
            <Container className="d-flex justify-content-left my-2">
              <Row className="gap-1">
                  {wastes.map(waste => (
                    waste[0] && (
                    <Col xs="auto"><Button variant='secondary' key={waste[0].id} title={waste[0].description}>{waste[0].type}</Button> </Col>
                    )
                  ))}
              </Row>
            </Container>
            <p className="card-text">
              {workHour ? ( 
                  <>
                  <FontAwesomeIcon icon={faClock} size="lg" />&nbsp;<strong> Horário de Funcionamento </strong><br />
                  </>
              ) : (
                  <>
                  <p>Horário de Funcionamento não foi especificado.</p><br/>
                  </>
              )}
              {workHour && workHour.AMD_first && workHour.AMD_second ? ( 
                  <>
                  <a>Início as {workHour.AMD_first}, Pausa as {workHour.AMD_second}.</a><br/>
                  </>
                  ) : ("")}
              {workHour && workHour.BMD_first && workHour.BMD_second ? ( 
                <>
                <a>Retorno as {workHour.BMD_first} e Finalização as {workHour.BMD_second}.</a><br/>
                </>
                ) : ("")}
            </p>
            {/* <hr />
            <p className="card-text">Avaliações</p>
            <p className="card-text">
            {randomReviews === 0 ? (
              <i>No momento não há avaliações disponíveis.</i>
            ) : (
                Array.from({ length: randomReviews }, (_, index) => (
                  <FaStar key={index} color="gold" size="20px" />
                )) 
                )}
                 {randomReviews > 0 ? <i>{randomReviews}.0</i> : <i></i>}
            </p> */}
          <p>
          {collectUserData && collectUserData.name && collectUserData.cpfCnpj ? ( 
                  <>
                  <p className='card-text'><FontAwesomeIcon icon={faBuilding} size="lg" />&nbsp;<strong>Informações sobre a empresa</strong></p>
                  <strong>Nome</strong>&nbsp;<i>{collectUserData.name}</i><br/>
                  <strong>CPF/CNPJ</strong>&nbsp;<i>{collectUserData.cpfCnpj}</i><br/>
                  <strong>Descrição</strong>&nbsp;<i>{collectUserData.description}</i><br/>

                  <Nav.Link href={`tel:+55${collectUserData.phone.replace(/[\s\-\(\)]/g, "")}`} 
                    target="_blank" 
                    rel="noopener noreferrer" >
                      <Button variant="success" className="w-100">
                      <FontAwesomeIcon icon={faPhone} size="lg" />&nbsp; Entrar em Contato
                      </Button>
                  </Nav.Link>
                  
                  </>
                  ) : (
                    <>
                    <a>Não foi possível encontrar informações sobre a empresa.</a><br/>
                    </>
                  )}
          </p>
          {/* <p>
            <strong>Localização:</strong> {point.street}, {point.address_number}, {point.city} - {point.state}
          </p>
          <p>
            <strong>País:</strong> {point.country}
          </p> */}
          <p>
            <strong>Criado em:</strong> {new Date(point.created_at).toLocaleString()}
          </p>
          <p>
            <strong>Atualizado em:</strong> {new Date(point.updated_at).toLocaleString()}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>

          <Button variant="danger" title="Buscar trajetos mais próximos para chegar ao ponto de coleta." onClick={goToLocation}>
          <FontAwesomeIcon icon={faMapMarkedAlt} size="lg" />&nbsp; Traçar Rota
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CollectPointCard;
