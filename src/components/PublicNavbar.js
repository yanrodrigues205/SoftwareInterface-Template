import React,{useState, useEffect} from "react"
import { Navbar, Nav, Container, Offcanvas, Button} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HomeService from "../services/HomeService";
import { FaLock, FaRecycle } from "react-icons/fa";


export default function PublicNavbar()
{
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleCloseOffcanvas = () => setShowOffcanvas(false);
    const handleShowOffcanvas = () => setShowOffcanvas(true);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const homeService = new HomeService(navigate);

    async function getAllDataUser() {
        try {
          let response = await homeService.getAuthenticationData();
          console.log(response);
          if (response) {
            setUserData(response);
            console.log("Informações do Usuário Atual", response);
          }
        } catch (error) {
          console.error("Erro ao obter dados de autenticação:", error);
        }
      }
      

    useEffect(() => {
        getAllDataUser();
    }, [])

    return (
        <>
        <Navbar bg="light" variant="light" expand={false}>
                <Container>
                    <Navbar.Brand as={Link} to="/work_hours">
                    <FaRecycle color="green"></FaRecycle>&nbsp;Recicla Aqui
                    </Navbar.Brand>
                    <Navbar.Toggle onClick={handleShowOffcanvas} aria-controls="offcanvas-navbar" />
                </Container>
            </Navbar>

            <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} id="offcanvas-navbar" bg="light">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><FaRecycle color="green"></FaRecycle>&nbsp;Recicla Aqui</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                <Nav className="flex-column">
                    <div>
                        {!userData ? <Nav.Link as={Link} to="/account" >
                                        <Button variant="primary" className="w-100">
                                            Entrar ou Criar Conta&nbsp;<FaLock></FaLock>
                                        </Button>
                                    </Nav.Link> : <div>
                                                    <strong>Id de Usuário </strong><p>{userData.user_id}</p><br/>
                                                    <strong>Id de Coletador </strong><p>{userData.collect_user_id}</p><br/>
                                                  </div>}
                       
                        
                        <Nav.Link as={Link} to="/" >
                            <Button variant="primary" className="w-100">
                               Início
                            </Button>
                        </Nav.Link>

                        <Nav.Link as={Link} to="/points" >
                            <Button variant="primary" className="w-100">
                               Pontos de Coleta
                            </Button>
                        </Nav.Link>

                        <Nav.Link as={Link} to="" >
                            <Button variant="primary" className="w-100">
                                Estatística
                            </Button>
                        </Nav.Link>

                        <Nav.Link as={Link} to="" >
                            <Button variant="primary" className="w-100">
                                Comentários
                            </Button>
                        </Nav.Link>

                        <Nav.Link as={Link} to="" >
                            <Button variant="primary" className="w-100">
                                Contatos
                            </Button>
                        </Nav.Link>

                        <Nav.Link as={Link} to="/collect_user" >
                            <Button variant="success" className="w-100">
                                Sou Empresa e Quero Cadastrar um Ponto de Coleta
                            </Button>
                        </Nav.Link>
                    </div>
                </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}