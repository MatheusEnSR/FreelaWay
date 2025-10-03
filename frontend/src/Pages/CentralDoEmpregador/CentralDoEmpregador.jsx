// src/Pages/CentralDoEmpregador/CentralDoEmpregador.jsx

import React, { useState, useEffect, useContext } from 'react';
import './CentralDoEmpregador.css';
import { FaHome, FaBullhorn, FaUsers, FaQuestionCircle, FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import api from '../../Services/api';

// Importação dos componentes das abas
import Inicio from './tabs/Inicio';
import Anuncios from './tabs/Anuncios';
import Candidatos from './tabs/Candidatos';
import Suporte from './tabs/Suporte';
import Perfil from './tabs/Perfil';

// Importação do novo componente de modal
import ModalCriarVaga from '../../Components/ModalCriarVaga/ModalCriarVaga';

const CentralDoEmpregador = () => {
    const [activeTab, setActiveTab] = useState('inicio');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { authTokens } = useContext(AuthContext);

    const [dadosEmpregador, setDadosEmpregador] = useState({});
    const [vagas, setVagas] = useState([]);
    const [isLoadingVagas, setIsLoadingVagas] = useState(true);

    useEffect(() => {
        if (authTokens) {
            // Busca dados do Perfil
            api.get('/api/users/me/', {
                headers: { Authorization: `Bearer ${authTokens.access}` }
            }).then(res => {
                const displayName = res.data.nome_empresa || `${res.data.first_name} ${res.data.last_name}`;
                setDadosEmpregador({ ...res.data, nome: displayName });
            }).catch(err => console.error("Erro ao buscar perfil:", err));

            // Busca as vagas do contratante
            fetchVagas();
        }
    }, [authTokens]);

    const fetchVagas = () => {
        setIsLoadingVagas(true);
        api.get('/api/vagas/meus-anuncios/', {
            headers: { Authorization: `Bearer ${authTokens.access}` }
        }).then(res => {
            setVagas(res.data);
        }).catch(err => console.error("Erro ao buscar vagas:", err))
          .finally(() => setIsLoadingVagas(false));
    };

    const handlePerfilSave = (novosDados) => {
        alert('Funcionalidade de salvar perfil a ser implementada.');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'inicio': return <Inicio />;
            case 'anuncios': return <Anuncios vagas={vagas} isLoading={isLoadingVagas} onPublicar={() => setIsModalOpen(true)} />;
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
                            <h4>{dadosEmpregador.nome || "Carregando..."}</h4>
                            <p>Ver seu perfil</p>
                        </div>
                    </button>
                </div>
            </aside>
            <main className="dashboard-content">
                {renderContent()}
            </main>

            {/* O modal agora é renderizado através do novo componente, de forma limpa */}
            {isModalOpen && (
                <ModalCriarVaga 
                    onClose={() => setIsModalOpen(false)}
                    onSaveSuccess={fetchVagas}
                />
            )}
        </div>
    );
};

export default CentralDoEmpregador;