import db from '../config/database.js';
import Sequelize from 'sequelize';

const {DataTypes} = Sequelize;
const usersModel =  db.define('users', {
    id_users: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        validate:{
            notEmpty: true
        }
    },
    role :{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,validate:{
            notEmpty: true
        }
    },
    refresh_token: {
        type: DataTypes.TEXT,
    }
}, {
    freezeTableName: true
}
);
export default usersModel;

(
  async () => {
    await db.sync();
  }
  )()