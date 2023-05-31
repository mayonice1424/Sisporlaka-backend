import db from '../config/database.js';
import Sequelize from 'sequelize';

const { DataTypes } = Sequelize;
const skalaTriaseModel = db.define('Skala_Triase', {
  kode_ATS: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  keterangan: {
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

export default skalaTriaseModel;

(
  async () => {
    await db.sync();
  }
  )()

    