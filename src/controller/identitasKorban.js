import identitasKorbanModel from "../models/identitasKorbanModel.js";
import lukaModel from "../models/lukaModel.js";
import skalaTriaseModel from "../models/skalaTriase.js";
import icd10Model from "../models/icd-10Model.js";


export const createNewIdentitasKorban = async (req, res) => {
  const {nama,jenis_kelamin,umur, alamat, NIK, nama_rumah_sakit,nomor_rekam_medis} = req.body;
  const { id_laporan } = req.params;
  const { kode_icd_10 } = req.body;
  const { id_luka } = req.body;
  const { id_skala_triase } = req.body;
  try {
    await identitasKorbanModel.create({
      nama: nama,
      jenis_kelamin: jenis_kelamin,
      umur: umur,
      alamat: alamat,
      NIK: NIK,
      nama_rumah_sakit: nama_rumah_sakit,
      nomor_rekam_medis: nomor_rekam_medis,
      id_laporan: id_laporan,
      kode_icd_10: kode_icd_10,
      id_luka: id_luka,
      id_skala_triase: id_skala_triase
    }).then((response) => {
      res.status(201).json({
        message: "Identitas Korban berhasil dibuat",
        id_identitas_korban: response.id_identitas_korban
      });
    })
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getAllIdentitasKorban = async (req, res) => {
  try {
    const id_laporan = req.params.id;
    const identitasKorban = await identitasKorbanModel.findAll({
      include: [
        {
          model: lukaModel,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: skalaTriaseModel,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: icd10Model,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      where: { id_laporan: req.params.id },
    });
    res.status(200).json({ identitasKorban: identitasKorban });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getIdentitasKorbanById = async (req, res) => {
  try {
    const { id } = req.params;
    const identitas_korban = await identitasKorbanModel.findOne({
      include: [
        {
          model: lukaModel
        },
        {
          model: skalaTriaseModel
        },
        { 
          model: icd10Model
        }
      ],
      where: { id_identitas_korban: id },
    });

    if (identitas_korban) {
      res.status(200).json({ identitas_korban: identitas_korban });
    } else {
      res.status(404).json({ message: "Identitas korban tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteIdentitasKorban = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await identitasKorbanModel.destroy({
      where: { id_identitas_korban: id },
    });
    if (deleted) {
      return res.status(200).send("Identitas Korban deleted");
    }
    throw new Error("Identitas Korban not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updateIdentitasKorban = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await identitasKorbanModel.update(req.body, {
      where: { id_identitas_korban: id }
    });
    if (updated) {
      const updatedIdentitasKorban = await identitasKorbanModel.findOne({ where: { id_identitas_korban: id } });
      return res.status(200).json({ identitasKorban: updatedIdentitasKorban });
    }
    throw new Error('Identitas Korban not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export const getIdentitasKorbanByLaporanId = async (req, res) => {
  try {
    const { id_laporan } = req.params;
    await identitasKorbanModel.findAll({
      where: { id_laporan: id_laporan },
    }).then((response) => {
      res.status(200).json({ identitasKorban: response });
    }
    )
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getIdentitasKorbanByLukaId = async (req, res) => {
  try {
    const { id_luka } = req.params;
    await identitasKorbanModel.findAll({
      where: { id_luka: id_luka },
    }).then((response) => {
      res.status(200).json({ identitasKorban: response });
    }
    )
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

