import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import PublicNavbar from "../components/PublicNavbar";
import { FaPhone, FaEnvelope, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import "../styles/Contact.css"; // Certifique-se de criar um arquivo CSS para estilização

export default function Contact() {
  return (
    <>
      <Container className="py-5">
        <h2 className="text-center mb-4">Fale Conosco</h2>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="mb-4 shadow">
              <Card.Body>
                <Card.Title className="text-center">Entre em contato conosco!</Card.Title>
                <Row className="text-center">
                  <Col md={4}>
                    <FaPhone size={50} className="contact-icon" />
                    <Card.Text className="mt-2">
                      <strong>Telefone:</strong> (XX) XXXX-XXXX
                    </Card.Text>
                  </Col>
                  <Col md={4}>
                    <FaEnvelope size={50} className="contact-icon" />
                    <Card.Text className="mt-2">
                      <strong>Email:</strong> contato@reciclaaqui.com
                    </Card.Text>
                  </Col>
                  <Col md={4}>
                    <FaInstagram size={50} className="contact-icon" />
                    <Card.Text className="mt-2">
                      <strong>Instagram:</strong> @reciclaaqui
                    </Card.Text>
                  </Col>
                </Row>
                <Row className="text-center mt-4">
                  <Col md={6}>
                    <FaFacebook size={50} className="contact-icon" />
                    <Card.Text className="mt-2">
                      <strong>Facebook:</strong> facebook.com/reciclaaqui
                    </Card.Text>
                  </Col>
                  <Col md={6}>
                    <FaLinkedin size={50} className="contact-icon" />
                    <Card.Text className="mt-2">
                      <strong>LinkedIn:</strong> linkedin.com/company/reciclaaqui
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
