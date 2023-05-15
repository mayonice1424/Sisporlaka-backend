import laporanPengemudiModel from "../models/laporanPengendara.js";

export const createNewLaporanPengemudi = async (req, res) => {
  const { nama,jenis_kelamin,umur,alamat, no_sim, no_stnk  } = req.body;
  try {
  await laporanPengemudiModel.create({
      nama: nama,
      jenis_kelamin: jenis_kelamin,
      umur: umur,
      alamat: alamat,
      no_sim: no_sim,
      no_stnk: no_stnk
    }).then((response) => {
    res.status(201).json({
      message: "Laporan Pengemudi berhasil dibuat",
      id_laporan_pengemudi: response.id_laporan_pengemudi
    });
  })} catch (error) {
    res.status(500).json({ error: error.message });  
  }
}

export const getAllLaporanPengemudi = async (req, res) => {
  try {
    const laporanPengemudi = await laporanPengemudiModel.findAll();
    res.status(200).json({ laporanPengemudi: laporanPengemudi });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getLaporanPengemudiById = async (req, res) => {
  try {
    const { id } = req.params;
    await laporanPengemudiModel.findOne({
      where: { id_laporan_pengemudi: id },
    }).then((response) => {
      res.status(200).json({ laporanPengemudi: response });
    }
    )
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteLaporanPengemudi = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await laporanPengemudiModel.destroy({
      where: { id_laporan_pengemudi: id },
    });
    if (deleted) {
      return res.status(200).send("Laporan Pengemudi deleted");
    }
    throw new Error("Laporan Pengemudi not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updateLaporanPengemudi = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await laporanPengemudiModel.update(req.body, {
      where: { id_laporan_pengemudi: id },
    });
    if (updated) {
      const updatedLaporanPengemudi = await laporanPengemudiModel.findOne({
        where: { id_laporan_pengemudi: id },
      });
      return res.status(200).json({ laporanPengemudi: updatedLaporanPengemudi });
    }
    throw new Error("Laporan Pengemudi not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


