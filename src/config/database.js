import { Sequelize } from "sequelize";

const db = new Sequelize("sisporlaka","root", "",{
    host: "localhost",
    dialect: 'mysql',
  });

export default db;