import db from "../config/database.js";
import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const lukaModel = db.define("wounds", {
  id_luka: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  keterangan_luka: {
    type: DataTypes.STRING,
  },
}
  ,{
    freezeTableName: true
  }
);


export default lukaModel;

(async () => {
  await db.sync();
})();




