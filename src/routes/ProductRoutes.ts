import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/handleErrors";
import { authenticate } from "../middleware/authenticate";

export const productRouter = Router();

productRouter.get("/", authenticate, ProductController.getAllProducts);
productRouter.get(
	"/:productId",
	param("productId").isNumeric().withMessage("Id no válido"),
	handleInputErrors,
	authenticate,
	ProductController.getSingleProducts,
);
productRouter.post(
	"/add-lead/:productId",
	body("correo").notEmpty().withMessage("Debe de ingresar un correo"),
	body("correo").isEmail().withMessage("Debe de ingresar un correo válido"),
	ProductController.addLead,
);
productRouter.post("/download/:productId", authenticate, ProductController.directDownload);
