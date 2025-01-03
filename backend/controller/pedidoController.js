import PedidoModel from "../models/Pedido.js";

export const createPedido = async (req, res) => {
  PedidoModel.create(req.body)
  .then(produtos => res.json(produtos))
  .catch(err => res.json(err));
};

export const buscarPedidos = async (req, res) => {
  try {
    const pedidoData = await PedidoModel.find();
    if (!pedidoData || pedidoData.length === 0) {
      return res.status(404).json({ message: "" });
    }
    res.status(200).json(pedidoData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const buscarPedidoPorId = async(req, res) => {
  try {
    const id = req.params.id;
    const pedido = await PedidoModel.findById(id);
    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};