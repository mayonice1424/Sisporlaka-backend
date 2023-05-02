import laporanModel from "./laporan.js";

export const countLaporan = async (req, res) => {
  try {
    const count = await laporanModel.count();
    res.status(200).json({ count: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const countLaporanByKecamatan = async (req, res) => {
  try {
    const count = await laporanModel.count({
      where: { id_kecamatan: req.params.id_kecamatan }
    });
    res.status(200).json({ count: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}