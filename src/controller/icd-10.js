import icd10Model from "../models/icd-10Model.js";

export const createNewIcd10 = async (req, res) => {
  const { kode_icd_10, insiden } = req.body;
  try {
  await icd10Model.create({
      kode_icd_10: kode_icd_10,
      insiden: insiden,
    }).then((response) => {
    res.status(201).json({
      message: "Icd-10 berhasil dibuat",
      kode_icd_10: response.kode_icd_10
    });
  })} catch (error) {
    res.status(500).json({ error: error.message });  
  }
}

export const getAllIcd10 = async (req, res) => {
  try {
    const icd10 = await icd10Model.findAll();
    res.status(200).json({ icd10: icd10 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getIcd10ById = async (req, res) => {
  try {
    const { id } = req.params;
    await icd10Model.findOne({
      where: { kode_icd_10: id },
    }).then((response) => {
      res.status(200).json({ icd10: response });
    })
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteIcd10 = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await icd10Model.destroy({
      where: { kode_icd_10: id },
    });
    if (deleted) {
      return res.status(200).send("Icd-10 deleted");
    }
    throw new Error("Icd-10 not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updateIcd10 = async (req, res) => {
  try {
    const { id } = req.params;
    const { kode_icd_10, insiden } = req.body;
    const updated = await icd10Model.update(
      {
        kode_icd_10: kode_icd_10,
        insiden: insiden,
      },
      { where: { kode_icd_10: id } }
    );
    if (updated) {
      const updatedIcd10 = await icd10Model.findOne({ where: { kode_icd_10: id } });
      return res.status(200).json({ icd10: updatedIcd10 });
    }
    throw new Error("Icd-10 not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}