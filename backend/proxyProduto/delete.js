import ProdutoModel from "../models/Produto.js";

// Função proxy para deletar um administrador por ID
const deletarProdutobyId = async (id) => {
  const produto = await ProdutoModel.findByIdAndDelete(id);
  if (!produto) {
    throw new Error("Produto não encontrado");
  }
  return produto;
};

export default deletarProdutobyId;
