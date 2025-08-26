import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importar páginas
import Home from './Pages/Home/home.jsx';
import Login from './Pages/Login/login.jsx';
import CardPage from './Pages/CardPage/cardpage.jsx';
import CadastroAplicante from './Pages/Cadastro/cadaplicante.jsx';
import CadastroContratante from './Pages/Cadastro/cadcontratante.jsx';

function App() {
  return (
    <Router>  
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/card" element={<CardPage />} />
           <Route path="/cadastroc" element={<CadastroContratante />} />
            <Route path="/cadastroa" element={<CadastroAplicante />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;