
import React from "react";
import Navbar from "../../Components/NavBar/navbar.jsx"; 
import Footer from "../../Components/Footer/footer.jsx"; 
import './cardpage.css'

function CardPage() {
  return (
    <main>
      <Navbar />
      
      <div className="cardpage-container">
        <div className="project-detail">
          <div className="project-header">
            <h1>Desenvolvimento de Site Institucional</h1>
            <span className="project-budget">R$ 2.500 - R$ 3.000</span>
          </div>
          
          <div className="project-meta">
            <span className="category">Tecnologia</span>
            <span className="location">Remoto</span>
            <span className="time-ago">Há 2 dias</span>
          </div>
          
          <div className="project-description">
            <h2>Descrição do Projeto</h2>
            <p>Preciso de um site responsivo para minha empresa com aproximadamente 5 páginas (Home, Sobre, Serviços, Portfólio e Contato). O design já está pronto no Figma e preciso que seja implementado com HTML, CSS e JavaScript.</p>
            
            <h3>Requisitos:</h3>
            <ul>
              <li>Design responsivo</li>
              <li>Integração com formulário de contato</li>
              <li>Otimização para SEO</li>
              <li>Prazo de 3 semanas</li>
            </ul>
          </div>
          
          <div className="project-actions">
            <button className="btn-primary">Candidatar-se</button>
            <button className="btn-secondary">Salvar Projeto</button>
          </div>
        </div>
        
        <div className="client-info">
          <h2>Sobre o Cliente</h2>
          <div className="client-card">
            <div className="client-avatar">
              {/* Avatar placeholder */}
            </div>
            <div className="client-details">
              <h3>Maria Silva</h3>
              <p>⭐ 4.8 (12 avaliações)</p>
              <p>Desde jun 2021</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}

export default CardPage;