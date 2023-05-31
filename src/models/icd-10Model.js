import db from "../config/database.js";
import Sequelize from "sequelize";

const { DataTypes } = Sequelize;
const icd10Model = db.define("ICD-10", {
    kode_icd_10: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  insiden: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  },
},{
  freezeTableName: true
}
);

export default icd10Model;
(async () => {
  await db.sync();
})();




