import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Login = () => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/api/login', {email, senha})
        .then(result => {
            alert(result.data);
            if(result.data === "Logado com sucesso.") {
                navigate('/homeadm');
            }
        })
        .catch(err => alert(err));
    }

    useEffect(() => {
        document.title = 'Login'
    })

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