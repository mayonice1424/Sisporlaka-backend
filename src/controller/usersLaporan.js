import db from "../config/database";
import Sequelize from "sequelize";
import usersLaporanModel from "./../models/usersLaporan.js";

await usersLaporanModel.create({
  id_users: 1,
  id_laporan: 1,
  status: true,
  nama_pelapor: 'Bambang'
});