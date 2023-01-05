import axios from "axios";
import { Op } from "sequelize";
import BREED from "../models/Dog.js";
import TEMPERAMENT from "../models/Temperaments.js";

const getAllDogs = async (name) => {
  const api = await axios.get(`https://api.thedogapi.com/v1/breeds`);
  const allDogsApi = await api.data.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.image.url,
      temperaments: e.temperament,
      weight: e.weight.imperial,
      height: e.height.imperial,
      lifeSpan: e.life_span,
      isDB: false,
    };
  });

  if (!name) {
    const dogsDB = await BREED.findAll({
      include: [
        {
          model: TEMPERAMENT,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    const dogsDBMap = await dogsDB.map((e) => {
      e = JSON.parse(JSON.stringify(e));
      e.temperaments = e.temperaments.map((e) => e.name).join();
      return e;
    });

    return [...dogsDBMap, ...allDogsApi];
  }
  //-------------------------     BY NAME  --------------------------------------- //
  const apiName = await axios(
    `https://api.thedogapi.com/v1/breeds/search?q=${name}`
  );

  const allDogsApiName = [];
  await apiName.data.forEach(async (e) => {
    const data = await allDogsApi.find((f) => f.name === e.name);
    if (data) allDogsApiName.push(data);
  });
  const dogsDB = await BREED.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: [
      {
        model: TEMPERAMENT,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  const dogsDBMap = await dogsDB.map((e) => {
    e = JSON.parse(JSON.stringify(e));
    e.temperaments = e.temperaments.map((e) => e.name).join();
    return e;
  });
  return [...dogsDBMap, ...allDogsApiName];
};
export default getAllDogs;
