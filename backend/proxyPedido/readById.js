import PedidoModel from "../models/Produto.js";

const readPedidoById = async(id) => {
    const pedido = await PedidoModel.findById(id);
      if (!pedido) {
        throw new Error("Pedido não encontrado");
      }
      return pedido;
};

export default readPedidoById;