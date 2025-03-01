import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/handleErrors";
import { UserController } from "../controllers/UserController";
import { authenticate } from "../middleware/authenticate";

export const AuthRouter = Router();

AuthRouter.post(
	"/register",
	body("nombre").notEmpty().withMessage("El nombre es requerido"),
	body("nombre")
		.isLength({ max: 30 })
		.withMessage("El nombre es demasiado largo"),
	body("contraseña").notEmpty().withMessage("La contraseña es requerida"),
	body("contraseña")
		.isLength({ min: 8 })
		.withMessage("La contraseña debe tener al menos 8 caracteres"),
	body("correo").isEmail().withMessage("Correo no válido"),
	handleInputErrors,
	UserController.registerUser,
);

AuthRouter.post(
	"/login",
	body("contraseña").notEmpty().withMessage("La contraseña es requerida"),
	body("correo").isEmail().withMessage("Correo no válido"),
	handleInputErrors,
	UserController.loginUser,
);

AuthRouter.get("/me", authenticate, UserController.getUser);
