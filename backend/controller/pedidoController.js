import PedidoModel from "../models/Pedido.js";
import PedidoFactory from "../factory/pedidoFactory.js";
import readPedidos from "../proxyPedido/read.js";
import readPedidoById from "../proxyPedido/readById.js";

export const createPedido = async (req, res) => {
  try {
    const pedidoFactory = PedidoFactory();
    const pedidoCriado = await pedidoFactory.criarPedido(req.body);

    res.status(200).json({ msg: pedidoCriado });
    
  } catch(error) {
    res.status(500).json({ errorMessage: error.message });
  }
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