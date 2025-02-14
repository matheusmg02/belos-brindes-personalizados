/* eslint-disable react/jsx-indent */
import './style.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cadastrarUsuario } from "../../services/userService.js";

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [role, setRole] = useState('master');

  const handleCadastro = async(e) => {
    e.preventDefault();
    await cadastrarUsuario({nome, email, senha, role});
    alert("Usuário cadastrado!");
  };

  return (
    <div className="container">
      <title>Cadastro</title>
      <form onSubmit={handleCadastro}>
        <h1>Cadastro de Usuário</h1>

        <input
          placeholder="Nome"
          name="nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          placeholder="Email"
          name="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Senha"
          name="senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <select 
          name="role" 
          value={role} 
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="master">Master</option>
          <option value="auth-pedidos">Somente acesso à pedidos</option>
          <option value="auth-produtos">Somente acesso à produtos</option>
        </select>

        <button type="submit">Cadastrar</button>

        <p>Já possui uma conta? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default Cadastro;
