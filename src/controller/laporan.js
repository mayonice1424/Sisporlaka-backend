import sequelize, { where } from "sequelize";
import {Op} from "sequelize";
import laporanModel from "../models/laporan.js";
import laporanKategoriModel from "../models/laporanKategori.js";
import kecamatanModel from "../models/kecamatanModel.js";
import usersModel from "../models/users.js";
import usersLaporanModel from "../models/usersLaporan.js";
import identitasKorbanModel from "../models/identitasKorbanModel.js";
import laporanPengemudiModel from "../models/laporanPengendara.js";
import identitasSantunanModel from "../models/identitasSantunanModel.js";
import lukaModel from "../models/lukaModel.js";
import santunanModel from "../models/santunanModels.js";
import skalaTriaseModel from "../models/skalaTriase.js";
import icd10Model from "../models/icd-10Model.js";
import { response } from "express";
export const createNewLaporan = async (req, res) => {
  const { judul_kejadian, tanggal, waktu, lokasi, kerugian_materil, penyebab, keterangan,id_kecamatan } = req.body;
  const {id_users,status} = req.body;
  const {id_laporan_kategori} = req.body;
  try {
    const laporan = await laporanModel.create({
      judul_kejadian: judul_kejadian,
      tanggal: tanggal,
      waktu: waktu,
      lokasi: lokasi,
      kerugian_materil: kerugian_materil,
      penyebab: penyebab,
      keterangan: keterangan,
      id_kecamatan: id_kecamatan,
      id_laporan_kategori: id_laporan_kategori
    })
    const userLaporan = await usersLaporanModel.create({
      id_laporan: laporan.id_laporan,
      id_users: id_users,
      status: status,
    }) 
    .then((response) => {
    res.status(201).json({
      message: "Laporan berhasil dibuat",
      id_laporan: response.id_laporan
    });
  })} catch (error) {
    res.status(500).json({ error: error.message });  
  }
}

