import React, { useState, useEffect } from 'react';
import './inicio.css';
import { Link } from "react-router-dom";
import Navbar from "../../Components/NavBar/navbar.jsx"; 
import Footer from "../../Components/Footer/footer.jsx"; 

import Estacao from '../../Assets/Belem/Estação.png';
import Teatro from '../../Assets/Belem/Teatro.png';
import Veropeso from '../../Assets/Belem/Ver-o-peso.png';

const Inicio = () => {
  const images = [Estacao, Teatro, Veropeso];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const comentarios = [
    { nome: "Ana Silva", texto: "Adorei a experiência, super intuitivo e fácil de usar!" },
    { nome: "João Pereira", texto: "Consegui explorar o site rapidamente, recomendo a todos!" },
    { nome: "Mariana Costa", texto: "Visual muito agradável e funcional, ótima navegação." }
  ];

  return (
    <div>
      <Navbar />

      <main>
        <div className="banner">
          <div className="banner-text">
            <h1>Frase de Efeito Aqui</h1>
          </div>
          <div className="banner-carousel">
            <div className="carousel">
              <img src={images[currentIndex]} alt={`Imagem ${currentIndex + 1}`} />
            </div>
          </div>
        </div>

        <div className="escolha">
          <div className极="card-escolha">
            <h2>Explore o site!</h2>
            <p>Escolha uma das visões abaixo para navegar:</p>
            <div className="botoes-escolha">
              <Link to="/home" className="btn-escolha">Aplicante</Link>
              <Link to="/home" className="btn-escolha">Contratante</Link>
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
