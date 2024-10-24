// src/pages/NotFound.js
import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="display-4">404 - Página Não Encontrada</h1>
      <p className="lead">Está página não foi encontrada dentro do nosso sistema, lamentamos o ocorrido!</p>
      <Link to="/" className="btn btn-primary">
        Ir para Início
      </Link>
    </div>
  );
}

export default NotFound;
