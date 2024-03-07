import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const dbUrl = process.env.DATABASE_URL;
const host = process.env.HOST;
const dialect = process.env.DIALECT;

const config = new Sequelize(dbUrl, {
  host: host,
  dialect: dialect,
});

config.authenticate().then(() => {
  try {
    console.log("Database connected...");
  } catch (error) {
    console.log(error);
  }
});

export default config;
