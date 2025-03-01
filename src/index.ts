import { server } from "./server";
import colors from "colors";
import { config } from "dotenv";

config();

const port = process.env.PORT || 4000;
server.listen(port, () => {
	console.log(colors.cyan(`Servidor en vivo en el puerto ${port}`));
});
