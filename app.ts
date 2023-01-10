import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./swagger_output.json";

import route from "./src/routes/routes";

const port = process.env.port;

const app = express();

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, { explorer: true })
);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", route);

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
