import laporanKategoriModel from "../models/laporanKategori.js";

export const createNewLaporanKategori = async (req, res) => {
  const { nama_kategori } = req.body;
  try {
    await laporanKategoriModel.create({
      nama_kategori: nama_kategori,
    }).then((response) => {
      res.status(201).json({
        message: "Kategori berhasil dibuat",
        id_kategori: response.id_kategori
      });
    })} catch (error) {
      res.status(500).json({ error: error.message });  
    }
}

export const getAllLaporanKategori = async (req, res) => {
  try {
    const kategori = await laporanKategoriModel.findAll();
    res.status(200).json({ kategori: kategori });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getLaporanKategoriById = async (req, res) => {
  try {
    const { id } = req.params;
    await laporanKategoriModel.findOne({
      where: { id_kategori: id },
    }).then((response) => {
      res.status(200).json({ kategori: response });
    }
    )
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteLaporanKategori = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await laporanKategoriModel.destroy({
      where: { id_kategori: id },
    });
    if (deleted) {
      return res.status(200).send("Kategori deleted");
    }
    throw new Error("Kategori not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updateLaporanKategori = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await laporanKategoriModel.update(req.body, {
      where: { id_kategori: id },
    });
    if (updated) {
      const updatedKategori = await laporanKategoriModel.findOne({ where: { id_kategori: id } });
      return res.status(200).json({ kategori: updatedKategori });
    }
    throw new Error("Kategori not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

