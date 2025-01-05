/* eslint-disable react/jsx-indent */
import './style.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [role, setRole] = useState('master');

  const cadastrarUsuario = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/cadastro', { nome, email, senha, role })
      .then((result) => alert(result.data))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    document.title = 'Cadastro';
  }, []);

  return (
    <div className="container">
      <title>Cadastro</title>
      <form onSubmit={cadastrarUsuario}>
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
