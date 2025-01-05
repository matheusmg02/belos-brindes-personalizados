import express from "express";
import auth from "../middlewares/auth.js";

import { createPedido, buscarPedidos, buscarPedidoPorId } from "../controller/pedidoController.js";

const pedidoRoute = express.Router();

pedidoRoute.post("/pedido", createPedido); // Cliente
pedidoRoute.get("/pedidos", auth(["master", "auth-pedidos"]), buscarPedidos);
pedidoRoute.get("/pedido/:id", auth(["master", "auth-pedidos"]), buscarPedidoPorId);

export default pedidoRoute;