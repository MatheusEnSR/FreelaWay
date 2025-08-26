import React, { createContext, useState } from 'react';

export const IdiomaContext = createContext();

export const IdiomaProvider = ({ children }) => {
  const [idioma, setIdioma] = useState('PT-BR');
  const [textos, setTextos] = useState({
    banner: "Frase de Efeito Aqui",
    explore: "Explore o site!",
    descricaoExplore: "Escolha uma das visões abaixo para navegar:",
    aplicante: "Aplicante",
    contratante: "Contratante",
    comentariosTitulo: "O que nossos usuários dizem",
    comentariosDescricao: "Histórias reais de profissionais que encontraram uma oportunidade através do nosso site",
    comentarios: [
      { nome: "Ana Silva", texto: "Adorei a experiência, super intuitivo e fácil de usar!" },
      { nome: "João Pereira", texto: "Consegui explorar o site rapidamente, recomendo a todos!" },
      { nome: "Mariana Costa", texto: "Visual muito agradável e funcional, ótima navegação." }
    ]
  });

  return (
    <IdiomaContext.Provider value={{ idioma, setIdioma, textos, setTextos }}>
      {children}
    </IdiomaContext.Provider>
  );
};
