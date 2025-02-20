import express from "express";
import generateContent from "../controller/geminiController.js";

const chatRoute = express.Router();

chatRoute.post("/chatbot", generateContent);

export default chatRoute;