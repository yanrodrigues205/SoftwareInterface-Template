import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import OpenStreetMapSearch from './Address';

const CollectPointCard = ({ point }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  let coordenadas = [
    point.latitude,
    point.longitude
  ]
  function SetViewOnClick({ center }) {
    const map = useMap();
    map.setView(center, 30);
    return null;
  }

  return (
    <>
      <div className="col-md-4 mb-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{point.name}</h5>
            <p className="card-text">{point.description || 'Sem descrição disponível.'}</p>
            <p className="card-text">
              <i className="fa-solid fa-location-dot"></i> {point.street}, {point.address_number}. {point.city} - {point.state}
            </p>
            <p className="card-text">
              <i className="fa-solid fa-recycle"></i> Materiais Aceitos: {point.materials || 'Não especificado'}
            </p>
            <p className="card-text">
              <i className="fa-solid fa-clock"></i> Horário de Funcionamento: {point.workHours || 'Não especificado'}
            </p>
            <hr />
            <p className="card-text">Avaliações</p>
            <p className="card-text">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star-half"></i> {point.rating || 'Não avaliado'}
            </p>
            <hr />
            <Button variant="primary" onClick={handleShow}>
              Ver mais
            </Button>
          </div>
        </div>
      </div>

      {/* Modal com conteúdo dinâmico */}
      <Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Detalhes do Ponto de Coleta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <MapContainer center={coordenadas} zoom={13} scrollWheelZoom={false} className="leaflet-container mt-3">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={coordenadas} />
            <SetViewOnClick center={coordenadas} />
          </MapContainer>
          <p>{point.description || 'Sem descrição disponível.'}</p>
          <p>
            <strong>Horário de Funcionamento:</strong> {point.workHours || 'Não especificado'}
          </p>
          <p>
            <strong>Localização:</strong> {point.street}, {point.address_number}, {point.city} - {point.state}
          </p>
          <p>
            <strong>País:</strong> {point.country}
          </p>
          <p>
            <strong>Coletor:</strong> {point.collector_id}
          </p>
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
          <Button variant="primary" onClick={handleClose}>
            Entendido
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CollectPointCard;
