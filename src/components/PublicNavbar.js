import React,{useState, useEffect} from "react"
import { Navbar, Nav, Container, Offcanvas, Button} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HomeService from "../services/HomeService";
import UserService from "../services/UsersService";
import { FaLock, FaRecycle } from "react-icons/fa";


export default function PublicNavbar()
{
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleCloseOffcanvas = () => setShowOffcanvas(false);
    const handleShowOffcanvas = () => setShowOffcanvas(true);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const [authData, setAuthData] = useState(null);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const userService = new UserService(navigate);
    const homeService = new HomeService(navigate);

  const handleLogout = () => {
    // Lógica de logout aqui
    console.log("Usuário deslogado");
  };


  async function getAuthData() {
      try {
        let response = await homeService.getAuthenticationData();
        if (response) {
          await setAuthData(response);
          console.log("Informações de Authenticação Atual", authData);
        }
      } catch (error) {
        console.error("Erro ao obter dados de autenticação:", error);
      }
    }

    async function getDataUserByID() {
      try {
        const response = await userService.getOneByID(authData.user_id);
        if (response && Array.isArray(response) && response.length > 0) {
          setUserData(response[0]); // Acessa o primeiro objeto do array
          console.log("Informações precisas sobre o usuário", response[0]);
        } else {
          console.error("Resposta inválida ou vazia ao buscar dados do usuário:", response);
          setUserData(null);
        }
      } catch (error) {
        console.error("Erro ao obter dados do usuário:", error);
        setUserData(null);
      }
    }
    
    
    useEffect(() => {
      const fetchAuthData = async () => {
        try {
          const response = await getAuthData();
          if (response) {
            setAuthData(response);
          }
        } catch (error) {
          console.error("Erro ao obter dados de autenticação:", error);
        }
      };
    
      fetchAuthData();
    }, []);
    
    useEffect(() => {
      if (authData && authData.user_id) {
        const fetchUserData = async () => {
          try {
            const response = await getDataUserByID();
            if (response) {
              setUserData(response);
            }
          } catch (error) {
            console.error("Erro ao obter dados do usuário:", error);
          }
        };
    
        fetchUserData();
      }
    }, [authData]);
    

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
                                                    <strong>Nome: </strong><a>{userData.name}</a><br/>
                                                    <strong>Email: </strong><a>{userData.email}</a><br/>
                                                    <Nav.Link as={Link} to="/collect_points" >
                                                        <Button variant="success" className="w-100">
                                                            Administrar
                                                        </Button>
                                                    </Nav.Link>
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

                        <Nav.Link as={Link} to="/collect_user" >
                            <Button variant="primary" className="w-100">
                                Cadastro Empresa/Coletador
                            </Button>
                        </Nav.Link>

                        <Nav.Link as={Link} to="/account" >
                            <Button variant="primary" className="w-100">
                                Entrar Novamente ou Cadastrar Nova Conta
                            </Button>
                        </Nav.Link>



                    </div>
                </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}