// src/components/ModalCriarVaga/ModalCriarVaga.jsx

import React, { useState } from 'react';
import api from '../../Services/api';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './ModalCriarVaga.css';
import { FaTrash, FaGripVertical } from 'react-icons/fa';

const ModalCriarVaga = ({ onClose, onSaveSuccess }) => {
    // ESTADOS PARA OS CAMPOS BÁSICOS
    const [vagaData, setVagaData] = useState({
        titulo: "", local: "", salario: "", idioma: "", descricao_breve: "", descricao_detalhada: "", recomendada: false
    });

    // ESTADOS PARA OS RECURSOS AVANÇADOS
    const [logoFile, setLogoFile] = useState(null);
    const [capaFile, setCapaFile] = useState(null);
    const [tags, setTags] = useState('');
    const [blocos, setBlocos] = useState([]);

    // --- MANIPULADORES ---
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setVagaData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };
    const adicionarBloco = () => {
        if (blocos.length >= 4) return alert("Máximo de 4 seções atingido.");
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

    // --- FUNÇÃO FINAL DE SUBMISSÃO ---
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
            alert('Vaga salva com sucesso!');
            onSaveSuccess();
            onClose();
        } catch (error) {
            console.error("Erro ao salvar vaga:", error.response?.data);
            alert(`Erro ao salvar vaga: ${JSON.stringify(error.response?.data)}`);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit('publicada'); }}>
                    <div className="modal-header"><h2>Publicar Nova Vaga</h2></div>
                    <div className="modal-body">
                        
                        {/* --- CAMPOS RESTAURADOS --- */}
                        <div className="form-grid">
                            <div className="form-group col-span-2">
                                <label htmlFor="titulo">Título da Vaga</label>
                                <input type="text" id="titulo" name="titulo" placeholder="Ex: Desenvolvedor(a) React Sênior" value={vagaData.titulo} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="local">Local</label>
                                <input type="text" id="local" name="local" placeholder="Ex: Remoto ou São Paulo, SP" value={vagaData.local} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="salario">Faixa salarial (opcional)</label>
                                <input type="text" id="salario" name="salario" placeholder="Ex: R$ 5.000 - R$ 7.000" value={vagaData.salario} onChange={handleChange} />
                            </div>
                            <div className="form-group col-span-2">
                                <label htmlFor="idioma">Idiomas</label>
                                <input type="text" id="idioma" name="idioma" placeholder="Ex: Inglês Avançado, Espanhol Básico" value={vagaData.idioma} onChange={handleChange} required/>
                            </div>
                            <div className="form-group col-span-2">
                                <label htmlFor="descricao_breve">Resumo da vaga</label>
                                <textarea id="descricao_breve" name="descricao_breve" placeholder="Uma breve descrição que chame a atenção do candidato." value={vagaData.descricao_breve} onChange={handleChange} required></textarea>
                            </div>
                            <div className="form-group col-span-2">
                                <label htmlFor="descricao_detalhada">Descrição completa</label>
                                <textarea id="descricao_detalhada" name="descricao_detalhada" placeholder="Detalhe as responsabilidades, requisitos e benefícios da vaga." value={vagaData.descricao_detalhada} onChange={handleChange} required></textarea>
                            </div>
                            <div className="form-group col-span-2">
                                <label htmlFor="tags">Tags (separadas por vírgula)</label>
                                <input type="text" id="tags" name="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Ex: React, Python, AWS, Metodologia Ágil" />
                            </div>
                             <div className="checkbox-group col-span-2">
                                <input type="checkbox" id="recomendada" name="recomendada" checked={vagaData.recomendada} onChange={handleChange} />
                                <label htmlFor="recomendada">Marcar como vaga recomendada</label>
                            </div>
                        </div>

                        {/* --- CAMPOS DE UPLOAD --- */}
                        <div className="upload-section">
                            <div className="form-group">
                                <label htmlFor="logo_empresa">Logo da Empresa</label>
                                <input type="file" id="logo_empresa" name="logo_empresa" onChange={(e) => setLogoFile(e.target.files[0])} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="imagem_capa">Imagem de Capa (Opcional)</label>
                                <input type="file" id="imagem_capa" name="imagem_capa" onChange={(e) => setCapaFile(e.target.files[0])} />
                            </div>
                        </div>

                        {/* --- SEÇÃO DE BLOCOS PERSONALIZADOS --- */}
                        <div className="blocos-container">
                            <h3>Seções Personalizadas (Arraste para reordenar)</h3>
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
                                                                <input type="text" placeholder="Título da Seção" value={bloco.titulo} onChange={(e) => atualizarBloco(bloco.id, 'titulo', e.target.value)} />
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
                            <button type="button" onClick={adicionarBloco} style={{ marginTop: '10px' }}>+ Adicionar Seção</button>
                        </div>

                        {/* --- PRÉ-VISUALIZAÇÃO RESTAURADA --- */}
                        <div className="job-preview">
                            <h4>Pré-visualização do anúncio</h4>
                            <p><strong>Título:</strong> {vagaData.titulo || "Ainda não informado..."}</p>
                            <p><strong>Local:</strong> {vagaData.local || "Ainda não informado..."}</p>
                            <p><strong>Salário:</strong> {vagaData.salario || "Ainda não informado..."}</p>
                            <p><strong>Resumo:</strong> {vagaData.descricao_breve || "O resumo da sua vaga aparecerá aqui..."}</p>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn-tertiary" onClick={onClose}>Cancelar</button>
                        <button type="button" className="btn-secondary" onClick={() => handleSubmit('rascunho')}>Salvar Rascunho</button>
                        <button type="submit" className="btn-primary">Publicar Vaga</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalCriarVaga;