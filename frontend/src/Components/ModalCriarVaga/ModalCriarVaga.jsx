import React, { useState, useEffect, useContext } from 'react'; // 1. Adicionado useEffect e useContext
import api from '../../Services/api';
import { v4 as uuidv4 } from 'uuid';
// 2. CORREÇÃO: Importando do novo pacote de Drag-and-Drop
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'; 
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './ModalCriarVaga.css';
import { FaTrash, FaGripVertical } from 'react-icons/fa';
import { useI18n } from '../../i18n/useI18n';
import { AuthContext } from '../../context/AuthContext'; // 3. Importado AuthContext

const ModalCriarVaga = ({ onClose, onSaveSuccess }) => {
    const { t } = useI18n();
    const { authTokens } = useContext(AuthContext); // 4. Acessado os tokens

    const [vagaData, setVagaData] = useState({
        titulo: "", local: "", salario: "", idioma: "", descricao_breve: "", descricao_detalhada: "", recomendada: false
    });
    const [logoFile, setLogoFile] = useState(null);
    const [capaFile, setCapaFile] = useState(null);
    const [blocos, setBlocos] = useState([]);

    // --- 5. NOVA LÓGICA DE TAGS ---
    const [allTags, setAllTags] = useState([]); // Guarda todas as tags do banco
    const [selectedTags, setSelectedTags] = useState(new Set()); // Guarda os IDs das tags selecionadas

    // 6. Busca as tags disponíveis quando o modal abre
    useEffect(() => {
        // Usando o proxy (caminho relativo) e enviando o token
        api.get('/api/tags/', {
            headers: { Authorization: `Bearer ${authTokens.access}` }
        })
        .then(res => setAllTags(res.data))
        .catch(err => console.error("Erro ao buscar tags:", err));
    }, [authTokens]); // Roda quando o modal é aberto

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setVagaData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    // 7. NOVA FUNÇÃO para selecionar/deselecionar tags
    const handleTagClick = (tagId) => {
        setSelectedTags(prevSelectedTags => {
            const newSelectedTags = new Set(prevSelectedTags);
            if (newSelectedTags.has(tagId)) {
                newSelectedTags.delete(tagId); // Desseleciona
            } else {
                newSelectedTags.add(tagId); // Seleciona
            }
            return newSelectedTags;
        });
    };

    // ... (suas outras funções: adicionarBloco, removerBloco, etc. permanecem iguais)
    const adicionarBloco = () => {
        if (blocos.length >= 4) return alert(t('max_sections_alert'));
        setBlocos([...blocos, { id: uuidv4(), titulo: '', conteudo: '' }]);
    };
    const removerBloco = (id) => setBlocos(blocos.filter(b => b.id !== id));
    const atualizarBloco = (id, campo, valor) => {
        setBlocos(blocos.map(b => (b.id === id ? { ...b, [campo]: valor } : b)));
    };
    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(blocos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setBlocos(items);
    };

    const handleSubmit = async (status) => {
        const formData = new FormData();
        Object.keys(vagaData).forEach(key => formData.append(key, vagaData[key]));
        
        // --- 8. LÓGICA DE ENVIO DAS TAGS ATUALIZADA ---
        // Em vez de enviar uma string, enviamos cada ID de tag como um item de lista
        Array.from(selectedTags).forEach(tagId => {
            formData.append('tags', tagId);
        });

        // (O backend precisa ser ajustado para receber 'status' e 'blocos' se ainda não foi)
        formData.append('status', status); 
        formData.append('blocos_personalizados', JSON.stringify(blocos));
        if (logoFile) formData.append('logo_empresa', logoFile);
        if (capaFile) formData.append('imagem_capa', capaFile);
        
        try {
            // Usando o proxy (caminho relativo)
            await api.post('/api/vagas/', formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${authTokens.access}` 
                }
            });
            alert(t('job_saved_success_alert'));
            onSaveSuccess(); // Atualiza a lista de vagas no dashboard
            onClose(); // Fecha o modal
        } catch (error) {
            console.error("Erro ao salvar vaga:", error.response?.data);
            alert(`${t('job_saved_error_alert')}: ${JSON.stringify(error.response?.data)}`);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit('publicada'); }}>
                    <div className="modal-header"><h2>{t('publish_new_job_title')}</h2></div>
                    <div className="modal-body">
                        
                        <div className="form-grid">
                           {/* ... (seus inputs de titulo, local, salario, etc.) ... */}
                           <div className="form-group col-span-2">
                                <label htmlFor="titulo">{t('job_title_label')}</label>
                                <input type="text" id="titulo" name="titulo" placeholder={t('job_title_placeholder')} value={vagaData.titulo} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="local">{t('location_label')}</label>
                                <input type="text" id="local" name="local" placeholder={t('location_placeholder')} value={vagaData.local} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="salario">{t('salary_range_label')}</label>
                                <input type="text" id="salario" name="salario" placeholder={t('salary_range_placeholder')} value={vagaData.salario} onChange={handleChange} />
                            </div>
                            <div className="form-group col-span-2">
                                <label htmlFor="idioma">{t('languages_label')}</label>
                                <input type="text" id="idioma" name="idioma" placeholder={t('languages_placeholder')} value={vagaData.idioma} onChange={handleChange} required/>
                            </div>
                            <div className="form-group col-span-2">
                                <label htmlFor="descricao_breve">{t('job_summary_label')}</label>
                                <textarea id="descricao_breve" name="descricao_breve" placeholder={t('job_summary_placeholder')} value={vagaData.descricao_breve} onChange={handleChange} required></textarea>
                            </div>
                            <div className="form-group col-span-2">
                                <label htmlFor="descricao_detalhada">{t('job_full_description_label')}</label>
                                <textarea id="descricao_detalhada" name="descricao_detalhada" placeholder={t('job_full_description_placeholder')} value={vagaData.descricao_detalhada} onChange={handleChange} required></textarea>
                            </div>
                            
                            {/* --- 9. JSX DAS TAGS ATUALIZADO --- */}
                            <div className="form-group col-span-2">
                                <label>{t('tags')}</label>
                                <div className="tags-selection-container">
                                    {allTags.length > 0 ? (
                                        allTags.map(tag => (
                                            <button
                                                type="button"
                                                key={tag.id}
                                                className={`tag-option ${selectedTags.has(tag.id) ? 'selected' : ''}`}
                                                onClick={() => handleTagClick(tag.id)}
                                            >
                                                {tag.nome}
                                            </button>
                                        ))
                                    ) : (
                                        <p>{t('loading_text')}...</p>
                                    )}
                                </div>
                            </div>
                             <div className="checkbox-group col-span-2">
                                <input type="checkbox" id="recomendada" name="recomendada" checked={vagaData.recomendada} onChange={handleChange} />
                                <label htmlFor="recomendada">{t('mark_as_recommended_label')}</label>
                            </div>
                        </div>

                        {/* ... (O resto do seu JSX: uploads, blocos personalizados, preview, etc. permanece o mesmo) ... */}

                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn-tertiary" onClick={onClose}>{t('cancel_button')}</button>
                        <button type="button" className="btn-secondary" onClick={() => handleSubmit('rascunho')}>{t('save_draft_button')}</button>
                        <button type="submit" className="btn-primary">{t('publish_job_button')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalCriarVaga;