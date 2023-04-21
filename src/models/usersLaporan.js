import usersModel from "./users.js";
import laporanModel from "./laporan.js";
import Sequelize from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;
const usersLaporanModel = db.define('Users_Laporan', {
  id_users_laporan: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    validate: {
      notEmpty: true
    }
  }, 
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      notEmpty: true
    }
  },
  nama_pelapor: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
}, {
  freezeTableName: true
});

  usersModel.belongsToMany(laporanModel, { through: 'Users_Laporan', foreignKey: 'id_users' });
  laporanModel.belongsToMany(usersModel, { through: 'Users_Laporan', foreignKey: 'id_laporan'  });
export default usersLaporanModel;

(async () => {
  await db.sync();
})();