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

export const criarComentario = async(req, res) => {
  try {
    const id = req.params.id;

    const {comentario, avaliacao} = req.body;
    
    const produto = await produtoService.postComentario(id, comentario, avaliacao);
    res.json(produto);
  } catch (error) {
    res.status(500).json({error: "Erro ao adicionar comentário"});
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

export const buscarProdutosPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const produtoData = await produtoService.lerProdutoPorId(id);
    return res.status(200).json(produtoData);
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