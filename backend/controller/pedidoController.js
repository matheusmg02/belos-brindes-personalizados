import PedidoModel from "../models/Pedido.js";
import PedidoService from "../services/PedidoService.js";

const pedidoService = PedidoService();

export const createPedido = async (req, res) => {
  try {
    const pedidoCriado = PedidoModel.create(req.body);
    
    res.status(200).json({ msg: pedidoCriado });
    
  } catch(error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const buscarPedidos = async (req, res) => {
  try {
    const pedidoData = await pedidoService.readPedidos();
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
    const pedido = await pedidoService.readPedidoById(id);
    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deletarPedido = async (req, res) => {
  try {
    const id = req.params.id;
    const pedido = pedidoService.deletePedidoById(id);

    res.status(200).json(pedido);
  } catch(error) {
    res.status(500).json({ errorMessage: error.message });
  }
};