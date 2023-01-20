import BREED from "../models/Dog.js";
import TEMPERAMENT from "../models/Temperaments.js";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";

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
    const temp = await TEMPERAMENT.findOne({
      where: { name:{
        [Op.iLike]: `%${t}%`,
      } },
    });
    console.log(temp);
    console.log(t);
    newDog.addTemperament(temp);
  });

  return newDog;
};
export default createBreed;
