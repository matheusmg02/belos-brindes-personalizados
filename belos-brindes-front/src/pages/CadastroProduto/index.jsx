import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CadastroProduto = () => {

  const [nome, setNome] = useState();
  const [qtd_estoque, setQtdEstoque] = useState();
  const [descricao, setDescricao] = useState();

  const cadastrarProduto = (e) => {
      e.preventDefault();
      axios.post('http://localhost:3000/api/produto', {nome, qtd_estoque, descricao})
      .then(result => alert(result.data))
      .catch(err => alert(err))
  }

  return (
      <div className="container">
      <form onSubmit={cadastrarProduto}>
        <h1>Cadastro de produtos</h1>
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
        <input 
                  placeholder='Descrição do produto'
                  name="descricao" 
                  type="text"
                  onChange={(e) => setDescricao(e.target.value)} />
        <button type='submit'>Cadastrar Produto</button>

        <Link to="/homeadm">Voltar para a lista</Link>
      </form>
    </div>
  )
}

export default CadastroProduto;