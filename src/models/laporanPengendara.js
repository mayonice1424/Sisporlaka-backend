import laporanModel from "./laporan.js";
import Sequelize from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;
const laporanPengemudiModel = db.define('Laporan_Pengemudi', {
  id_laporan_pengemudi: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    validate: {
      notEmpty: true
    }
  },
  nama_pengemudi: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  },
  jenis_kelamin_pengemudi: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  },
  umur_pengemudi: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  },
  alamat_pengemudi: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  },
  no_sim: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  },
  no_STNK: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  }
}
, {
  freezeTableName: true
});

laporanModel.hasMany(laporanPengemudiModel, { foreignKey: { allowNull: false, name:'id_laporan' } });
laporanPengemudiModel.belongsTo(laporanModel, { foreignKey: { allowNull: false, name:'id_laporan' } });
export default laporanPengemudiModel;

(async () => {
  await db.sync();
})();

