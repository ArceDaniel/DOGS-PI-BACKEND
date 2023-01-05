import axios from "axios";
import TEMPERAMENT from "../models/Temperaments.js";

const getTemperament = async () => {
  const temperamentDB = await TEMPERAMENT.findAll();
  if (temperamentDB.length > 20) return temperamentDB.map((e) => e.name);

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

  return getTemperament();
};

export default getTemperament;
