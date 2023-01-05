import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dogRoutes from "../routes/dog.routes.js";
import temperamentRoutes from "../routes/temperament.routes.js";

const expressApp = express();

// Middlewares
expressApp.use(express.json());
expressApp.use(morgan("dev"));
expressApp.use(cors());
expressApp.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
expressApp.use(bodyParser.json({ limit: "50mb" }));
expressApp.use(cookieParser());
expressApp.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Routes
expressApp.use("/dogs", dogRoutes);
expressApp.use("/temperaments", temperamentRoutes);

// Error catching endware.
expressApp.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

export default expressApp;
