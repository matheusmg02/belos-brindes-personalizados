import ProdutoModel from "../models/Produto.js";
import deletarProdutobyId from "../proxyProduto/delete.js";
import atualizarProdutoById from "../proxyProduto/edit.js";

export const create = async (req, res) => {
  ProdutoModel.create(req.body)
  .then(produtos => res.json(produtos))
  .catch(err => res.json(err));
};

export const buscarProdutos = async (req, res) => {
  try {
    const produtoData = await ProdutoModel.find();
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
    const newData = req.body;

    const produtoAtualizado = await atualizarProdutoById(id, newData);

    res.status(200).json({ message: "Produto não encontrado" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deletarProduto = async (req, res) => {
  try {
    const id = req.params.id;
    await deletarProdutobyId(id);
    res.status(200).json({ message: " Produto deletado." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};