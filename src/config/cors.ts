import type { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
	origin: (origin, callback) => {
		const whitelist = [process.env.FRONTEND_URL];
		if (process.argv[2] === "--api") {
			whitelist.push("http://localhost:5173");
			whitelist.push(undefined);
		}

		if (whitelist.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error("CORS ERROR"));
		}
	},
};
