import { Link } from "react-router-dom";
import { useState } from "react"; 
import { useParams } from "react-router-dom";
import axios from "axios";

const EditarPerfil = () => {
    
    const [nome, setNome] = useState();
    const [senha, setSenha] = useState();
    const [role, setRole] = useState();
    const { id } = useParams();

    const editarPerfil = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/api/adm/${id}`, {nome, senha, role})
        .then(result => alert(result.data))
        .catch(err => alert(err))
    }
  
    return (
        <div className="container">
        <form onSubmit={editarPerfil}>
            <h1>Editar perfil</h1>
            <input 
                    placeholder='Nome do adm' 
                    name="nome" 
                    type="text"
                    onChange={(e) => setNome(e.target.value)} />
            <input 
                    placeholder='Senha'
                    name="senha" 
                    type="password"
                    onChange={(e) => setSenha(e.target.value)} />
            <button type='submit'>Confirmar edição</button>

            <select 
                name="role" 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
            >
        
            <option value="admin">Administrador</option>
            <option value="auth-pedidos">Somente acesso à pedidos</option>
            <option value="auth-produtos">Somente acesso à produtos</option>
        </select>

            <Link to="/homeadm">Voltar para a lista de usuários</Link>
        </form>
        </div>
    )
}

export default EditarPerfil;