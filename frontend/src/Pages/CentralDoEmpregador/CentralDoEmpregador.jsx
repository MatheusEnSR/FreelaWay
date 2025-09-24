import React, { useState } from 'react';
import './CentralDoEmpregador.css';
import { FaHome, FaBullhorn, FaUsers, FaQuestionCircle, FaUserCircle } from 'react-icons/fa';

import Inicio from './tabs/Inicio';
import Anuncios from './tabs/Anuncios_temp';
import Candidatos from './tabs/Candidatos';
import Suporte from './tabs/Suporte';
import Perfil from './tabs/Perfil';

const CentralDoEmpregador = () => {
  const [activeTab, setActiveTab] = useState('inicio');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [dadosEmpregador, setDadosEmpregador] = useState({
    nome: "Nome do Empregador",
    email: "contato@minhaempresa.com",
    cnpj: "12.345.678/0001-99",
    descricao: "Somos uma empresa focada em inovação e desenvolvimento de soluções digitais."
  });

  // Lista de vagas
  const [vagas, setVagas] = useState([]);

  // Estado do formulário da vaga
  const [novaVaga, setNovaVaga] = useState({
    nome: "",
    local: "",
    salario: "",
    idioma: "",
    descricao: ""
  });

  const handlePerfilSave = (novosDados) => {
    setDadosEmpregador(dadosAntigos => ({ ...dadosAntigos, ...novosDados }));
    alert('Perfil atualizado com sucesso!');
  };

  // Publicar vaga
  const handlePublicarVaga = () => {
    if (!novaVaga.nome || !novaVaga.local || !novaVaga.salario || !novaVaga.idioma || !novaVaga.descricao) {
      alert("Preencha todos os campos antes de publicar.");
      return;
    }

    setVagas([...vagas, novaVaga]);
    setNovaVaga({ nome: "", local: "", salario: "", idioma: "", descricao: "" }); // limpa formulário
    setIsModalOpen(false);
    alert("Vaga publicada com sucesso!");
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'inicio': return <Inicio />;
      case 'anuncios': return <Anuncios vagas={vagas} onPublicar={() => setIsModalOpen(true)} />;
      case 'candidatos': return <Candidatos />;
      case 'suporte': return <Suporte />;
      case 'perfil': return <Perfil dados={dadosEmpregador} onSave={handlePerfilSave} />;
      default: return <Inicio />;
    }
  };

  const navItems = [
    { id: 'inicio', label: 'Início', icon: <FaHome /> },
    { id: 'anuncios', label: 'Meus Anúncios', icon: <FaBullhorn /> },
    { id: 'candidatos', label: 'Candidatos', icon: <FaUsers /> },
    { id: 'suporte', label: 'Chamados e Ajuda', icon: <FaQuestionCircle /> }
  ];

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h3>Central do Empregador</h3>
        </div>

        <ul className="sidebar-nav">
          {navItems.map(item => (
            <li key={item.id} className={activeTab === item.id ? 'active' : ''}>
              <button onClick={() => setActiveTab(item.id)}>
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="sidebar-footer">
          <button className="profile-preview-button" onClick={() => setActiveTab('perfil')}>
            <FaUserCircle className="profile-icon" />
            <div className="profile-info">
              <h4>{dadosEmpregador.nome}</h4>
              <p>Ver seu perfil</p>
            </div>
          </button>
        </div>
      </aside>

      <main className="dashboard-content">
        {renderContent()}
      </main>

      {/* MODAL */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Publicar Nova Vaga</h2>

            <input
              type="text"
              placeholder="Nome da Vaga"
              value={novaVaga.nome}
              onChange={(e) => setNovaVaga({ ...novaVaga, nome: e.target.value })}
            />

            <input
              type="text"
              placeholder="Local"
              value={novaVaga.local}
              onChange={(e) => setNovaVaga({ ...novaVaga, local: e.target.value })}
            />

            <input
              type="text"
              placeholder="Salário"
              value={novaVaga.salario}
              onChange={(e) => setNovaVaga({ ...novaVaga, salario: e.target.value })}
            />

            {/* Campo de idiomas */}
            <select
              value={novaVaga.idioma}
              onChange={(e) => setNovaVaga({ ...novaVaga, idioma: e.target.value })}
            >
              <option value="" disabled>Selecione um idioma</option>
              <option value="portugues">Português</option>
              <option value="ingles">Inglês</option>
              <option value="espanhol">Espanhol</option>
              <option value="frances">Francês</option>
            </select>

            <textarea
              placeholder="Descrição da vaga"
              value={novaVaga.descricao}
              onChange={(e) => setNovaVaga({ ...novaVaga, descricao: e.target.value })}
            ></textarea>

            <div className="modal-buttons">
              <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
              <button onClick={handlePublicarVaga}>Publicar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CentralDoEmpregador;