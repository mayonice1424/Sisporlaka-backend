import db from '../config/database.js';
import Sequelize from 'sequelize';
import laporanKategoriModel from './laporanKategori.js';
import kecamatanModel from './kecamatanModel.js';
const {DataTypes} = Sequelize;
const laporanModel =  db.define('laporan', {
    id_laporan: { 
        type: DataTypes.INTEGER,
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
        allowNull: true,
        validate:{
            notEmpty: true
        }
    },
    kerugian_materil:{
      type: DataTypes.INTEGER.UNSIGNED,
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

laporanKategoriModel.hasMany( laporanModel, { foreignKey: 'id_laporan_kategori' });
laporanModel.belongsTo( laporanKategoriModel, { foreignKey: 'id_laporan_kategori' });

kecamatanModel.hasMany( laporanModel, { foreignKey: 'id_kecamatan' });
laporanModel.belongsTo( kecamatanModel, { foreignKey: 'id_kecamatan' });

export default laporanModel;

(
  async () => {
    await db.sync();
}
)()