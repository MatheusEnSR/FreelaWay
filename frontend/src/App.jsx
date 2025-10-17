import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Importação do Provider de Internacionalização
import { I18nProvider } from './i18n/i18nContext.jsx'; 
import ProtectedRoute from './utils/ProtectedRoute.jsx';

// Páginas
import Home from './Pages/Home/home.jsx';
import Login from './Pages/Login/login.jsx';
import Perfil from './Pages/Perfil/perfil.jsx';
import Inicio from './Pages/Inicio/inicio.jsx';
import CardPage from './Pages/CardPage/cardpage.jsx';
import CadastroAplicante from './Pages/Cadastro/cadaplicante.jsx';
import CadastroContratante from './Pages/Cadastro/cadcontratante.jsx';
import CentralDoEmpregador from './Pages/CentralDoEmpregador/CentralDoEmpregador.jsx';

// Lembre-se que o componente NavBar deve ser renderizado aqui ou dentro de um
// componente de Layout que seja filho do I18nProvider, para que ele tenha acesso ao Contexto.

function App() {
  return (
    <Router>
      {/* 1. ENVOLVER TODA A ÁREA DE CONTEÚDO COM O I18nProvider */}
      <I18nProvider>
        <main>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/vagas" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/card1" element={<CardPage />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/cadastroc" element={<CadastroContratante />} />
            <Route path="/cadastroa" element={<CadastroAplicante />} />
            <Route path="/empregador/dashboard" element={
              <ProtectedRoute role="contratante">
                <CentralDoEmpregador/>
            </ProtectedRoute>} />
          </Routes>
        </main>
      </I18nProvider>
    </Router>
  );
}

export default App;