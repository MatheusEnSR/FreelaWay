import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importar páginas
import Home from './Pages/Home/home.jsx';
import Login from './Pages/Login/login.jsx';
import CardPage from './Pages/CardPage/cardpage.jsx';



function App() {
  return (
    <Router>  
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/card" element={<CardPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
