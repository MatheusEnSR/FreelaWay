import React from "react";
import { Link } from "react-router-dom"; // Import do Link
import "./perfil.css";

function Perfil() {
  return (
    <div className="perfil-container">
      <div className="perfil-card">

        {/* Botão de Voltar */}
        <div className="voltar">
          <Link to="/" className="btn-voltar">← Voltar</Link>
        </div>

        {/* Nome */}
        <h1 className="perfil-nome">Nome do Usuário</h1>

        {/* Bio */}
        <p className="perfil-bio">
          Pequena descrição ou bio do usuário fica aqui.
        </p>

        {/* Botões */}
        <div className="perfil-botoes">
          <button className="btn-principal">Editar Perfil</button>
          <button className="btn-secundario">Configurações</button>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
