import laporanModel from "./laporan.js";
import Sequelize from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;
const laporanPengemudiModel = db.define('Laporan_Pengemudi', {
  id_laporan_pengemudi: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nama_pengemudi: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  jenis_kelamin_pengemudi: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  umur_pengemudi: {
    type: DataTypes.INTEGER,
    
    allowNull: true,
    defaultValue: null
  },
  alamat_pengemudi: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null

  },
  no_sim: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null

  },
  no_STNK: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
}
}
, {
  freezeTableName: true
});

laporanModel.hasMany(laporanPengemudiModel, { foreignKey: { name:'id_laporan' } });
laporanPengemudiModel.belongsTo(laporanModel, { foreignKey: { name:'id_laporan' } });
export default laporanPengemudiModel;

(async () => {
  await db.sync();
})();

