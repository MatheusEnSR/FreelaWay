import React, { useState, useEffect } from 'react';
import Card from "../../Components/Card/card.jsx"; 
import FiltroCard from "../../Components/Filtro/filtrocard.jsx";
import './home.css';

function Home() {
  const [vagas, setVagas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filtros, setFiltros] = useState({
    local: '',
    idioma: '',
    tags: '',
    min_salario: 0,
    max_salario: 10000,
  });

  const fetchVagas = async () => {
    setIsLoading(true);
    
    const params = new URLSearchParams();
    if (filtros.local) params.append('local', filtros.local);
    if (filtros.idioma) params.append('idioma', filtros.idioma);
    if (filtros.tags) params.append('tags', filtros.tags);
    if (filtros.min_salario > 0) params.append('min_salario', filtros.min_salario);
    if (filtros.max_salario < 10000) params.append('max_salario', filtros.max_salario);

    const url = `http://127.0.0.1:8000/api/vagas/?${params.toString()}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      setVagas(data);
    } catch (error) {
      console.error('Erro ao buscar vagas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchVagas();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [filtros]);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prevFiltros => ({
        ...prevFiltros,
        [name]: value
    }));
  };

  // O 'return' agora não inclui mais Navbar ou Footer
  return (
    <main>
      <div className="home-content">
        <aside className="sidebar-left">
          <FiltroCard 
            filtros={filtros}
            onFiltroChange={handleFiltroChange}
          />
        </aside>
        
        <section className="main-content">
          <div className="card-wrapper">
            {isLoading ? (
              <p>Carregando vagas...</p>
            ) : vagas.length > 0 ? (
              vagas.map(vaga => (
                <Card key={vaga.id} vaga={vaga} />
              ))
            ) : (
              <p>Nenhuma vaga encontrada com os filtros selecionados.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;