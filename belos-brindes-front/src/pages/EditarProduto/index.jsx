import { Link } from "react-router-dom";
import { useState } from "react"; 
import { useParams } from "react-router-dom";
import axios from "axios";

const EditarProduto = () => {
    
    const [nome, setNome] = useState();
    const [qtd_estoque, setQtdEstoque] = useState();
    const { id } = useParams();

    const editarProduto = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/api/produto/${id}`, {nome, qtd_estoque})
        .then(result => alert(result.data))
        .catch(err => alert(err))
    }
  
    return (
        <div className="container">
        <form onSubmit={editarProduto}>
            <h1>Editar produto</h1>
            <input 
                    placeholder='Nome do produto' 
                    name="nome" 
                    type="text"
                    onChange={(e) => setNome(e.target.value)} />
            <input 
                    placeholder='Quantidade disponivel' 
                    name="qtd_estoque" 
                    type="text"
                    onChange={(e) => setQtdEstoque(e.target.value)} />
            <button type='submit'>Editar Produto</button>

            <Link to="/home">Voltar para a lista</Link>
        </form>
        </div>
    )
}

export default EditarProduto;