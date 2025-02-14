import AdmModel from "../models/Administrador.js";

const deleteAdm = async (id) => {
  const adm = await AdmModel.findByIdAndDelete(id);
  if (!adm) {
    throw new Error("Adm não encontrado");
  }
  return adm;
};

export default deleteAdm;
