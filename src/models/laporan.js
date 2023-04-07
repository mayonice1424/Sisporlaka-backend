import db from '../config/database.js';
import Sequelize from 'sequelize';

const {DataTypes} = Sequelize;
const laporanModel =  db.define('laporan', {
    id_laporan: { 
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
        validate:{
            notEmpty: true
        }
    },
    judul_kejadian :{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    tanggal: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    waktu: {
        type: DataTypes.TIME,
        allowNull: false,
        validate:{
            notEmpty: true
        },
    },
    lokasi:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    kerugian_materil:{
      type: DataTypes.INTEGER.UNSIGNED,
    },
    plat_ambulance:{
        type: DataTypes.STRING,
    },
    penyebab:{
        type: DataTypes.STRING,
    },
    keterangan:{
        type: DataTypes.STRING,
    },
},{
    freezeTableName: true
});
export default laporanModel;

(
  async () => {
    await db.sync();
  }
  )()