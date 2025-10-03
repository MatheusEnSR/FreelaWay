import React, { useState, useEffect, useContext } from "react";
import { FaUserCircle, FaCamera } from "react-icons/fa";
import "./perfil.css";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../Components/NavBar/navbar.jsx";
import Footer from "../../Components/Footer/footer.jsx";

function Perfil() {
  const [abaAtiva, setAbaAtiva] = useState("perfil");
  const { authTokens, logoutUser } = useContext(AuthContext);

  // Estado para os dados do perfil, que virão da API
  const [perfil, setPerfil] = useState({});
  // Estado para o arquivo da imagem a ser enviada
  const [imagemArquivo, setImagemArquivo] = useState(null);
  
  // Estado para o formulário da aba "Conta"
  const [conta, setConta] = useState({
    senha_atual: "",
    nova_senha: "",
    confirmar_nova_senha: ""
  });
  const [contaError, setContaError] = useState("");
  const [contaSuccess, setContaSuccess] = useState("");

  // Busca os dados do perfil do usuário logado assim que a página carrega
  useEffect(() => {
    const fetchProfile = async () => {
      if (!authTokens) return;
      try {
        const response = await fetch("http://127.0.0.1:8000/api/profile/", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens.access}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setPerfil(data);
        } else {
          throw new Error("Falha ao buscar dados do perfil.");
        }
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    };
    fetchProfile();
  }, [authTokens]);

  // Funções para lidar com mudanças nos formulários
  const handlePerfilChange = (e) => {
    setPerfil((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagemArquivo(file);
      setPerfil(prev => ({ ...prev, foto_perfil: URL.createObjectURL(file) }));
    }
  };
  
  const handleContaChange = (e) => {
      setConta(prev => ({...prev, [e.target.name]: e.target.value}));
  };

  // Envia os dados do perfil para o backend
  const salvarPerfil = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    // Adiciona os campos de texto ao FormData
    Object.keys(perfil).forEach(key => {
        if (key !== 'foto_perfil' && perfil[key] !== null) {
            formData.append(key, perfil[key]);
        }
    });

    if (imagemArquivo) {
      formData.append('foto_perfil', imagemArquivo);
    }
    
    try {
      const response = await fetch("http://127.0.0.1:8000/api/profile/", {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${authTokens.access}`
        },
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        alert("Perfil salvo com sucesso!");
        setPerfil(data);
        setImagemArquivo(null);
      } else {
        throw new Error(Object.values(data).flat().join(' ') || "Falha ao salvar o perfil.");
      }
    } catch (error) {
      alert(`Erro ao salvar: ${error.message}`);
    }
  };

  // Envia os dados de troca de senha para o backend
  const salvarConta = async (e) => {
    e.preventDefault();
    setContaError("");
    setContaSuccess("");

    if (conta.nova_senha !== conta.confirmar_nova_senha) {
        setContaError("As novas senhas não coincidem.");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:8000/api/change-password/", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}`
            },
            body: JSON.stringify({
                old_password: conta.senha_atual,
                new_password: conta.nova_senha
            })
        });

        const data = await response.json();
        if (response.ok) {
            setContaSuccess("Senha atualizada com sucesso! Você será deslogado por segurança.");
            // Força o logout após um tempo para o usuário ler a mensagem
            setTimeout(() => {
                logoutUser();
            }, 3000);
        } else {
            throw new Error(Object.values(data).flat().join(' ') || "Falha ao atualizar a senha.");
        }
    } catch (error) {
        setContaError(error.message);
    }
  };

  return (
    <div className="principal">
      <Navbar />
      <div className="pagina-layout">
        <aside className="menu-lateral">
          <div className="menu-header">
            <h3>Configurações</h3>
          </div>
          <ul className="menu-nav">
            <li className={abaAtiva === "perfil" ? "ativo" : ""}>
              <button onClick={() => setAbaAtiva("perfil")}>Perfil</button>
            </li>
            <li className={abaAtiva === "conta" ? "ativo" : ""}>
              <button onClick={() => setAbaAtiva("conta")}>Conta</button>
            </li>
          </ul>
        </aside>

        <main className="conteudo-principal">
          {abaAtiva === "perfil" && (
            <form className="card-form" onSubmit={salvarPerfil}>
              <h2>Seu Perfil Público</h2>
              <p>Estas informações serão visíveis para outros usuários em seu perfil.</p>
              
              <div className="foto-perfil-container">
                <div className="foto-preview-wrapper">
                  {perfil.foto_perfil ? (
                      <img src={perfil.foto_perfil} alt="Pré-visualização" className="foto-perfil-preview" />
                  ) : (
                      <FaUserCircle className="foto-perfil-placeholder" />
                  )}
                  <label htmlFor="upload-foto" className="upload-foto-label">
                      <FaCamera />
                      <span>Alterar</span>
                  </label>
                  <input id="upload-foto" type="file" accept="image/*" onChange={handleImagemChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Nome</label>
                  <input type="text" name="first_name" value={perfil.first_name || ''} onChange={handlePerfilChange} />
                </div>
                <div className="form-group">
                  <label>Sobrenome</label>
                  <input type="text" name="last_name" value={perfil.last_name || ''} onChange={handlePerfilChange} />
                </div>
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea name="bio" placeholder="Fale um pouco sobre você..." value={perfil.bio || ''} onChange={handlePerfilChange} />
              </div>
              <div className="form-group">
                <label>Especializações</label>
                <input type="text" name="especializacoes" placeholder="Ex: Desenvolvedor Frontend, UX Designer" value={perfil.especializacoes || ''} onChange={handlePerfilChange} />
              </div>
              <div className="form-group">
                <label>Tags (separadas por vírgula)</label>
                <input type="text" name="tags" placeholder="Ex: React, JavaScript, Figma" value={perfil.tags || ''} onChange={handlePerfilChange} />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select name="status" value={perfil.status || 'Disponível'} onChange={handlePerfilChange}>
                  <option value="Disponível">Disponível</option>
                  <option value="Indisponível">Indisponível</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Salvar Perfil</button>
              </div>
            </form>
          )}

          {abaAtiva === "conta" && (
            <form className="card-form" onSubmit={salvarConta}>
              <h2>Configurações da Conta</h2>
              <p>Altere suas informações de acesso. Lembre-se que o email não pode ser alterado.</p>
              
              <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={perfil.email || ''} readOnly disabled />
              </div>
              <div className="form-group">
                  <label>Senha Atual</label>
                  <input type="password" name="senha_atual" value={conta.senha_atual} onChange={handleContaChange} required />
              </div>
              <div className="form-group">
                  <label>Nova Senha</label>
                  <input type="password" name="nova_senha" value={conta.nova_senha} onChange={handleContaChange} required />
              </div>
                <div className="form-group">
                  <label>Confirmar Nova Senha</label>
                  <input type="password" name="confirmar_nova_senha" value={conta.confirmar_nova_senha} onChange={handleContaChange} required />
              </div>
              {contaError && <p className="error-message">{contaError}</p>}
              {contaSuccess && <p className="success-message">{contaSuccess}</p>}
              <div className="form-actions">
                  <button type="submit" className="btn btn-primary">Alterar Senha</button>
              </div>
            </form>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Perfil;