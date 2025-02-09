import AdmModel from "../models/Administrador.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserFactory from "../factory/userFactory.js";
import deleteAdmById from "../proxyAdm/delete.js";
import updateAdmById from "../proxyAdm/edit.js";
import readAdms from "../proxyAdm/read.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const create = async (req, res) => {
  try {
    const { nome, email, senha, role } = req.body;

    const admExiste = await AdmModel.findOne({ email });
    if (admExiste) {
      return res.status(400).json({ msg: 'Email já existe' });
    }

    const userFactory = UserFactory();
    const admCriado = await userFactory.createUser(nome, email, senha, role);

    res.status(200).json({ msg: admCriado });
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
      const admData = await readAdms();
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
    const newData = req.body;

    // Usa a função proxy para editar o administrador
    const admAtualizado = await updateAdmById(id, newData);

    res.status(200).json({ message: "Adm atualizado.", data: admAtualizado });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};


// Deletar adm
export const deletarAdm = async (req, res) => {
  try {
    const id = req.params.id;

    // função proxy
    await deleteAdmById(id);

    res.status(200).json({ message: "Adm deletado." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};