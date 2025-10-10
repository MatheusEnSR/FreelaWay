import React, { useState } from 'react';
import api from '../../Services/api';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './ModalCriarVaga.css';
import { FaTrash, FaGripVertical } from 'react-icons/fa';
import { useI18n } from '../../i18n/useI18n'; // 1. Importar o hook

const ModalCriarVaga = ({ onClose, onSaveSuccess }) => {
    const { t } = useI18n(); // 2. Usar o hook

    const [vagaData, setVagaData] = useState({
        titulo: "", local: "", salario: "", idioma: "", descricao_breve: "", descricao_detalhada: "", recomendada: false
    });
    const [logoFile, setLogoFile] = useState(null);
    const [capaFile, setCapaFile] = useState(null);
    const [tags, setTags] = useState('');
    const [blocos, setBlocos] = useState([]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setVagaData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };
    const adicionarBloco = () => {
        if (blocos.length >= 4) return alert(t('max_sections_alert')); // Traduzido
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
        formData.append('tags', tags);
        formData.append('status', status);
        formData.append('blocos_personalizados', JSON.stringify(blocos));
        if (logoFile) formData.append('logo_empresa', logoFile);
        if (capaFile) formData.append('imagem_capa', capaFile);
        
        try {
            await api.post('/api/vagas/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert(t('job_saved_success_alert')); // Traduzido
            onSaveSuccess();
            onClose();
        } catch (error) {
            console.error("Erro ao salvar vaga:", error.response?.data);
            alert(`${t('job_saved_error_alert')}: ${JSON.stringify(error.response?.data)}`); // Traduzido
        }
    };

    // 3. Traduzir todos os textos da interface
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit('publicada'); }}>
                    <div className="modal-header"><h2>{t('publish_new_job_title')}</h2></div>
                    <div className="modal-body">
                        
                        <div className="form-grid">
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
                            <div className="form-group col-span-2">
                                <label htmlFor="tags">{t('tags')}</label>
                                <input type="text" id="tags" name="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder={t('exemplo_tags')} />
                            </div>
                             <div className="checkbox-group col-span-2">
                                <input type="checkbox" id="recomendada" name="recomendada" checked={vagaData.recomendada} onChange={handleChange} />
                                <label htmlFor="recomendada">{t('mark_as_recommended_label')}</label>
                            </div>
                        </div>

                        <div className="upload-section">
                            <div className="form-group">
                                <label htmlFor="logo_empresa">{t('company_logo_label')}</label>
                                <input type="file" id="logo_empresa" name="logo_empresa" onChange={(e) => setLogoFile(e.target.files[0])} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="imagem_capa">{t('cover_image_label')}</label>
                                <input type="file" id="imagem_capa" name="imagem_capa" onChange={(e) => setCapaFile(e.target.files[0])} />
                            </div>
                        </div>

                        <div className="blocos-container">
                            <h3>{t('custom_sections_title')}</h3>
                            <DragDropContext onDragEnd={handleDragEnd}>
                                <Droppable droppableId="blocos">
                                    {(provided) => (
                                        <div {...provided.droppableProps} ref={provided.innerRef}>
                                            {blocos.map((bloco, index) => (
                                                <Draggable key={bloco.id} draggableId={bloco.id} index={index}>
                                                    {(provided) => (
                                                        <div className="bloco-personalizado" ref={provided.innerRef} {...provided.draggableProps}>
                                                            <div className="bloco-header">
                                                                <span className="drag-handle" {...provided.dragHandleProps}><FaGripVertical /></span>
                                                                <input type="text" placeholder={t('section_title_placeholder')} value={bloco.titulo} onChange={(e) => atualizarBloco(bloco.id, 'titulo', e.target.value)} />
                                                                <button type="button" onClick={() => removerBloco(bloco.id)}><FaTrash /></button>
                                                            </div>
                                                            <div className="bloco-body">
                                                                <ReactQuill theme="snow" value={bloco.conteudo} onChange={(content) => atualizarBloco(bloco.id, 'conteudo', content)} />
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                            <button type="button" onClick={adicionarBloco} style={{ marginTop: '10px' }}>{t('add_section_button')}</button>
                        </div>

                        <div className="job-preview">
                            <h4>{t('ad_preview_title')}</h4>
                            <p><strong>{t('preview_label_title')}:</strong> {vagaData.titulo || t('not_informed_yet_text')}</p>
                            <p><strong>{t('preview_label_location')}:</strong> {vagaData.local || t('not_informed_yet_text')}</p>
                            <p><strong>{t('preview_label_salary')}:</strong> {vagaData.salario || t('not_informed_yet_text')}</p>
                            <p><strong>{t('preview_label_summary')}:</strong> {vagaData.descricao_breve || t('summary_preview_placeholder')}</p>
                        </div>
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