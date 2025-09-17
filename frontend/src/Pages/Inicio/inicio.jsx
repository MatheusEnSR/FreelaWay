import React, { useState } from 'react';
import './inicio.css';
import Navbar from "../../Components/NavBar/navbar.jsx"; 
import Footer from "../../Components/Footer/footer.jsx"; 
import { VscSearch } from "react-icons/vsc";
import { Link } from "react-router-dom";

const Inicio = () => {
  const [recomendadas] = useState([
    {
      id: 1,
      titulo: "Desenvolvedor Frontend React",
      local: "Remoto",
      idioma: "Português / Inglês",
      salario: "R$ 3.500 - R$ 5.000",
      breve: "Trabalhe com React e integrações de APIs.",
      detalhada: "Responsabilidades completas da vaga, tecnologias utilizadas, expectativas, benefícios, stack completa, jornada e expectativas de entrega..."
    },
    {
      id: 2,
      titulo: "Estágio em Frontend",
      local: "São Paulo - SP",
      idioma: "Português",
      salario: "R$ 1.500 - R$ 2.000",
      breve: "Oportunidade para iniciantes em HTML, CSS e JS.",
      detalhada: "Aprendizado completo em desenvolvimento frontend, acompanhamento de mentores, pequenas entregas semanais, foco em aprendizado de React e boas práticas de codificação."
    },
    {
      id: 3,
      titulo: "Desenvolvedor Backend Node.js",
      local: "Remoto",
      idioma: "Português / Inglês",
      salario: "R$ 4.000 - R$ 6.000",
      breve: "API REST, banco de dados e autenticação.",
      detalhada: "Desenvolver e manter APIs escaláveis, integração com bancos de dados SQL e NoSQL, autenticação JWT, testes unitários e integração contínua."
    },
    {
      id: 4,
      titulo: "UX/UI Designer",
      local: "Rio de Janeiro - RJ",
      idioma: "Português",
      salario: "R$ 3.000 - R$ 4.500",
      breve: "Foque na experiência do usuário e prototipagem.",
      detalhada: "Criação de wireframes, protótipos de alta fidelidade, pesquisas com usuários, testes de usabilidade e colaboração com times de desenvolvimento."
    },
    {
      id: 5,
      titulo: "Engenheiro de Software",
      local: "Belo Horizonte - MG",
      idioma: "Português / Inglês",
      salario: "R$ 6.000 - R$ 9.000",
      breve: "Desenvolvimento fullstack e boas práticas de arquitetura.",
      detalhada: "Desenvolvimento fullstack, revisão de código, implementação de arquitetura escalável, práticas de CI/CD, mentoring e integração com equipes ágeis."
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Buscando:", searchTerm); // Pode integrar com API depois
  };

  return (
    <div>
      <Navbar />

      <main>
        <div className="banner">
          <div className="banner-overlay">
            <h1 className="banner-title">Sua frase de efeito aqui</h1>

            <form className="banner-search" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Buscar projetos, habilidades ou palavras-chave..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit"><VscSearch size={24} /></button>
            </form>
          </div>
        </div>

        <h2 className="vagas-title">✨ Vagas Recomendadas</h2>

        <div className="vagas-container">
          {recomendadas.map(vaga => (
            <div key={vaga.id} className="vaga-card">
              <h3>{vaga.titulo}</h3>
              <p><strong>Local:</strong> {vaga.local}</p>
              <p><strong>Idioma:</strong> {vaga.idioma}</p>
              <p><strong>Salário:</strong> {vaga.salario}</p>
              <p>{vaga.breve}</p>
              
              <Link 
                to="/card" 
                state={{ vaga }} 
                className="btn-candidatar"
              >
                Mais detalhes
              </Link>
            </div>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}

export default Inicio;
