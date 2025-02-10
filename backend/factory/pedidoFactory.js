import PedidoModel from "../models/Pedido.js";

const PedidoFactory = () => {
    const criarPedido = async (pedidoData) => {
            return PedidoModel.create(pedidoData);
        };
        return {
            criarPedido,
    };
};

export default PedidoFactory;