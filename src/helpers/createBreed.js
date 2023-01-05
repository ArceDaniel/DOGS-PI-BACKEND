import BREED from "../models/Dog.js";
import TEMPERAMENT from "../models/Temperaments.js";
import { v4 as uuidv4 } from "uuid";

const createBreed = async (
  name,
  height,
  weight,
  lifeSpan,
  image,
  temperament
) => {
  const newDog = await BREED.create({
    id: "m" + uuidv4(),
    name,
    height,
    weight,
    lifeSpan,
    image,
    isDB: true,
  });
  await temperament.map(async (t) => {
    const [temperament, boolean] = await TEMPERAMENT.findOrCreate({
      where: { name: t },
    });
    newDog.addTemperament(temperament);
  });

  return newDog;
};
export default createBreed;
