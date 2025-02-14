import ProdutoService from "../services/ProdutoService.js";

const produtoService = ProdutoService();

export const create = async (req, res) => {
  try {
    const produtoCriado = await produtoService.criarProduto(req.body);
    res.status(200).json({ msg: produtoCriado });
  } catch(error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const buscarProdutos = async (req, res) => {
  try {
    const produtoData = await produtoService.lerProdutos();
    if (!produtoData || produtoData.length === 0) {
      return res.status(404).json({ message: "" });
    }
    res.status(200).json(produtoData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const atualizarProduto = async (req, res) => {
  try {
    const id = req.params.id;
    const produtoAtualizado = await produtoService.editarProduto(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Produto atualizado", data: produtoAtualizado });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deletarProduto = async (req, res) => {
  try {
    const id = req.params.id;
    await produtoService.removerProduto(id);
    res.status(200).json({ message: "Produto deletado." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};