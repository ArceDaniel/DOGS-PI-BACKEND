import { Router } from "express";
import getTemperament from "../helpers/getAllTemperaments.js";

const temperamentRoutes = Router();

temperamentRoutes.get("/", async (req, res) => {
  try {
    const response = await getTemperament();
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

export default temperamentRoutes;
