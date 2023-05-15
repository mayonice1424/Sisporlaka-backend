import db from '../config/database.js';
import Sequelize from 'sequelize';

const { DataTypes } = Sequelize;
const skalaTriaseModel = db.define('Skala_Triase', {
  id_skala_triase: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    validate: {
      notEmpty: true
    }
  },
  skala: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: true
    }
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

    