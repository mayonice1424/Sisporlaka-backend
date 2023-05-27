import santunanModel from "../models/santunanModels.js";

export const createNewSantunan = async (req, res) => {
  const { jenis_santunan } = req.body;
  try {
    await santunanModel.create({
      jenis_santunan: jenis_santunan
    }).then((response) => {
      res.status(201).json({
        message: "Santunan berhasil dibuat",
        id_santunan: response.id_santunan
      });
    })} catch (error) {
      res.status(500).json({ error: error.message });  
    }
}