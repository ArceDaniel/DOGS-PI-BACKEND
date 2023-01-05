import { Router } from "express";
import getDogsByIDController from "../controllers/getDogByID.controller.js";
import getDogsController from "../controllers/getDogs.controller.js";
import postNewBreed from "../controllers/PostNewBreed.controller.js";

const dogRoutes = Router();

dogRoutes.get("/", getDogsController);
dogRoutes.get("/:idRaza", getDogsByIDController);
dogRoutes.post("/", postNewBreed);

export default dogRoutes;
