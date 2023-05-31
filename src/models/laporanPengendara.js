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
  },
  jenis_kelamin_pengemudi: {
    type: DataTypes.STRING,
  },
  umur_pengemudi: {
    type: DataTypes.INTEGER,
  },
  alamat_pengemudi: {
    type: DataTypes.STRING,
  },
  no_sim: {
    type: DataTypes.INTEGER,
  },
  no_STNK: {
    type: DataTypes.INTEGER,
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

