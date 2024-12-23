import express from "express";

import { createPedido, buscarPedidos, buscarPedidoPorId } from "../controller/pedidoController.js";

const pedidoRoute = express.Router();

pedidoRoute.post("/pedido", createPedido);
pedidoRoute.get("/pedidos", buscarPedidos);
pedidoRoute.get("/pedido/:id", buscarPedidoPorId);

export default pedidoRoute;