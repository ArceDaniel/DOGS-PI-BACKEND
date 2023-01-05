import createBreed from "../helpers/createBreed.js";
import getAllDogs from "../helpers/getAllDogs.js";

export default async function postNewBreed(req, res) {
  const { name, height, weight, lifeSpan, image, temperament } = req.body;
  if (!name || !height || !weight || !lifeSpan || !temperament)
    return res.status(400).send("faltan parametros");
  try {
    const existsBreed = await getAllDogs(name);
    if (existsBreed.length)
      return res.status(400).send("Existing breed");
    const newDog = await createBreed(
      name,
      height,
      weight,
      lifeSpan,
      image,
      temperament,
    );
    //if(!newDog) return res.status(400).json({ err: newDog });
    return res.status(201).json(newDog);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
}
