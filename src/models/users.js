import db from '../config/database.js';
import Sequelize from 'sequelize';

const {DataTypes} = Sequelize;
const usersModel =  db.define('users', {
    id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    role :{
        type: DataTypes.STRING,
    },
    username: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
});
export default usersModel;

(
  async () => {
    await db.sync();
  }
  )()