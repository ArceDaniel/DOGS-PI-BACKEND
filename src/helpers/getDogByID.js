import getAllDogs from "./getAllDogs.js";

const getDogByID = async (id) => {
  const dogs = await getAllDogs();
  const foundDog = await dogs.find((d) => d.id == id);
  return foundDog;
};

export default getDogByID;
