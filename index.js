console.clear();
import sequelize from "./src/config/db.js";
import dotenv from "dotenv";
import httpServer from "./src/config/http.js";
import { createTableOfTemperaments } from "./src/helpers/getAllTemperaments.js";

dotenv.config();

async function bootstrap() {
  await sequelize.sync({ force: true });
  await createTableOfTemperaments();
  httpServer.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
  });
}

bootstrap();

export default bootstrap;
