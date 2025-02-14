import { useState } from "react";
import { Link } from "react-router-dom";
import { cadastrarProduto } from "../../services/produtoService.js";

const CadastroProduto = () => {

  const [nome, setNome] = useState();
  const [qtd_estoque, setQtdEstoque] = useState();
  const [descricao, setDescricao] = useState();

  const handleCadastro = async(e) => {
    e.preventDefault();
    await cadastrarProduto({nome, qtd_estoque, descricao});
    alert("Produto cadastrado!");
  }

  return (
      <div className="container">
      <form onSubmit={handleCadastro}>
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

        <Link to="/listaprodutos">Voltar para a lista</Link>
      </form>
    </div>
  )
}

export default CadastroProduto;