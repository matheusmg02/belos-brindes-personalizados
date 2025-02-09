import AdmModel from "../models/Administrador.js";

const readAdms = async (id) => {
  const adm = await AdmModel.find(id);
  if (!adm) {
    throw new Error("Adm não encontrado");
  }
  return adm;
};

export default readAdms;