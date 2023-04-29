import kecamatanModel from "../models/kecamatanModel.js";

export const createNewKecamatan = async (req, res) => {
  const { nama_kecamatan } = req.body;
  try {
  await kecamatanModel.create({
      nama_kecamatan: nama_kecamatan,
    }).then((response) => {
    res.status(201).json({
      message: "Kecamatan berhasil dibuat",
      id_kecamatan: response.id_kecamatan
    });
  })} catch (error) {
    res.status(500).json({ error: error.message });  
  }
}

export const getAllKecamatan = async (req, res) => {
  try {
    const kecamatan = await kecamatanModel.findAll();
    res.status(200).json({ kecamatan: kecamatan });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getKecamatanById = async (req, res) => {
  try {
    const { id } = req.params;
    await kecamatanModel.findOne({
      where: { id_kecamatan: id },
    }).then((response) => {
      res.status(200).json({ kecamatan: response });
    }
    )
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteKecamatan = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await kecamatanModel.destroy({
      where: { id_kecamatan: id },
    });
    if (deleted) {
      return res.status(200).send("Kecamatan deleted");
    }
    throw new Error("Kecamatan not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updateKecamatan = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await kecamatanModel.update(req.body, {
      where: { id_kecamatan: id },
    });
    if (updated) {
      const updatedKecamatan = await kecamatanModel.findOne({ where: { id_kecamatan: id } });
      return res.status(200).json({ kecamatan: updatedKecamatan });
    }
    throw new Error("Kecamatan not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
