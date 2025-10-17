import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './cardpage.css';

// REMOVIDO: As importações de Navbar e Footer foram removidas daqui.
// import Navbar from "../../Components/NavBar/navbar.jsx"; 
// import Footer from "../../Components/Footer/footer.jsx"; 

function CardPage() {
    // A lógica agora busca os dados da vaga usando o ID da URL.
    const { id } = useParams();
    const [vaga, setVaga] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVagaDetalhes = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/vagas/${id}/`);
                if (!response.ok) {
                    throw new Error('Vaga não encontrada.');
                }
                const data = await response.json();
                setVaga(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVagaDetalhes();
    }, [id]);

    if (isLoading) {
        return <div className="cardpage-container"><p>Carregando detalhes da vaga...</p></div>;
    }

    if (error) {
        return <div className="cardpage-container"><p>Erro: {error}</p></div>;
    }

    if (!vaga) {
        return <div className="cardpage-container"><p>Vaga não encontrada.</p></div>;
    }

    // O 'return' agora não inclui Navbar ou Footer
    return (
        <>
            <div className="cardpage-container">
                {/* Card lateral - Criador da vaga */}
                <div className="client-info">
                    <div className="client-card">
                        <div className="client-avatar"></div>
                        <div className="client-details">
                            <h3>{vaga.nome_contratante || "Criador da vaga"}</h3>
                            <p><strong>Local:</strong> {vaga.local}</p>
                            <p><strong>Idioma:</strong> {vaga.idioma}</p>
                            <p><strong>Salário:</strong> {vaga.salario}</p>
                        </div>
                    </div>
                     {/* Botão voltar movido para o card lateral para melhor posicionamento */}
                    <Link to="/vagas" className="btn-voltar">← Voltar para Vagas</Link>
                </div>

                {/* Card central - Descrição da vaga */}
                <div className="project-detail">
                    <div className="project-header">
                        <h1>{vaga.titulo}</h1>
                    </div>
                    
                    <div className="project-description">
                        <p>{vaga.descricao_detalhada || vaga.descricao_breve}</p>
                    </div>

                    <div className="tags-container">
                        {vaga.tags && vaga.tags.map((tag, index) => (
                            <span key={index} className="tag">{tag}</span>
                        ))}
                    </div>

                    <button className="btn-candidatar">Candidatar-se</button>
                </div>
            </div>
        </>
    );
}

export default CardPage;