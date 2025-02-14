import AdmModel from "../models/Administrador.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import UserService from "../services/UserService.js";
import AuthService from "../services/AuthService.js";

dotenv.config();

const userService = UserService();
const authService = AuthService(); 

export const create = async (req, res) => {
  try {
    const { nome, email, senha, role } = req.body;

    const admCriado = await userService.createUser(nome, email, senha, role);

    res.status(200).json({ msg: admCriado });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  try {
    const {email, senha} = req.body;

    const adm = await AdmModel.findOne({email: email});

    if(!adm) {
      return res.status(404).json({message: "Usuário não encontrado"});
    }
    
    const isMatch = bcrypt.compare(senha, adm.senha);

    if(!isMatch) {
      return res.status(400).json({message: "Senha inválida"});
    }

    const token = authService.generateToken(adm);
    
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const buscarAdms = async (req, res) => {
    try {
      const admData = await userService.readUsers();
      if (!admData || admData.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.status(200).json(admData);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
};

export const editarAdm = async (req, res) => {
  try {
      const id = req.params.id;

      const admAtualizado = await userService.editUser(id, req.body, {
        new: true,
      }); 

      res.status(200).json({ message: "Adm atualizado.", data: admAtualizado});
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
};

export const deletarAdm = async (req, res) => {
  try {
    const id = req.params.id;
    const admExist = await AdmModel.findById(id);
    if (!admExist) {
      return res.status(404).json({ message: "Adm não encontrado" });
    }
    const admDeletado = userService.removeUser();
    res.status(200).json({ message: "Adm deletado.", data: admDeletado });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};