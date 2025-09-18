// frontend/src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Páginas
import Home from './Pages/Home/home.jsx';
import Login from './Pages/Login/login.jsx';
import Inicio from './Pages/Inicio/inicio.jsx';
import CardPage from './Pages/CardPage/cardpage.jsx';
import CadastroAplicante from './Pages/Cadastro/cadaplicante.jsx';
import CadastroContratante from './Pages/Cadastro/cadcontratante.jsx';

// ----> NOVO COMPONENTE IMPORTADO AQUI <----
import CentralDoEmpregador from './Pages/CentralDoEmpregador/CentralDoEmpregador.jsx';


function App() {
  return (
    
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/vagas" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/card" element={<CardPage />} />
            <Route path="/cadastroc" element={<CadastroContratante />} />
            <Route path="/cadastroa" element={<CadastroAplicante />} />
            <Route path="/empregador/dashboard" element={<CentralDoEmpregador />} />

          </Routes>
        </main>
      </Router>
    
  );
}

export default App;