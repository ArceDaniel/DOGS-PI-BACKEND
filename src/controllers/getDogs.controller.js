import getAllDogs from "../helpers/getAllDogs.js";

export default async function getDogsController(req, res) {
  const { name } = req.query;
  try {
    const dogs = await getAllDogs(name);
    if (!dogs || !dogs.length) return res.status(404).send("Breed not found");
    return res.status(200).json(dogs);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
}
