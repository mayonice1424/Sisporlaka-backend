import laporanModel from "../models/laporan.js";

export const createNewLaporan = async (req, res) => {
  const { judul_kejadian, tanggal, waktu, lokasi, kerugian_materil, plat_ambulance, penyebab, keterangan } = req.body;
  try {
     await laporanModel.create({
      judul_kejadian: judul_kejadian,
      tanggal: tanggal,
      waktu: waktu,
      lokasi: lokasi,
      kerugian_materil: kerugian_materil,
      plat_ambulance: plat_ambulance,
      penyebab: penyebab,
      keterangan: keterangan,
    });
    res.status(201).json({
      message: "Laporan berhasil dibuat",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
