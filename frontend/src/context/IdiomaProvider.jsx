// src/Context/IdiomaProvider.jsx
import React, { useState } from 'react';
import { IdiomaContext } from './IdiomaContext.js';

const IdiomaProvider = ({ children }) => {
  const [idioma, setIdioma] = useState('PT-BR');
  const [textos, setTextos] = useState({
    inicio: "Início",
    vagas: "Vagas",
    login: "Login",
    aplicante: "Aplicante",
    contratante: "Contratante"
  });

  return (
    <IdiomaContext.Provider value={{ idioma, setIdioma, textos, setTextos }}>
      {children}
    </IdiomaContext.Provider>
  );
};

export default IdiomaProvider;
