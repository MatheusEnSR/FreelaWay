// frontend/src/Pages/CentralDoEmpregador/tabs/Anuncios.jsx

import React, { useContext } from 'react'; // Removido useState e useEffect pois os dados vêm via props
import { FaEdit, FaUsers, FaPlus } from 'react-icons/fa';
import { AuthContext } from '../../../context/AuthContext'; // Ajuste o caminho se necessário
import api from '../../../Services/api'; // Ajuste o caminho se necessário

// O componente recebe 'vagas', 'isLoading' e 'onPublicar' do componente pai
const Anuncios = ({ vagas, isLoading, onPublicar }) => {
  // A busca dos dados agora é feita no componente pai (CentralDoEmpregador.jsx)
  // Esta aba apenas exibe os dados recebidos.

  const getStatusClass = (status) => {
    // Futuramente, quando você adicionar um campo 'status' ao modelo Vaga, esta função será útil.
    // Por enquanto, vamos considerar todas como ativas.
    return 'status-ativa';
  };

  return (
    <div>
      <div className="content-header">
        <h2>Gerencie seus Anúncios</h2>
        <button className="btn-primary" onClick={onPublicar}>
          <FaPlus /> Publicar Nova Vaga
        </button>
      </div>

      <div className="anuncios-lista">
        {isLoading ? (
          <p>Carregando seus anúncios...</p>
        ) : vagas.length === 0 ? (
          <div className="anuncio-item">
            <p>Você ainda não publicou nenhuma vaga :( Clique em "Publicar Nova Vaga" para começar!</p>
          </div>
        ) : (
          vagas.map(vaga => (
            <div key={vaga.id} className="anuncio-item">
              <div className="anuncio-info">
                <h4>{vaga.titulo}</h4>
                <p>
                  <span className={`status-badge ${getStatusClass('ativa')}`}>Ativa</span>
                  <span>• {vaga.local}</span>
                </p>
              </div>
              <div className="anuncio-acoes">
                <button className="btn-secondary"><FaUsers /> Ver Candidatos</button>
                <button className="btn-secondary"><FaEdit /> Editar</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Anuncios;