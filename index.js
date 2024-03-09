import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import MemberRoutes from "./Source/Routes/MemberRoutes.js";
import BookRoutes from "./Source/Routes/BooksRoutes.js";
import LoanRoutes from "./Source/Routes/LoanRoutes.js";

import specs from "./Source/swagger.js";
import swaggerUi from "swagger-ui-express";
dotenv.config();

const app = express();
// declared swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.get("/api/docs", (req, res) => {
  res.redirect("/api-docs");
});

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

// route app
app.use(MemberRoutes);
app.use(BookRoutes);
app.use(LoanRoutes);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server up and running... ${process.env.APP_PORT}`);
});
