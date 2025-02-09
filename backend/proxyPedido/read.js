import PedidoModel from "../models/Produto.js";

const readPedidos = async(id) => {
    const pedido = await PedidoModel.find(id);
      if (!pedido) {
        throw new Error("Pedido não encontrado");
      }
      return pedido;
};

export default readPedidos;