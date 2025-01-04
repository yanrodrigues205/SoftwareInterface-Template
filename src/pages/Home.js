import React, { useEffect, useState, useRef } from "react";
import { Navbar, Nav, Container, Button, Col, Row, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faMapMarkerAlt, faRecycle } from "@fortawesome/free-solid-svg-icons";
import CountUp from "react-countup";
import PublicNavbar from "../components/PublicNavbar";
import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();
  const [hasCounted, setHasCounted] = useState(false); // Controla se já executamos a contagem
  const statsRef = useRef(null); // Referência para a seção dos números

  useEffect(() => {
    // Configurando o Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasCounted(true); // Ativamos a contagem apenas uma vez
          observer.disconnect(); // Desconecta após a primeira execução
        }
      },
      { threshold: 0.5 } // Define que 50% do elemento deve estar visível
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) observer.disconnect();
    };
  }, []);

  return (
    <>
      <PublicNavbar />

      <Container fluid="md">
        <div className="parallax-section">
          <Container className="text-center text-white gap-10">
            <h1 className="display-4">Conecte-se com Pontos de Coleta!</h1>
            <p className="lead">
              Descarte seus resíduos de forma consciente e ajude a cuidar do meio ambiente.
            </p>
            <Container>
              <Row>
                <Nav.Link as={Link} to="/points">
                    <Button variant="success" size="lg">
                        Encontrar Pontos de Coleta
                    </Button>
                </Nav.Link>

                <Nav.Link as={Link} to="/collect_user">
                    <Button variant="success" size="lg">
                        Quero começar como um ponto de coleta
                    </Button>
                </Nav.Link>
                
              </Row>
            </Container>
          </Container>
        </div>

        <Container className="py-5" id="services">
          <h2 className="text-center mb-4">Como Funciona?</h2>
          <Row>
            <Col md={4}>
              <Card className="mb-4 border-0 shadow-sm">
                <Card.Body>
                  <Card.Title>1. Cadastre-se</Card.Title>
                  <Card.Text>
                    Crie uma conta em nossa plataforma e tenha acesso a todos os pontos de coleta próximos.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-4 border-0 shadow-sm">
                <Card.Body>
                  <Card.Title>2. Encontre Pontos de Coleta</Card.Title>
                  <Card.Text>
                    Use a localização para visualizar os pontos que aceitam o tipo de resíduo que você deseja descartar.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-4 border-0 shadow-sm">
                <Card.Body>
                  <Card.Title>3. Descarte e Ajude</Card.Title>
                  <Card.Text>
                    Descarte seus resíduos corretamente e acompanhe seu impacto positivo no meio ambiente.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        <div className="stats-section text-center py-5" ref={statsRef}>
          <Container>
            <h2 className="text-center mb-4">Impacto da Plataforma</h2>
            <Row>
              <Col md={4}>
                <FontAwesomeIcon icon={faUsers} size="3x" className="mb-2" />
                <h3>
                  <CountUp end={1200} duration={3} start={hasCounted ? 0 : null} />
                  +
                </h3>
                <p>Usuários Ativos</p>
              </Col>
              <Col md={4}>
                <FontAwesomeIcon icon={faMapMarkerAlt} size="3x" className="mb-2" />
                <h3>
                  <CountUp end={350} duration={3} start={hasCounted ? 0 : null} />
                  +
                </h3>
                <p>Pontos de Coleta</p>
              </Col>
              <Col md={4}>
                <FontAwesomeIcon icon={faRecycle} size="3x" className="mb-2" />
                <h3>
                  <CountUp end={5000} duration={3} start={hasCounted ? 0 : null} />
                  +
                </h3>
                <p>Descarte Realizados</p>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="bg-white py-5" id="testimonials">
          <Container>
            <h2 className="text-center mb-4">O que as pessoas estão dizendo</h2>
            <Row>
              <Col md={6}>
                <blockquote className="blockquote">
                  <p>"Finalmente um jeito fácil de encontrar onde descartar corretamente!"</p>
                  <footer className="blockquote-footer">Ana Costa</footer>
                </blockquote>
              </Col>
              <Col md={6}>
                <blockquote className="blockquote">
                  <p>"Reciclar ficou muito mais prático. Recomendo a todos!"</p>
                  <footer className="blockquote-footer">Carlos Nunes</footer>
                </blockquote>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="bg-success text-white text-center py-5" id="contact">
          <Container>
            <h2>Entre em Contato</h2>
            <p>Quer saber mais sobre nossa plataforma ou tem alguma dúvida? Fale conosco!</p>
            <Button variant="light" size="lg" href="#home">
              Fale Conosco
            </Button>
          </Container>
        </div>

        <footer className="bg-light text-center py-3">
          <Container>
            <p>© 2024 Recicla Aqui. Todos os direitos reservados.</p>
          </Container>
        </footer>
      </Container>
    </>
  );
}
