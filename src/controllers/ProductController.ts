import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import PDFDocument from "pdfkit";
import axios from "axios";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class ProductController {
	static getAllProducts = async (req: Request, res: Response) => {
		try {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			const parameters: any = {
				select: {
					id: true,
					nombre: true,
					descripcion: true,
					imagen: true,
					...(req.user ? { precio: true } : {}),
				},
			};
			const products = await prisma.producto.findMany(parameters);
			res.json(products);
		} catch (error) {
			res.status(500).send(`Ocurrió un error: ${error}`);
		}
	};
	static getSingleProducts = async (req: Request, res: Response) => {
		try {
			const { productId } = req.params;
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			const parameters: any = {
				where: { id: +productId },
				select: {
					id: true,
					nombre: true,
					descripcion: true,
					imagen: true,
					...(req.user ? { precio: true } : {}),
				},
			};

			const productExists = await prisma.producto.findFirst(parameters);
			if (!productExists) {
				res.status(404).send("Producto no encontrado");
				return;
			}
			res.json(productExists);
		} catch (error) {
			res.status(500).send(`Ocurrió un error: ${error}`);
		}
	};

	static generatePDF = async (id: number): Promise<Buffer> => {
		try {
			const producto=await prisma.producto.findFirst({where:{
				id
			}})

			if(!producto){
				throw new Error("Error generando el PDF: Producto no encontrado");
			}

			// 1️⃣ Descargar la imagen antes de crear el PDF
			const response = await axios.get(producto.imagen, {
				responseType: "arraybuffer",
			});
			const imageBuffer = Buffer.from(response.data);

			// 2️⃣ Crear la promesa para capturar el PDF
			return new Promise((resolve, reject) => {
				try {
					const doc = new PDFDocument();
					const buffers: Buffer[] = [];

					// Capturar datos en memoria
					doc.on("data", (chunk) => buffers.push(chunk));
					doc.on("end", () => resolve(Buffer.concat(buffers)));
					doc.on("error", (err) => reject(err));

					// 3️⃣ Agregar contenido al PDF
					doc.fontSize(20).text(producto.nombre, { align: "center" });
					doc.moveDown();

					// 4️⃣ Agregar la imagen descargada
					doc.image(imageBuffer, { fit: [300, 200], align: "center" });
					doc.moveDown();

					// 5️⃣ Agregar descripción y precio
					doc.moveDown(9);
					doc.fontSize(14).text("Descripción:", { underline: true });
					doc.text(producto.descripcion);
					doc.moveDown();

					doc.fontSize(16).text(`Precio: $${producto.precio}`);

					// Finalizar PDF
					doc.end();
				} catch (error) {
					reject(error);
				}
			});
		} catch (error) {
			throw new Error(`Error generando el PDF: ${error}`);
		}
	};

	static addLead = async (req: Request, res: Response) => {
		try {
			const { correo } = req.body;
			const { productId } = req.params;

			const leadExits = await prisma.leads.findFirst({ where: { correo } });
			if (leadExits) {
				await prisma.leads.update({
					where: { id: leadExits.id },
					data: { count: leadExits.count + 1 },
				});
			} else {
				await prisma.leads.create({ data: { correo } });
			}

			await prisma.producto.update({where:{id:+productId},data:{
				leadsGenerados:{increment:1}
			}})

			const pdfBuffer = await this.generatePDF(+productId);

			res.setHeader(
				"Content-Disposition",
				'attachment; filename="documento.pdf"',
			);
			res.setHeader("Content-Type", "application/pdf");
			res.send(pdfBuffer);
		} catch (error) {
			res.status(500).send(`Ocurrió un error: ${error}`);
		}
	};

	static directDownload = async (req: Request, res: Response) => {
		try {
			const { productId } = req.params;
			if (req.user) {
				const pdfBuffer = await this.generatePDF(+productId);

				res.setHeader(
					"Content-Disposition",
					'attachment; filename="documento.pdf"',
				);
				res.setHeader("Content-Type", "application/pdf");
				res.send(pdfBuffer);
				return;
			}
			res.status(401).send("Usuario no válido");
		} catch (error) {
			res.status(500).send(`Ocurrió un error: ${error}`);
		}
	};
}
