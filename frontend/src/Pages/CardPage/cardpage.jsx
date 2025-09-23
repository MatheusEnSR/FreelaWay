import React from "react";
import Navbar from "../../Components/NavBar/navbar.jsx"; 
import Footer from "../../Components/Footer/footer.jsx"; 
import { Link, useLocation } from "react-router-dom";
import './cardpage.css'

function CardPage() {
  const location = useLocation();
  const { vaga } = location.state || {}; // pega os dados da vaga

  return (
    <main>
      <Navbar />
      
      <div className="cardpage-container">
        <div className="project-detail">
          <div className="project-header">
            <h1>{vaga?.titulo}</h1>
            {vaga?.salario && <span className="project-budget">{vaga.salario}</span>}
          </div>
          
          <div className="project-meta">
            {vaga?.local && <span className="location">{vaga.local}</span>}
            {vaga?.idioma && <span className="idioma">{vaga.idioma}</span>}
          </div>
          
          <div className="project-description">
            {vaga?.breve && <p><strong>Resumo:</strong> {vaga.breve}</p>}
            {vaga?.detalhada && <p><strong>Descrição detalhada:</strong> {vaga.detalhada}</p>}
        <button className="btn-card">Candidatar-se</button>

          </div>
        </div>
        {/* Cliente ou informações adicionais podem ir aqui */}
        <div className="client-info">
          {/* Placeholder caso queira adicionar informações do cliente */}
        </div>
      </div>

      {/* Botão voltar */}
      <Link to="/" className="btn-voltar">← Voltar para Início</Link>

      <Footer />
    </main>
  );
}

export default CardPage;
