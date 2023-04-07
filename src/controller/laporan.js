import laporanModel from "../models/laporan.js";

export const createNewLaporan = async (req, res) => {
  try {
    const newLaporan = await laporanModel.create(req.body);
    res.status(201).json(newLaporan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}