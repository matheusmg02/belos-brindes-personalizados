/* eslint-disable react/jsx-indent */
import './style.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Cadastro = () => {

  const [nome, setNome] = useState();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();

  const cadastrarUsuario = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/cadastro', {nome, email, senha})
    .then(result => alert(result.data))
    .catch(err => alert(err))
  }

  useEffect(() => {
    document.title = 'Cadastro';
  });

  return (
      <div className='container'>
        <title>Cadastro</title>
        <form onSubmit={cadastrarUsuario}>
          <h1>Cadastro de Administrador</h1>
          <input 
            placeholder='Nome' 
            name='nome' 
            type="text"
            onChange={(e) => setNome(e.target.value)} />
          <input 
            placeholder='Email' 
            name='email' 
            type="text"
            onChange={(e) => setEmail(e.target.value)} />
          <input 
            placeholder='Senha' 
            name='senha' 
            type="password"
            onChange={(e) => setSenha(e.target.value)} />

          <button type='submit'>Cadastrar</button>

          <p>Já possui uma conta? <Link to="/login">Login</Link></p>
        </form>

      </div>

  )
}

export default Cadastro;
