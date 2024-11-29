import AdmModel from "../models/Administrador.js";

// Cadastrar usuário
export const create = async (req, res) => {
    AdmModel.create(req.body)
    .then(adms => res.json(adms))
    .catch(err => res.json(err));
};

// Login do usuário
export const login = async (req, res) => {
    const {email, senha} = req.body;
    AdmModel.findOne({email: email})
    .then(adm => {
        if(adm) {
            if(adm.senha === senha) {
                res.json("Logado com sucesso.");
            } else {
                res.json("Senha incorreta."); 
            }
        } else {
            res.json("O email não está cadastrado.");
        }
    })
    .catch(err => res.json(err));
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