import db from "../config/database.js";
import Sequelize from "sequelize";

const { DataTypes } = Sequelize;
const santunanModel = db.define("santunan", {
  id_santunan: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  jenis_santunan: {
    type: DataTypes.STRING,
  }
}, {
  freezeTableName: true
});

export default santunanModel;
(async () => {
  await db.sync();
})();




