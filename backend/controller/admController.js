import AdmModel from "../models/Administrador.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Cadastrar usuário
export const create = async (req, res) => {
    try {
      const {nome, email, senha, role} = req.body;

      const admExiste = await AdmModel.findOne({ email });

      if(admExiste) {
        return res.status(400).json({msg: "email já existe"});
      }

      const saltRound = 10;
      const hash_password = await bcrypt.hash(senha, saltRound);

      const admCriado = await AdmModel.create({ 
        nome, 
        email, 
        senha: hash_password,
        role
      });

      res.status(200).json({msg: admCriado});
    } catch (error) {
      res.status(500).json(error);
    }
    
};

// Login do usuário
export const login = async (req, res) => {
  const {email, senha} = req.body;
    
  try {
    const adm = await AdmModel.findOne({email: email});

    if(!adm) {
      return res.status(404).json({message: "Usuário não encontrado"});
    }
    
    const isMatch = await bcrypt.compare(senha, adm.senha);

    if(!isMatch) {
      return res.status(400).json({message: "Senha inválida"});
    }

    const token = jwt.sign(
      {
        id: adm._id,
        email: adm.email,
        role: adm.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Buscar adms
export const buscarAdms = async (req, res) => {
    try {
      const admData = await AdmModel.find();
      if (!admData || admData.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.status(200).json(admData);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
};

// Editar adm
export const editarAdm = async (req, res) => {
    try {
      const id = req.params.id;
      const admExist = await AdmModel.findById(id);
      if (!admExist) {
        return res.status(404).json({ message: "Adm não encontrado." });
      }
      const admAtualizado = await AdmModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      // res.status(200).json(updatedData);
      res.status(200).json({ message: "Adm atualizado." });
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
};

// Deletar adm
export const deletarAdm = async (req, res) => {
    try {
      const id = req.params.id;
      const admExist = await AdmModel.findById(id);
      if (!admExist) {
        return res.status(404).json({ message: "Adm não encontrado" });
      }
      await AdmModel.findByIdAndDelete(id);
      res.status(200).json({ message: "Adm deletado." });
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
};