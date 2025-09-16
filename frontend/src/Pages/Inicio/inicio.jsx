import React, { useState} from 'react';
import './inicio.css';
import { Link } from "react-router-dom";
import Navbar from "../../Components/NavBar/navbar.jsx"; 
import Footer from "../../Components/Footer/footer.jsx"; 
import { VscSearch } from "react-icons/vsc";
// Importando as imagens
import Estacao from '../../Assets/Belem/Estação.png';
import Teatro from '../../Assets/Belem/Teatro.png';
import Veropeso from '../../Assets/Belem/Ver-o-peso.png';

const Inicio = () => {
  const comentarios = [
    { nome: "Ana Silva", texto: "Adorei a experiência, super intuitivo e fácil de usar!" },
    { nome: "João Pereira", texto: "Consegui explorar o site rapidamente, recomendo a todos!" },
    { nome: "Mariana Costa", texto: "Visual muito agradável e funcional, ótima navegação." }
  ];
  const [searchTerm, setSearchTerm] = useState('');
  
    const handleSearch = (e) => {
      e.preventDefault();
      console.log("Buscando:", searchTerm); // aqui você pode integrar com API ou filtro
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


        <div className="escolha">
          <div className="card-escolha">
            <h2>Explore o site!</h2>
            <p>Escolha uma das visões abaixo para navegar:</p>
            <div className="botoes-escolha">
              <Link to="/vagas" className="btn-escolha">Aplicante</Link>
              <Link to="/vagas" className="btn-escolha">Contratante</Link>
            </div>
          </div>
        </div>

        {/* Seção de comentários organizada */}
        <div className="comentarios">
          <div className="comentarios-header">
            <h1>O que nossos usuários dizem</h1>
            <p>Histórias reais de profissionais que encontraram uma oportunidade através do nosso site</p>
          </div>
          <div className="comentarios-cards">
            {comentarios.map((c, index) => (
              <div className="comentario-card" key={index}>
                <p>"{c.texto}"</p>
                <span>- {c.nome}</span>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

export default Inicio;
