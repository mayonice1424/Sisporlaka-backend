import sequelize, { where } from "sequelize";
import {Op} from "sequelize";
import laporanModel from "../models/laporan.js";
import laporanKategoriModel from "../models/laporanKategori.js";
import kecamatanModel from "../models/kecamatanModel.js";
import usersModel from "../models/users.js";
import usersLaporanModel from "../models/usersLaporan.js";
import identitasKorbanModel from "../models/identitasKorbanModel.js";

export const createNewLaporan = async (req, res) => {
  const { judul_kejadian, tanggal, waktu, lokasi, kerugian_materil, plat_ambulance, penyebab, keterangan,id_kecamatan } = req.body;
  const {id_users,status} = req.body;
  const {id_laporan_kategori} = req.body;
  const {nama,jenis_kelamin,umur, alamat, NIK, nama_rumah_sakit,nomor_rekam_medis} = req.body;
  const { id_laporan } = req.params;
  const { kode_icd_10 } = req.body;
  const { id_luka } = req.body;
  const { id_skala_triase } = req.body;
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
      id_kecamatan: id_kecamatan,
      id_laporan_kategori: id_laporan_kategori
    })
    const userLaporan = await usersLaporanModel.create({
      id_laporan: laporan.id_laporan,
      id_users: id_users,
      status: status,
    })
    const identitasKorban = await identitasKorbanModel.create({
      id_laporan: laporan.id_laporan,
      nama: nama,
      jenis_kelamin: jenis_kelamin,
      umur: umur,
      alamat: alamat,
      NIK: NIK,
      nama_rumah_sakit: nama_rumah_sakit,
      nomor_rekam_medis: nomor_rekam_medis,
      kode_icd_10: kode_icd_10,
      id_luka: id_luka,
      id_skala_triase: id_skala_triase
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
              [Op.like]: `%${search}%`
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
            plat_ambulance: {
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
              [Op.like]: `%${search}%`
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
            plat_ambulance: {
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

        ]
      },
      order: [['tanggal', 'DESC']],
      limit: limit,
      offset: offset,
      subQuery:false
    });
    res.status(200).json({
       laporan: laporan,
       page:page,
       limit:limit,
       totalRows:totalRows,
       totalPages: totalPages
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
              [Op.like]: `%${search}%`
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
            plat_ambulance: {
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
            id_laporan: {
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
              [Op.like]: `%${search}%`
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
            plat_ambulance: {
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
            id_laporan: {
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
    res.status(200).json({
       laporan: laporan,
       page:page,
       limit:limit,
       totalRows:totalRows,
       totalPages: totalPages
       });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// export const getLaporanByIdUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const laporan = await usersLaporanModel.findAll({
//       order: [['id_users_laporan', 'DESC']],
//       where: {
//         status:false,
//       },
//       attributes:['id_users_laporan'],
//       subQuery:false
//     });
//     res.status(200).json({ Users_Laporan : laporan });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }


export const getAllLaporan = async (req, res) => {
  try {
    const laporan = await laporanModel.findAll({
      include: [
        {model:kecamatanModel},
        {model:laporanKategoriModel},
        {model:usersModel,attributes: { exclude: ["password", "refresh_token"]}}],
      order: [['id_laporan', 'DESC']],
      where: {
        '$Kecamatan.nama_kecamatan$': 'Bumi Waras',
      }, 
      limit: 2
    });
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
      const deleteLaporan = await usersLaporanModel.destroy({
        where: { id_laporan: id },
      });
      return res.status(200).json({ message: "Laporan berhasil" , Laporan: deleteLaporan});
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
    res.status(200).json({ count : countValidate, countNotValidate : countNotValidate});
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
    res.status(200).json({ count : count});
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
      limit : 2,
      include : [kecamatanModel,usersModel],
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

// export const patchLaporan = async (req, res) => {
//   const { id } = req.params;
//   const { id_users } = req.body;
//   const {status} = false;
//   const { judul_kejadian, tanggal, waktu, lokasi, kerugian_materil, plat_ambulance, penyebab, keterangan, id_kecamatan } = req.body;
//   try {
//     const laporan = await laporanModel.update({
//       judul_kejadian,
//       tanggal,
//       waktu,
//       lokasi,
//       kerugian_materil,
//       plat_ambulance,
//       penyebab,
//       keterangan,
//       id_kecamatan
//     }, {
//       where: {
//         id_laporan: id
//       }
//     });
//     const usersLaporan = await usersLaporanModel.findOrCreate({
//       where: {
//         id_users,
//         id_laporan: id,
//       },
//       defaults: {
//         id_users,
//         id_laporan: id,
//         status: false  
//       },
//     });
//     if (!usersLaporan[1]) { 
//       await usersLaporanModel.update({ status: false }, {
//         where: {
//           id_users_laporan: usersLaporan[0].id_users_laporan
//         }
//       });
//       usersLaporan[0].status = false;
//     }
//     res.status(201).json({
//       message: "Laporan berhasil diubah",
//       laporan,
//       usersLaporan
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const patchLaporan = async (req, res) => {
//   const { id } = req.params;
//   const { id_users } = req.body;
//   const {status} = false;
//   const { judul_kejadian, tanggal, waktu, lokasi, kerugian_materil, plat_ambulance, penyebab, keterangan, id_kecamatan } = req.body;
//   try {
//     const laporan = await laporanModel.update({
//       judul_kejadian,
//       tanggal,
//       waktu,
//       lokasi,
//       kerugian_materil,
//       plat_ambulance,
//       penyebab,
//       keterangan,
//       id_kecamatan
//     }, {
//       where: {
//         id_laporan: id
//       }
//     });
//     const usersLaporan = await usersLaporanModel.create({
//         id_users : id_users,
//         id_laporan: id,
//         status: false
//     });
//     res.status(201).json({
//       message: "Laporan berhasil diubah",
//       laporan,
//       usersLaporan
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


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
      where: { id_laporan: id },
    });
    if (updated) {
      const updatedLaporan = await usersLaporanModel.update(
        { status: false },
        { where: { id_laporan: id } }
      );
      const updateIdentitasKorban = await identitasKorbanModel.update(req.body, {
        where: { id_laporan: id },
      });
      return res.status(200).json({ laporan: updated });
    }
    throw new Error("Laporan not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// const { judul_kejadian, tanggal, waktu, lokasi, kerugian_materil, plat_ambulance, penyebab, keterangan,id_kecamatan } = req.body;
//   const {id_users,status} = req.body;
//   const {id_laporan_kategori} = req.body;
//   const {nama,jenis_kelamin,umur, alamat, NIK, nama_rumah_sakit,nomor_rekam_medis} = req.body;
//   const { id_laporan } = req.params;
//   const { kode_icd_10 } = req.body;
//   const { id_luka } = req.body;
//   const { id_skala_triase } = req.body;
//   try {
//     const laporan = await laporanModel.create({
//       judul_kejadian: judul_kejadian,
//       tanggal: tanggal,
//       waktu: waktu,
//       lokasi: lokasi,
//       kerugian_materil: kerugian_materil,
//       plat_ambulance: plat_ambulance,
//       penyebab: penyebab,
//       keterangan: keterangan,
//       id_kecamatan: id_kecamatan,
//       id_laporan_kategori: id_laporan_kategori
//     })
//     const userLaporan = await usersLaporanModel.create({
//       id_laporan: laporan.id_laporan,
//       id_users: id_users,
//       status: status,
//     })
//     const identitasKorban = await identitasKorbanModel.create({
//       id_laporan: laporan.id_laporan,
//       nama: nama,
//       jenis_kelamin: jenis_kelamin,
//       umur: umur,
//       alamat: alamat,
//       NIK: NIK,
//       nama_rumah_sakit: nama_rumah_sakit,
//       nomor_rekam_medis: nomor_rekam_medis,
//       kode_icd_10: kode_icd_10,
//       id_luka: id_luka,
//       id_skala_triase: id_skala_triase
//     }) 
//     .then((response) => {
//     res.status(201).json({
//       message: "Laporan berhasil dibuat",
//       id_laporan: response.id_laporan
//     });
//   })} catch (error) {
//     res.status(500).json({ error: error.message });  
//   }
// }