export const createDetailLaporan = async (req, res) => {
  const { identitas_korban, identitas_pengemudi, id_laporan } = req.body;

  try {
    if (identitas_korban && Array.isArray(identitas_korban)) {
      const identitasKorbanPromises = identitas_korban.map(async (korban) => {
        const createdIdentitasKorban = await identitasKorbanModel.create({
          id_laporan: id_laporan,
          nama: korban.nama,
          jenis_kelamin: korban.jenis_kelamin,
          umur: parseInt(korban.umur), 
          kode_icd_10: korban.kode_icd_10,
          alamat: korban.alamat,
          plat_ambulance: korban.plat_ambulance,
          NIK: korban.NIK,
          nama_rumah_sakit: korban.nama_rumah_sakit,
          nomor_rekam_medis: korban.nomor_rekam_medis,
          id_luka: parseInt(korban.id_luka), 
          kode_ATS: korban.kode_ATS,
        });

        if (korban.identitas_santunan && Array.isArray(korban.identitas_santunan)) {
          const santunanPromises = korban.identitas_santunan.map((santunan) => {
            return identitasSantunanModel.create({
              id_identitas_korban: createdIdentitasKorban.id_identitas_korban,
              nominal: santunan.nominal,
              id_santunan: santunan.id_santunan,
            });
          });

          await Promise.all(santunanPromises);
        }
      });

      await Promise.all(identitasKorbanPromises);
    }

    if (identitas_pengemudi && Array.isArray(identitas_pengemudi)) {
      const pengemudiPromises = identitas_pengemudi.map((pengemudi) =>
      laporanPengemudiModel.create({
          id_laporan: id_laporan,
          nama_pengemudi: pengemudi.nama_pengemudi,
          jenis_kelamin_pengemudi: pengemudi.jenis_kelamin_pengemudi,
          umur_pengemudi: pengemudi.umur_pengemudi,
          alamat_pengemudi: pengemudi.alamat_pengemudi,
          no_sim: pengemudi.no_sim,
          no_STNK: pengemudi.no_STNK,
        })
      );

      await Promise.all(pengemudiPromises);
    }

    res.status(201).json({ message: "Detail laporan polisi berhasil dibuat.",
  });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createKorban = async (req, res) => {
  const { id_laporan,nama, jenis_kelamin,umur, kode_icd_10, alamat,plat_ambulance,NIK,nama_rumah_sakit,id_luka,nomor_rekam_medis,kode_ATS } = req.body;
  try {
   const createdIdentitasKorban = await identitasKorbanModel.create({
      id_laporan: id_laporan,
      nama: nama,
      jenis_kelamin: jenis_kelamin,
      umur: parseInt(umur),
      kode_icd_10: kode_icd_10,
      alamat: alamat,
      plat_ambulance: plat_ambulance,
      NIK: NIK,
      nama_rumah_sakit: nama_rumah_sakit,
      nomor_rekam_medis: nomor_rekam_medis,
      id_luka: id_luka,
      kode_ATS: kode_ATS,
    }).then((response) => {
      res.status(201).json({
        message: "Korban berhasil dibuat",
        id_identitas_korban: response.id_identitas_korban,
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createNewIdentitasSantunan = async (req, res) => {
  try {
    const {id_identitas_korban, id_santunan, nominal} = req.body;
    await identitasSantunanModel.create({
      id_identitas_korban: id_identitas_korban,
      id_santunan: id_santunan,
      nominal: nominal
    }).then((response) => {
      res.status(201).json({
        message: "Identitas Santunan berhasil dibuat",
        id_identitas_santunan: response.id_identitas_santunan
      });
    })
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getIdentitasSantunan = async (req, res) => {
  try {
    const { id } = req.params;
    const identitasSantunan = await identitasKorbanModel.findAll({
      include : [
        {
          model: santunanModel,
        },
        {
          model: lukaModel,
        },
        {
          model: laporanModel,
        },
        {
          model: icd10Model
        },
        {
          model: skalaTriaseModel
        }
      ],
      where: {
        id_laporan: id,
      },
      subQuery: false,
    }).then((response) => {
      res.status(200).json({ identitasSantunan: response });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getIdentitasPengemudi = async (req, res) => {
  try {
    const { id } = req.params;
    const identitasPengemudi = await laporanPengemudiModel.findAll({
      where: {
        id_laporan: id,
      },
    }).then((response) => {
      res.status(200).json({ identitasPengemudi: response });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteIdentitasSantunan = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await identitasSantunanModel.destroy({
      where: {
        id_identitas_korban: id,
      },
    });
    if (deleted) {
      return res.status(200).send("Identitas Santunan deleted");
    }
    throw new Error("Identitas Santunan not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export const deleteKorban = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await identitasKorbanModel.destroy({
      where: {
        id_identitas_korban: id,
      },
    });
    if (deleted) {
      return res.status(200).send("Identitas korban deleted");
    }
    throw new Error("Identitas korban not found");
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

export const deleteLaporanPengemudi = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await laporanPengemudiModel.destroy({
      where: {
        id_laporan_pengemudi: id,
      },
    });
    if (deleted) {
      return res.status(200).send("Laporan Pengemudi deleted");
    }
    throw new Error("Laporan Pengemudi not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getLaporanByBulan = async (req, res) => {
  try {
    const search = req.query.search || '';

    const laporan = await kecamatanModel.findAll({
      include: [
        {
          model: laporanModel,
          attributes: [
            [sequelize.literal('SUM(CASE WHEN `laporans->users->Users_Laporan`.`status` = true THEN 1 ELSE 0 END)'), 'count'],
          ],
          include: [
            {
              model: usersModel,
              attributes: [],
              as: 'users',
              through: { attributes: [] },
            },
          ],
          where: {
            tanggal: {
              [Op.between]: [`%${search}-01$%`, `%${search}-31$%`],
            },
          },
          required: false,
        },
      ],
      attributes: [
        [
          sequelize.literal("CONCAT(EXTRACT(YEAR FROM `Laporans`.`tanggal`), '-', EXTRACT(MONTH FROM `Laporans`.`tanggal`))"),
          'data'
        ],
        'id_kecamatan',
        'nama_kecamatan',
        [sequelize.fn('COUNT', sequelize.col('laporans.id_kecamatan')), 'count'],
        [sequelize.col('laporans.tanggal'), 'tanggal'],
      ],
      group: ['data', 'id_kecamatan'],
      order: sequelize.literal('id_kecamatan ASC'),
      raw: true,
      subQuery: false,
    });
    const laporanWithDefault = laporan.map((item) => {
      const kecamatan = item;
      if (!kecamatan['Laporans.count']) {
        kecamatan['Laporans.count'] = 0;
      }
      return kecamatan;
    });
    // convert laporans.count to laporans_count from laporanWithDefault
    const laporanWithDefault2 = laporanWithDefault.map((item) => {
      const kecamatan = item;
      kecamatan.laporans_count = kecamatan['laporans.count'];
      delete kecamatan['laporans.count'];
      return kecamatan;
    });
    res.status(200).json({ laporan: laporanWithDefault2, search: search });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};











export const getLaporanByTahunBulan = async (req, res) => {
    try {
      const laporan = await laporanModel.findAll({
        include : [
         {model:usersModel, attributes:{ exclude:['password','id_users','role','username','refresh_token','createdAt']} },
        ],
        attributes: [
          [
            sequelize.literal("CONCAT(EXTRACT(YEAR FROM tanggal), '-', EXTRACT(MONTH FROM tanggal))"),
            'data'
          ],
        ],
        group: ['data'],
        order: sequelize.literal('data DESC'),
        where: {
          '$users.Users_Laporan.status$':true,
      },
      subQuery:false
    }).then((response) => {
      res.status(200).json({ laporan: response });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const getLaporanByTahunBulanforPublic = async (req, res) => {
    try {
      const limit = 5;
      const laporan = await laporanModel.findAll({
        include : [
         {model:usersModel, attributes:{ exclude:['password','id_users','role','username','refresh_token','createdAt']} },
        ],
        attributes: [
          [
            sequelize.literal("CONCAT(EXTRACT(YEAR FROM tanggal), '-', EXTRACT(MONTH FROM tanggal))"),
            'data'
          ],
        ],
        group: ['data'],
        order: sequelize.literal('data DESC'),
        where: {
          '$users.Users_Laporan.status$':true,
      },
      limit:limit,
      subQuery:false
    }).then((response) => {
      res.status(200).json({ laporan: response });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const getLaporanByTahunBulanUnlimited = async (req, res) => {
    try {
      const laporan = await laporanModel.findAll({
        include : [
         {model:usersModel, attributes:{ exclude:['password','id_users','role','username','refresh_token','createdAt']} },
        ],
        attributes: [
          [
            sequelize.literal("CONCAT(EXTRACT(YEAR FROM tanggal), '-', EXTRACT(MONTH FROM tanggal))"),
            'data'
          ],
        ],
        group: ['data'],
        order: sequelize.literal('data DESC'),
        where: {
          '$users.Users_Laporan.status$':true,
      },
      subQuery:false
    }).then((response) => {
      res.status(200).json({ laporan: response });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export const getLaporanByDate = async (req, res) => {
  try {
    try {
      const page = parseInt(req.query.page)|| 0;
      const limit = parseInt(req.query.limit) || 10;
      const {id} = req.params;
      const offset = limit * page;
      const totalRows = await laporanModel.count({
        include: [
          {model:kecamatanModel},
          {model:laporanKategoriModel},
          {model:usersModel,attributes: { exclude: ["password", "refresh_token"]}}],
        where: {
          '$users.Users_Laporan.status$':true,
          [Op.or]: [
            {
              tanggal: {
                [Op.between]:  [`%${id}-01$%`, `%${id}-31$%`],
              }
            },
        ],
      }});
      const totalPages = Math.ceil(totalRows / limit);
      const laporan = await laporanModel.findAll({
        include: [
          {model:kecamatanModel},
          {model:laporanKategoriModel},
          {model:usersModel,attributes: { exclude: ["password", "refresh_token"]}}],
        where: {          
          '$users.Users_Laporan.status$':true,
          [Op.or]: [
            {
              tanggal: {
                [Op.between]:  [`%${id}-01$%`, `%${id}-31$%`],
              }
            },
        ],
          },
        order: [['tanggal', 'DESC']],
        limit: limit,
        offset: offset,
        subQuery:false
      });
      res.status(200).json({ laporan: laporan, currentPage: page, id: id, limit: limit, offset: offset, totalPages: totalPages, totalRows: totalRows });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getAllLaporanBySearch = async (req, res) => {
  try {
    const page = parseInt(req.query.page)|| 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || '';
    const offset = limit * page;
    const totalRows = await laporanModel.count({
      include: [
        {model:kecamatanModel},
        {model:laporanKategoriModel},
        {model:usersModel,attributes: { exclude: ["password", "refresh_token"]}}],
      where: {
        '$users.Users_Laporan.status$':true,
        [Op.or]: [
          {
            judul_kejadian: {
              [Op.like]: `%${search}%`
            }
          },
          {
            tanggal: {
              [Op.between]:  [`%${search}-01$%`, `%${search}-31$%`],
            }
          },
          {
            waktu: {
              [Op.like]: `%${search}%`
            }
          },
          {
            lokasi: {
              [Op.like]: `%${search}%`
            }
          },
          {
            penyebab: {
              [Op.like]: `%${search}%`
            }
          },
          {
            keterangan: {
              [Op.like]: `%${search}%`
            }
          },
          {
            '$Kecamatan.nama_kecamatan$': {
              [Op.like]: `%${search}%`
            }
          },
          {
            '$Laporan_Kategori.nama_kategori$': {
              [Op.like]: `%${search}%`
            }
          }
        ]
      }
    });
    const totalPages = Math.ceil(totalRows / limit);
    const laporan = await laporanModel.findAll({
      include: [
        {model:kecamatanModel},
        {model:laporanKategoriModel},
        {model:usersModel,attributes: { exclude: ["password", "refresh_token"]}}],
      where: {          
        '$users.Users_Laporan.status$':true,
        [Op.or]: [
          {
            judul_kejadian: {
              [Op.like]: `%${search}%`
            }
          },
          {
            tanggal: {
              [Op.between]:  [`%${search}-01$%`, `%${search}-31$%`],
            }
          },
          {
            waktu: {
              [Op.like]: `%${search}%`
            }
          },
          {
            lokasi: {
              [Op.like]: `%${search}%`
            }
          },
          {
            penyebab: {
              [Op.like]: `%${search}%`
            }
          },
          {
            keterangan: {
              [Op.like]: `%${search}%`
            }
          },
          {
            '$Kecamatan.nama_kecamatan$': {
              [Op.like]: `%${search}%`
            }
          }, 
          {
            '$Laporan_Kategori.nama_kategori$': {
              [Op.like]: `%${search}%`
            }
          },
        ]
      },
      order: [['tanggal', 'DESC']],
      limit: limit,
      offset: offset,
      subQuery:false
    });
    const laporanIds = laporan.map(item => item.id_laporan);
    const identitas_korban = await identitasKorbanModel.findAll({
  include: [
    { model: laporanModel },
    { model: santunanModel},
    { model: lukaModel },
    { model: icd10Model},
    { model: skalaTriaseModel}
  ],
  where: {
    id_laporan: {
      [Op.in]: laporanIds
    }
  },
  order: [['id_laporan', 'ASC']],
  subQuery: false
});
const identitas_pengemudi = await laporanPengemudiModel.findAll({
  where: {
    id_laporan: {
      [Op.in]: laporanIds
    }
  },
  order: [['id_laporan', 'ASC']],
  subQuery: false
});
    res.status(200).json({
       laporan: laporan,
       identitas_korban: identitas_korban, 
       identitas_pengemudi: identitas_pengemudi,
       page:page,
       limit:limit,
       totalRows:totalRows,
       totalPages: totalPages
       });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getAllLaporanToDownload= async (req, res) => {
  try {
    const search = req.query.search_query || '';
    const totalRows = await laporanModel.count({
      include: [
        {model:kecamatanModel},
        {model:laporanKategoriModel},
        {model:usersModel,attributes: { exclude: ["password", "refresh_token"]}}],
      where: {
        '$users.Users_Laporan.status$':true,
        [Op.or]: [
          {
            judul_kejadian: {
              [Op.like]: `%${search}%`
            }
          },
          {
            tanggal: {
              [Op.between]:  [`%${search}-01$%`, `%${search}-31$%`],
            }
          },
          {
            waktu: {
              [Op.like]: `%${search}%`
            }
          },
          {
            lokasi: {
              [Op.like]: `%${search}%`
            }
          },
          {
            penyebab: {
              [Op.like]: `%${search}%`
            }
          },
          {
            keterangan: {
              [Op.like]: `%${search}%`
            }
          },
          {
            '$Kecamatan.nama_kecamatan$': {
              [Op.like]: `%${search}%`
            }
          },
          {
            '$Laporan_Kategori.nama_kategori$': {
              [Op.like]: `%${search}%`
            }
          }
        ]
      }
    });
    const laporan = await laporanModel.findAll({
      include: [
        {model:kecamatanModel},
        {model:laporanKategoriModel},
        {model:usersModel,attributes: { exclude: ["password", "refresh_token"]}}],
      where: {          
        '$users.Users_Laporan.status$':true,
        [Op.or]: [
          {
            judul_kejadian: {
              [Op.like]: `%${search}%`
            }
          },
          {
            tanggal: {
              [Op.between]:  [`%${search}-01$%`, `%${search}-31$%`],
            }
          },
          {
            waktu: {
              [Op.like]: `%${search}%`
            }
          },
          {
            lokasi: {
              [Op.like]: `%${search}%`
            }
          },
          {
            penyebab: {
              [Op.like]: `%${search}%`
            }
          },
          {
            keterangan: {
              [Op.like]: `%${search}%`
            }
          },
          {
            '$Kecamatan.nama_kecamatan$': {
              [Op.like]: `%${search}%`
            }
          }, 
          {
            '$Laporan_Kategori.nama_kategori$': {
              [Op.like]: `%${search}%`
            }
          },
        ]
      },
      order: [['tanggal', 'DESC']],
      subQuery:false
    });
    res.status(200).json({
       laporan: laporan,
       totalRows:totalRows,
       });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getAllLaporanToValidate = async (req, res) => {
  try {
    const page = parseInt(req.query.page)|| 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || '';
    const offset = limit * page;
    const totalRows = await laporanModel.count({
      include: [
        {model:kecamatanModel},
        {model:laporanKategoriModel},
        {model:usersModel,attributes: { exclude: ["password", "refresh_token"]}}],
      where: {
        '$users.Users_Laporan.status$':false,
        [Op.or]: [
          {
            judul_kejadian: {
              [Op.like]: `%${search}%`
            }
          },
          {
            tanggal: {
              [Op.between]:  [`%${search}-01$%`, `%${search}-31$%`],
            }
          },
          {
            waktu: {
              [Op.like]: `%${search}%`
            }
          },
          {
            lokasi: {
              [Op.like]: `%${search}%`
            }
          },
          {
            penyebab: {
              [Op.like]: `%${search}%`
            }
          },
          {
            keterangan: {
              [Op.like]: `%${search}%`
            }
          },
          {
            '$Kecamatan.nama_kecamatan$': {
              [Op.like]: `%${search}%`
            }
          },
                    {
            '$Laporan_Kategori.nama_kategori$': {
              [Op.like]: `%${search}%`
            }
          }
        ]
      }
    });
    const totalPages = Math.ceil(totalRows / limit);
    const laporan = await laporanModel.findAll({
      include: [
        {model:kecamatanModel},
        {model:laporanKategoriModel},
        {model:usersModel,attributes: { exclude: ["password", "refresh_token"]}}],
      where: {   
        '$users.Users_Laporan.status$':false,
        [Op.or]: [
          {
            judul_kejadian: {
              [Op.like]: `%${search}%`
            }
          },
          {
            tanggal: {
              [Op.between]:  [`%${search}-01$%`, `%${search}-31$%`],
            }
          },
          {
            waktu: {
              [Op.like]: `%${search}%`
            }
          },
          {
            lokasi: {
              [Op.like]: `%${search}%`
            }
          },
          {
            penyebab: {
              [Op.like]: `%${search}%`
            }
          },
          {
            keterangan: {
              [Op.like]: `%${search}%`
            }
          },
          {
            '$Kecamatan.nama_kecamatan$': {
              [Op.like]: `%${search}%`
            }
          },
          {
            '$Laporan_Kategori.nama_kategori$': {
              [Op.like]: `%${search}%`
            }
          }
        ]
      },
      order: [['tanggal', 'DESC']],
      limit: limit,
      offset: offset,
      subQuery:false
    });
   const laporanIds = laporan.map(item => item.id_laporan);
   const identitas_korban = await identitasKorbanModel.findAll({
    include: [
      { model: laporanModel },
      { model: santunanModel },
      { model: lukaModel },
      { model: icd10Model},
      { model: skalaTriaseModel}
    ],
    where: {
      id_laporan: {
        [Op.in]: laporanIds
      }
    },
    order: [['id_laporan', 'ASC']],
    subQuery: false
  });
  const identitas_pengemudi = await laporanPengemudiModel.findAll({
    where: {
      id_laporan: {
        [Op.in]: laporanIds
      }
    },
    order: [['id_laporan', 'ASC']],
    subQuery: false
  });
      res.status(200).json({
        laporan: laporan,
        identitas_korban: identitas_korban, 
        identitas_pengemudi: identitas_pengemudi,
        page:page,
        limit:limit,
        totalRows:totalRows,
        totalPages: totalPages
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

export const getIdentitasKorban = async (req, res) => {
  try {
    const { id } = req.params;
    const identitasKorban = await identitasKorbanModel.findAll({
      where: { id_laporan: id },
    });
    res.status(200).json({ identitasKorban: identitasKorban });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export const getJumlahKorbanTiapLaporan = async (req, res) => {
  try {
    const id = req.params.id;
    const jumlahKorban = await identitasKorbanModel.findAll({
      where: {
        'id_laporan': id, 
      },
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("id_identitas_korban")), "jumlah_korban"]
      ],
      // group: ["id_laporan"],
    });

    res.status(200).json({ jumlahKorban: jumlahKorban });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const deleteLaporan = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await laporanModel.destroy({
      where: { id_laporan: id },
    });
    if (deleted) {
      const deleteLaporan = await usersLaporanModel.destroy({
        where: { id_laporan: id },
      });
      const deleteIdentitasKorban = await identitasKorbanModel.destroy({
        where: { id_laporan: id },
      });
      const deleteIdentitasPelaku = await laporanPengemudiModel.destroy({
        where: { id_laporan: id },
      })
        return res.status(200).send("Laporan berhasil dihapus");
    }
    throw new Error("Laporan not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export const updateStatusLaporan = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await usersLaporanModel.update(req.body, {
      where: { id_users_laporan: id },
    });
    if (updated) {
      const updatedLaporan = await usersLaporanModel.findOne({ where: { id_users_laporan: id, status: false,
      } });
      return res.status(200).json({ Users_Laporan: updatedLaporan });
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

export const countLaporan = async (req, res) => {
  try {
    const countValidate = await laporanModel.count(
      {include : [usersModel],
        where: {
          '$users.Users_Laporan.status$':true,
      },
      subQuery:false
        }
    );
    const countNotValidate = await laporanModel.count(
      {include : [usersModel],
        where: {
          '$users.Users_Laporan.status$':false,
      },
      subQuery:false
        }
    );
    const jumlahKorban = await identitasKorbanModel.count(
      {include : 
        [{model:laporanModel,include:[usersModel]}],
        where: {
          '$laporan.users.Users_Laporan.status$':true,
      },
      subQuery:false
      }
    );
    res.status(200).json({ count : countValidate, countNotValidate : countNotValidate, jumlahKorban : jumlahKorban});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const countGrafik = async (req, res) => {
  try {
    const count = await laporanModel.findAll({
      attributes: ['id_kecamatan', [sequelize.fn('COUNT', 'id_kecamatan'), 'count']],
      order: [[sequelize.fn('COUNT', 'id_kecamatan'), 'DESC']],
      group: ['id_kecamatan'],
      include : [{model:kecamatanModel},{model:usersModel , attributes : { exclude : ["password","refresh_token"]}}],
      where: {
        '$users.Users_Laporan.status$':true,
    },
    subQuery:false
  });
    res.status(200).json({ count : count});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export const countLaporanByKecamatanValidated = async (req, res) => {
  try {
    const count = await laporanModel.findAll({
      attributes: ['id_kecamatan', [sequelize.fn('COUNT', 'id_kecamatan'), 'count']],
      order: [[sequelize.fn('COUNT', 'id_kecamatan'), 'DESC']],
      group: ['id_kecamatan'],
      include : [kecamatanModel,usersModel],
      where: {
        '$users.Users_Laporan.status$':true,
    },
    subQuery:false
  });
  if(count == null){
    res.status(200).json({ count : 0});
  }else{
    res.status(200).json({ count : count});
  }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const countLaporanByKecamatanUnValidated = async (req, res) => {
  try {
    const count = await laporanModel.findAll({
      attributes: ['id_kecamatan', [sequelize.fn('COUNT', 'id_kecamatan'), 'count']],
      order: [[sequelize.fn('COUNT', 'id_kecamatan'), 'DESC']],
      group: ['id_kecamatan'],
      include : [kecamatanModel,usersModel],
      where: {
        '$users.Users_Laporan.status$':true,
    },
    subQuery:false

  });
  if(count == null){
    res.status(200).json({ count : 0});
  }else{
    res.status(200).json({ count : count});
  }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export const getUsersLaporan = async (req, res) => {
  try {
    const usersLaporan = await usersLaporanModel.findAll({
      include: [
        {model:laporanModel},
        {model:usersModel,attributes: { exclude: ["password", "refresh_token"]}}],
      order: [['id_laporan', 'DESC']],
    });
    res.status(200).json({ usersLaporan: usersLaporan });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updateLaporan = async (req, res) => {
try {
  const { id } = req.params;
  const [updated] = await laporanModel.update(req.body, {
  where: { id_laporan: id }
});
if (updated) {
  const updatedLaporan = await usersLaporanModel.update(
    { status : false},
    { where: { id_laporan: id } });
  return res.status(200).json({ laporan: updatedLaporan });
}
throw new Error('Laporan not found');
} catch (error) {
return res.status(500).send(error.message);
}
};

  export const updateLaporanKorban = async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await identitasKorbanModel.update(req.body, {
      where: { id_identitas_korban: id }
    });
    if (updated) {
      const updatedLaporanKorban = await identitasKorbanModel.findOne({ where: { id_identitas_korban: id } });
      return res.status(200).json({ identitasKorban: updatedLaporanKorban });
    }
    throw new Error('Laporan Korban not found');
    } catch (error)
    {
      return res.status(500).send(error.message);
    }
    };

    export const updatePengendara = async (req, res) => {
      try {
        const { id } = req.params;
        const [updated] = await laporanPengemudiModel.update(req.body, {
        where: { id_laporan_pengendara: id }
      });
      if (updated) {
        const updatedLaporanPengendara = await laporanPengemudiModel.findOne({ where: { id_laporan_pengendara: id } });
        return res.status(200).json({ laporanPengendara: updatedLaporanPengendara });
      }
      throw new Error('Laporan Pengendara not found');
      } catch (error)
      {
        return res.status(500).send(error.message);
      }
      };

      export const updateIdentitasSantunan = async (req, res) => {
       const { id } = req.params;
        const update = await identitasSantunanModel.update(req.body, {
        where: { id_identitas_santunan: id }
      });
      if (update) {
        return res.status(200).json({ message: 'Identitas Santunan berhasil diubah' });
      }
    };