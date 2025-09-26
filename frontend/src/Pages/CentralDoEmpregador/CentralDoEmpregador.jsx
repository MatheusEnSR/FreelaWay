import React, { useState, useEffect, useContext } from 'react';
import './CentralDoEmpregador.css';
import { FaHome, FaBullhorn, FaUsers, FaQuestionCircle, FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext'; // Ajuste o caminho se necessário
import api from '../../Services/api'; // Nosso Axios configurado

// Importação dos componentes das abas
import Inicio from './tabs/Inicio';
import Anuncios from './tabs/Anuncios';
import Candidatos from './tabs/Candidatos';
import Suporte from './tabs/Suporte';
import Perfil from './tabs/Perfil';

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
    // Altere a URL para o novo endpoint que filtra por usuário
    api.get('/api/vagas/meus-anuncios/', { // <-- CORREÇÃO AQUI
        headers: { Authorization: `Bearer ${authTokens.access}` }
    }).then(res => {
        setVagas(res.data);
    }).catch(err => console.error("Erro ao buscar vagas:", err))
      .finally(() => setIsLoadingVagas(false));
};

    const [novaVaga, setNovaVaga] = useState({
        titulo: "", local: "", salario: "", idioma: "", descricao_breve: "", descricao_detalhada: "", tags: "", recomendada: false
    });
    
    const handleNovaVagaChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNovaVaga(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handlePublicarVaga = async (e) => {
        e.preventDefault();
        const payload = {
            ...novaVaga,
            tags: novaVaga.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        };
        
        try {
            await api.post('/api/vagas/', payload, {
                headers: { Authorization: `Bearer ${authTokens.access}` }
            });
            alert("Vaga publicada com sucesso!");
            setIsModalOpen(false);
            setNovaVaga({ titulo: "", local: "", salario: "", idioma: "", descricao_breve: "", descricao_detalhada: "", tags: "", recomendada: false });
            fetchVagas();
        } catch (error) {
            const errorMsg = error.response?.data ? JSON.stringify(error.response.data) : error.message;
            console.error("Erro ao publicar vaga:", errorMsg);
            alert(`Erro ao publicar vaga: ${errorMsg}`);
        }
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

    // A CORREÇÃO PRINCIPAL FOI RESTAURAR SEU CÓDIGO JSX ABAIXO:
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
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-card">
                        <h2>Publicar Nova Vaga</h2>
                        <form onSubmit={handlePublicarVaga}>
                            <input name="titulo" type="text" placeholder="Título da Vaga (ex: Desenvolvedor React)" value={novaVaga.titulo} onChange={handleNovaVagaChange} required />
                            <input name="local" type="text" placeholder="Local (ex: Remoto)" value={novaVaga.local} onChange={handleNovaVagaChange} required />
                            <input name="salario" type="text" placeholder="Salário (ex: R$ 5.000 - R$ 7.000)" value={novaVaga.salario} onChange={handleNovaVagaChange} />
                            <input name="idioma" type="text" placeholder="Idiomas (ex: Português, Inglês)" value={novaVaga.idioma} onChange={handleNovaVagaChange} required />
                            <textarea name="descricao_breve" placeholder="Descrição breve da vaga (1-2 frases)" value={novaVaga.descricao_breve} onChange={handleNovaVagaChange} required></textarea>
                            <textarea name="descricao_detalhada" placeholder="Descrição detalhada (responsabilidades, etc)" value={novaVaga.descricao_detalhada} onChange={handleNovaVagaChange} required></textarea>
                            <input name="tags" type="text" placeholder="Tags (separadas por vírgula: React, Python)" value={novaVaga.tags} onChange={handleNovaVagaChange} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                                <input name="recomendada" type="checkbox" checked={novaVaga.recomendada} onChange={handleNovaVagaChange} id="recomendada-checkbox" />
                                <label htmlFor="recomendada-checkbox">Marcar como vaga recomendada</label>
                            </div>
                            <div className="modal-buttons">
                                <button type="button" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                                <button type="submit">Publicar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CentralDoEmpregador;