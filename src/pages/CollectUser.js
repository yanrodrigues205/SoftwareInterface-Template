import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import "../styles/CollectUser.css";
import PublicNavbar from "../components/PublicNavbar"; // Importação do Navbar
import { FormItens } from "../styles/Login";
import { useNavigate } from "react-router-dom";
import CollectUserService from "../services/CollectUserService";

export default function CollectUser() {
  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    telefone: "",
    descricao: "",
  });

  const [validated, setValidated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isTokenPresent, setIsTokenPresent] = useState(true); // Controle do token
  const navigate = useNavigate();
  const collectUserService = new CollectUserService(navigate);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsTokenPresent(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === true) {
      console.log("Formulário enviado:", formData);
      setFormData({ nome: "", cnpj: "", telefone: "", descricao: "" });

    }
    let resp = await collectUserService.insert(formData.nome, formData.cnpj, formData.telefone, formData.descricao);
  };

  return (
    <>
      {/* Navbar Pública no topo */}
      
      <Container fluid="md">
        <PublicNavbar/>
      </Container>
      <Container className="py-5 position-relative" fluid="md">
        {!isTokenPresent && (
          <div className="overlay">
            <div className="overlay-content">
              <h2>Primeiro é necessário criar conta na plataforma</h2>
              <FormItens> 
                <Button variant="primary" href="/account">
                  Ir para Login
                </Button>
              </FormItens>
            </div>
          </div>
        )}

        <h2 className="text-center mb-4">Cadastro de Coletador</h2>

        {showSuccess && (
          <Alert
            variant="success"
            onClose={() => setShowSuccess(false)}
            dismissible
          >
            Cadastro realizado com sucesso!
          </Alert>
        )}

        <div className={isTokenPresent ? "" : "blur-form"}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="nome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Digite o nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, informe o nome.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="cnpj">
                <Form.Label>CNPJ</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Digite o CNPJ"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, informe um CNPJ válido.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="telefone">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  required
                  type="tel"
                  placeholder="(XX) XXXXX-XXXX"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, informe um telefone válido.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="descricao">
                <Form.Label>Descrição do Coletador</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows={2}
                  placeholder="Descreva o seu perfil como uma empresa coletadora/compradora de resíduos"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, insira uma descrição.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <div className="text-center">
              <Button
                type="submit"
                variant="success"
                size="lg"
                disabled={!isTokenPresent}
              >
                Cadastrar
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
}
