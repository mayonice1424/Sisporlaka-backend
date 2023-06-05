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
        allowNull: true,
        defaultValue: 0,
    },
    penyebab:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    keterangan:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
},{
    freezeTableName: true
});

laporanKategoriModel.hasMany( laporanModel, { allowNull:true, foreignKey: 'id_laporan_kategori' });
laporanModel.belongsTo( laporanKategoriModel, {allowNull:true, foreignKey: 'id_laporan_kategori' });

kecamatanModel.hasMany( laporanModel, { allowNull:true, foreignKey: 'id_kecamatan' });
laporanModel.belongsTo( kecamatanModel, { allowNull:true, foreignKey: 'id_kecamatan' });

export default laporanModel;

(
  async () => {
    await db.sync();
}
)()