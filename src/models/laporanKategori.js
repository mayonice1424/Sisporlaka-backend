import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;
const laporanKategoriModel = db.define('Laporan_Kategori', {
  id_laporan_kategori: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nama_kategori: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}
, {
  freezeTableName: true
});


export default laporanKategoriModel;

(async () => {
  await db.sync();
})();
