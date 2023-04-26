import db from '../config/database.js';
import { Sequelize } from "sequelize";

const { DataTypes } = Sequelize;
const kecamatanModel = db.define('Kecamatan', {
  id_kecamatan: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    validate: {
      notEmpty: true
    }
  },
  nama_kecamatan: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  }
}
, {
  freezeTableName: true
});


export default kecamatanModel;

(
  async () => {
    await db.sync();
  }
  )()