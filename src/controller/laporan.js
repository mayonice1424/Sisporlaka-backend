import laporanModel from "../models/laporan.js";

export const createNewLaporan = async (req, res) => {
  const { judul_kejadian, tanggal, waktu, lokasi, kerugian_materil, plat_ambulance, penyebab, keterangan } = req.body;
  try {
    const laporan = await laporanModel.create({
      judul_kejadian: judul_kejadian,
      tanggal: tanggal,
      waktu: waktu,
      lokasi: lokasi,
      kerugian_materil: kerugian_materil,
      plat_ambulance: plat_ambulance,
      penyebab: penyebab,
      keterangan: keterangan,
    }).then((response) => {
    res.status(201).json({
      message: "Laporan berhasil dibuat",
      id_laporan: response.id_laporan
    });
  })} catch (error) {
    res.status(500).json({ error: error.message });  
  }
}

export const getAllLaporan = async (req, res) => {
  try {
    const laporan = await laporanModel.findAll();
    res.status(200).json({ laporan: laporan });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteLaporan = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await laporanModel.destroy({
      where: { id_laporan: id },
    });
    if (deleted) {
      return res.status(200).json(
        {
          message: "Laporan berhasil dihapus",
          id_laporan: id
        }
      );
    }
    throw new Error("Laporan not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updateLaporan = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await laporanModel.update(req.body, {
      where: { id_laporan: id },
    });
    if (updated) {
      const updatedLaporan = await laporanModel.findOne({ where: { id_laporan: id } });
      return res.status(200).json({ laporan: updatedLaporan });
    }
    throw new Error("Laporan not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getLaporanById = async (req, res) => {
  try {
    const { id } = req.params;
    await laporanModel.findOne({
      where: { id_laporan: id },
    }).then((response) => {
      res.status(200).json({ laporan: response });
    }
    )
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}