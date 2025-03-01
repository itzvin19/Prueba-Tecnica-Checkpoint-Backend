import type { Producto } from "@prisma/client";

export const productos: Omit<Producto, "id">[] = [
	{
		nombre: "Fjallraven - Foldsack No. 1 Backpack",
		precio: 109.95,
		imagen: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
		descripcion:
			"Mochila perfecta para el día a día, con espacio para laptops de hasta 15 pulgadas.",
	},
	{
		nombre: "Mens Casual Premium Slim Fit T-Shirt",
		precio: 22.3,
		imagen:
			"https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
		descripcion:
			"Camiseta de ajuste slim con mangas raglán y tela transpirable para mayor comodidad.",
	},
	{
		nombre: "Mens Cotton Jacket",
		precio: 55.99,
		imagen: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
		descripcion:
			"Chaqueta ideal para primavera, otoño e invierno, con diseño resistente y cómodo.",
	},
	{
		nombre: "Mens Casual Slim Fit",
		precio: 15.99,
		imagen: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
		descripcion:
			"Pantalón de ajuste slim con materiales de alta calidad y confort.",
	},
	{
		nombre: "John Hardy Women's Legends Naga Bracelet",
		precio: 695,
		imagen: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
		descripcion:
			"Brazalete de oro y plata inspirado en la leyenda del dragón Naga.",
	},
	{
		nombre: "Solid Gold Petite Micropave",
		precio: 168,
		imagen: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
		descripcion:
			"Anillo de oro macizo con micropavé, ideal para compromisos o regalos especiales.",
	},
	{
		nombre: "White Gold Plated Princess Ring",
		precio: 9.99,
		imagen: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
		descripcion:
			"Anillo de compromiso clásico con diamante de imitación, perfecto para ocasiones especiales.",
	},
	{
		nombre: "Pierced Owl Rose Gold Plated Earrings",
		precio: 10.99,
		imagen: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
		descripcion:
			"Pendientes de acero inoxidable chapados en oro rosa con un diseño elegante.",
	},
	{
		nombre: "WD 2TB Elements Portable External Hard Drive",
		precio: 64,
		imagen: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
		descripcion:
			"Disco duro portátil con conexión USB 3.0 para almacenamiento rápido y seguro.",
	},
	{
		nombre: "SanDisk SSD PLUS 1TB Internal SSD",
		precio: 109,
		imagen: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
		descripcion:
			"Unidad SSD interna con velocidad de lectura/escritura mejorada para un mejor rendimiento del sistema.",
	},
];
