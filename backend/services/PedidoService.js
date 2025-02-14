import PedidoModel from "../models/Pedido.js";

const PedidoService = () => {
    const criarPedido = async (pedidoData) => {
        return PedidoModel.create(pedidoData);
    };

    const readPedidos = async() => {
        return PedidoModel.find();
    };

    const readPedidoById = async(id) => {
        return PedidoModel.findById(id);
    };

    const deletePedidoById = async(id) => {
        return PedidoModel.findByIdAndDelete(id);
    };

    return {
        criarPedido,
        readPedidos,
        readPedidoById,
        deletePedidoById
    };
};

export default PedidoService;