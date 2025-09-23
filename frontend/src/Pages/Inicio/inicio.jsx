// inicio.jsx

import React, { useState } from 'react';
import './inicio.css';
import Navbar from "../../Components/NavBar/navbar.jsx";
import Footer from "../../Components/Footer/footer.jsx";
import { VscSearch } from "react-icons/vsc";
import { Link } from "react-router-dom";

// Dados iniciais que você já tinha. Podemos usar como um 'fallback' ou estado inicial.
const vagasIniciais = [
  {
    id: 1,
    titulo: "Desenvolvedor Frontend React",
    local: "Remoto",
    idioma: "Português / Inglês",
    salario: "R$ 3.500 - R$ 5.000",
    breve: "Trabalhe com React e integrações de APIs.",
    detalhada: "Responsabilidades completas da vaga, tecnologias utilizadas, expectativas, benefícios, stack completa, jornada e expectativas de entrega..."
  },
  // ... (o resto dos seus dados estáticos)
  {
    id: 5,
    titulo: "Engenheiro de Software",
    local: "Belo Horizonte - MG",
    idioma: "Português / Inglês",
    salario: "R$ 6.000 - R$ 9.000",
    breve: "Desenvolvimento fullstack e boas práticas de arquitetura.",
    detalhada: "Desenvolvimento fullstack, revisão de código, implementação de arquitetura escalável, práticas de CI/CD, mentoring e integração com equipes ágeis."
  }
];


const Inicio = () => {
  // MUDANÇA 1: Tornamos sua lista de vagas dinâmica.
  // Ela começa com os dados iniciais, mas agora pode ser ATUALIZADA com os resultados da busca.
  const [vagas, setVagas] = useState(vagasIniciais);

  const [searchTerm, setSearchTerm] = useState('');

  // MUDANÇA 2: Atualizamos a função de busca para chamar a API.
  // Trocamos o console.log pela chamada 'fetch' real.
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      // Se a busca for vazia, restaura as vagas iniciais.
      setVagas(vagasIniciais);
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/vagas/?search=${searchTerm}`);
      const data = await response.json();
      setVagas(data); // ATUALIZA a lista de vagas na tela com os resultados da API!
      console.log("Resultados da API:", data);
    } catch (error) {
      console.error('Erro ao buscar vagas:', error);
      // Opcional: em caso de erro, você pode mostrar as vagas iniciais novamente.
      setVagas(vagasIniciais);
    }
  };

  return (
    <div>
      <Navbar />

      <main>
        <div className="banner">
          <div className="banner-overlay">
            <h1 className="banner-title">Conectando profissionais comprometidos com o futuro.</h1>

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

        <h2 className="vagas-title"> Vagas Recomendadas</h2>

        <div className="vagas-container">
          {/* MUDANÇA 3: Alteramos de 'recomendadas.map' para 'vagas.map'. */}
          {/* Agora, esta seção mostrará a lista que estiver no estado 'vagas', sejam as iniciais ou as da busca.*/}
          {vagas.map(vaga => (
            <div key={vaga.id} className="vaga-card">
              <h3>{vaga.titulo}</h3>
              {/* Os campos do seu backend podem ser diferentes, ajuste se necessário */}
              <p><strong>Local:</strong> {vaga.local || 'N/A'}</p> 
              <p><strong>Idioma:</strong> {vaga.idioma || 'N/A'}</p>
              <p><strong>Salário:</strong> {vaga.salario || 'N/A'}</p>
              
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