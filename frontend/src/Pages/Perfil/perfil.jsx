import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./perfil.css";

import Navbar from "../../Components/NavBar/navbar.jsx";
import Footer from "../../Components/Footer/footer.jsx";

function Perfil() {
  const [abaAtiva, setAbaAtiva] = useState("perfil");

  const [perfil, setPerfil] = useState({
    nome: "Matheus",
    sobrenome: "Rodrigues",
    bio: "Pequena descrição sobre mim.",
    especializacoes: "Frontend, React",
    tags: "React,JavaScript,HTML,CSS",
    status: "Disponível",
    foto: null, // nova propriedade da foto
  });

  const [conta, setConta] = useState({
    email: "matheus@example.com",
    senha: "",
    novaSenha: "",
  });

  const handlePerfilChange = (e) => {
    const { name, value } = e.target;
    setPerfil((prev) => ({ ...prev, [name]: value }));
  };

  const handleContaChange = (e) => {
    const { name, value } = e.target;
    setConta((prev) => ({ ...prev, [name]: value }));
  };

  const handleFotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPerfil((prev) => ({ ...prev, foto: URL.createObjectURL(file) }));
    }
  };

  const salvarPerfil = () => {
    alert("Perfil salvo com sucesso (simulação frontend)!");
  };

  const salvarConta = () => {
    alert("Dados da conta salvos com sucesso (simulação frontend)!");
  };

  return (
    <div className="principal">
      <Navbar />

      <div className="pagina-layout">
        {/* Menu lateral */}
        <aside className="menu-lateral">
          <div className="menu-header">
            <h3>Menu</h3>
          </div>

          <ul className="menu-nav">
            <li className={abaAtiva === "perfil" ? "ativo" : ""}>
              <button onClick={() => setAbaAtiva("perfil")}>
                <FaUserCircle />
                <span>Perfil</span>
              </button>
            </li>
            <div className="conta">
               <li className={abaAtiva === "conta" ? "ativo" : ""}>
              <button onClick={() => setAbaAtiva("conta")}>
                <FaUserCircle />
                <span>Conta</span>
              </button>
            </li>
            </div>
          </ul>

          <div className="menu-footer">
            <button className="perfil-preview">
              <FaUserCircle className="icone-perfil" />
              <div className="info-perfil">
                <h4>{perfil.nome} {perfil.sobrenome}</h4>
              </div>
            </button>
          </div>
        </aside>

        {/* Conteúdo principal */}
        <main className="conteudo-principal">
          {abaAtiva === "perfil" && (
            <form className="card-perfil">
              <h2>Perfil do Usuário</h2>

              {/* Foto de perfil */}
              <div className="foto-perfil-container">
                {perfil.foto ? (
                  <img src={perfil.foto} alt="Foto de Perfil" className="foto-perfil" />
                ) : (
                  <FaUserCircle className="icone-foto" />
                )}
                <div className="upload">
                  <input className="img" type="file" accept="image/*" onChange={handleFotoUpload} />
                </div>
              </div>

              <div className="form-group">
                <label>Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={perfil.nome}
                  onChange={handlePerfilChange}
                />
              </div>
              <div className="form-group">
                <label>Sobrenome</label>
                <input
                  type="text"
                  name="sobrenome"
                  value={perfil.sobrenome}
                  onChange={handlePerfilChange}
                />
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={perfil.bio}
                  onChange={handlePerfilChange}
                />
              </div>
              <div className="form-group">
                <label>Especializações</label>
                <input
                  type="text"
                  name="especializacoes"
                  value={perfil.especializacoes}
                  onChange={handlePerfilChange}
                />
              </div>
              <div className="form-group">
                <label>Tags (separadas por vírgula)</label>
                <input
                  type="text"
                  name="tags"
                  value={perfil.tags}
                  onChange={handlePerfilChange}
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select name="status" value={perfil.status} onChange={handlePerfilChange}>
                  <option value="Disponível">Disponível</option>
                  <option value="Indisponível">Indisponível</option>
                </select>
              </div>
              <div className="form-actions">
                <button onClick={salvarPerfil}>Salvar Perfil</button>
              </div>
            </form>
          )}

          {abaAtiva === "conta" && (
            <div className="card-conta">
              <h2>Configurações da Conta</h2>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={conta.email}
                  onChange={handleContaChange}
                />
              </div>
              <div className="form-group">
                <label>Senha Atual</label>
                <input
                  type="password"
                  name="senha"
                  value={conta.senha}
                  onChange={handleContaChange}
                />
              </div>
              <div className="form-group">
                <label>Nova Senha</label>
                <input
                  type="password"
                  name="novaSenha"
                  value={conta.novaSenha}
                  onChange={handleContaChange}
                />
              </div>
              <div className="form-actions">
                <button onClick={salvarConta}>Salvar Conta</button>
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer/>
    </div>
  );
}

export default Perfil;
