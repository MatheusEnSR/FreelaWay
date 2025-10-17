import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nProvider } from './i18n/i18nContext.jsx'; 
import ProtectedRoute from './utils/ProtectedRoute.jsx';

// Componentes de Layout
import Navbar from './Components/NavBar/navbar.jsx';
import Footer from './Components/Footer/footer.jsx';

// Páginas
import Home from './Pages/Home/home.jsx';
import Login from './Pages/Login/login.jsx';
import Perfil from './Pages/Perfil/perfil.jsx';
import Inicio from './Pages/Inicio/inicio.jsx';
import CardPage from './Pages/CardPage/cardpage.jsx';
import CadastroAplicante from './Pages/Cadastro/cadaplicante.jsx';
import CadastroContratante from './Pages/Cadastro/cadcontratante.jsx';
import CentralDoEmpregador from './Pages/CentralDoEmpregador/CentralDoEmpregador.jsx';

function App() {
  return (
    <Router>
      <I18nProvider>
        {/* Adicionamos a Navbar aqui para que ela apareça em todas as páginas */}
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/vagas" element={<Home />} />
            <Route path="/login" element={<Login />} />
            
            {/* ========================================================== */}
            {/* ALTERAÇÃO FEITA AQUI: A rota agora é dinâmica             */}
            {/* ========================================================== */}
            <Route path="/card/:id" element={<CardPage />} />

            <Route path="/perfil" element={<Perfil />} />
            <Route path="/cadastroc" element={<CadastroContratante />} />
            <Route path="/cadastroa" element={<CadastroAplicante />} />
            <Route path="/empregador/dashboard" element={
              <ProtectedRoute role="contratante">
                <CentralDoEmpregador/>
              </ProtectedRoute>} />
          </Routes>
        </main>

        {/* Adicionamos o Footer aqui para consistência */}
        <Footer />
      </I18nProvider>
    </Router>
  );
}

export default App;