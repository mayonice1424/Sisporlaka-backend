import skalaTriaseModel from "../models/skalaTriase.js";

export const createNewSkalaTriase = async (req, res) => {
  const { kode_ATS,keterangan } = req.body;
  try {
    await skalaTriaseModel.create({
      kode_ATS: kode_ATS,
      keterangan: keterangan,
    }).then((response) => {
      res.status(201).json({
        message: "Skala Triase berhasil dibuat",
        kode_ATS: response.kode_ATS
      });
    })} catch (error) {
      res.status(500).json({ error: error.message });  
    }
}
