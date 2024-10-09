// src/components/CustomNavbar.js
import React, { useState } from "react";
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faRecycle, faClock } from '@fortawesome/free-solid-svg-icons';

export default function CustomNavbar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="light" variant="light" expand={false}>
        <Container>
          <Navbar.Brand as={Link} to="/work_hours">
            Recicla Aqui - Administrador
          </Navbar.Brand>
          <Navbar.Toggle onClick={handleShow} aria-controls="offcanvas-navbar" />
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose} id="offcanvas-navbar" bg="light">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Recicla Aqui - Administrador</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/work_hours" onClick={handleClose}>
            <FontAwesomeIcon icon={faClock} />&nbsp;Horários de Funcionamento
            </Nav.Link>
            <Nav.Link as={Link} to="/wastes" onClick={handleClose}>
            <FontAwesomeIcon icon={faRecycle} />&nbsp;Resíduos
            </Nav.Link>
            <Nav.Link as={Link} to="/collect_points" onClick={handleClose}>
              <FontAwesomeIcon icon={faMapMarkerAlt} />&nbsp;Pontos de Coleta
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
