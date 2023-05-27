import db from '../config/database.js';
import Sequelize from 'sequelize';
import laporanModel from './laporan.js';
import icd10Model from './icd-10Model.js';
import lukaModel from './lukaModel.js';
import skalaTriaseModel from './skalaTriase.js';
const { DataTypes } = Sequelize;
const identitasKorbanModel = db.define('Identitas_Korban', {
  id_identitas_korban: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    validate: {
      notEmpty: true
    }
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  },
  jenis_kelamin: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  },
  umur: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  },
  alamat: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  },
  plat_ambulance: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  },
  NIK: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  },
  nama_rumah_sakit: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  },
  nomor_rekam_medis: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  }
}, {
  freezeTableName: true
});

laporanModel.hasMany(identitasKorbanModel, { foreignKey: { allowNull: false, name:'id_laporan' } });
identitasKorbanModel.belongsTo(laporanModel, { foreignKey: { allowNull: false, name:'id_laporan' } });

icd10Model.hasMany( identitasKorbanModel, { foreignKey: 'kode_icd_10' });
identitasKorbanModel.belongsTo( icd10Model, { foreignKey: 'kode_icd_10' });

lukaModel.hasMany( identitasKorbanModel, { foreignKey: 'id_luka' });
identitasKorbanModel.belongsTo( lukaModel, { foreignKey: 'id_luka' });

skalaTriaseModel.hasMany( identitasKorbanModel, { foreignKey: 'kode_ATS' });
identitasKorbanModel.belongsTo( skalaTriaseModel, { foreignKey: 'kode_ATS' });
export default identitasKorbanModel;

(
  async () => {
    await db.sync();
}
)()