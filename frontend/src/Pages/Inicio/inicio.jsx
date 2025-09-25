import React, { useState, useEffect } from 'react';
import './inicio.css';
import Navbar from "../../Components/NavBar/navbar.jsx";
import Footer from "../../Components/Footer/footer.jsx";
import { VscSearch } from "react-icons/vsc";
import { Link } from "react-router-dom";

const Inicio = () => {
  const [vagas, setVagas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // 1. Buscar vagas recomendadas ao carregar a página
  useEffect(() => {
    const fetchRecomendadas = async () => {
      setIsLoading(true);
      try {
        // Usando nosso novo endpoint de recomendadas via proxy
        const response = await fetch('/api/vagas/recomendadas/');
        const data = await response.json();
        setVagas(data);
      } catch (error) {
        console.error('Erro ao buscar vagas recomendadas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecomendadas();
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // 2. Usando o endpoint de busca via proxy
      const response = await fetch(`/api/vagas/?search=${searchTerm}`);
      const data = await response.json();
      setVagas(data);
    } catch (error) {
      console.error('Erro ao buscar vagas:', error);
    } finally {
        setIsLoading(false);
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
          {isLoading ? (
            <p>Carregando vagas...</p>
          ) : (
            vagas.map(vaga => (
              <div key={vaga.id} className="vaga-card">
               <div className="card-content">
                  <h3>{vaga.titulo}</h3>
                  <p><strong>Local:</strong> {vaga.local}</p>
                  <p><strong>Salário:</strong> {vaga.salario}</p>
                  <p className="vaga-breve">{vaga.descricao_breve}</p>
                </div> {/* Fim da div */}

                {/* Tags e botão ficam fora da nova div */}
                  <div className="tags-container">
                    {vaga.tags && vaga.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>

                <Link to={`/vaga/${vaga.id}`} className="btn-candidatar">
                    Mais detalhes
                  </Link>
                
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Inicio;