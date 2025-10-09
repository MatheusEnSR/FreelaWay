import React, { useState, useEffect, useContext } from "react";
import { FaUserCircle, FaCamera } from "react-icons/fa";
import "./perfil.css";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../Components/NavBar/navbar.jsx";
import Footer from "../../Components/Footer/footer.jsx";

// Importa o hook de tradução
import { useI18n } from "../../i18n/useI18n.jsx";

function Perfil() {
  const { t } = useI18n(); // pega a função de tradução
  const [abaAtiva, setAbaAtiva] = useState("perfil");
  const { authTokens, logoutUser } = useContext(AuthContext);

  const [perfil, setPerfil] = useState({});
  const [imagemArquivo, setImagemArquivo] = useState(null);

  const [conta, setConta] = useState({
    senha_atual: "",
    nova_senha: "",
    confirmar_nova_senha: ""
  });
  const [contaError, setContaError] = useState("");
  const [contaSuccess, setContaSuccess] = useState("");

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
        if (response.ok) setPerfil(data);
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    };
    fetchProfile();
  }, [authTokens]);

  const handlePerfilChange = (e) => setPerfil(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagemArquivo(file);
      setPerfil(prev => ({ ...prev, foto_perfil: URL.createObjectURL(file) }));
    }
  };
  const handleContaChange = (e) => setConta(prev => ({...prev, [e.target.name]: e.target.value}));

  const salvarPerfil = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(perfil).forEach(key => {
      if (key !== 'foto_perfil' && perfil[key] != null) formData.append(key, perfil[key]);
    });
    if (imagemArquivo) formData.append('foto_perfil', imagemArquivo);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/profile/", {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${authTokens.access}` },
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
        alert(t("perfil_salvo_sucesso") || "Perfil salvo com sucesso!");
        setPerfil(data);
        setImagemArquivo(null);
      } else {
        throw new Error(Object.values(data).flat().join(' '));
      }
    } catch (error) {
      alert(`${t("erro_ao_salvar") || "Erro ao salvar"}: ${error.message}`);
    }
  };

  const salvarConta = async (e) => {
    e.preventDefault();
    setContaError("");
    setContaSuccess("");

    if (conta.nova_senha !== conta.confirmar_nova_senha) {
        setContaError(t("senhas_nao_coincidem") || "As novas senhas não coincidem.");
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
        setContaSuccess(t("senha_atualizada_sucesso") || "Senha atualizada com sucesso! Você será deslogado.");
        setTimeout(() => logoutUser(), 3000);
      } else {
        throw new Error(Object.values(data).flat().join(' '));
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
            <h3>{t("configuracoes") || "Configurações"}</h3>
          </div>
          <ul className="menu-nav">
            <li className={abaAtiva === "perfil" ? "ativo" : ""}>
              <button onClick={() => setAbaAtiva("perfil")}>{t("perfil") || "Perfil"}</button>
            </li>
            <li className={abaAtiva === "conta" ? "ativo" : ""}>
              <button onClick={() => setAbaAtiva("conta")}>{t("conta") || "Conta"}</button>
            </li>
          </ul>
        </aside>

        <main className="conteudo-principal">
          {abaAtiva === "perfil" && (
            <form className="card-form" onSubmit={salvarPerfil}>
              <h2>{t("seu_perfil_publico") || "Seu Perfil Público"}</h2>
              <p>{t("informacoes_visiveis") || "Estas informações serão visíveis para outros usuários em seu perfil."}</p>

              <div className="foto-perfil-container">
                <div className="foto-preview-wrapper">
                  {perfil.foto_perfil ? (
                    <img src={perfil.foto_perfil} alt="Pré-visualização" className="foto-perfil-preview" />
                  ) : (
                    <FaUserCircle className="foto-perfil-placeholder" />
                  )}
                  <label htmlFor="upload-foto" className="upload-foto-label">
                    <FaCamera />
                    <span>{t("alterar_foto") || "Alterar"}</span>
                  </label>
                  <input id="upload-foto" type="file" accept="image/*" onChange={handleImagemChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>{t("nome") || "Nome"}</label>
                  <input type="text" name="first_name" value={perfil.first_name || ''} onChange={handlePerfilChange} />
                </div>
                <div className="form-group">
                  <label>{t("sobrenome") || "Sobrenome"}</label>
                  <input type="text" name="last_name" value={perfil.last_name || ''} onChange={handlePerfilChange} />
                </div>
              </div>

              <div className="form-group">
                <label>{t("bio") || "Bio"}</label>
                <textarea name="bio" placeholder={t("bio_placeholder") || "Fale um pouco sobre você..."} value={perfil.bio || ''} onChange={handlePerfilChange} />
              </div>

              <div className="form-group">
                <label>{t("especializacoes") || "Especializações"}</label>
                <input type="text" name="especializacoes" placeholder={t("exemplo_especializacoes") || "Ex: Desenvolvedor Frontend, UX Designer"} value={perfil.especializacoes || ''} onChange={handlePerfilChange} />
              </div>

              <div className="form-group">
                <label>{t("tags") || "Tags (separadas por vírgula)"}</label>
                <input type="text" name="tags" placeholder={t("exemplo_tags") || "Ex: React, JavaScript, Figma"} value={perfil.tags || ''} onChange={handlePerfilChange} />
              </div>

              <div className="form-group">
                <label>{t("status") || "Status"}</label>
                <select name="status" value={perfil.status || t("disponivel") || 'Disponível'} onChange={handlePerfilChange}>
                  <option value="Disponível">{t("disponivel") || "Disponível"}</option>
                  <option value="Indisponível">{t("indisponivel") || "Indisponível"}</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">{t("salvar_perfil") || "Salvar Perfil"}</button>
              </div>
            </form>
          )}

          {abaAtiva === "conta" && (
            <form className="card-form" onSubmit={salvarConta}>
              <h2>{t("configuracoes_conta") || "Configurações da Conta"}</h2>
              <p>{t("mensagem_alterar_conta") || "Altere suas informações de acesso. Lembre-se que o email não pode ser alterado."}</p>

              <div className="form-group">
                  <label>{t("email") || "Email"}</label>
                  <input type="email" value={perfil.email || ''} readOnly disabled />
              </div>
              <div className="form-group">
                  <label>{t("senha_atual") || "Senha Atual"}</label>
                  <input type="password" name="senha_atual" value={conta.senha_atual} onChange={handleContaChange} required />
              </div>
              <div className="form-group">
                  <label>{t("nova_senha") || "Nova Senha"}</label>
                  <input type="password" name="nova_senha" value={conta.nova_senha} onChange={handleContaChange} required />
              </div>
                <div className="form-group">
                  <label>{t("confirmar_nova_senha") || "Confirmar Nova Senha"}</label>
                  <input type="password" name="confirmar_nova_senha" value={conta.confirmar_nova_senha} onChange={handleContaChange} required />
              </div>
              {contaError && <p className="error-message">{contaError}</p>}
              {contaSuccess && <p className="success-message">{contaSuccess}</p>}
              <div className="form-actions">
                  <button type="submit" className="btn btn-primary">{t("alterar_senha") || "Alterar Senha"}</button>
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
