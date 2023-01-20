import axios from "axios";
import TEMPERAMENT from "../models/Temperaments.js";

const getTemperament = async () => {
  const temperamentDB = await TEMPERAMENT.findAll();
  return temperamentDB.map((e) => e.name);
};

export const createTableOfTemperaments = async () => {
  const api = await axios.get(`https://api.thedogapi.com/v1/breeds`);
  api.data
    .map((el) => el.temperament)
    .join()
    .split(",")
    .map((e) => e.trim())
    .map((name) => {
      if (!name) return;
      return TEMPERAMENT.findOrCreate({
        where: { name },
      });
    });
};

export default getTemperament;
