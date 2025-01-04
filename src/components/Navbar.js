// src/components/CustomNavbar.js
import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Offcanvas, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserService from "../services/UsersService";
import { useNavigate } from "react-router-dom";
import { faMapMarkerAlt, faRecycle, faClock, faUser, faSignOutAlt, faEdit, faBuilding } from '@fortawesome/free-solid-svg-icons';
import HomeService from "../services/HomeService";
import CollectUserService from "../services/CollectUserService";

export default function CustomNavbar() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [authData, setAuthData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [collectUserData, setCollectUserData] = useState(null);
  const navigate = useNavigate();
  const userService = new UserService(navigate);
  const homeService = new HomeService(navigate);
  const collectUserService = new CollectUserService(navigate);

  const handleLogout = () => {
    // Lógica de logout aqui
    console.log("Usuário deslogado");
  };


  async function getAuthData() {
    try {
      const response = await homeService.getAuthenticationData();
      if (response) {
        setAuthData(response); // Atualiza o estado sem await
        console.log("Informações de autenticação:", response);
      }
    } catch (error) {
      console.error("Erro ao obter dados de autenticação:", error);
    }
  }
  
  async function getCollectUserById(id) {
    try {
      const response2 = await collectUserService.getOne(id);
      if (response2) {
        console.log("RESPONSE2", response2)
        await setCollectUserData(response2[0]); // Acessa o primeiro item da resposta
        console.log("Informações do usuário de coleta:", response2[0]);
      }
      
    } catch (error) {
      console.error("Erro ao obter dados do usuário de coleta:", error);
    }
  }
  
  async function getDataUserByID(userId) {
    try {
      const response = await userService.getOneByID(userId);
      if (response && Array.isArray(response) && response.length > 0) {
        setUserData(response[0]); // Acessa o primeiro item da resposta
        console.log("Informações do usuário:", response[0]);
        await getCollectUserById(response[0].collectUser_id);
      } else {
        console.error("Resposta inválida ou vazia ao buscar dados do usuário:", response);
      }
    } catch (error) {
      console.error("Erro ao obter dados do usuário:", error);
    }
  }
  
  useEffect(() => {
    const fetchAuthData = async () => {
      await getAuthData();
    };
    fetchAuthData();
  }, []);
  
  useEffect(() => {
    if (authData && authData.user_id) {
      getDataUserByID(authData.user_id);
    }
  }, [authData]);

  return (
    <>
      <Navbar bg="light" variant="light" expand={false}>
        <Container>
          <Navbar.Brand as={Link} to="/work_hours">
            Recicla Aqui - Administrador
          </Navbar.Brand>
          <Navbar.Toggle onClick={handleShowOffcanvas} aria-controls="offcanvas-navbar" />
        </Container>
      </Navbar>

      <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} id="offcanvas-navbar" bg="light">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Recicla Aqui - Administrador</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Informações da conta do usuário */}
          <div className="user-info mb-3">
            <FontAwesomeIcon icon={faUser} size="lg" />&nbsp;<strong>Informações do Usuário</strong>
            {userData ? (
              <>
                <br/>
                <strong>Nome</strong>&nbsp;<i>{userData.name}</i><br/>
                <strong>E-mail</strong>&nbsp;<i>{userData.email}</i><br />
              </>
            ) : (
              <i>Carregando informações do usuário...</i>
            )}
            <br/><FontAwesomeIcon icon={faBuilding} size="lg" />&nbsp;<strong>Informações da Empresa</strong><br/>
            {collectUserData ? (
              <>
                
                <strong>Título</strong>&nbsp;<i>{collectUserData.name}</i><br/>
                <strong>CPF/CNPJ</strong>&nbsp;<i> {collectUserData.cpfCnpj}</i><br />
                <strong>Telefone</strong>&nbsp;<i> {collectUserData.phone}</i><br />
                <strong>Descrição</strong>&nbsp;<i> {collectUserData.description}</i><br />
              </>
            ) : (
              <i>Carregando informações do usuário...</i>
            )}
            <br/>

            <Nav.Link as={Link} to="/" >
                <Button variant="success" className="mb-2 w-100">
                    Página Inícial
                </Button>
            </Nav.Link>

            <Button variant="warning" onClick={handleShowModal} className="mb-2 w-100">
              <FontAwesomeIcon icon={faEdit} /> Editar
            </Button>

            
            <Button variant="danger" onClick={handleLogout} className=" mb-2 w-100">
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </Button>

           
          </div>

          <hr />

          {/* Opções de navegação */}
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/work_hours" onClick={handleCloseOffcanvas}>
              <FontAwesomeIcon icon={faClock} />&nbsp;Horários de Funcionamento
            </Nav.Link>
            <Nav.Link as={Link} to="/wastes" onClick={handleCloseOffcanvas}>
              <FontAwesomeIcon icon={faRecycle} />&nbsp;Resíduos
            </Nav.Link>
            <Nav.Link as={Link} to="/collect_points" onClick={handleCloseOffcanvas}>
              <FontAwesomeIcon icon={faMapMarkerAlt} />&nbsp;Pontos de Coleta
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Modal para editar informações do usuário */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Informações da Conta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Formulário de edição de conta */}
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Nome de Usuário</label>
              <input type="text" className="form-control" id="username" placeholder="Nome do Usuário" defaultValue="Nome do Usuário" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder="email@exemplo.com" defaultValue="usuario@exemplo.com" />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Telefone</label>
              <input type="tel" className="form-control" id="phone" placeholder="(99) 99999-9999" defaultValue="(99) 99999-9999" />
            </div>
            <div className="mb-3">
              <label htmlFor="cpf" className="form-label">CPF</label>
              <input type="text" className="form-control" id="cpf" placeholder="123.456.789-00" defaultValue="123.456.789-00" />
            </div>
            <Button variant="primary" type="submit" onClick={handleCloseModal}>
              Salvar
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
