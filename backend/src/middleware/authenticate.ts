import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import type { RequestUser } from "../types";

declare global {
	namespace Express {
		interface Request {
			user?: RequestUser;
		}
	}
}

export const authenticate = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const bearer = req.headers.authorization;
	if (!bearer || !bearer.startsWith("Bearer ")) {
		return next();
	}

	const token = bearer.split(" ")[1];
	if (!token) {
		return next();
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_PASS);

		if (typeof decoded === "object" && decoded.id) {
			const user = await prisma.cliente.findFirst({
				where: { id: +decoded.id },
				select: {
					id: true,
					nombre: true,
				},
			});
			if (user) {
				req.user = user;
				next();
			} else {
				next();
			}
		}
	} catch (error) {
		next();
	}
};
