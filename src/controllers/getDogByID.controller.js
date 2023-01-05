import getDogByID from "../helpers/getDogByID.js";

export default async function getDogsByIDController(req, res) {
  const { idRaza } = req.params;

  try {
    const dogApi = await getDogByID(idRaza);
    if (!dogApi) return res.status(404).send("Breed not found");
    return res.status(200).json(dogApi);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
