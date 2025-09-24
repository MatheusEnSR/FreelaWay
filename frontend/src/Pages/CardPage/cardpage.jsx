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
  {/* Card lateral - Criador da vaga */}
  <div className="client-info">
    <div className="client-card">
      <div className="client-avatar"></div>
      <div className="client-details">
        
        <h3>{vaga?.criador || "Criador da vaga"}</h3>
        {vaga?.local && <p><strong>Local:</strong> {vaga.local}</p>}
        {vaga?.idioma && <p><strong>Idioma:</strong> {vaga.idioma}</p>}
        {vaga?.salario && <p><strong>Salário:</strong> {vaga.salario}</p>}
        {vaga?.dataPublicacao && <p><strong>Publicado em:</strong> {vaga.dataPublicacao}</p>}
        {vaga?.dataFechamento && <p><strong>Fecha em:</strong> {vaga.dataFechamento}</p>}
        
      </div>
    </div>
  </div>

  {/* Card central - Descrição da vaga */}
  <div className="project-detail">
    <div className="project-header">
      <h1>{vaga?.titulo}</h1>
    </div>
    
    <div className="project-meta">
    </div>
    
    <div className="project-description">
      {vaga?.detalhada && <p><strong>Descrição:</strong> {vaga.detalhada}</p>}
    </div>

    <button className="btn-card">Candidatar-se</button>
  </div>
</div>


      {/* Botão voltar */}
      <Link to="/" className="btn-voltar">← Voltar para Início</Link>

      <Footer />
    </main>
  );
}

export default CardPage;
