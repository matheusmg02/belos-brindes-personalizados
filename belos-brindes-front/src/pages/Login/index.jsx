import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginUsuario } from '../../services/userService.js';

const Login = () => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleLogin = async(e) => {
      e.preventDefault();
      await loginUsuario({ email: email, senha: senha });
      navigate('/homeadm');
    }

    return (
      <div className="container">
        <title>Login</title>
        <form onSubmit={handleLogin}>
          <h1>Login para ADM's</h1>
          <input 
              placeholder='Email' 
              name="email" 
              type="text"
              onChange={(e) => setEmail(e.target.value)} />
          <input 
              placeholder='Senha' 
              name="senha" 
              type="password" 
              onChange={(e) => setSenha(e.target.value)} />
          <button type='submit'>Entrar</button>

          <p>Não possui uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
        </form>
      </div>
    );
}

export default Login;