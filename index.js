import express from "express";
import cors from "cors";
import session from "express-session";
import config from "./Config/Database.js";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: config,
});

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server up and running... ${process.env.APP_PORT}`);
});
