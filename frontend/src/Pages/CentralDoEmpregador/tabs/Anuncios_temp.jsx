import React, { useState, useEffect } from 'react';
import { FaEdit, FaUsers, FaPlus } from 'react-icons/fa';

// --- DADOS DE EXEMPLO ---
const mockAnuncios = [
  { id: 1, titulo: 'Desenvolvedor Frontend React (Pleno)', status: 'ativa', candidatos: 12 },
  { id: 2, titulo: 'UX/UI Designer com foco em Acessibilidade', status: 'ativa', candidatos: 8 },
  { id: 3, titulo: 'Engenheiro de Dados (Sênior)', status: 'pausada', candidatos: 25 },
  { id: 4, titulo: 'Estágio em Marketing Digital', status: 'encerrada', candidatos: 58 }
];

const Anuncios = ({ onPublicar }) => { // <-- Recebe a função onPublicar via props
  const [anuncios, setAnuncios] = useState([]);

  useEffect(() => {
    // TODO: Conectar com o Backend
    setAnuncios(mockAnuncios);
  }, []);

  const getStatusClass = (status) => {
    if (status === 'ativa') return 'status-ativa';
    if (status === 'pausada') return 'status-pausada';
    return 'status-encerrada';
  };

  return (
    <div>
      <div className="content-header">
        <h2>Gerencie seus Anúncios</h2>
        {/* Botão agora chama onPublicar */}
        <button className="btn-primary" onClick={onPublicar}>
          <FaPlus /> Publicar Nova Vaga
        </button>
      </div>

      <div className="anuncios-lista">
        {anuncios.map(anuncio => (
          <div key={anuncio.id} className="anuncio-item">
            <div className="anuncio-info">
              <h4>{anuncio.titulo}</h4>
              <p>
                <span className={`status-badge ${getStatusClass(anuncio.status)}`}>{anuncio.status}</span>
                <span>• {anuncio.candidatos} Candidatos</span>
              </p>
            </div>
            <div className="anuncio-acoes">
              <button className="btn-secondary"><FaUsers /> Ver Candidatos</button>
              <button className="btn-secondary"><FaEdit /> Editar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Anuncios;
