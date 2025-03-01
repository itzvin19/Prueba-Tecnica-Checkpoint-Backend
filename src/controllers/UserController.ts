import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { compareHash, hashPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";

export const UserController = {
	registerUser: async (req: Request, res: Response) => {
		try {
			const { correo, contraseña, nombre } = req.body;
			const userExists = await prisma.cliente.findFirst({
				where: { correo },
			});

			if (userExists) {
				const error = new Error("Ya existe un correo registrado");
				res.status(409).json({ error: error.message });
				return;
			}

			const hashedPassword = await hashPassword(contraseña);

			await prisma.cliente.create({
				data: {
					nombre,
					contraseña: hashedPassword,
					correo,
				},
			});

			res.send("Se ha registrado el usuario correctamente");
		} catch (error) {
			res.status(500).send(`Ocurrió un error: ${error}`);
		}
	},

	loginUser: async (req: Request, res: Response) => {
		try {
			const { correo, contraseña } = req.body;
			const userExists = await prisma.cliente.findFirst({ where: { correo } });
			if (!userExists) {
				res.status(400).send("Usuario o contraseña no válidos");
				return;
			}
			const isValidPassword = await compareHash(
				contraseña,
				userExists.contraseña,
			);

			if (!isValidPassword) {
				res.status(400).send("Usuario o contraseña no válidos");
				return;
			}

			const jwt = generateJWT({ id: userExists.id });
			res.send(jwt);
		} catch (error) {
			res.status(500).send(`Ocurrió un error: ${error}`);
		}
	},
	createLead: async (req: Request, res: Response) => {
		try {
			const { correo } = req.params;
			await prisma.leads.create({ data: { correo } });
		} catch (error) {
			res.status(500).send(`Ocurrió un error: ${error}`);
		}
	},
	getUser: (req: Request, res: Response) => {
		req.user ? res.json(req.user) : res.json({});
	},
};
