import identitasKorbanModel from "./identitasKorbanModel.js";
import db from "../config/database.js";
import Sequelize from "sequelize";
import santunanModel from "./santunanModels.js";

const { DataTypes } = Sequelize;
const identitasSantunanModel = db.define("Identitas_Santunan", {
  id_identitas_santunan: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    validate: {
      notEmpty: true
    }
  },
  nominal: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  }
}, {
  freezeTableName: true
});

identitasKorbanModel.belongsToMany(santunanModel, {through: 'Identitas_Santunan', foreignKey: 'id_identitas_korban'});
santunanModel.belongsToMany(identitasKorbanModel, {through: 'Identitas_Santunan', foreignKey: 'id_santunan'});
export default identitasSantunanModel;


(async () => {
  await db.sync();
})();




