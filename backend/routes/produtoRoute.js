import express from "express";

import { create, buscarProdutos, atualizarProduto, deletarProduto } from "../controller/produtoController.js";

const produtoRoute = express.Router();

produtoRoute.post("/produto", create);
produtoRoute.get("/produtos", buscarProdutos);
produtoRoute.put("/produto/:id", atualizarProduto);
produtoRoute.delete("/produto/:id", deletarProduto);

export default produtoRoute;